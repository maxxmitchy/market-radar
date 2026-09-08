export type Currency = "NGN" | "USD" | "GBP" | "EUR" | string;

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface MarketplaceListing {
  id: string;
  source: string;
  title: string;
  description?: string;
  price: number;
  currency: Currency;
  location?: string;
  coordinates?: GeoPoint;
  url?: string;
  imageUrls: string[];
  category?: string;
  condition?: string;
  sellerName?: string;
  sellerId?: string;
  listedAt?: string;
  capturedAt: string;
  raw?: unknown;
}

export interface Valuation {
  estimatedValue: number;
  currency: Currency;
  confidence: number;
  method: string;
}

export interface Opportunity {
  listing: MarketplaceListing;
  valuation: Valuation;
  spreadAmount: number;
  spreadPercent: number;
  score: number;
  risk: "low" | "medium" | "high";
  reasons: string[];
}
