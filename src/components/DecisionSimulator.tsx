import { useMemo, useState } from "react";
import { CircleStop, FlaskConical, Play, UserRound, X } from "lucide-react";
import type { AcademicStage, EatingRoutine, ProgramDuration, SleepQuality, StudentObjective } from "../domain/student.js";
import { simulateStudentDecision } from "../intelligence/decision-simulator.js";

const stages: AcademicStage[] = ["semester", "assignments", "tests", "exams", "final-year", "professional-exams", "break"];
const objectives: StudentObjective[] = ["daily-routine", "demanding-period", "exam-period", "recovery-routine"];
const eating: EatingRoutine[] = ["fairly-well", "irregular", "skipping-meals", "very-inconsistent"];
const sleep: SleepQuality[] = ["good", "sometimes-poor", "frequently-poor"];

export function DecisionSimulator({ onClose }: { onClose: () => void }) {
  const [academicStage, setAcademicStage] = useState<AcademicStage>("semester");
  const [objective, setObjective] = useState<StudentObjective>("daily-routine");
  const [duration, setDuration] = useState<ProgramDuration>(14);
  const [eatingRoutine, setEatingRoutine] = useState<EatingRoutine>("fairly-well");
  const [sleepQuality, setSleepQuality] = useState<SleepQuality>("good");
  const [review, setReview] = useState(false);
  const [run, setRun] = useState(false);

  const profile = useMemo(() => ({ academicStage, objective, duration, eatingRoutine, sleepQuality, pharmacistReviewRequested: review }), [academicStage, objective, duration, eatingRoutine, sleepQuality, review]);
  const simulation = useMemo(() => simulateStudentDecision(profile), [profile]);
  const outcomeMeta = { continue: { label: "CONTINUE", className: "border-emerald-200 bg-emerald-50 text-emerald-800" }, review: { label: "HUMAN REVIEW", className: "border-amber-200 bg-amber-50 text-amber-800" }, stop: { label: "STOP", className: "border-rose-200 bg-rose-50 text-rose-800" } }[simulation.outcome];

  return <div className="fixed inset-0 z-[75] bg-slate-950/50 p-4 backdrop-blur-sm sm:p-8">
    <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8f9fc] shadow-2xl">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5"><div><div className="flex items-center gap-2 text-indigo-600"><FlaskConical size={16}/><span className="text-[10px] font-black tracking-[.16em]">PROTOTYPE SIMULATOR</span></div><h2 className="mt-1 text-2xl font-black">Run a student scenario</h2><p className="mt-1 text-xs text-slate-500">Test product logic without pretending this is a clinical recommendation.</p></div><button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"><X size={18}/></button></header>
      <div className="grid min-h-0 flex-1 lg:grid-cols-[.85fr_1.15fr]">
        <div className="overflow-y-auto border-r border-slate-200 bg-white p-6"><div className="space-y-5">
          <Field label="Academic stage"><select value={academicStage} onChange={e => setAcademicStage(e.target.value as AcademicStage)}>{stages.map(v => <option key={v}>{v}</option>)}</select></Field>
          <Field label="Objective"><select value={objective} onChange={e => setObjective(e.target.value as StudentObjective)}>{objectives.map(v => <option key={v}>{v}</option>)}</select></Field>
          <Field label="Program duration"><select value={duration} onChange={e => setDuration(Number(e.target.value) as ProgramDuration)}><option value={0}>Not selected</option><option value={7}>7 days</option><option value={14}>14 days</option><option value={30}>30 days</option></select></Field>
          <Field label="Eating routine"><select value={eatingRoutine} onChange={e => setEatingRoutine(e.target.value as EatingRoutine)}>{eating.map(v => <option key={v}>{v}</option>)}</select></Field>
          <Field label="Sleep quality"><select value={sleepQuality} onChange={e => setSleepQuality(e.target.value as SleepQuality)}>{sleep.map(v => <option key={v}>{v}</option>)}</select></Field>
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4"><span><span className="block text-sm font-black">Pharmacist review requested</span><span className="text-xs text-slate-500">Forces the human-control path.</span></span><input type="checkbox" checked={review} onChange={e => setReview(e.target.checked)} className="h-5 w-5"/></label>
          <button onClick={() => setRun(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-black text-white hover:bg-indigo-700"><Play size={15}/> {run ? "RE-RUN SCENARIO" : "RUN SCENARIO"}</button>
        </div></div>
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className={`rounded-2xl border p-5 ${outcomeMeta.className}`}><div className="text-[10px] font-black tracking-[.16em]">CURRENT ENGINE OUTCOME</div><div className="mt-2 text-3xl font-black">{outcomeMeta.label}</div><p className="mt-2 text-sm font-semibold leading-6">{simulation.recommendation.title}</p></div>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2 text-slate-400"><UserRound size={15}/><span className="text-[10px] font-black tracking-[.15em]">RECOMMENDATION TRACE</span></div><p className="mt-3 text-sm leading-6 text-slate-600">{simulation.recommendation.reason}</p><p className="mt-3 text-xs font-bold text-indigo-600">NEXT: {simulation.recommendation.nextStep}</p></div>
          <div className="mt-6"><div className="mb-3 text-[10px] font-black tracking-[.15em] text-slate-400">RULE EVALUATION</div><div className="space-y-2">{simulation.trace.map(step => <div key={step.ruleId} className={`flex items-start gap-3 rounded-xl border p-4 ${step.matched ? "border-indigo-200 bg-indigo-50" : "border-slate-200 bg-white"}`}><div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${step.matched ? "bg-indigo-500" : "bg-slate-300"}/><div><div className="text-sm font-black">{step.ruleName}</div><div className="mt-1 text-xs text-slate-500">{step.explanation}</div></div>{step.matched && <CircleStop size={15} className="ml-auto shrink-0 text-indigo-600"/>}</div>)}</div></div>
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-4 text-xs leading-5 text-slate-500">This simulator exposes current product rules. It is a design/testing surface, not a clinical decision-maker.</div>
        </div>
      </div>
    </div>
  </div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-[10px] font-black tracking-[.14em] text-slate-400">{label}</span><div className="[&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-slate-200 [&_select]:bg-white [&_select]:px-3 [&_select]:py-3 [&_select]:text-sm [&_select]:font-semibold">{children}</div></label>; }
