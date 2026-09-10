import { CircleAlert, CircleCheck, Package, ShieldCheck, X } from "lucide-react";
import { dailyExperiences, isDailyExperienceReady, type DailyExperienceDefinition } from "../domain/daily-experience.js";

const lifecycleLabel: Record<DailyExperienceDefinition["lifecycle"], string> = {
  draft: "Draft",
  review: "In review",
  approved: "Approved",
  retired: "Retired",
};

export function DailyExperiencePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Daily experience blueprint">
      <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f6f7fb] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
          <div>
            <div className="text-[10px] font-black tracking-[.18em] text-indigo-600">DAILY EXPERIENCE</div>
            <h2 className="mt-1 text-2xl font-black tracking-tight">How the approved program is experienced</h2>
            <p className="mt-1 max-w-3xl text-sm text-slate-500">The daily unit is an execution layer. It does not invent a formulation, change governance, or make clinical decisions.</p>
          </div>
          <button onClick={onClose} className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50" aria-label="Close"><X size={20} /></button>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto p-6 lg:p-8">
          {dailyExperiences.map((experience) => {
            const ready = isDailyExperienceReady(experience);
            return <section key={`${experience.id}-${experience.version}`} className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><div className="text-[10px] font-black tracking-[.16em] text-indigo-600">DEFINITION / V{experience.version}</div><h3 className="mt-1 text-xl font-black">{experience.name}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Program: {experience.programId}</p></div>
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-800">{lifecycleLabel[experience.lifecycle]}</span>
              </div>
              <div className={`mt-6 flex items-center gap-2 rounded-xl p-4 text-sm font-black ${ready ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>{ready ? <CircleCheck size={17} /> : <CircleAlert size={17} />} {ready ? "READY" : "NOT READY — governance dependencies remain"}</div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Block title="Daily sequence" icon={<Package size={15} />} items={experience.sequence.map((step, index) => `${index + 1}. ${step.toUpperCase()}`)} />
                <Block title="Pack & traceability" icon={<Package size={15} />} items={[experience.packFormat, ...experience.identificationRequirements]} />
                <Block title="Fulfillment" icon={<CircleCheck size={15} />} items={experience.fulfillmentRequirements} />
                <Block title="Boundaries" icon={<ShieldCheck size={15} />} items={[...experience.personalizationBoundaries, ...experience.safetyBoundaries]} />
              </div>
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4"><div className="text-xs font-black text-amber-900">OPEN DESIGN QUESTIONS</div><div className="mt-2 space-y-1">{experience.unresolvedQuestions.map((question) => <div key={question} className="text-xs leading-5 text-amber-950">• {question}</div>)}</div></div>
            </section>;
          })}
        </main>
      </div>
    </div>
  );
}

function Block({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-black text-slate-800">{icon}{title}</div><div className="mt-3 space-y-2">{items.map((item) => <div key={item} className="text-xs leading-5 text-slate-500">{item}</div>)}</div></div>;
}
