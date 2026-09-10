import { GoogleGenAI } from "@google/genai";
import type { MarketplaceListing } from "../domain/listing.js";
import type { ListingSearch, MarketplaceConnector } from "./marketplace.js";

const schema = {
  type: "object",
  properties: {
    listings: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          price: { type: "number" },
          currency: { type: "string" },
          url: { type: "string" },
          source: { type: "string" },
          location: { type: "string" },
          condition: { type: "string" },
        },
        required: ["title", "price", "currency", "url", "source", "location"],
      },
    },
  },
  required: ["listings"],
};

type GeminiListing = {
  title: string;
  price: number;
  currency: string;
  url: string;
  source: string;
  location: string;
  condition?: string;
};

export class GeminiWebMarketplaceConnector implements MarketplaceConnector {
  readonly name = "gemini-web";
  private readonly ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async searchListings(search: ListingSearch): Promise<MarketplaceListing[]> {
    const query = search.query.trim() || "used electronics";
    const location = search.location?.trim() || "Lagos, Nigeria";
    const limit = Math.max(1, Math.min(search.limit ?? 20, 20));
    const prompt = [
      "You are the marketplace discovery layer for Market Radar.",
      `Product query: ${query}`,
      `Target market: ${location}`,
      `Search within approximately ${search.radiusKm ?? 50} km of the target market when the source supports location filtering.`,
      "Use Google Search to find current, publicly accessible Nigerian marketplace or classified listing pages.",
      "Then use URL Context to inspect the candidate listing pages before returning them.",
      `Return at most ${limit} verified individual listing pages.`,
      "A listing is valid only when the page is an individual product/listing page with a visible asking price and product title.",
      "Prefer Nigerian sources such as Jiji and other public marketplace/classified sites. Do not use search-result pages, category pages, articles, price guides, or generic homepages as listings.",
      "Do not invent listings, prices, sellers, dates, conditions, or URLs.",
      "Return the canonical public URL of the actual listing page inspected by URL Context.",
      "If a candidate page cannot be accessed or its asking price cannot be verified, exclude it.",
      "Use NGN for Nigerian naira prices and return the numeric asking price without currency symbols or thousands separators.",
      "Return JSON only matching this shape:",
      JSON.stringify(schema),
    ].join("\n");

    let response;
    try {
      response = await this.ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }, { urlContext: {} }],
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });
    } catch (e: any) {
      if (e?.message?.includes("429") || e?.status === 429) {
        throw new Error("Gemini API Quota Exceeded. Note: The Google Search Grounding tool used by this feature has separate, strict rate limits. Please try again later or switch MARKET_RADAR_PROVIDER to 'mock' in secrets.");
      }
      throw e;
    }

    const raw = response.text?.trim();
    if (!raw) {
      throw new Error("Gemini returned an empty marketplace response.");
    }

    let parsed: { listings?: GeminiListing[] };
    try {
      parsed = JSON.parse(raw) as { listings?: GeminiListing[] };
    } catch {
      throw new Error("Gemini returned marketplace data that was not valid JSON.");
    }

    const capturedAt = new Date().toISOString();
    return (parsed.listings ?? [])
      .filter((item) => this.isUsableListing(item))
      .slice(0, limit)
      .map((item, index) => ({
        id: `gemini-web-${index}-${this.hash(item.url)}`,
        source: item.source.trim(),
        title: item.title.trim(),
        price: item.price,
        currency: item.currency.trim().toUpperCase() || "NGN",
        location: item.location.trim() || location,
        condition: item.condition?.trim() || undefined,
        url: this.normalizeUrl(item.url),
        imageUrls: [],
        capturedAt,
      }));
  }

  async getListing(_id: string): Promise<MarketplaceListing | null> {
    return null;
  }

  private isUsableListing(item: GeminiListing | undefined): item is GeminiListing {
    if (!item) return false;
    if (typeof item.title !== "string" || item.title.trim().length < 3) return false;
    if (!Number.isFinite(item.price) || item.price <= 0) return false;
    if (typeof item.currency !== "string" || item.currency.trim().length === 0) return false;
    if (typeof item.source !== "string" || item.source.trim().length === 0) return false;
    if (typeof item.location !== "string" || item.location.trim().length === 0) return false;
    if (typeof item.url !== "string" || !/^https?:\/\//i.test(item.url)) return false;

    try {
      const url = new URL(item.url);
      if (url.hostname === "google.com" || url.hostname.endsWith(".google.com")) return false;
      if (url.hostname === "bing.com" || url.hostname.endsWith(".bing.com")) return false;
      if (url.pathname === "/" || url.pathname === "") return false;
      if (/\/(search|results|category|categories|blog|news)(\/|$)/i.test(url.pathname)) return false;
      return true;
    } catch {
      return false;
    }
  }

  private normalizeUrl(value: string): string {
    const url = new URL(value.trim());
    url.hash = "";
    return url.toString();
  }

  private hash(value: string): string {
    let hash = 0;
    for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) | 0;
    return Math.abs(hash).toString(36);
  }
}
