import { useState } from "react";
import { ArrowRight, Boxes, BrainCircuit, CheckCircle2, ChevronRight, CircleAlert, Database, FlaskConical, GitBranch, Layers3, LockKeyhole, Network, PanelTop, ShieldCheck, SlidersHorizontal, Sparkles, Stethoscope, Users, X } from "lucide-react";

const architecture = [
  { id: "check", label: "STUDENT CHECK", title: "Understand the student", icon: SlidersHorizontal, tone: "indigo", problem: "Turns student context into structured inputs instead of guessing from a product catalogue.", inputs: ["Academic stage", "Objective", "Timeline", "Routine & constraints"], decisions: ["Is there enough information to continue?", "Does the request require pharmacist review?"], outputs: ["Structured student profile", "Escalation / continue state"], not: "Not a diagnosis. Not a treatment decision. Not an ingredient recommender." },
  { id: "program", label: "PROGRAM ENGINE", title: "Define the intervention", icon: GitBranch, tone: "violet", problem: "Maps a validated student context to a versioned program framework.", inputs: ["Student profile", "Approved objectives", "Program catalogue"], decisions: ["Which program version applies?", "Is the program approved?"], outputs: ["Program ID + version", "Eligibility state"], not: "Does not invent a formulation or bypass approval gates." },
  { id: "formulation", label: "FORMULATION ENGINE", title: "Build the product", icon: FlaskConical, tone: "amber", problem: "Separates the commercial program from the underlying component set.", inputs: ["Program version", "Component set", "Dose rules", "Evidence package"], decisions: ["Which formulation version is valid?", "Are all governance gates satisfied?"], outputs: ["Formulation version", "Governance state"], not: "Ingredient stacks are not hard-coded into the decision engine." },
  { id: "governance", label: "EVIDENCE • SAFETY • REGULATORY", title: "Control what can ship", icon: ShieldCheck, tone: "emerald", problem: "Creates explicit gates between an idea and a commercially usable formulation.", inputs: ["Evidence review", "Safety review", "Regulatory review", "Quality review"], decisions: ["Approved?", "Changes required?", "Rejected / archived?"], outputs: ["Governance decision", "Reviewer record"], not: "No commercial readiness without the required approvals." },
  { id: "experience", label: "DAILY EXPERIENCE", title: "Turn the design into a routine", icon: Boxes, tone: "sky", problem: "Defines how an approved program becomes understandable for a student.", inputs: ["Approved program", "Instructions", "Education", "Pack rules"], decisions: ["What does the student see each day?", "What needs human intervention?"], outputs: ["Daily pack specification", "Education flow", "Feedback signals"], not: "This lab is not pretending to be the final consumer storefront." },
  { id: "network", label: "CAMPUS NETWORK", title: "Learn from real use", icon: Users, tone: "rose", problem: "Connects students, pharmacists and campus operations into a learning system.", inputs: ["Student feedback", "Pharmacist feedback", "Campus signals", "Operational data"], decisions: ["What should change?", "What needs investigation?"], outputs: ["Product insights", "Content needs", "Operational requirements"], not: "Feedback informs design; it does not override clinical, safety or regulatory controls." },
];

const principles = [
  ["01", "Architecture before interface", "The site describes the system we intend to build. It is not a mock storefront."],
  ["02", "Rules before ingredients", "Programs and formulations are versioned objects with explicit governance."],
  ["03", "Human control stays visible", "Pharmacist review and escalation are part of the architecture, not hidden edge cases."],
  ["04", "Unknowns stay unknown", "Unvalidated pricing, formulations, claims and launch assumptions remain explicitly unresolved."],
];

