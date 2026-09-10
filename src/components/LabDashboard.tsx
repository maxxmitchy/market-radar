import { BookOpen, Building2, CircleAlert, ClipboardCheck, FileBox, FlaskConical, GitBranch, GraduationCap, ListChecks, PackageCheck, ShieldCheck, UserRoundCog, X } from "lucide-react";
import { formulationRegistry } from "../formulations/registry.js";
import { campusSummary } from "../intelligence/campus-engine.js";
import { educationSummary } from "../intelligence/education-engine.js";
import { fulfillmentSummary } from "../intelligence/fulfillment-engine.js";
import { packGenerationSummary } from "../intelligence/pack-generation-engine.js";
import { personalizationSummary } from "../intelligence/personalization-engine.js";
import { qualitySummary } from "../intelligence/quality-engine.js";
import { requirementSummary } from "../intelligence/requirement-engine.js";

const summary = requirementSummary();
const workstreams = [
  { title: "Decision system", state: "Prototype", detail: "Student context → program candidate is implemented as a deterministic foundation.", icon: GitBranch },
  { title: "Formulation governance", state: "Prototype", detail: "Evidence, safety, regulatory and quality gates exist as typed governance objects.", icon: FlaskConical },
  { title: "Evidence traceability", state: "Needs validation", detail: "The evidence/claims registry still needs to be designed and connected to review records.", icon: ListChecks },
  { title: "Safety & escalation", state: "Defined", detail: "Human review is a first-class control point; the escalation catalogue remains a build target.", icon: ShieldCheck },
  { title: "Personalization", state: "Prototype", detail: "Permitted experience changes are separated from formulation and clinical decision-making.", icon: UserRoundCog },
  { title: "Pack generation", state: "Prototype", detail: "The bridge from approved formulation to a traceable daily unit is defined as a governed contract.", icon: FileBox },
  { title: "Fulfillment", state: "Prototype", detail: "Allocation → assembly → handoff is defined without inventing the physical operating system.", icon: PackageCheck },
  { title: "Education", state: "Prototype", detail: "Program and daily-experience education is defined as a governed, traceable product layer.", icon: GraduationCap },
  { title: "Campus network", state: "Prototype", detail: "Campus access, participant roles, education and feedback are defined without bypassing product controls.", icon: Building2 },
];
const openQuestions = [
  "What exactly constitutes a student situation, and which inputs are required versus optional?",
  "What eligibility rules can safely select a program, and which conditions must always stop automation?",
  "How should evidence, claims, reviewer decisions and versions remain traceable over time?",
  "What is the smallest operational model needed to move an approved program into a real-world pilot?",
];

export function LabDashboard({ onClose }: { onClose: () => void }) {
  const formulation = formulationRegistry[0];
  const quality = qualitySummary();
  const personalization = personalizationSummary();
  const packGeneration = packGenerationSummary();
  const fulfillment = fulfillmentSummary();
  const education = educationSummary();
  const campus = campusSummary();
  const total = summary.defined + summary.prototype + summary["needs-validation"] + summary.unresolved;
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 p-3 backdrop-blur-sm sm:p-4" role="dialog" aria-modal="true" aria-label="Lab dashboard">
      <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-[#f6f7fb] shadow-2xl sm:rounded-[2rem]">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-6 sm:py-5 lg:px-8"><div><div className="text-[10px] font-black tracking-[.18em] text-indigo-600">LAB STATUS</div><h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Where the product stands</h2><p className="mt-1 max-w-2xl text-sm leading-5 text-slate-500">A working view of what is defined, prototyped, validated and still unresolved.</p></div><button onClick={onClose} className="shrink-0 rounded-xl border border-slate-200 p-2 hover:bg-slate-50" aria-label="Close"><X size={20} /></button></header>
        <main className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8">
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Metric label="REQUIREMENTS" value={String(total)} detail={`${summary.defined} defined · ${summary.prototype} prototype`} /><Metric label="NEEDS VALIDATION" value={String(summary["needs-validation"])} detail="Requires explicit design work" /><Metric label="FORMULATIONS" value={String(formulationRegistry.length)} detail={`Current state: ${formulation.status}`} /><Metric label="CAMPUS" value={campus.approved ? "READY" : "BLOCKED"} detail={`${campus.blocked} definition${campus.blocked === 1 ? "" : "s"} blocked`} /></section>
          <section className="mt-8"><div className="mb-4 flex items-end justify-between gap-4"><div><div className="text-[10px] font-black tracking-[.18em] text-indigo-600">WORKSTREAMS</div><h3 className="mt-1 text-2xl font-black">Build state</h3></div><span className="hidden text-xs font-bold text-slate-400 sm:block">Status describes the architecture, not a launch promise.</span></div><div className="grid gap-4 md:grid-cols-2">{workstreams.map(({ title, state, detail, icon: Icon }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-start justify-between gap-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={18} /></div><span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-600">{state}</span></div><h4 className="mt-5 font-black">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p></article>)}</div></section>
          <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_.9fr]"><div className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-2 text-amber-800"><CircleAlert size={17} /><span className="text-[10px] font-black tracking-[.16em]">OPEN QUESTIONS</span></div><div className="mt-4 space-y-3">{openQuestions.map((question, index) => <div key={question} className="flex gap-3 rounded-xl border border-amber-200/70 bg-white/60 p-3"><span className="text-xs font-black text-amber-700">0{index + 1}</span><p className="text-sm font-semibold leading-6 text-amber-950">{question}</p></div>)}</div></div><div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white"><div className="flex items-center gap-2 text-indigo-300"><ClipboardCheck size={16} /><span className="text-[10px] font-black tracking-[.18em]">CURRENT CONTROL POINT</span></div><h3 className="mt-3 text-2xl font-black">Nothing ships just because the concept is attractive.</h3><p className="mt-3 text-sm leading-7 text-slate-300">Program approval, formulation governance, evidence, safety, regulatory, quality, personalization, pack-generation, fulfillment, education and campus controls remain separate from the interface.</p><div className="mt-5 grid grid-cols-2 gap-2 text-xs font-bold"><div className="rounded-xl bg-white/10 p-3">FORMULATION<br /><span className="font-normal text-slate-400">{formulation.name}</span></div><div className="rounded-xl bg-white/10 p-3">OPERATIONS<br /><span className="font-normal text-slate-400">quality {quality.approved ? "approved" : "blocked"} · personalization {personalization.approved ? "approved" : "blocked"} · packs {packGeneration.approved ? "approved" : "blocked"} · fulfillment {fulfillment.ready ? "ready" : "blocked"} · education {education.approved ? "approved" : "blocked"} · campus {campus.approved ? "approved" : "blocked"}</span></div></div></div></section>
        </main>
      </div>
    </div>
  );
}
function Metric({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="text-[10px] font-black tracking-[.16em] text-slate-400">{label}</div><div className="mt-3 text-3xl font-black tracking-tight">{value}</div><div className="mt-1 text-xs font-semibold text-slate-500">{detail}</div></div>; }
