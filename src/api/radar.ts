export interface RadarOpportunity {
  id: string;
  title: string;
  price: number;
  estimatedValue: number;
  spreadPercent: number;
  score: number;
  risk: "low" | "medium" | "high";
  location: string;
  condition: string;
}

interface RadarResponse {
  source: string;
  generatedAt: string;
  opportunities: Array<{
    listing: {
      id: string;
      title: string;
      price: number;
      location?: string;
      condition?: string;
    };
    valuation: { estimatedValue: number };
    spreadPercent: number;
    score: number;
    risk: "low" | "medium" | "high";
  }>;
}

export async function scanRadar(params: {
  query: string;
  minScore: number;
}): Promise<RadarOpportunity[]> {
  const search = new URLSearchParams({
    query: params.query,
    minScore: String(params.minScore),
    limit: "20",
  });

  const response = await fetch(`/api/opportunities?${search.toString()}`);
  if (!response.ok) throw new Error("Radar scan failed.");

  const data = (await response.json()) as RadarResponse;
  return data.opportunities.map((item) => ({
    id: item.listing.id,
    title: item.listing.title,
    price: item.listing.price,
    estimatedValue: item.valuation.estimatedValue,
    spreadPercent: item.spreadPercent,
    score: item.score,
    risk: item.risk,
    location: item.listing.location ?? "Unknown location",
    condition: item.listing.condition ?? "Condition not provided",
  }));
}
