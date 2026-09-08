import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { MockMarketplaceConnector } from "../src/connectors/mock.js";
import { createFacebookRuntime } from "../src/connectors/facebook/runtime.js";
import { GeminiWebMarketplaceConnector } from "../src/connectors/gemini-web.js";
import { findDeals } from "../src/intelligence/find-deals.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const facebookRuntime = createFacebookRuntime(process.env);
const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
const geminiConfigured = Boolean(geminiApiKey);
const geminiConnector = geminiConfigured ? new GeminiWebMarketplaceConnector(geminiApiKey!) : null;
const selectedProvider = process.env.MARKET_RADAR_PROVIDER ?? (geminiConfigured ? "gemini-web" : "mock");

const provider = selectedProvider === "facebook"
  ? facebookRuntime
  : selectedProvider === "gemini-web" && geminiConnector
    ? { provider: "gemini-web" as const, connector: geminiConnector, configured: true }
    : selectedProvider === "gemini-web"
      ? { provider: "gemini-web" as const, connector: new MockMarketplaceConnector(), configured: false }
      : {
          provider: "mock" as const,
          connector: new MockMarketplaceConnector(),
          configured: true,
        };

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "market-radar",
    provider: provider.provider,
    configured: provider.configured,
  });
});

app.get("/api/opportunities", async (req, res) => {
  if (!provider.configured) {
    res.status(503).json({ error: "The selected marketplace provider is not configured." });
    return;
  }

  try {
    const query = typeof req.query.query === "string" ? req.query.query : "";
    const minScore = Number(req.query.minScore ?? 0);
    const limit = Number(req.query.limit ?? 20);

    const opportunities = await findDeals(provider.connector, {
      search: {
        query,
        latitude: Number(req.query.latitude ?? 6.5244),
        longitude: Number(req.query.longitude ?? 3.3792),
        radiusKm: Number(req.query.radiusKm ?? 50),
        limit: Number.isFinite(limit) ? Math.max(1, Math.min(limit, 100)) : 20,
      },
      minScore: Number.isFinite(minScore) ? Math.max(0, Math.min(minScore, 100)) : 0,
    });

    res.json({
      source: provider.connector.name,
      generatedAt: new Date().toISOString(),
      opportunities,
    });
  } catch (error) {
    console.error("Radar API error", error);
    res.status(500).json({ error: "Unable to scan marketplace inventory." });
  }
});

async function start() {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    app.use(express.static(path.join(root, "dist")));
    app.get("*", (_req, res) => res.sendFile(path.join(root, "dist", "index.html")));
  } else {
    const vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Market Radar running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
