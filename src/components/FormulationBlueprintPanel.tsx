import { type ReactNode } from "react";
import { CircleAlert, CircleCheck, FlaskConical, ShieldCheck, X } from "lucide-react";
import { inspectFormulations } from "../intelligence/formulation-engine.js";
import { dailyExperiences } from "../domain/daily-experience.js";

const gateLabels = [
  ["evidence", "Evidence"],
  ["safety", "Safety"],
  ["regulatory", "Regulatory"],
  ["quality", "Quality"],
] as const;

export function FormulationBlueprintPanel({ onClose }: { onClose: () => void }) {
  const inspections = inspectFormulations();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Formulation blueprint">
      <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f6f7fb] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
          <div>
            <div className="text-[10px] font-black tracking-[.18em] text-indigo-600">FORMULATION BLUEPRINT</div>
            <h2 className="mt-1 text-2xl font-black tracking-tight">The formulation is governed, not guessed</h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-500">This layer defines what must be true before a formulation can support a program. Ingredient stacks remain outside this blueprint until separately established and reviewed.</p>
          </div>
          <button onClick={onClose} className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50" aria-label="Close"><X size={20} /></button>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <Summary label="Program dependency" value="student-foundation" note="Formulation serves a defined program." />
            <Summary label="Daily experience" value={dailyExperiences[0]?.id ?? "Not connected"} note="Execution layer consumes an approved formulation reference." />
            <Summary label="Component disclosure" value="Not in blueprint" note="Component sets are referenced by ID only." />
          </div>

          {inspections.map(({ formulation, commerciallyReady, pendingGates }) => (
            <section key={`${formulation.id}-${formulation.version}`} className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><div className="text-[10px] font-black tracking-[.16em] text-indigo-600">DEFINITION / V{formulation.version}</div><h3 className="mt-1 text-xl font-black">{formulation.name}</h3><p className="mt-2 text-sm text-slate-500">{formulation.id}</p></div>
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800">{formulation.status}</span>
              </div>

              <div className={`mt-6 flex items-center gap-2 rounded-xl p-4 text-sm font-black ${commerciallyReady ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
                {commerciallyReady ? <CircleCheck size={17} /> : <CircleAlert size={17} />}
                {commerciallyReady ? "GOVERNANCE COMPLETE" : "NOT READY — review gates remain"}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {gateLabels.map(([key, label]) => {
                  const gate = formulation[key];
                  return <Gate key={key} label={label} decision={gate.decision} reviewer={gate.reviewerId} />;
                })}
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Block title="Architecture dependencies" icon={<FlaskConical size={15} />} items={[`Component set: ${formulation.componentSetId ?? "not connected"}`, "Program: student-foundation", `Daily experience: ${dailyExperiences[0]?.id ?? "not connected"}`]} />
                <Block title="Remaining gates" icon={<ShieldCheck size={15} />} items={pendingGates.length ? pendingGates : ["None"]} />
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-600">A formulation approval must remain versioned and reviewable. Changing a governed formulation should create a new version/change record rather than silently mutating an approved definition.</div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

function Summary({ label, value, note }: { label: string; value: string; note: string }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5"><div className="text-[10px] font-black tracking-[.14em] text-slate-400">{label}</div><div className="mt-2 truncate text-sm font-black text-slate-900">{value}</div><div className="mt-2 text-xs leading-5 text-slate-500">{note}</div></article>;
}

function Gate({ label, decision, reviewer }: { label: string; decision: string; reviewer: string | null }) {
  const approved = decision === "approved";
  return <div className={`rounded-xl border p-4 ${approved ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}><div className="flex items-center gap-2 text-xs font-black">{approved ? <CircleCheck size={15} /> : <CircleAlert size={15} />}{label}</div><div className="mt-2 text-xs font-bold uppercase tracking-wide">{decision}</div><div className="mt-1 text-[11px] text-slate-500">Reviewer: {reviewer ?? "unassigned"}</div></div>;
}

function Block({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-black text-slate-800">{icon}{title}</div><div className="mt-3 space-y-2">{items.map((item) => <div key={item} className="text-xs leading-5 text-slate-500">{item}</div>)}</div></div>;
}
