import type { MarketplaceConnector, ListingSearch } from "../connectors/marketplace.js";
import type { Opportunity, Valuation } from "../domain/listing.js";
import { scoreOpportunity } from "./scoring.js";
import { estimateFromComparables } from "./valuator.js";

export interface FindDealsOptions {
  search: ListingSearch;
  maxResaleCosts?: number;
  minScore?: number;
}

export async function findDeals(
  connector: MarketplaceConnector,
  options: FindDealsOptions
): Promise<Opportunity[]> {
  const listings = await connector.searchListings(options.search);
  const valuation = estimateFromComparables(listings);

  return listings
    .map((listing) => {
      const itemValuation: Valuation = {
        ...valuation,
        currency: listing.currency,
      };
      return scoreOpportunity(listing, {
        valuation: itemValuation,
        resaleCosts: options.maxResaleCosts,
      });
    })
    .filter((opportunity) => opportunity.score >= (options.minScore ?? 0))
    .sort((a, b) => b.score - a.score);
}
