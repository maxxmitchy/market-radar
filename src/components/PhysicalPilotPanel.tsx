import { CheckCircle2, CircleAlert, ClipboardCheck, FileText, Flag, Users, X } from "lucide-react";
import { inspectPhysicalPilots } from "../intelligence/physical-pilot-engine.js";

export function PhysicalPilotPanel({ onClose }: { onClose: () => void }) {
  const inspections = inspectPhysicalPilots();
  const inspection = inspections[0];
  const pilot = inspection?.pilot;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
      <div className="mx-auto my-3 max-w-6xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl sm:my-8 sm:rounded-[2rem]">
        <header className="border-b border-slate-200 bg-slate-950 p-5 text-white sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[11px] font-black tracking-[.2em] text-indigo-300">PHYSICAL PILOT SPECIFICATION</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">Define the smallest real-world test we are willing to run.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">The pilot is where the designed system meets reality. It must test the product and operating design without being mistaken for commercial readiness, clinical effectiveness evidence or regulatory approval.</p>
            </div>
            <button onClick={onClose} className="shrink-0 rounded-xl border border-white/10 p-2 text-slate-300 hover:bg-white/10" aria-label="Close"><X size={20} /></button>
          </div>
        </header>

        {pilot && <main className="p-5 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <Metric icon={ClipboardCheck} label="STATUS" value={pilot.status.toUpperCase()} />
            <Metric icon={FileText} label="SPECIFICATION" value={pilot.productSpecificationId ? "LINKED" : "MISSING"} />
            <Metric icon={Flag} label="GATE" value={inspection.approved ? "APPROVED" : "BLOCKED"} />
          </div>

          <section className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
            <p className="text-[10px] font-black tracking-[.18em] text-indigo-700">PILOT PURPOSE</p>
            <p className="mt-3 max-w-4xl text-lg font-bold leading-8 text-indigo-950">{pilot.purpose}</p>
          </section>

          <section className="mt-8 grid gap-5 lg:grid-cols-2">
            <ListCard title="ENTRY CRITERIA" icon={CheckCircle2} items={pilot.entryCriteria} />
            <ListCard title="PARTICIPANT REQUIREMENTS" icon={Users} items={pilot.participantRequirements} />
            <ListCard title="OPERATING ARTIFACTS" icon={FileText} items={pilot.operatingArtifacts} />
            <ListCard title="OBSERVATION SIGNALS" icon={ClipboardCheck} items={pilot.observationSignals} />
            <ListCard title="STOP CONDITIONS" icon={CircleAlert} items={pilot.stopConditions} danger />
            <ListCard title="LEARNING OUTPUTS" icon={Flag} items={pilot.learningOutputs} />
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-2 text-slate-500"><CircleAlert size={16} /><span className="text-[10px] font-black tracking-[.18em]">BLOCKING GATES</span></div>
            <div className="mt-4 flex flex-wrap gap-2">{inspection.blockedBy.map((item) => <span key={item} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">{item}</span>)}</div>
          </section>

          <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-[10px] font-black tracking-[.18em] text-amber-800">UNRESOLVED BEFORE PILOT</p>
            <div className="mt-4 space-y-3">{pilot.unresolvedQuestions.map((question, index) => <div key={question} className="flex gap-3 rounded-xl border border-amber-200/70 bg-white/60 p-3"><span className="text-xs font-black text-amber-700">0{index + 1}</span><p className="text-sm font-semibold leading-6 text-amber-950">{question}</p></div>)}</div>
          </section>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white">
            <p className="text-[10px] font-black tracking-[.18em] text-indigo-300">CONTROL PRINCIPLE</p>
            <h3 className="mt-2 text-2xl font-black">Pilot learning can change the design. It cannot bypass the gates.</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">A failed requirement, operational problem or participant-experience issue should produce a documented change and a new version where appropriate—not an informal workaround.</p>
          </div>
        </main>}
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof ClipboardCheck; label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2 text-slate-400"><Icon size={16} /><span className="text-[10px] font-black tracking-[.16em]">{label}</span></div><div className="mt-3 text-xl font-black">{value}</div></div>;
}

function ListCard({ title, icon: Icon, items, danger = false }: { title: string; icon: typeof ClipboardCheck; items: string[]; danger?: boolean }) {
  return <article className={`rounded-2xl border p-6 ${danger ? "border-rose-200 bg-rose-50" : "border-slate-200 bg-white"}`}><div className={`flex items-center gap-2 ${danger ? "text-rose-700" : "text-indigo-600"}`}><Icon size={17} /><span className="text-[10px] font-black tracking-[.16em]">{title}</span></div><div className="mt-4 space-y-3">{items.map((item) => <div key={item} className="flex gap-3 text-sm font-semibold leading-6"><CheckCircle2 size={16} className="mt-1 shrink-0 text-indigo-500" />{item}</div>)}</div></article>;
}
