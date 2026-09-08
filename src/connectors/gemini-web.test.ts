import assert from "node:assert/strict";
import test from "node:test";
import { GeminiWebMarketplaceConnector } from "./gemini-web.js";

test("Gemini web connector rejects malformed listing prices and URLs", async () => {
  const connector = new GeminiWebMarketplaceConnector("test-key");
  const client = connector as unknown as { ai: { models: { generateContent: () => Promise<{ text: string }> } } };
  client.ai.models.generateContent = async () => ({ text: JSON.stringify({ listings: [
    { title: "Good listing", price: 100000, currency: "NGN", url: "https://example.com/item/1", source: "Example", location: "Lagos" },
    { title: "Bad price", price: 0, currency: "NGN", url: "https://example.com/item/2", source: "Example", location: "Lagos" },
    { title: "Bad URL", price: 90000, currency: "NGN", url: "not-a-url", source: "Example", location: "Lagos" },
  ] }) });
  const listings = await connector.searchListings({ query: "iPhone 15 Pro", latitude: 6.5244, longitude: 3.3792, limit: 10 });
  assert.equal(listings.length, 1);
  assert.equal(listings[0].price, 100000);
  assert.equal(listings[0].url, "https://example.com/item/1");
});
