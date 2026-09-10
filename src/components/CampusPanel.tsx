import { Building2, CircleAlert, GraduationCap, MessageSquare, ShieldAlert, Users, X } from "lucide-react";
import { campusSummary, inspectCampusDefinitions } from "../intelligence/campus-engine.js";

export function CampusPanel({ onClose }: { onClose: () => void }) {
  const summary = campusSummary();
  const inspections = inspectCampusDefinitions();

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
      <div className="mx-auto my-3 max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl sm:my-8 sm:rounded-[2rem]">
        <header className="border-b border-slate-200 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div><p className="text-[11px] font-black tracking-[0.2em] text-emerald-700">CAMPUS BLUEPRINT</p><h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Turn the campus into a governed network</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">The campus layer connects students, education, access and feedback. It is not a free-form sales channel and it does not replace the product's existing safety, regulatory or human-review controls.</p></div>
            <button onClick={onClose} className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close campus blueprint"><X size={18} /></button>
          </div>
        </header>

        <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-8"><Metric label="DEFINITIONS" value={summary.definitions} /><Metric label="APPROVED" value={summary.approved} /><Metric label="BLOCKED" value={summary.blocked} /></div>

        <div className="mx-5 mb-5 grid gap-3 sm:mx-8 sm:mb-8 sm:grid-cols-4">
          <FlowStep number="01" label="CAMPUS NODE" icon={Building2} />
          <FlowStep number="02" label="STUDENT ACCESS" icon={Users} />
          <FlowStep number="03" label="EDUCATION" icon={GraduationCap} />
          <FlowStep number="04" label="FEEDBACK" icon={MessageSquare} />
        </div>

        {inspections.map(({ definition, approved, blockedBy }) => <section key={definition.id} className="border-t border-slate-200 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{definition.id} · v{definition.version}</p><h3 className="mt-1 text-xl font-black text-slate-950">Campus operating contract</h3></div><span className={`rounded-full px-3 py-1.5 text-xs font-black ${approved ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{approved ? "APPROVED" : "BLOCKED"}</span></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoBlock title="Access model" icon={Building2} items={definition.accessModel} />
            <InfoBlock title="Participant roles" icon={Users} items={definition.participantRoles} />
            <InfoBlock title="Education touchpoints" icon={GraduationCap} items={definition.educationTouchpoints} />
            <InfoBlock title="Feedback signals" icon={MessageSquare} items={definition.feedbackSignals} />
            <InfoBlock title="Conduct boundaries" icon={ShieldAlert} items={definition.conductBoundaries} />
            <InfoBlock title="Privacy boundaries" icon={ShieldAlert} items={definition.privacyBoundaries} />
            <InfoBlock title="Escalation boundaries" icon={ShieldAlert} items={definition.escalationBoundaries} />
          </div>
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-rose-800">Blocking gates</p><div className="mt-2 flex flex-wrap gap-2">{blockedBy.map((item) => <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-rose-700">{item}</span>)}</div></div>
          <div className="mt-5"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Unresolved questions</p><ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">{definition.unresolvedQuestions.map((q) => <li key={q}>• {q}</li>)}</ul></div>
        </section>)}
      </div>
    </div>
  );
}
function Metric({ label, value }: { label: string; value: number }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{value}</p></div>; }
function FlowStep({ number, label, icon: Icon }: { number: string; label: string; icon: typeof Building2 }) { return <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4"><span className="text-[10px] font-black tracking-widest text-emerald-700">{number}</span><Icon size={17} className="mt-3 text-slate-500" /><p className="mt-2 text-xs font-black text-slate-900">{label}</p></div>; }
function InfoBlock({ title, icon: Icon, items }: { title: string; icon: typeof Building2; items: string[] }) { return <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2"><Icon size={16} className="text-emerald-700" /><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{title}</p></div><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">{items.map((item) => <li key={item}>• {item}</li>)}</ul></article>; }
