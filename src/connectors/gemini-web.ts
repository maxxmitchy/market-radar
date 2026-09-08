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
        },
        required: ["title", "price", "currency", "url", "source", "location"],
      },
    },
  },
  required: ["listings"],
};

export class GeminiWebMarketplaceConnector implements MarketplaceConnector {
  readonly name = "gemini-web";
  private readonly ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async searchListings(search: ListingSearch): Promise<MarketplaceListing[]> {
    const query = search.query.trim() || "used electronics";
    const limit = Math.max(1, Math.min(search.limit ?? 20, 30));
    const prompt = [
      "Find publicly accessible marketplace or classified listings matching this product query.",
      `Product: ${query}`,
      "Location: Lagos, Nigeria and nearby Nigerian listings.",
      `Return at most ${limit} verified listing pages.`,
      "Only include pages with a credible asking price and product title.",
      "Do not invent listings, prices, sellers, dates, or URLs.",
      "Return canonical public listing URLs, not search URLs or articles.",
      "If there are fewer verified listings, return fewer.",
    ].join("\n");

    const response = await this.ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseFormat: { text: { mimeType: "application/json", schema } },
      },
    });

    const parsed = JSON.parse(response.text?.trim() || "{\"listings\":[]}") as {
      listings?: Array<{ title: string; price: number; currency: string; url: string; source: string; location: string }>;
    };
    const capturedAt = new Date().toISOString();

    return (parsed.listings ?? []).filter((item) =>
      item && Number.isFinite(item.price) && item.price > 0 && /^https?:\/\//i.test(item.url),
    ).slice(0, limit).map((item, index) => ({
      id: `gemini-web-${index}-${this.hash(item.url)}`,
      source: item.source,
      title: item.title.trim(),
      price: item.price,
      currency: item.currency.trim(),
      location: item.location.trim(),
      url: item.url.trim(),
      imageUrls: [],
      capturedAt,
    }));
  }

  async getListing(_id: string): Promise<MarketplaceListing | null> {
    return null;
  }

  private hash(value: string): string {
    let hash = 0;
    for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) | 0;
    return Math.abs(hash).toString(36);
  }
}
