import { useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, Database, GitBranch, ShieldCheck, X } from "lucide-react";
import { productRequirements, requirementStatusLabel, type ProductRequirement, type RequirementStatus } from "../domain/requirements.js";

const statuses: RequirementStatus[] = ["defined", "prototype", "needs-validation", "unresolved"];

export function RequirementsPanel({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<RequirementStatus | "all">("all");
  const [selectedId, setSelectedId] = useState(productRequirements[0].id);
  const filtered = useMemo(
    () => status === "all" ? productRequirements : productRequirements.filter((r) => r.status === status),
    [status],
  );
  const selected: ProductRequirement = productRequirements.find((r) => r.id === selectedId) ?? filtered[0] ?? productRequirements[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Product requirements">
      <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f6f7fb] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div><div className="text-[10px] font-black tracking-[.18em] text-indigo-600">CONTROL SURFACE</div><h2 className="mt-1 text-2xl font-black">Product Requirements</h2><p className="mt-1 text-sm text-slate-500">Turn the blueprint into inspectable requirements before turning requirements into code.</p></div>
          <button onClick={onClose} className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50" aria-label="Close"><X size={20} /></button>
        </header>
        <div className="grid min-h-0 flex-1 lg:grid-cols-[340px_1fr]">
          <aside className="overflow-y-auto border-b border-slate-200 bg-white p-4 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap gap-2"><button onClick={() => setStatus("all")} className={`rounded-full px-3 py-1.5 text-[10px] font-black ${status === "all" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500"}`}>ALL</button>{statuses.map(s => <button key={s} onClick={() => setStatus(s)} className={`rounded-full px-3 py-1.5 text-[10px] font-black ${status === s ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>{requirementStatusLabel[s].toUpperCase()}</button>)}</div>
            <div className="space-y-2">{filtered.map(r => <button key={r.id} onClick={() => setSelectedId(r.id)} className={`w-full rounded-2xl border p-4 text-left ${selected.id === r.id ? "border-indigo-300 bg-indigo-50" : "border-slate-200 bg-white hover:border-slate-300"}`}><div className="flex items-center justify-between gap-3"><span className="text-sm font-black">{r.title}</span><StatusDot status={r.status} /></div><div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">{r.type} · {requirementStatusLabel[r.status]}</div></button>)}</div>
          </aside>
          <article className="overflow-y-auto p-6 lg:p-9">
            <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-indigo-50 px-3 py-1.5 text-[10px] font-black tracking-wider text-indigo-700">{selected.type.toUpperCase()}</span><span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black tracking-wider text-slate-600">{requirementStatusLabel[selected.status].toUpperCase()}</span></div>
            <h3 className="mt-4 text-4xl font-black tracking-tight">{selected.title}</h3>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{selected.statement}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Info title="WHY IT EXISTS" icon={GitBranch} text={selected.rationale} />
              <Info title="OUTPUT" icon={CheckCircle2} text={selected.output} />
              <ListInfo title="INPUTS" icon={Database} items={selected.inputs} />
              <Info title="BOUNDARY" icon={ShieldCheck} text={selected.boundary} danger={selected.type === "safety"} />
            </div>
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="flex items-center gap-2 text-amber-800"><CircleAlert size={17} /><span className="text-[10px] font-black tracking-[.16em]">NEXT ARTIFACT</span></div><p className="mt-2 font-black text-amber-950">{selected.nextArtifact}</p><p className="mt-1 text-sm text-amber-800">This is a build target, not an assertion that the artifact is already implemented.</p></div>
          </article>
        </div>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: RequirementStatus }) { return <span className={`h-2.5 w-2.5 rounded-full ${status === "defined" ? "bg-emerald-500" : status === "prototype" ? "bg-indigo-500" : status === "needs-validation" ? "bg-amber-500" : "bg-rose-500"}`} />; }
function Info({ title, icon: Icon, text, danger = false }: { title: string; icon: typeof GitBranch; text: string; danger?: boolean }) { return <div className={`rounded-2xl border p-5 ${danger ? "border-rose-200 bg-rose-50" : "border-slate-200 bg-white"}`}><div className="flex items-center gap-2 text-slate-400"><Icon size={16} /><span className="text-[10px] font-black tracking-[.16em]">{title}</span></div><p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{text}</p></div>; }
function ListInfo({ title, icon: Icon, items }: { title: string; icon: typeof Database; items: string[] }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2 text-slate-400"><Icon size={16} /><span className="text-[10px] font-black tracking-[.16em]">{title}</span></div><div className="mt-3 space-y-2">{items.map(item => <div key={item} className="flex gap-2 text-sm font-semibold"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-indigo-500" />{item}</div>)}</div></div>; }
