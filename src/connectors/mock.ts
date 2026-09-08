import type { MarketplaceConnector, ListingSearch } from "./marketplace.js";
import type { MarketplaceListing } from "../domain/listing.js";

/** Local connector used for development before a live provider is attached. */
export class MockMarketplaceConnector implements MarketplaceConnector {
  readonly name = "mock";

  private readonly listings: MarketplaceListing[] = [
    {
      id: "mock-iphone-1",
      source: "mock",
      title: "iPhone 15 Pro 256GB",
      description: "Example listing for local development.",
      price: 720_000,
      currency: "NGN",
      location: "Lekki, Lagos",
      coordinates: { latitude: 6.4488, longitude: 3.4723 },
      imageUrls: [],
      category: "phones",
      condition: "used-good",
      sellerName: "Example Seller",
      capturedAt: new Date().toISOString(),
    },
    {
      id: "mock-iphone-2",
      source: "mock",
      title: "iPhone 15 Pro 256GB",
      description: "Comparable example listing.",
      price: 890_000,
      currency: "NGN",
      location: "Ikeja, Lagos",
      coordinates: { latitude: 6.6018, longitude: 3.3515 },
      imageUrls: [],
      category: "phones",
      condition: "used-good",
      sellerName: "Comparable Seller",
      capturedAt: new Date().toISOString(),
    },
  ];

  async searchListings(search: ListingSearch): Promise<MarketplaceListing[]> {
    const query = search.query.trim().toLowerCase();
    const limit = Math.max(1, Math.min(search.limit ?? 20, 100));

    return this.listings
      .filter((listing) => {
        const matchesQuery = !query || listing.title.toLowerCase().includes(query);
        const matchesMin = search.minPrice === undefined || listing.price >= search.minPrice;
        const matchesMax = search.maxPrice === undefined || listing.price <= search.maxPrice;
        const matchesCategory = !search.category || listing.category === search.category;
        return matchesQuery && matchesMin && matchesMax && matchesCategory;
      })
      .slice(0, limit);
  }

  async getListing(id: string): Promise<MarketplaceListing | null> {
    return this.listings.find((listing) => listing.id === id) ?? null;
  }
}
