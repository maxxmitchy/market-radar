import { Boxes, CheckCircle2, ClipboardCheck, GitBranch, PackageCheck, ShieldAlert, X } from "lucide-react";
import { inspectFulfillmentDefinitions, fulfillmentSummary } from "../intelligence/fulfillment-engine.js";

interface FulfillmentPanelProps { onClose: () => void; }

export function FulfillmentPanel({ onClose }: FulfillmentPanelProps) {
  const summary = fulfillmentSummary();
  const inspections = inspectFulfillmentDefinitions();

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
      <div className="mx-auto my-3 max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl sm:my-8 sm:rounded-[2rem]">
        <header className="flex items-start justify-between gap-5 border-b border-slate-200 p-5 sm:p-8">
          <div>
            <p className="text-[11px] font-black tracking-[0.2em] text-cyan-700">FULFILLMENT BLUEPRINT</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Turn an approved design into a controlled handoff</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Fulfillment begins only after the governed pack exists. This layer defines allocation, assembly, handoff and traceability without pretending that the physical operating system has already been chosen.</p>
          </div>
          <button onClick={onClose} className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close fulfillment blueprint"><X size={18} /></button>
        </header>

        <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-8">
          <Metric label="DEFINITIONS" value={summary.definitions} />
          <Metric label="READY" value={summary.ready} />
          <Metric label="BLOCKED" value={summary.blocked} />
        </div>

        <div className="mx-5 mb-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 sm:mx-8 sm:mb-8">
          <div className="flex gap-3"><ShieldAlert className="mt-0.5 shrink-0 text-cyan-700" size={19} /><div><p className="font-black text-cyan-950">Control point: fulfillment cannot rewrite the product.</p><p className="mt-1 text-sm leading-6 text-cyan-900">If a formulation, generated pack, safety control, regulatory requirement or quality decision is not valid, the operational path stops rather than substituting an unapproved alternative.</p></div></div>
        </div>

        {inspections.map(({ definition, ready, blockedBy }) => (
          <section key={definition.id} className="border-t border-slate-200 p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{definition.id} · v{definition.version}</p><h3 className="mt-1 text-lg font-black text-slate-950">Fulfillment contract</h3></div><span className={`rounded-full px-3 py-1.5 text-xs font-black ${ready ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{ready ? "READY" : "BLOCKED"}</span></div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <Step number="01" title="ALLOCATE" icon={GitBranch} items={definition.allocationRequirements} />
              <Step number="02" title="ASSEMBLE" icon={Boxes} items={definition.assemblyRequirements} />
              <Step number="03" title="HANDOFF" icon={PackageCheck} items={definition.handoffRequirements} />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <ListBlock title="Traceability" icon={ClipboardCheck} items={definition.traceabilityRequirements} />
              <ListBlock title="Exception rules" icon={ShieldAlert} items={definition.exceptionRules} />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Blocking gates</p><div className="mt-2 flex flex-wrap gap-2">{blockedBy.map((item) => <span key={item} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">{item}</span>)}</div></div>

            <div className="mt-5"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Unresolved questions</p><ul className="mt-2 space-y-2 text-sm leading-5 text-slate-600">{definition.unresolvedQuestions.map((q) => <li key={q}>• {q}</li>)}</ul></div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{value}</p></div>; }
function Step({ number, title, icon: Icon, items }: { number: string; title: string; icon: typeof CheckCircle2; items: string[] }) { return <article className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-center justify-between"><span className="text-[10px] font-black tracking-widest text-cyan-700">{number}</span><Icon size={17} className="text-slate-400" /></div><h4 className="mt-3 text-sm font-black text-slate-900">{title}</h4><ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600">{items.map((item) => <li key={item}>• {item}</li>)}</ul></article>; }
function ListBlock({ title, icon: Icon, items }: { title: string; icon: typeof ClipboardCheck; items: string[] }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2"><Icon size={16} className="text-slate-500" /><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{title}</p></div><ul className="mt-3 space-y-2 text-sm leading-5 text-slate-700">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>; }
