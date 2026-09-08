import type { MarketplaceListing, Opportunity, Valuation } from "../domain/listing.js";

export interface ScoringInput {
  valuation: Valuation;
  resaleCosts?: number;
  riskPenalty?: number;
}

export function scoreOpportunity(
  listing: MarketplaceListing,
  input: ScoringInput
): Opportunity {
  const resaleCosts = Math.max(0, input.resaleCosts ?? 0);
  const riskPenalty = clamp(input.riskPenalty ?? 0, 0, 30);
  const grossSpread = input.valuation.estimatedValue - listing.price;
  const netSpread = grossSpread - resaleCosts;
  const spreadPercent = listing.price > 0 ? (netSpread / listing.price) * 100 : 0;

  const marginScore = clamp(spreadPercent * 1.5, 0, 60);
  const confidenceScore = clamp(input.valuation.confidence, 0, 100) * 0.35;
  const score = Math.round(clamp(marginScore + confidenceScore - riskPenalty, 0, 100));

  const risk: Opportunity["risk"] =
    riskPenalty >= 20 || input.valuation.confidence < 45
      ? "high"
      : riskPenalty >= 10 || input.valuation.confidence < 65
        ? "medium"
        : "low";

  const reasons: string[] = [];
  if (spreadPercent >= 25) reasons.push("strong estimated resale spread");
  else if (spreadPercent >= 10) reasons.push("positive estimated resale spread");
  else if (spreadPercent > 0) reasons.push("small positive estimated spread");
  else reasons.push("no positive spread after estimated costs");

  if (input.valuation.confidence >= 80) reasons.push("high valuation confidence");
  else if (input.valuation.confidence >= 60) reasons.push("moderate valuation confidence");
  else reasons.push("low valuation confidence");

  if (resaleCosts > 0) reasons.push(`estimated costs: ${formatMoney(resaleCosts, listing.currency)}`);

  return {
    listing,
    valuation: input.valuation,
    spreadAmount: netSpread,
    spreadPercent,
    score,
    risk,
    reasons,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function formatMoney(value: number, currency: string): string {
  return `${currency} ${Math.round(value).toLocaleString()}`;
}
