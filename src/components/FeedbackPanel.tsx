import { BarChart3, CircleAlert, GitBranch, MessageSquare, ShieldAlert, Users, X } from "lucide-react";
import { feedbackSummary, inspectFeedbackDefinitions } from "../intelligence/feedback-engine.js";

export function FeedbackPanel({ onClose }: { onClose: () => void }) {
  const summary = feedbackSummary();
  const inspections = inspectFeedbackDefinitions();

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
      <div className="mx-auto my-3 max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl sm:my-8 sm:rounded-[2rem]">
        <header className="border-b border-slate-200 bg-white p-5 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[11px] font-black tracking-[0.2em] text-violet-700">FEEDBACK BLUEPRINT</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Turn experience into product learning</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Feedback closes the loop. It captures what happened, routes signals to the right review path and turns validated learning into the next product decision.</p>
            </div>
            <button onClick={onClose} className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close feedback blueprint"><X size={18} /></button>
          </div>
        </header>

        <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-8"><Metric label="DEFINITIONS" value={summary.definitions} /><Metric label="APPROVED" value={summary.approved} /><Metric label="BLOCKED" value={summary.blocked} /></div>

        <div className="mx-5 mb-5 grid gap-3 sm:mx-8 sm:mb-8 sm:grid-cols-4">
          <FlowStep number="01" label="CAPTURE" icon={MessageSquare} />
          <FlowStep number="02" label="STRUCTURE" icon={BarChart3} />
          <FlowStep number="03" label="REVIEW" icon={ShieldAlert} />
          <FlowStep number="04" label="LEARN" icon={GitBranch} />
        </div>

        {inspections.map(({ definition, approved, blockedBy }) => <section key={definition.id} className="border-t border-slate-200 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{definition.id} · v{definition.version}</p><h3 className="mt-1 text-xl font-black text-slate-950">Product-learning contract</h3></div><span className={`rounded-full px-3 py-1.5 text-xs font-black ${approved ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{approved ? "APPROVED" : "BLOCKED"}</span></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoBlock title="Signal sources" icon={Users} items={definition.signalTypes.map((type) => type[0].toUpperCase() + type.slice(1))} />
            <InfoBlock title="Capture moments" icon={MessageSquare} items={definition.captureMoments} />
            <InfoBlock title="Structured signals" icon={BarChart3} items={definition.structuredSignals} />
            <InfoBlock title="Learning outputs" icon={GitBranch} items={definition.learningOutputs} />
            <InfoBlock title="Routing rules" icon={ShieldAlert} items={definition.routingRules} />
            <InfoBlock title="Governance boundaries" icon={ShieldAlert} items={definition.governanceBoundaries} />
            <InfoBlock title="Privacy boundaries" icon={Users} items={definition.privacyBoundaries} />
            <InfoBlock title="Safety boundaries" icon={ShieldAlert} items={definition.safetyBoundaries} />
          </div>
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-rose-800">Blocking gates</p><div className="mt-2 flex flex-wrap gap-2">{blockedBy.map((item) => <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-rose-700">{item}</span>)}</div></div>
          <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 p-5"><p className="text-[11px] font-black uppercase tracking-wider text-violet-800">The learning loop</p><p className="mt-2 text-sm font-semibold leading-7 text-violet-950">Observe → structure → review → validate → change the appropriate requirement or blueprint → version the change → observe again.</p></div>
          <div className="mt-5"><div className="flex items-center gap-2"><CircleAlert size={15} className="text-amber-600" /><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Unresolved questions</p></div><ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">{definition.unresolvedQuestions.map((q) => <li key={q}>• {q}</li>)}</ul></div>
        </section>)}
      </div>
    </div>
  );
}
function Metric({ label, value }: { label: string; value: number }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{value}</p></div>; }
function FlowStep({ number, label, icon: Icon }: { number: string; label: string; icon: typeof MessageSquare }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><span className="text-[10px] font-black tracking-widest text-violet-700">{number}</span><Icon size={17} className="mt-3 text-slate-500" /><p className="mt-2 text-xs font-black text-slate-900">{label}</p></div>; }
function InfoBlock({ title, icon: Icon, items }: { title: string; icon: typeof MessageSquare; items: string[] }) { return <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2"><Icon size={16} className="text-violet-700" /><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{title}</p></div><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">{items.map((item) => <li key={item}>• {item}</li>)}</ul></article>; }
