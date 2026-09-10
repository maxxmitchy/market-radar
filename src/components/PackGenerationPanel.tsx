import { Boxes, ClipboardCheck, GitBranch, ShieldAlert, Tag, X } from "lucide-react";
import { inspectPackGenerationDefinitions, packGenerationSummary } from "../intelligence/pack-generation-engine.js";

interface PackGenerationPanelProps { onClose: () => void; }

export function PackGenerationPanel({ onClose }: PackGenerationPanelProps) {
  const summary = packGenerationSummary();
  const inspections = inspectPackGenerationDefinitions();

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
      <div className="mx-auto my-3 max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl sm:my-8 sm:rounded-[2rem]">
        <div className="flex items-start justify-between gap-5 border-b border-slate-200 p-5 sm:p-8">
          <div>
            <p className="text-[11px] font-black tracking-[0.2em] text-cyan-600">PACK GENERATION BLUEPRINT</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Turn an approved design into a traceable daily unit</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Pack generation is the controlled bridge between the approved formulation and the daily experience. It defines identity, assembly and traceability without inventing physical manufacturing specifications.</p>
          </div>
          <button onClick={onClose} className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close pack generation panel"><X size={18} /></button>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-8">
          <Metric label="DEFINITIONS" value={summary.definitions} />
          <Metric label="APPROVED" value={summary.approved} />
          <Metric label="BLOCKED" value={summary.blocked} />
        </div>

        <div className="mx-5 mb-5 grid gap-3 md:grid-cols-3 sm:mx-8 sm:mb-8">
          <FlowStep number="01" title="APPROVED FORMULATION" detail="The source of truth for what the unit contains." icon={GitBranch} />
          <FlowStep number="02" title="PACK GENERATION" detail="Applies the controlled pack rules and identity." icon={Boxes} />
          <FlowStep number="03" title="DAILY EXPERIENCE" detail="The student receives an identifiable program day." icon={Tag} />
        </div>

        {inspections.map(({ definition, approved, blockedBy }) => (
          <div key={definition.id} className="border-t border-slate-200 p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{definition.id} · v{definition.version}</p><h3 className="mt-1 text-lg font-black text-slate-950">Pack generation contract</h3></div><span className={`rounded-full px-3 py-1.5 text-xs font-black ${approved ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{approved ? "APPROVED" : "BLOCKED"}</span></div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Gate label="Program" value={definition.programId ?? "Not linked"} />
              <Gate label="Formulation" value={definition.formulationId ?? "Not linked"} />
              <Gate label="Daily experience" value={definition.dailyExperienceId ?? "Not linked"} />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <ListBlock title="Pack identity" items={definition.packIdentityRequirements} />
              <ListBlock title="Assembly rules" items={definition.assemblyRules} />
              <ListBlock title="Traceability" items={definition.traceabilityRequirements} />
              <ListBlock title="What generation must never change" items={definition.prohibitedChanges} />
            </div>

            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-amber-800">Exceptions</p><ul className="mt-2 space-y-2 text-sm leading-5 text-amber-950">{definition.exceptionRules.map((item) => <li key={item}>• {item}</li>)}</ul></div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2"><ShieldAlert size={17} className="text-slate-600" /><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Blocking gates</p></div><div className="mt-2 flex flex-wrap gap-2">{blockedBy.map((item) => <span key={item} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">{item}</span>)}</div></div>

            <div className="mt-5"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Unresolved questions</p><ul className="mt-2 space-y-2 text-sm leading-5 text-slate-600">{definition.unresolvedQuestions.map((q) => <li key={q}>• {q}</li>)}</ul></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{value}</p></div>; }
function FlowStep({ number, title, detail, icon: Icon }: { number: string; title: string; detail: string; icon: typeof GitBranch }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center justify-between"><div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-cyan-600 shadow-sm"><Icon size={16}/></div><span className="text-[10px] font-black text-slate-300">{number}</span></div><p className="mt-4 text-[10px] font-black tracking-wider text-slate-500">{title}</p><p className="mt-1 text-sm font-semibold leading-5 text-slate-700">{detail}</p></div>; }
function Gate({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-slate-200 bg-white p-3"><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-sm font-bold text-slate-800">{value}</p></div>; }
function ListBlock({ title, items }: { title: string; items: string[] }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{title}</p><ul className="mt-2 space-y-2 text-sm leading-5 text-slate-700">{items.length ? items.map((item) => <li key={item}>• {item}</li>) : <li>Not defined</li>}</ul></div>; }
