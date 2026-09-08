import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, MapPin, TrendingUp, ShieldCheck, RefreshCw, X, CheckCircle2, BarChart3 } from "lucide-react";
import { scanRadar, type RadarOpportunity } from "../api/radar";

const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });

export function RadarDashboard() {
  const [query, setQuery] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [location, setLocation] = useState("Lagos, Nigeria");
  const [opportunities, setOpportunities] = useState<RadarOpportunity[]>([]);
  const [source, setSource] = useState("unknown");
  const [selected, setSelected] = useState<RadarOpportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runScan = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await scanRadar({ query, location, minScore });
      setSource(result.source);
      setOpportunities(result.opportunities);
    } catch (scanError) {
      console.error(scanError);
      setError(scanError instanceof Error ? scanError.message : "The radar could not complete this scan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void runScan();
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const totalValue = useMemo(
    () => opportunities.reduce((sum, item) => sum + item.estimatedValue - item.price, 0),
    [opportunities],
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Market Radar</p>
            <h1 className="text-4xl font-bold tracking-tight">Find the deals hiding in plain sight.</h1>
            <p className="mt-3 max-w-2xl text-slate-600">Search marketplace inventory, estimate fair value, and focus your attention on listings with an explainable resale edge.</p>
          </div>
          <div className="hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:block">
            <div className="flex items-center gap-2 text-sm text-slate-500"><TrendingUp size={16} /> Potential spread</div>
            <div className="mt-1 text-2xl font-bold">{money.format(totalValue)}</div>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_220px_160px_auto]">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
              <Search size={19} className="text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && void runScan()} placeholder="What are you looking for?" className="w-full bg-transparent outline-none placeholder:text-slate-400" />
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
              <MapPin size={18} className="text-slate-400" />
              <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent outline-none" aria-label="Market area" />
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
              <SlidersHorizontal size={18} className="text-slate-400" />
              <select value={minScore} onChange={(e) => setMinScore(Number(e.target.value))} className="w-full bg-transparent outline-none">
                <option value={0}>Any score</option><option value={60}>60+ score</option><option value={70}>70+ score</option><option value={80}>80+ score</option>
              </select>
            </label>
            <button onClick={() => void runScan()} disabled={loading} className="flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70">
              {loading ? <RefreshCw size={17} className="animate-spin" /> : null}
              {loading ? "Scanning" : "Scan"}
            </button>
          </div>
          <p className="mt-3 px-1 text-xs text-slate-400">Radar provider: <span className="font-semibold text-slate-500">{source}</span> · {location}</p>
        </section>

        <div className="mb-4 mt-10 flex items-center justify-between">
          <div><h2 className="text-xl font-bold">Top opportunities</h2><p className="text-sm text-slate-500">Ranked by estimated upside and confidence</p></div>
          <span className="text-sm text-slate-500">{loading ? "Scanning…" : `${opportunities.length} results`}</span>
        </div>

        {error ? (
          <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
            <p className="font-semibold">Scan unavailable</p>
            <p className="mt-1 text-sm">{error}</p>
          </section>
        ) : opportunities.length === 0 && !loading ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-bold">No opportunities found</h3>
            <p className="mt-2 text-sm text-slate-500">Try a broader search or lower the minimum score.</p>
          </section>
        ) : (
          <section className="grid gap-4 md:grid-cols-2">
            {opportunities.map((item) => (
              <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div><h3 className="text-lg font-bold">{item.title}</h3><p className="mt-1 text-sm text-slate-500">{item.condition} · {item.location}</p></div>
                  <div className="rounded-2xl bg-slate-100 px-3 py-2 text-center"><div className="text-xl font-bold">{item.score}</div><div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">score</div></div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Metric label="Asking" value={money.format(item.price)} />
                  <Metric label="Fair value" value={money.format(item.estimatedValue)} />
                  <Metric label="Spread" value={`+${item.spreadPercent.toFixed(1)}%`} />
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                  <span className={`inline-flex items-center gap-1.5 font-semibold ${item.risk === "low" ? "text-emerald-600" : item.risk === "medium" ? "text-amber-600" : "text-rose-600"}`}><ShieldCheck size={16} /> {item.risk} risk</span>
                  <button onClick={() => setSelected(item)} className="font-semibold text-indigo-600 hover:text-indigo-800">Inspect opportunity →</button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>

      {selected ? <OpportunityInspector opportunity={selected} onClose={() => setSelected(null)} /> : null}
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-slate-50 p-3"><div className="text-xs text-slate-500">{label}</div><div className="mt-1 truncate text-sm font-bold">{value}</div></div>;
}

function OpportunityInspector({ opportunity, onClose }: { opportunity: RadarOpportunity; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="ml-auto flex h-full w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl" aria-label="Opportunity details">
        <div className="flex items-start justify-between border-b border-slate-100 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Opportunity analysis</p>
            <h2 className="mt-2 text-2xl font-bold">{opportunity.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{opportunity.condition} · {opportunity.location}</p>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close inspector"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-3">
            <Metric label="Asking price" value={money.format(opportunity.price)} />
            <Metric label="Estimated fair value" value={money.format(opportunity.estimatedValue)} />
            <Metric label="Potential spread" value={`+${money.format(opportunity.spreadAmount)}`} />
            <Metric label="Opportunity score" value={`${opportunity.score}/100`} />
          </div>

          <section className="mt-6 rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 font-semibold"><BarChart3 size={18} /> Why this scored {opportunity.score}</div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {opportunity.reasons.map((reason) => <li key={reason} className="flex gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-600" />{reason}</li>)}
            </ul>
          </section>

          <section className="mt-4 rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center justify-between"><span className="text-sm text-slate-500">Valuation confidence</span><strong>{opportunity.confidence}%</strong></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-slate-900" style={{ width: `${opportunity.confidence}%` }} /></div>
            <p className="mt-3 text-xs text-slate-500">Method: {opportunity.valuationMethod}</p>
          </section>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 p-4 text-sm">
            <span className="text-slate-500">Risk assessment</span>
            <span className="font-semibold capitalize">{opportunity.risk} risk</span>
          </div>
        </div>

        <div className="border-t border-slate-100 p-6">
          {opportunity.url ? (
            <a href={opportunity.url} target="_blank" rel="noreferrer" className="block rounded-2xl bg-slate-950 px-5 py-3 text-center font-semibold text-white hover:bg-slate-800">Open source listing</a>
          ) : (
            <div className="rounded-2xl bg-slate-50 px-5 py-3 text-center text-sm text-slate-500">Source listing link will appear when live marketplace ingestion is connected.</div>
          )}
          <p className="mt-3 text-center text-xs text-slate-400">Source: {opportunity.source}</p>
        </div>
      </aside>
    </div>
  );
}
