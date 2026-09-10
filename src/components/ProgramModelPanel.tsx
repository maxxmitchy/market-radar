import { useMemo, useState } from "react";
import { CircleCheck, CircleX, Layers3, X } from "lucide-react";
import { inspectPrograms } from "../intelligence/program-engine.js";

export function ProgramModelPanel({ onClose }: { onClose: () => void }) {
  const programs = useMemo(() => inspectPrograms(), []);
  const [selectedId, setSelectedId] = useState(programs[0]?.program.id ?? "");
  const selected = programs.find((item) => item.program.id === selectedId);

  return (
    <div className="fixed inset-0 z-[75] bg-slate-950/50 p-4 backdrop-blur-sm sm:p-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8f9fc] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div><div className="flex items-center gap-2 text-indigo-600"><Layers3 size={16}/><span className="text-[10px] font-black tracking-[.16em]">PROGRAM MODEL</span></div><h2 className="mt-1 text-2xl font-black">Program definition</h2><p className="mt-1 text-xs text-slate-500">Define what a program is before building what a student buys.</p></div>
          <button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close"><X size={18}/></button>
        </header>
        <div className="grid min-h-0 flex-1 md:grid-cols-[.75fr_1.25fr]">
          <div className="overflow-y-auto border-r border-slate-200 bg-white p-4"><div className="mb-3 text-[10px] font-black tracking-[.14em] text-slate-400">{programs.length} PROGRAM DEFINITION{programs.length === 1 ? "" : "S"}</div><div className="space-y-2">{programs.map(({ program, ready }) => <button key={program.id} onClick={() => setSelectedId(program.id)} className={`w-full rounded-xl border p-4 text-left ${selectedId === program.id ? "border-indigo-300 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}`}><div className="flex items-center justify-between gap-3"><span className="text-sm font-black">{program.name}</span>{ready ? <CircleCheck size={16}/> : <CircleX size={16}/>}</div><div className="mt-2 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">v{program.version} · {program.lifecycle}</div></button>)}</div></div>
          {selected ? <div className="overflow-y-auto p-6 sm:p-8"><div className="flex flex-wrap gap-2"><span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[.12em]">{selected.program.lifecycle}</span><span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[.12em]">v{selected.program.version}</span></div><h3 className="mt-5 text-3xl font-black">{selected.program.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{selected.program.proposition}</p><div className="mt-7 grid gap-4 sm:grid-cols-2"><Detail label="Eligibility" value={`${selected.program.eligibility.objective} · ${selected.program.eligibility.allowedDurations.join(", ")} days`} /><Detail label="Linked formulation" value={selected.program.formulationId ?? "Not linked"} /><Detail label="Daily pack specification" value={selected.program.dailyPackSpecId ?? "Not defined"} /><Detail label="Education plan" value={selected.program.educationPlanId ?? "Not defined"} /></div><section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="text-[10px] font-black tracking-[.15em] text-amber-700">OPEN PRODUCT QUESTIONS</div><ul className="mt-3 space-y-2 text-sm leading-6 text-amber-950">{selected.program.unresolvedQuestions.map((q) => <li key={q}>• {q}</li>)}</ul></section><section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5"><div className="text-[10px] font-black tracking-[.15em] text-slate-400">BOUNDARIES</div><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">{selected.program.boundaries.map((q) => <li key={q}>• {q}</li>)}</ul></section></div> : <div className="grid place-items-center p-8 text-sm text-slate-400">No program selected.</div>}
        </div>
      </div>
    </div>
  );
}
function Detail({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="text-[10px] font-black tracking-[.15em] text-slate-400">{label}</div><p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{value}</p></div>; }
