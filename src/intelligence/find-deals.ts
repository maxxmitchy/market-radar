import type { MarketplaceConnector, ListingSearch } from "../connectors/marketplace.js";
import type { Opportunity } from "../domain/listing.js";
import { scoreOpportunity } from "./scoring.js";
import { comparableMedianValuator } from "./valuator.js";

export interface FindDealsOptions {
  search: ListingSearch;
  resaleCosts?: number;
  minScore?: number;
}

/**
 * Search first, then value each listing against the other listings returned
 * by the same search. A listing is never used as its own comparable.
 */
export async function findDeals(
  connector: MarketplaceConnector,
  options: FindDealsOptions
): Promise<Opportunity[]> {
  const listings = await connector.searchListings(options.search);

  return listings
    .map((listing, index) => {
      const comparables = listings
        .filter((_, comparableIndex) => comparableIndex !== index)
        .map((item) => ({ price: item.price, currency: item.currency }));

      const valuation = comparableMedianValuator.estimate(listing, comparables);

      return scoreOpportunity(listing, {
        valuation,
        resaleCosts: options.resaleCosts,
      });
    })
    .filter((opportunity) => opportunity.score >= (options.minScore ?? 0))
    .sort((a, b) => b.score - a.score);
}
