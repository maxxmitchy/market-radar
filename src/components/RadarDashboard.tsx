import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, MapPin, TrendingUp, ShieldCheck } from "lucide-react";
import { demoOpportunities } from "../radar/demo";

const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });

export function RadarDashboard() {
  const [query, setQuery] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [location, setLocation] = useState("Lagos, Nigeria");

  const opportunities = useMemo(() => demoOpportunities.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && item.score >= minScore;
  }), [query, minScore]);

  const totalValue = opportunities.reduce((sum, item) => sum + item.estimatedValue - item.price, 0);

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
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What are you looking for?" className="w-full bg-transparent outline-none placeholder:text-slate-400" />
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
              <MapPin size={18} className="text-slate-400" />
              <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent outline-none" />
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
              <SlidersHorizontal size={18} className="text-slate-400" />
              <select value={minScore} onChange={(e) => setMinScore(Number(e.target.value))} className="w-full bg-transparent outline-none">
                <option value={0}>Any score</option><option value={60}>60+ score</option><option value={70}>70+ score</option><option value={80}>80+ score</option>
              </select>
            </label>
            <button className="rounded-2xl bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800">Scan</button>
          </div>
        </section>

        <div className="mb-4 mt-10 flex items-center justify-between">
          <div><h2 className="text-xl font-bold">Top opportunities</h2><p className="text-sm text-slate-500">Ranked by estimated upside and confidence</p></div>
          <span className="text-sm text-slate-500">{opportunities.length} results</span>
        </div>

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
                <span className={`inline-flex items-center gap-1.5 font-semibold ${item.risk === "low" ? "text-emerald-600" : "text-amber-600"}`}><ShieldCheck size={16} /> {item.risk} risk</span>
                <button className="font-semibold text-indigo-600 hover:text-indigo-800">Inspect opportunity →</button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-slate-50 p-3"><div className="text-xs text-slate-500">{label}</div><div className="mt-1 truncate text-sm font-bold">{value}</div></div>;
}