export default function App() {
  const [selected, setSelected] = useState(architecture[0]);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-[#f6f7fb]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white"><PlusMark /></div>
            <div><div className="text-sm font-black tracking-[.18em]">CAREFLUX</div><div className="text-[10px] font-bold tracking-[.22em] text-indigo-600">STUDENT / LAB</div></div>
          </div>
          <div className="hidden items-center gap-6 text-xs font-bold text-slate-500 md:flex"><span>PRODUCT BLUEPRINT</span><span>ARCHITECTURE</span><span>DECISION SYSTEM</span><span>GOVERNANCE</span></div>
          <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-black tracking-[.14em] text-amber-700">DESIGN MODE</div>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-white px-5 py-12 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-black tracking-[.12em] text-indigo-700"><Sparkles size={14} /> PRODUCT ARCHITECTURE LAB</div>
              <h1 className="max-w-5xl text-5xl font-black leading-[.95] tracking-[-.045em] sm:text-6xl lg:text-8xl">What exactly are we<br /><span className="text-indigo-600">building?</span></h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">Careflux Student is being designed here before it becomes a website, an operating model or a physical product. This is the place to interrogate the idea, expose its rules, identify its unknowns and decide what needs to be built next.</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-xl shadow-slate-900/10">
              <div className="flex items-center gap-3 text-indigo-300"><BrainCircuit size={20} /><span className="text-xs font-black tracking-[.16em]">THE DESIGN QUESTION</span></div>
              <p className="mt-5 text-2xl font-black leading-tight">“Can we turn a student's situation into a safe, evidence-led, versioned program — and eventually deliver that program simply?”</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-bold"><div className="rounded-xl bg-white/10 p-3">INPUT<br /><span className="font-normal text-slate-300">Student context</span></div><div className="rounded-xl bg-white/10 p-3">OUTPUT<br /><span className="font-normal text-slate-300">Approved program</span></div></div>
            </div>
          </div>
        </section>

        <section className="px-5 py-10 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-7 flex items-end justify-between gap-5"><div><p className="text-[11px] font-black tracking-[.18em] text-indigo-600">SYSTEM MAP</p><h2 className="mt-2 text-3xl font-black tracking-tight">The product is a system, not a page.</h2></div><p className="hidden max-w-md text-right text-sm leading-6 text-slate-500 md:block">Click any node to inspect its purpose, inputs, decisions, outputs and boundaries.</p></div>
            <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm lg:p-7">
              <div className="min-w-[1080px]">
                <div className="grid grid-cols-6 gap-3">
                  {architecture.map((node, index) => {
                    const Icon = node.icon;
                    const active = selected.id === node.id;
                    return <div key={node.id} className="relative">
                      <button onClick={() => setSelected(node)} className={`group w-full rounded-2xl border p-4 text-left transition ${active ? "border-indigo-400 bg-indigo-50 shadow-md" : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"}`}>
                        <div className="flex items-start justify-between"><div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm"><Icon size={18} /></div><span className="text-[9px] font-black text-slate-300">0{index + 1}</span></div>
                        <div className="mt-5 text-[10px] font-black tracking-[.12em] text-indigo-600">{node.label}</div>
                        <div className="mt-1 text-sm font-black leading-tight">{node.title}</div>
                      </button>
                      {index < architecture.length - 1 && <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-slate-300 lg:block" size={18} />}
                    </div>;
                  })}
                </div>
                <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center text-[10px] font-black tracking-[.14em] text-slate-400"><div className="h-px bg-slate-200" /><span>FEEDBACK • VERSIONING • HUMAN REVIEW • LEARNING</span><div className="h-px bg-slate-200" /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-12 lg:px-8 lg:pb-16">
          <div className="mx-auto grid max-w-[1500px] gap-5 lg:grid-cols-[.8fr_1.2fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white">
              <div className="flex items-center gap-2 text-indigo-300"><PanelTop size={18} /><span className="text-[10px] font-black tracking-[.16em]">SELECTED NODE</span></div>
              <div className="mt-5 text-xs font-black tracking-[.14em] text-indigo-300">{selected.label}</div>
              <h2 className="mt-2 text-3xl font-black">{selected.title}</h2>
              <p className="mt-4 leading-7 text-slate-300">{selected.problem}</p>
              <div className="mt-7 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300"><LockKeyhole size={15} /> Boundaries are part of the design.</div>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <InspectCard title="INPUTS" icon={Database} items={selected.inputs} />
              <InspectCard title="DECISIONS" icon={GitBranch} items={selected.decisions} />
              <InspectCard title="OUTPUTS" icon={Network} items={selected.outputs} />
              <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-6 sm:col-span-3"><div className="flex items-center gap-2 text-rose-700"><CircleAlert size={17} /><span className="text-[10px] font-black tracking-[.16em]">EXPLICITLY NOT DESIGNED TO DO</span></div><p className="mt-3 text-sm font-semibold leading-6 text-rose-900">{selected.not}</p></div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-5 py-14 lg:px-8 lg:py-18">
          <div className="mx-auto max-w-[1500px]"><div className="max-w-2xl"><p className="text-[11px] font-black tracking-[.18em] text-indigo-600">DESIGN RULES</p><h2 className="mt-2 text-4xl font-black tracking-tight">Things we should not lose while building.</h2></div><div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{principles.map(([num, title, copy]) => <div key={num} className="rounded-[1.5rem] border border-slate-200 p-6"><div className="text-xs font-black text-indigo-600">{num}</div><h3 className="mt-8 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{copy}</p></div>)}</div></div>
        </section>

        <section className="px-5 py-14 lg:px-8 lg:py-20"><div className="mx-auto max-w-[1500px] rounded-[2rem] border border-slate-200 bg-[#eef2ff] p-7 sm:p-10"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center"><div><p className="text-[11px] font-black tracking-[.18em] text-indigo-600">NEXT BUILD SURFACE</p><h2 className="mt-2 text-3xl font-black">From architecture → executable product.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">The next layers should make each node editable and testable: requirements, rules, data contracts, governance records, prototype flows and eventually the operational interfaces that people will actually use.</p></div><div className="grid gap-2 text-xs font-bold sm:grid-cols-2 lg:w-[420px]"><BuildItem text="Requirements registry" /><BuildItem text="Decision-rule editor" /><BuildItem text="Program versioning" /><BuildItem text="Governance workspace" /><BuildItem text="Prototype simulator" /><BuildItem text="Operational surfaces" /></div></div></div></section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-3 text-xs text-slate-400 sm:flex-row"><span className="font-bold">Careflux Student — Product Architecture Lab</span><span>Design artifact. Not a consumer storefront. Unvalidated assumptions remain uncommitted.</span></div></footer>
    </div>
  );
}

function InspectCard({ title, icon: Icon, items }: { title: string; icon: typeof Database; items: string[] }) {
  return <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6"><div className="flex items-center gap-2 text-slate-400"><Icon size={16} /><span className="text-[10px] font-black tracking-[.16em]">{title}</span></div><div className="mt-5 space-y-3">{items.map(item => <div key={item} className="flex gap-2 text-sm font-semibold leading-5"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-indigo-500" />{item}</div>)}</div></div>;
}

function BuildItem({ text }: { text: string }) {
  return <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-2.5"><span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />{text}</div>;
}

function PlusMark() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14" /></svg>;
}
