import { CheckCircle2, CircleAlert, Code2, FileBox, GitBranch, Hammer, ShieldCheck, X } from "lucide-react";
import { inspectProductSpecifications } from "../intelligence/product-specification-engine.js";

export function ProductSpecificationPanel({ onClose }: { onClose: () => void }) {
  const inspections = inspectProductSpecifications();

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
      <div className="mx-auto my-3 max-w-6xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl sm:my-8 sm:rounded-[2rem]">
        <header className="border-b border-slate-200 bg-slate-950 p-5 text-white sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div><p className="text-[11px] font-black tracking-[.2em] text-indigo-300">PRODUCT SPECIFICATION</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">Turn the architecture into something a team can build.</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">This is the translation layer between the product we have designed and the artifacts a real build team would need. It defines the contract without pretending implementation choices have already been made.</p></div>
            <button onClick={onClose} className="shrink-0 rounded-full border border-white/10 p-2 text-slate-300 hover:bg-white/10" aria-label="Close product specification"><X size={18} /></button>
          </div>
        </header>

        <div className="p-5 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-4">
            <FlowStep number="01" label="APPROVED DESIGN" icon={GitBranch} />
            <FlowStep number="02" label="SPECIFICATION" icon={FileBox} />
            <FlowStep number="03" label="BUILD ARTIFACTS" icon={Hammer} />
            <FlowStep number="04" label="ACCEPTANCE" icon={CheckCircle2} />
          </div>

          {inspections.map(({ definition, approved, blockedBy }) => <section key={definition.id} className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.16em] text-indigo-600">{definition.id} · VERSION {definition.version}</p><h3 className="mt-2 text-2xl font-black">Build contract</h3></div><span className={`rounded-full px-3 py-1.5 text-[10px] font-black ${approved ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{approved ? "APPROVED" : "IN DESIGN"}</span></div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <SpecBlock title="Product contract" icon={GitBranch} items={definition.productContract} />
              <SpecBlock title="Software artifacts" icon={Code2} items={definition.softwareArtifacts} />
              <SpecBlock title="Physical artifacts" icon={FileBox} items={definition.physicalArtifacts} />
              <SpecBlock title="Operating artifacts" icon={Hammer} items={definition.operatingArtifacts} />
              <SpecBlock title="Acceptance criteria" icon={CheckCircle2} items={definition.acceptanceCriteria} />
              <SpecBlock title="Traceability" icon={ShieldCheck} items={definition.traceabilityRequirements} />
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5"><p className="text-[10px] font-black uppercase tracking-[.16em] text-slate-400">Dependencies</p><div className="mt-3 flex flex-wrap gap-2">{definition.dependencies.map((item) => <span key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">{item}</span>)}</div></div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2"><div className="rounded-2xl border border-rose-200 bg-rose-50 p-5"><div className="flex items-center gap-2 text-rose-700"><CircleAlert size={16} /><p className="text-[10px] font-black uppercase tracking-[.16em]">Boundaries</p></div><ul className="mt-3 space-y-2 text-sm leading-6 text-rose-950">{definition.boundaries.map((item) => <li key={item}>• {item}</li>)}</ul></div><div className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="text-[10px] font-black uppercase tracking-[.16em] text-amber-800">Unresolved questions</p><ul className="mt-3 space-y-2 text-sm leading-6 text-amber-950">{definition.unresolvedQuestions.map((item) => <li key={item}>• {item}</li>)}</ul></div></div>
            <div className="mt-4 rounded-2xl border border-slate-900 bg-slate-900 p-5 text-white"><p className="text-[10px] font-black uppercase tracking-[.16em] text-indigo-300">Blocking gates</p><div className="mt-3 flex flex-wrap gap-2">{blockedBy.map((item) => <span key={item} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-200">{item}</span>)}</div></div>
          </section>)}
        </div>
      </div>
    </div>
  );
}
function FlowStep({ number, label, icon: Icon }: { number: string; label: string; icon: typeof GitBranch }) { return <div className="rounded-2xl border border-slate-200 bg-white p-4"><span className="text-[10px] font-black tracking-widest text-indigo-600">{number}</span><Icon size={17} className="mt-3 text-slate-500" /><p className="mt-2 text-xs font-black text-slate-900">{label}</p></div>; }
function SpecBlock({ title, icon: Icon, items }: { title: string; icon: typeof GitBranch; items: string[] }) { return <article className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2"><Icon size={16} className="text-indigo-600" /><p className="text-[10px] font-black uppercase tracking-[.16em] text-slate-500">{title}</p></div><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">{items.map((item) => <li key={item}>• {item}</li>)}</ul></article>; }
