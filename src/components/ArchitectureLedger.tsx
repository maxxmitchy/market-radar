import { useMemo, useState } from "react";
import { CircleAlert, CircleCheck, Clock3, X } from "lucide-react";
import { architectureRequirements, type BuildStatus } from "../domain/architecture.js";

const statusMeta: Record<BuildStatus, { label: string; icon: typeof CircleCheck; className: string }> = {
  defined: { label: "Defined", icon: CircleCheck, className: "bg-slate-100 text-slate-700" },
  prototype: { label: "Prototype", icon: Clock3, className: "bg-indigo-50 text-indigo-700" },
  "needs-validation": { label: "Needs validation", icon: CircleAlert, className: "bg-amber-50 text-amber-700" },
  blocked: { label: "Blocked", icon: CircleAlert, className: "bg-rose-50 text-rose-700" },
};

export function ArchitectureLedger({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<BuildStatus | "all">("all");
  const [selectedId, setSelectedId] = useState(architectureRequirements[0].id);
  const visible = useMemo(
    () => status === "all" ? architectureRequirements : architectureRequirements.filter(item => item.status === status),
    [status],
  );
  const selected = architectureRequirements.find(item => item.id === selectedId) ?? visible[0] ?? architectureRequirements[0];

  return <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm sm:p-8" role="dialog" aria-modal="true" aria-label="Architecture ledger">
    <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8f9fc] shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 sm:px-8">
        <div><div className="text-[10px] font-black tracking-[.18em] text-indigo-600">PRODUCT CONTROL SURFACE</div><h2 className="mt-1 text-2xl font-black">Architecture Ledger</h2><p className="mt-1 text-sm text-slate-500">What exists, what is prototyped, and what still needs to be answered.</p></div>
        <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900" aria-label="Close ledger"><X size={20} /></button>
      </div>
      <div className="grid lg:grid-cols-[.9fr_1.1fr]">
        <div className="border-b border-slate-200 bg-white p-5 lg:border-b-0 lg:border-r sm:p-7">
          <div className="mb-4 flex flex-wrap gap-2">{(["all", "defined", "prototype", "needs-validation", "blocked"] as const).map(filter => <button key={filter} onClick={() => setStatus(filter)} className={`rounded-full px-3 py-1.5 text-[10px] font-black tracking-wide ${status === filter ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{filter === "all" ? "All" : statusMeta[filter].label}</button>)}</div>
          <div className="space-y-2">{visible.map(item => { const meta = statusMeta[item.status]; const Icon = meta.icon; return <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full rounded-2xl border p-4 text-left transition ${selected?.id === item.id ? "border-indigo-300 bg-indigo-50" : "border-slate-200 bg-white hover:border-slate-300"}`}><div className="flex items-start gap-3"><div className="mt-0.5 text-slate-400"><Icon size={16} /></div><div className="min-w-0"><div className="text-[9px] font-black tracking-[.14em] text-slate-400">{item.id} · {item.layer}</div><div className="mt-1 font-black">{item.title}</div><span className={`mt-2 inline-flex rounded-full px-2 py-1 text-[9px] font-black ${meta.className}`}>{meta.label}</span></div></div></button>; })}</div>
        </div>
        <div className="p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><div><div className="text-[10px] font-black tracking-[.16em] text-indigo-600">{selected.id}</div><h3 className="mt-2 text-3xl font-black">{selected.title}</h3><p className="mt-1 text-sm font-bold text-slate-400">{selected.layer}</p></div><span className={`rounded-full px-3 py-1.5 text-[10px] font-black ${statusMeta[selected.status].className}`}>{statusMeta[selected.status].label}</span></div>
          <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm"><div className="text-[10px] font-black tracking-[.15em] text-slate-400">PURPOSE</div><p className="mt-3 text-sm leading-6 text-slate-600">{selected.purpose}</p></div>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="text-[10px] font-black tracking-[.15em] text-amber-700">OPEN QUESTION</div><p className="mt-3 text-sm font-semibold leading-6 text-amber-950">{selected.openQuestion}</p></div>
          <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-5"><div className="text-[10px] font-black tracking-[.15em] text-indigo-700">NEXT ARTIFACT</div><p className="mt-3 text-sm font-semibold leading-6 text-indigo-950">{selected.nextArtifact}</p></div>
        </div>
      </div>
    </div>
  </div>;
}
