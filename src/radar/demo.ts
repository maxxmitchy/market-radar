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

export const demoOpportunities: RadarOpportunity[] = [
  { id: "demo-1", title: "iPhone 15 Pro 256GB", price: 720000, estimatedValue: 890000, spreadPercent: 23.6, score: 82, risk: "low", location: "Lekki, Lagos", condition: "Used · Good" },
  { id: "demo-2", title: "PlayStation 5 Slim", price: 610000, estimatedValue: 735000, spreadPercent: 20.5, score: 76, risk: "low", location: "Ikeja, Lagos", condition: "Used · Excellent" },
  { id: "demo-3", title: "MacBook Air M2 13-inch", price: 950000, estimatedValue: 1_080_000, spreadPercent: 13.7, score: 68, risk: "medium", location: "Yaba, Lagos", condition: "Used · Good" },
  { id: "demo-4", title: "Sony WH-1000XM5", price: 285000, estimatedValue: 340000, spreadPercent: 19.3, score: 64, risk: "medium", location: "Victoria Island, Lagos", condition: "Used · Like new" },
];
