import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { MockMarketplaceConnector } from "../src/connectors/mock.js";
import { createFacebookRuntime } from "../src/connectors/facebook/runtime.js";
import { GeminiWebMarketplaceConnector } from "../src/connectors/gemini-web.js";
import { findDeals } from "../src/intelligence/find-deals.js";
import { recommendStudentProgram } from "../src/intelligence/student-decision.js";
import { requirementSummary, productRequirements } from "../src/intelligence/requirement-engine.js";
import { decisionRules, sortDecisionRules } from "../src/domain/decision-rules.js";
import type { StudentProfile } from "../src/domain/student.js";
import { formulationRegistry } from "../src/formulations/registry.js";
import { isCommerciallyReady } from "../src/domain/formulation.js";

const app = express();
const port = 3000;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const facebookRuntime = createFacebookRuntime(process.env);
const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
const geminiConfigured = Boolean(geminiApiKey);
const geminiConnector = geminiConfigured ? new GeminiWebMarketplaceConnector(geminiApiKey!) : null;
const selectedProvider = process.env.MARKET_RADAR_PROVIDER ?? (geminiConfigured ? "gemini-web" : "mock");
const provider = selectedProvider === "facebook" ? facebookRuntime : selectedProvider === "gemini-web" && geminiConnector ? { provider: "gemini-web" as const, connector: geminiConnector, configured: true } : selectedProvider === "gemini-web" ? { provider: "gemini-web" as const, connector: new MockMarketplaceConnector(), configured: false } : { provider: "mock" as const, connector: new MockMarketplaceConnector(), configured: true };

app.use(express.json({ limit: "32kb" }));
app.get("/api/health", (_req, res) => res.json({ ok: true, service: "careflux-student", mode: "product-architecture-lab", provider: provider.provider, configured: provider.configured }));
app.get("/api/lab/status", (_req, res) => res.json({ requirements: requirementSummary(), formulations: formulationRegistry.map((f) => ({ id: f.id, version: f.version, status: f.status, commerciallyReady: isCommerciallyReady(f) })), decisionRules: { total: decisionRules.length, ordered: sortDecisionRules().map((r) => r.id) }, openQuestions: productRequirements.filter((r) => r.status === "needs-validation" || r.status === "unresolved").map((r) => ({ id: r.id, title: r.title, nextArtifact: r.nextArtifact })) }));
app.get("/api/decision-rules", (_req, res) => res.json({ rules: sortDecisionRules() }));
app.post("/api/student/recommendation", (req, res) => {
  const profile = req.body as Partial<StudentProfile>;
  if (!profile || typeof profile !== "object") return void res.status(400).json({ error: "A student profile is required.", code: "INVALID_PROFILE" });
  const required = ["academicStage", "objective", "duration", "eatingRoutine", "sleepQuality", "pharmacistReviewRequested"] as const;
  if (required.some((field) => profile[field] === undefined)) return void res.status(400).json({ error: "The student profile is incomplete.", code: "INCOMPLETE_PROFILE" });
  res.json({ recommendation: recommendStudentProgram(profile as StudentProfile) });
});
app.get("/api/formulations", (_req, res) => res.json({ formulations: formulationRegistry.map((formulation) => ({ id: formulation.id, version: formulation.version, name: formulation.name, status: formulation.status, commerciallyReady: isCommerciallyReady(formulation), gates: { evidence: formulation.evidence.decision, safety: formulation.safety.decision, regulatory: formulation.regulatory.decision, quality: formulation.quality.decision } })) }));
app.get("/api/opportunities", async (req, res) => {
  if (!provider.configured) return void res.status(503).json({ error: "The selected marketplace provider is not configured.", code: "PROVIDER_NOT_CONFIGURED" });
  try {
    const query = typeof req.query.query === "string" ? req.query.query : "";
    const location = typeof req.query.location === "string" && req.query.location.trim() ? req.query.location.trim() : "Lagos, Nigeria";
    const minScore = Number(req.query.minScore ?? 0), limit = Number(req.query.limit ?? 20);
    const opportunities = await findDeals(provider.connector, { search: { query, location, latitude: Number(req.query.latitude ?? 6.5244), longitude: Number(req.query.longitude ?? 3.3792), radiusKm: Number(req.query.radiusKm ?? 50), limit: Number.isFinite(limit) ? Math.max(1, Math.min(limit, 100)) : 20 }, minScore: Number.isFinite(minScore) ? Math.max(0, Math.min(minScore, 100)) : 0 });
    res.json({ source: provider.connector.name, generatedAt: new Date().toISOString(), opportunities });
  } catch (error) { console.error("Radar API error", error); const message = error instanceof Error ? error.message : "Unknown provider error"; res.status(502).json({ error: "The live marketplace provider could not complete the scan.", code: "PROVIDER_SCAN_FAILED", detail: message.slice(0, 240) }); }
});

async function start() {
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) { app.use(express.static(path.join(root, "dist"))); app.get("*", (_req, res) => res.sendFile(path.join(root, "dist", "index.html"))); }
  else { const vite = await createViteServer({ root, server: { middlewareMode: true }, appType: "spa" }); app.use(vite.middlewares); }
  app.listen(port, "0.0.0.0", () => console.log(`Careflux Student running on http://localhost:${port}`));
}
start().catch((error) => { console.error(error); process.exit(1); });
