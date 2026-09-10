import { Ban, CheckCircle2, GitBranch, ShieldAlert, SlidersHorizontal, X } from "lucide-react";
import { inspectPersonalizationDefinitions, personalizationSummary } from "../intelligence/personalization-engine.js";

interface PersonalizationPanelProps { onClose: () => void; }

export function PersonalizationPanel({ onClose }: PersonalizationPanelProps) {
  const summary = personalizationSummary();
  const inspections = inspectPersonalizationDefinitions();

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
      <div className="mx-auto my-3 max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl sm:my-8 sm:rounded-[2rem]">
        <div className="flex items-start justify-between gap-5 border-b border-slate-200 p-5 sm:p-8">
          <div>
            <p className="text-[11px] font-black tracking-[0.2em] text-violet-600">PERSONALIZATION BLUEPRINT</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Personalize the experience without rewriting the product</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Personalization sits downstream of approved program and formulation decisions. It can adapt permitted experience details, but it cannot silently create a new formulation, diagnosis or treatment decision.</p>
          </div>
          <button onClick={onClose} className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close personalization panel"><X size={18} /></button>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-8">
          <Metric label="DEFINITIONS" value={summary.definitions} />
          <Metric label="APPROVED" value={summary.approved} />
          <Metric label="BLOCKED" value={summary.blocked} />
        </div>

        <div className="mx-5 mb-5 rounded-2xl border border-violet-200 bg-violet-50 p-5 sm:mx-8 sm:mb-8">
          <div className="flex gap-3"><ShieldAlert className="mt-0.5 shrink-0 text-violet-700" size={19} /><div><p className="font-black text-violet-950">Design principle: personalization is a bounded layer.</p><p className="mt-1 text-sm leading-6 text-violet-900">The system should know exactly what may change, what may never change automatically, and when a request must return to an accountable reviewer.</p></div></div>
        </div>

        {inspections.map(({ definition, approved, blockedBy }) => (
          <div key={definition.id} className="border-t border-slate-200 p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{definition.id} · v{definition.version}</p><h3 className="mt-1 text-lg font-black text-slate-950">Personalization contract</h3></div><span className={`rounded-full px-3 py-1.5 text-xs font-black ${approved ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{approved ? "APPROVED" : "BLOCKED"}</span></div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Gate label="Program" value={definition.programId ?? "Not linked"} icon={GitBranch} />
              <Gate label="Formulation" value={definition.formulationId ?? "Not linked"} icon={SlidersHorizontal} />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <ListBlock title="Signals the system may use" items={definition.permittedSignals} icon={CheckCircle2} tone="good" />
              <ListBlock title="Changes the system may make" items={definition.permittedChanges} icon={CheckCircle2} tone="good" />
              <ListBlock title="Changes the system must not make automatically" items={definition.prohibitedChanges} icon={Ban} tone="blocked" />
              <ListBlock title="Requests that require review" items={definition.reviewTriggers} icon={ShieldAlert} tone="review" />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Data requirements</p><ul className="mt-2 space-y-2 text-sm leading-5 text-slate-700">{definition.dataRequirements.map((item) => <li key={item}>• {item}</li>)}</ul></div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2"><ShieldAlert size={17} className="text-slate-600" /><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Blocking gates</p></div><div className="mt-2 flex flex-wrap gap-2">{blockedBy.map((item) => <span key={item} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">{item}</span>)}</div></div>

            <div className="mt-5"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Unresolved questions</p><ul className="mt-2 space-y-2 text-sm leading-5 text-slate-600">{definition.unresolvedQuestions.map((q) => <li key={q}>• {q}</li>)}</ul></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{value}</p></div>; }
function Gate({ label, value, icon: Icon }: { label: string; value: string; icon: typeof GitBranch }) { return <div className="rounded-xl border border-slate-200 bg-white p-3"><div className="flex items-center gap-2 text-slate-400"><Icon size={15}/><p className="text-[10px] font-black uppercase tracking-wider">{label}</p></div><p className="mt-1 text-sm font-bold text-slate-800">{value}</p></div>; }
function ListBlock({ title, items, icon: Icon, tone }: { title: string; items: string[]; icon: typeof CheckCircle2; tone: "good" | "blocked" | "review" }) {
  const iconClass = tone === "blocked" ? "text-rose-600" : tone === "review" ? "text-amber-600" : "text-emerald-600";
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-start gap-2"><Icon size={16} className={`mt-0.5 shrink-0 ${iconClass}`} /><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{title}</p></div><ul className="mt-3 space-y-2 text-sm leading-5 text-slate-700">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>;
}
