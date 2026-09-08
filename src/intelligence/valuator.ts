import type { MarketplaceListing, Valuation } from "../domain/listing.js";

export interface Comparable {
  price: number;
  currency: string;
}

export interface Valuator {
  estimate(listing: MarketplaceListing, comparables: Comparable[]): Valuation;
}

/**
 * Baseline valuation model for the MVP. It intentionally uses explainable
 * comparable pricing; an ML/LLM-assisted model can be added later without
 * changing the domain contract.
 */
export const comparableMedianValuator: Valuator = {
  estimate(listing, comparables) {
    const compatible = comparables
      .filter((item) => item.currency === listing.currency)
      .map((item) => item.price)
      .filter((price) => Number.isFinite(price) && price > 0)
      .sort((a, b) => a - b);

    if (compatible.length === 0) {
      return {
        estimatedValue: listing.price,
        currency: listing.currency,
        confidence: 20,
        method: "listing-price fallback",
      };
    }

    const middle = Math.floor(compatible.length / 2);
    const median =
      compatible.length % 2 === 1
        ? compatible[middle]
        : ((compatible[middle - 1] ?? 0) + (compatible[middle] ?? 0)) / 2;

    const confidence = Math.min(95, 35 + compatible.length * 5);

    return {
      estimatedValue: median,
      currency: listing.currency,
      confidence,
      method: `median of ${compatible.length} comparable listings`,
    };
  },
};
