import type { MarketplaceListing } from "../domain/listing.js";

export interface ListingSearch {
  query: string;
  location?: string;
  latitude: number;
  longitude: number;
  radiusKm?: number;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  limit?: number;
}

export interface MarketplaceConnector {
  readonly name: string;
  searchListings(search: ListingSearch): Promise<MarketplaceListing[]>;
  getListing(id: string): Promise<MarketplaceListing | null>;
}
