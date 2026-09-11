import { AlertTriangle, CheckCircle2, Database, GitBranch, Globe2, ServerCog, ShieldCheck, Users, X } from "lucide-react";
import { inspectProductionPlatforms } from "../intelligence/production-platform-engine.js";

export function ProductionPlatformPanel({ onClose }: { onClose: () => void }) {
  const inspection = inspectProductionPlatforms()[0];
  const platform = inspection?.platform;
  if (!platform) return null;

  return <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
    <div className="mx-auto my-3 max-w-6xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl sm:my-8 sm:rounded-[2rem]">
      <header className="border-b border-slate-200 bg-slate-950 p-5 text-white sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div><p className="text-[11px] font-black tracking-[.2em] text-indigo-300">PRODUCTION PLATFORM ARCHITECTURE</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">Define the system that can actually run the product.</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">This is the bridge from product blueprint to software and operating infrastructure. It defines boundaries, modules, ownership and human control before implementation decisions become irreversible.</p></div>
          <button onClick={onClose} className="shrink-0 rounded-xl border border-white/10 p-2 text-slate-300 hover:bg-white/10" aria-label="Close"><X size={20} /></button>
        </div>
      </header>
      <main className="p-5 sm:p-8">
        <div className="grid gap-3 sm:grid-cols-3"><Metric icon={ServerCog} label="ARCHITECTURE" value={platform.status.toUpperCase()} /><Metric icon={GitBranch} label="MODULES" value={String(platform.modules.length)} /><Metric icon={inspection.approved ? CheckCircle2 : AlertTriangle} label="GATE" value={inspection.approved ? "APPROVED" : "BLOCKED"} /></div>
        <section className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6"><p className="text-[10px] font-black tracking-[.18em] text-indigo-700">SYSTEM PURPOSE</p><p className="mt-3 max-w-4xl text-lg font-bold leading-8 text-indigo-950">{platform.purpose}</p></section>
        <section className="mt-8"><SectionTitle icon={Database} title="PRODUCTION MODULES" /><div className="mt-4 grid gap-4 lg:grid-cols-2">{platform.modules.map((module) => <article key={module.id} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="text-lg font-black text-slate-900">{module.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{module.purpose}</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><Mini title="CONSUMES" items={module.consumes} /><Mini title="PRODUCES" items={module.produces} /><Mini title="OWNS" items={module.owns} /><Mini title="CONTROLS" items={module.controls} /></div></article>)}</div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-3"><InfoCard icon={ShieldCheck} title="SYSTEM BOUNDARIES" items={platform.systemBoundaries} /><InfoCard icon={Users} title="HUMAN CONTROLS" items={platform.humanControls} /><InfoCard icon={Globe2} title="EXTERNAL DEPENDENCIES" items={platform.externalDependencies} /></section>
        <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6"><p className="text-[10px] font-black tracking-[.18em] text-slate-500">BLOCKING GATES</p><div className="mt-4 flex flex-wrap gap-2">{inspection.blockedBy.map((item) => <span key={item} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">{item}</span>)}</div></section>
        <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-6"><p className="text-[10px] font-black tracking-[.18em] text-amber-800">UNRESOLVED BEFORE BUILD</p><div className="mt-4 space-y-3">{platform.unresolvedQuestions.map((q, i) => <div key={q} className="flex gap-3 rounded-xl border border-amber-200/70 bg-white/60 p-3"><span className="text-xs font-black text-amber-700">0{i + 1}</span><p className="text-sm font-semibold leading-6 text-amber-950">{q}</p></div>)}</div></section>
        <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white"><p className="text-[10px] font-black tracking-[.18em] text-indigo-300">CONTROL PRINCIPLE</p><h3 className="mt-2 text-2xl font-black">Software executes the approved architecture; it does not become the authority.</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Runtime services should make governed decisions visible, traceable and reversible where possible. Human owners retain authority over exceptions, approvals and product changes.</p></div>
      </main>
    </div>
  </div>;
}

function Metric({ icon: Icon, label, value }: { icon: typeof ServerCog; label: string; value: string }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2 text-slate-400"><Icon size={16} /><span className="text-[10px] font-black tracking-[.16em]">{label}</span></div><div className="mt-3 text-xl font-black">{value}</div></div>; }
function SectionTitle({ icon: Icon, title }: { icon: typeof Database; title: string }) { return <div className="flex items-center gap-2 text-indigo-600"><Icon size={18} /><span className="text-[10px] font-black tracking-[.18em]">{title}</span></div>; }
function Mini({ title, items }: { title: string; items: string[] }) { return <div><p className="text-[9px] font-black tracking-[.15em] text-slate-400">{title}</p><div className="mt-1 space-y-1">{items.map((item) => <p key={item} className="text-xs font-semibold text-slate-700">{item}</p>)}</div></div>; }
function InfoCard({ icon: Icon, title, items }: { icon: typeof ShieldCheck; title: string; items: string[] }) { return <article className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2 text-indigo-600"><Icon size={17} /><span className="text-[10px] font-black tracking-[.16em]">{title}</span></div><div className="mt-4 space-y-3">{items.map((item) => <div key={item} className="flex gap-2 text-sm font-semibold leading-6 text-slate-700"><CheckCircle2 size={15} className="mt-1 shrink-0 text-indigo-500" />{item}</div>)}</div></article>; }
