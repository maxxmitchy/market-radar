import { CircleAlert, ClipboardCheck, FlaskConical, GitBranch, PauseCircle, PlayCircle, Route, Users, X } from "lucide-react";
import { inspectPilots, pilotSummary } from "../intelligence/pilot-engine.js";

export function PilotPanel({ onClose }: { onClose: () => void }) {
  const summary = pilotSummary();
  const inspections = inspectPilots();

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
      <div className="mx-auto my-3 max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl sm:my-8 sm:rounded-[2rem]">
        <header className="border-b border-slate-200 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div><p className="text-[11px] font-black tracking-[0.2em] text-orange-700">PILOT BLUEPRINT</p><h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Test the whole system before scaling it</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">The pilot is the bridge between the architecture we designed and the physical product we eventually build. It tests the workflow, not just the idea.</p></div>
            <button onClick={onClose} className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close pilot blueprint"><X size={18} /></button>
          </div>
        </header>

        <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-8"><Metric label="DEFINITIONS" value={summary.definitions} /><Metric label="READY" value={summary.ready} /><Metric label="BLOCKED" value={summary.blocked} /></div>

        <div className="mx-5 mb-5 rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:mx-8 sm:mb-8"><div className="flex items-center gap-2 text-orange-800"><Route size={17} /><span className="text-[11px] font-black tracking-[0.16em]">THE PILOT BRIDGE</span></div><div className="mt-4 grid gap-2 sm:grid-cols-5"><BridgeStep label="APPROVED DESIGN" /><BridgeStep label="CONTROLLED PILOT" /><BridgeStep label="OBSERVE" /><BridgeStep label="LEARN" /><BridgeStep label="VERSION" /></div></div>

        {inspections.map(({ pilot, ready, blockedBy }) => <section key={pilot.id} className="border-t border-slate-200 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{pilot.id} · v{pilot.version}</p><h3 className="mt-1 text-xl font-black text-slate-950">First pilot contract</h3></div><span className={`rounded-full px-3 py-1.5 text-xs font-black ${ready ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{ready ? "READY" : "BLOCKED"}</span></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoBlock title="Pilot scope" icon={FlaskConical} items={pilot.scope} />
            <InfoBlock title="Entry criteria" icon={ClipboardCheck} items={pilot.entryCriteria} />
            <InfoBlock title="Participant roles" icon={Users} items={pilot.participantRoles} />
            <InfoBlock title="Operating flow" icon={Route} items={pilot.operatingFlow} />
            <InfoBlock title="Success signals" icon={PlayCircle} items={pilot.successSignals} />
            <InfoBlock title="Learning plan" icon={GitBranch} items={pilot.learningPlan} />
            <InfoBlock title="Stop conditions" icon={PauseCircle} items={pilot.stopConditions} />
            <InfoBlock title="Boundaries" icon={CircleAlert} items={pilot.boundaries} />
          </div>
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-rose-800">Blocking gates</p><div className="mt-2 flex flex-wrap gap-2">{blockedBy.map((item) => <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-rose-700">{item}</span>)}</div></div>
          <div className="mt-5"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Unresolved questions</p><ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">{pilot.unresolvedQuestions.map((q) => <li key={q}>• {q}</li>)}</ul></div>
        </section>)}
      </div>
    </div>
  );
}
function Metric({ label, value }: { label: string; value: number }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{value}</p></div>; }
function BridgeStep({ label }: { label: string }) { return <div className="rounded-xl border border-orange-200 bg-white p-3 text-center text-[10px] font-black text-slate-800">{label}</div>; }
function InfoBlock({ title, icon: Icon, items }: { title: string; icon: typeof FlaskConical; items: string[] }) { return <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2"><Icon size={16} className="text-orange-700" /><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{title}</p></div><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">{items.map((item) => <li key={item}>• {item}</li>)}</ul></article>; }
