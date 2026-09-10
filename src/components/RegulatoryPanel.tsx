import { FileCheck2, ShieldAlert, X } from "lucide-react";
import { inspectRegulatoryDefinitions, regulatorySummary } from "../intelligence/regulatory-engine.js";

interface RegulatoryPanelProps { onClose: () => void; }

export function RegulatoryPanel({ onClose }: RegulatoryPanelProps) {
  const summary = regulatorySummary();
  const inspections = inspectRegulatoryDefinitions();

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="mx-auto my-8 max-w-5xl rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 p-6 md:p-8">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-blue-600">REGULATORY BLUEPRINT</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Regulatory classification comes before claims</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">This layer records the intended regulatory pathway, classification, permitted and prohibited claims, labeling requirements, and accountable review. It does not assert a classification or regulatory approval that has not been established.</p>
          </div>
          <button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close regulatory panel"><X size={18} /></button>
        </div>

        <div className="grid gap-3 p-6 md:grid-cols-4 md:p-8">
          <Metric label="Definitions" value={summary.definitions} />
          <Metric label="Approved" value={summary.approved} />
          <Metric label="Classified" value={summary.classified} />
          <Metric label="Blocked" value={summary.blocked} />
        </div>

        <div className="mx-6 mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 md:mx-8 md:mb-8">
          <div className="flex gap-3"><ShieldAlert className="mt-0.5 shrink-0 text-blue-700" size={19} /><div><p className="font-black text-blue-950">Current control point: regulatory status is unresolved.</p><p className="mt-1 text-sm leading-6 text-blue-900">The product concept should not be treated as market-ready until classification, intended use, claims, labeling, and accountable regulatory review are established.</p></div></div>
        </div>

        {inspections.map(({ definition, approved, blockedBy }) => (
          <div key={definition.id} className="border-t border-slate-200 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{definition.id} · v{definition.version}</p><h3 className="mt-1 text-lg font-black text-slate-950">Regulatory contract</h3></div><span className={`rounded-full px-3 py-1.5 text-xs font-black ${approved ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{approved ? "APPROVED" : "BLOCKED"}</span></div>
            <div className="mt-5 grid gap-3 md:grid-cols-3"><Gate label="Jurisdiction" value={definition.jurisdiction} /><Gate label="Classification" value={definition.productClassification ?? "Not established"} /><Gate label="Intended use" value={definition.intendedUse ?? "Not established"} /></div>
            <div className="mt-5 grid gap-5 md:grid-cols-3"><ListBlock title="Permitted claims" items={definition.permittedClaims} /><ListBlock title="Prohibited claims" items={definition.prohibitedClaims} /><ListBlock title="Labeling" items={definition.labelingRequirements} /></div>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2"><FileCheck2 size={17} className="text-slate-600" /><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Blocking gates</p></div><div className="mt-2 flex flex-wrap gap-2">{blockedBy.map((item) => <span key={item} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">{item}</span>)}</div></div>
            <div className="mt-5"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Unresolved questions</p><ul className="mt-2 space-y-1 text-sm leading-5 text-slate-600">{definition.unresolvedQuestions.map((q) => <li key={q}>• {q}</li>)}</ul></div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Metric({ label, value }: { label: string; value: number }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{value}</p></div>; }
function Gate({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-slate-200 bg-white p-3"><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-sm font-bold text-slate-800">{value}</p></div>; }
function ListBlock({ title, items }: { title: string; items: string[] }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{title}</p><ul className="mt-2 space-y-1 text-sm leading-5 text-slate-700">{items.length ? items.map((item) => <li key={item}>• {item}</li>) : <li>Not defined</li>}</ul></div>; }
