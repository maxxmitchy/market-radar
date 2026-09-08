export interface RadarOpportunity {
  id: string;
  title: string;
  price: number;
  estimatedValue: number;
  spreadAmount: number;
  spreadPercent: number;
  score: number;
  risk: "low" | "medium" | "high";
  confidence: number;
  valuationMethod: string;
  reasons: string[];
  location: string;
  condition: string;
  source: string;
  url?: string;
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
      url?: string;
    };
    valuation: {
      estimatedValue: number;
      confidence: number;
      method: string;
    };
    spreadAmount: number;
    spreadPercent: number;
    score: number;
    risk: "low" | "medium" | "high";
    reasons: string[];
  }>;
}

interface RadarError {
  error?: string;
  code?: string;
  detail?: string;
}

export interface RadarScan {
  source: string;
  generatedAt: string;
  opportunities: RadarOpportunity[];
}

export async function scanRadar(params: {
  query: string;
  location: string;
  minScore: number;
}): Promise<RadarScan> {
  const search = new URLSearchParams({
    query: params.query,
    location: params.location,
    minScore: String(params.minScore),
    limit: "20",
  });

  const response = await fetch(`/api/opportunities?${search.toString()}`);
  if (!response.ok) {
    let detail = "Radar scan failed.";
    try {
      const body = (await response.json()) as RadarError;
      detail = [body.error, body.detail].filter(Boolean).join(" ") || detail;
    } catch {
      // Keep the generic error when the server did not return JSON.
    }
    throw new Error(detail);
  }

  const data = (await response.json()) as RadarResponse;
  return {
    source: data.source,
    generatedAt: data.generatedAt,
    opportunities: data.opportunities.map((item) => ({
      id: item.listing.id,
      title: item.listing.title,
      price: item.listing.price,
      estimatedValue: item.valuation.estimatedValue,
      spreadAmount: item.spreadAmount,
      spreadPercent: item.spreadPercent,
      score: item.score,
      risk: item.risk,
      confidence: item.valuation.confidence,
      valuationMethod: item.valuation.method,
      reasons: item.reasons,
      location: item.listing.location ?? "Unknown location",
      condition: item.listing.condition ?? "Condition not provided",
      source: data.source,
      url: item.listing.url,
    })),
  };
}
