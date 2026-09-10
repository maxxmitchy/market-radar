import { type ReactNode } from "react";
import { CircleAlert, CircleCheck, Layers3, ShieldCheck, X } from "lucide-react";
import { programDefinitions, isProgramReady, type ProgramDefinition } from "../domain/program.js";
import { inspectPrograms } from "../intelligence/program-engine.js";

const lifecycleLabel: Record<ProgramDefinition["lifecycle"], string> = {
  draft: "Draft",
  review: "In review",
  approved: "Approved",
  retired: "Retired",
};

export function ProgramBlueprintPanel({ onClose }: { onClose: () => void }) {
  const inspections = inspectPrograms();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Program blueprint">
      <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f6f7fb] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
          <div>
            <div className="text-[10px] font-black tracking-[.18em] text-indigo-600">PROGRAM BLUEPRINT</div>
            <h2 className="mt-1 text-2xl font-black tracking-tight">The program is a product object</h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-500">Identity, version, eligibility, dependencies and boundaries are inspectable independently of the formulation.</p>
          </div>
          <button onClick={onClose} className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50" aria-label="Close"><X size={20} /></button>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {inspections.map(({ program, ready, missingArtifacts }) => (
              <ProgramCard key={`${program.id}-${program.version}`} program={program} ready={ready} missingArtifacts={missingArtifacts} />
            ))}
            <article className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-500"><Layers3 size={18} /></div>
              <h3 className="mt-5 font-black">Future program versions</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">New versions should create explicit change records rather than mutate an approved definition in place.</p>
              <div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs font-semibold leading-5 text-slate-500">Versioning belongs to the product architecture, not just the database.</div>
            </article>
          </div>

          {programDefinitions.map((program) => (
            <section key={`${program.id}-detail`} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 lg:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><div className="text-[10px] font-black tracking-[.16em] text-indigo-600">DEFINITION / V{program.version}</div><h3 className="mt-1 text-xl font-black">{program.name}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{program.proposition}</p></div>
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800">{lifecycleLabel[program.lifecycle]}</span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <BlueprintBlock title="Eligibility" icon={<CircleCheck size={15} />} items={[`Objective: ${program.eligibility.objective}`, `Stages: ${program.eligibility.academicStages.join(", ")}`, `Durations: ${program.eligibility.allowedDurations.join(", ")} days`, `Pharmacist review: ${program.eligibility.requiresPharmacistReview ? "required" : "not forced by definition"}`]} />
                <BlueprintBlock title="Dependencies" icon={<Layers3 size={15} />} items={[`Formulation: ${program.formulationId ?? "not connected"}`, `Daily pack: ${program.dailyPackSpecId ?? "not connected"}`, `Education: ${program.educationPlanId ?? "not connected"}`]} />
                <BlueprintBlock title="Boundaries" icon={<ShieldCheck size={15} />} items={program.boundaries} />
                <BlueprintBlock title="Open design questions" icon={<CircleAlert size={15} />} items={program.unresolvedQuestions} />
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

function ProgramCard({ program, ready, missingArtifacts }: { program: ProgramDefinition; ready: boolean; missingArtifacts: string[]; key?: string }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Layers3 size={18} /></div><span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-600">V{program.version}</span></div>
    <h3 className="mt-5 font-black">{program.name}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{program.proposition}</p>
    <div className={`mt-5 flex items-center gap-2 rounded-xl p-3 text-xs font-black ${ready ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>{ready ? <CircleCheck size={15} /> : <CircleAlert size={15} />} {ready ? "READY" : "NOT READY"}</div>
    {!ready && <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">Missing: {missingArtifacts.join(" · ")}</p>}
    <div className="mt-4 text-xs font-bold text-slate-400">Lifecycle: <span className="text-slate-700">{lifecycleLabel[program.lifecycle]}</span></div>
  </article>;
}

function BlueprintBlock({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-black text-slate-800">{icon}{title}</div><div className="mt-3 space-y-2">{items.map((item) => <div key={item} className="text-xs leading-5 text-slate-500">{item}</div>)}</div></div>;
}
