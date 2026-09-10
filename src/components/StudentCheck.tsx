import { useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, GraduationCap, Moon, ShieldCheck, Sparkles, Target, Utensils, X } from "lucide-react";
import type { AcademicStage, EatingRoutine, ProgramDuration, SleepQuality, StudentObjective, StudentProfile, StudentRecommendation } from "../domain/student.js";

type StageChoice = { id: AcademicStage; label: string; description?: string };
type Choice = { id: string; label: string; description?: string };

const stages: StageChoice[] = [
  { id: "semester", label: "A new semester" },
  { id: "assignments", label: "Tests & assignments" },
  { id: "tests", label: "Continuous assessment" },
  { id: "exams", label: "Exams", description: "Preparing to write or currently writing exams" },
  { id: "final-year", label: "Final-year project" },
  { id: "professional-exams", label: "Professional exams" },
  { id: "break", label: "Academic break" },
];

const objectives: Choice[] = [
  { id: "daily-routine", label: "Build a simple daily wellness routine" },
  { id: "demanding-period", label: "Stay consistent during a demanding period" },
  { id: "exam-period", label: "Keep my routine simple around exams" },
  { id: "recovery-routine", label: "Get back to a routine after a busy period" },
];

const durationChoices: Array<{ id: ProgramDuration; label: string; description: string }> = [
  { id: 7, label: "7 days", description: "Start small" },
  { id: 14, label: "14 days", description: "A two-week routine" },
  { id: 30, label: "30 days", description: "A full month" },
  { id: 0, label: "More than 30 days", description: "I'll decide later" },
];

const routines: Array<{ id: EatingRoutine; label: string }> = [
  { id: "fairly-well", label: "Eating fairly well" },
  { id: "irregular", label: "Meals are irregular" },
  { id: "skipping-meals", label: "Often skipping meals" },
  { id: "very-inconsistent", label: "Very inconsistent" },
];

const sleep: Array<{ id: SleepQuality; label: string }> = [
  { id: "good", label: "Good" },
  { id: "sometimes-poor", label: "Sometimes poor" },
  { id: "frequently-poor", label: "Frequently poor" },
];

const objectiveLabels = new Map(objectives.map((item) => [item.id, item.label]));

export function StudentCheck({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<AcademicStage | null>(null);
  const [objective, setObjective] = useState<StudentObjective | null>(null);
  const [duration, setDuration] = useState<ProgramDuration | null>(null);
  const [routine, setRoutine] = useState<EatingRoutine | null>(null);
  const [sleepQuality, setSleepQuality] = useState<SleepQuality | null>(null);
  const [needsReview, setNeedsReview] = useState(false);
  const [recommendation, setRecommendation] = useState<StudentRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const progress = Math.round((step / 6) * 100);
  const answers = [stage, objective, duration, routine, sleepQuality];
  const canContinue = answers[step] !== null && answers[step] !== undefined;

  const profile = useMemo(() => ({
    stage: stages.find((item) => item.id === stage)?.label ?? "Not selected",
    objective: objective ? objectiveLabels.get(objective) ?? objective : "Not selected",
    duration: duration === 0 ? "More than 30 days" : duration ? `${duration} days` : "Not selected",
    routine: routines.find((item) => item.id === routine)?.label ?? "Not selected",
    sleep: sleep.map((item) => item.id === sleepQuality ? item.label : "").find(Boolean) ?? "Not selected",
  }), [stage, objective, duration, routine, sleepQuality]);

  const submitProfile = async (reviewRequested: boolean) => {
    if (!stage || !objective || duration === null || !routine || !sleepQuality) return;
    setNeedsReview(reviewRequested);
    setLoading(true);
    setError(false);

    const payload: StudentProfile = {
      academicStage: stage,
      objective,
      duration,
      eatingRoutine: routine,
      sleepQuality,
      pharmacistReviewRequested: reviewRequested,
    };

    try {
      const response = await fetch("/api/student/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Recommendation request failed");
      const data = await response.json() as { recommendation?: StudentRecommendation };
      if (!data.recommendation) throw new Error("Missing recommendation");
      setRecommendation(data.recommendation);
      setStep(6);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (step < 5) setStep((current) => current + 1);
  };

  const back = () => setStep((current) => Math.max(0, current - 1));

  const restart = () => {
    setStep(0);
    setStage(null);
    setObjective(null);
    setDuration(null);
    setRoutine(null);
    setSleepQuality(null);
    setNeedsReview(false);
    setRecommendation(null);
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Careflux Student Check">
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-[#fbfaf7] shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 py-4">
          <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#111827] text-white"><span className="text-xl font-black">+</span></div><div><div className="text-xs font-black tracking-[.18em]">CAREFLUX STUDENT</div><div className="text-[10px] font-semibold text-slate-400">60-SECOND STUDENT CHECK</div></div></div>
          <button onClick={onClose} className="rounded-xl p-2 hover:bg-slate-100" aria-label="Close"><X size={20} /></button>
        </div>

        {step < 6 && <div className="h-1 bg-slate-100"><div className="h-1 bg-indigo-600 transition-all" style={{ width: `${Math.max(8, progress)}%` }} /></div>}

        <div className="overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
          {step === 0 && <Question icon={GraduationCap} eyebrow="01 · ACADEMIC CONTEXT" title="What are you preparing for?" subtitle="Start with where you are in your student journey."><ChoiceList options={stages} value={stage} onChange={(value) => setStage(value as AcademicStage)} /></Question>}
          {step === 1 && <Question icon={Target} eyebrow="02 · OBJECTIVE" title="What would you like your routine to support?" subtitle="Choose the closest description. Careflux uses this for program matching, not diagnosis."><ChoiceList options={objectives} value={objective} onChange={(value) => setObjective(value as StudentObjective)} /></Question>}
          {step === 2 && <Question icon={Clock3} eyebrow="03 · DURATION" title="How much time are you planning for?" subtitle="This helps shape the length of any future approved program."><ChoiceList options={durationChoices} value={duration === null ? null : String(duration)} onChange={(value) => setDuration(Number(value) as ProgramDuration)} /></Question>}
          {step === 3 && <Question icon={Utensils} eyebrow="04 · ROUTINE" title="How would you describe your current eating routine?" subtitle="This is for suitability and personalization—not diagnosis."><ChoiceList options={routines} value={routine} onChange={(value) => setRoutine(value as EatingRoutine)} /></Question>}
          {step === 4 && <Question icon={Moon} eyebrow="05 · SLEEP" title="How is your sleep?" subtitle="We use this to understand your current routine, not to diagnose a sleep problem."><ChoiceList options={sleep} value={sleepQuality} onChange={(value) => setSleepQuality(value as SleepQuality)} /></Question>}
          {step === 5 && <SafetyQuestion loading={loading} error={error} onSelect={submitProfile} />}
          {step === 6 && <Result profile={profile} recommendation={recommendation} onRestart={restart} onClose={onClose} />}
        </div>

        {step < 5 && <div className="flex items-center justify-between border-t border-black/5 bg-white px-6 py-4 sm:px-10"><button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-slate-500 disabled:invisible"><ArrowLeft size={17} /> Back</button><button onClick={next} disabled={!canContinue} className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-30">Continue <ArrowRight size={17} /></button></div>}
      </div>
    </div>
  );
}

function Question({ icon: Icon, eyebrow, title, subtitle, children }: { icon: typeof GraduationCap; eyebrow: string; title: string; subtitle: string; children: ReactNode }) {
  return <div><div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><Icon size={21} /></div><p className="mt-6 text-xs font-black uppercase tracking-[.2em] text-indigo-600">{eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2><p className="mt-3 max-w-xl leading-7 text-slate-500">{subtitle}</p><div className="mt-7 grid gap-3">{children}</div></div>;
}

function ChoiceList({ options, value, onChange }: { options: Choice[]; value: string | null; onChange: (value: string) => void }) {
  return <div className="grid gap-3">{options.map((option) => { const selected = value === option.id; return <button key={option.id} onClick={() => onChange(option.id)} className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${selected ? "border-indigo-500 bg-indigo-50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"}`}><div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${selected ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 bg-white"}`}>{selected && <Check size={16} />}</div><div><div className="font-bold">{option.label}</div>{option.description && <div className="mt-1 text-sm text-slate-500">{option.description}</div>}</div></button>; })}</div>;
}

function SafetyQuestion({ loading, error, onSelect }: { loading: boolean; error: boolean; onSelect: (review: boolean) => void }) {
  return <Question icon={ShieldCheck} eyebrow="06 · SAFETY CHECK" title="Anything a pharmacist should consider first?" subtitle="Careflux pauses personalization whenever professional review is requested."><div className="grid gap-3"><button disabled={loading} onClick={() => onSelect(false)} className="rounded-2xl border border-slate-200 bg-white p-5 text-left hover:border-slate-300 disabled:opacity-50"><div className="font-bold">No relevant medicines or health concerns to flag</div><div className="mt-1 text-sm text-slate-500">Continue to the program match.</div></button><button disabled={loading} onClick={() => onSelect(true)} className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left hover:border-amber-300 disabled:opacity-50"><div className="font-bold text-amber-900">Yes — I'd like a pharmacist to review first</div><div className="mt-1 text-sm text-amber-800">This pauses the recommendation until professional review.</div></button>{loading && <div className="rounded-2xl bg-slate-100 p-4 text-sm font-bold text-slate-600">Matching your profile…</div>}{error && <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">We couldn't complete the match right now. Please try again.</div>}</div></Question>;
}

function Result({ profile, recommendation, onRestart, onClose }: { profile: { stage: string; objective: string; duration: string; routine: string; sleep: string }; recommendation: StudentRecommendation | null; onRestart: () => void; onClose: () => void }) {
  if (!recommendation) return <div><h2 className="text-3xl font-black">No result available.</h2><button onClick={onRestart} className="mt-6 rounded-full bg-[#111827] px-5 py-3 text-sm font-bold text-white">Retake check</button></div>;

  const review = recommendation.status === "pharmacist-review";
  const matched = recommendation.status === "no-match" && Boolean(recommendation.programId);

  return <div><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700"><Sparkles size={14} /> PROGRAM MATCH RESULT</div><h2 className="text-3xl font-black tracking-tight sm:text-4xl">{recommendation.title}</h2><p className="mt-4 max-w-xl leading-7 text-slate-500">{recommendation.reason}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{[["Academic stage", profile.stage],["Objective", profile.objective],["Program duration", profile.duration],["Routine", profile.routine],["Sleep", profile.sleep]].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</div><div className="mt-1 font-bold">{value}</div></div>)}</div><div className={`mt-6 rounded-3xl p-6 ${review ? "bg-amber-50 text-amber-950" : "bg-[#111827] text-white"}`}><div className="text-xs font-black uppercase tracking-[.2em] opacity-70">Next step</div><div className="mt-2 text-xl font-black">{recommendation.nextStep}</div>{recommendation.matchedSignals.length > 0 && <ul className="mt-4 grid gap-2 text-sm opacity-80">{recommendation.matchedSignals.map((signal) => <li key={signal}>• {signal}</li>)}</ul>}{matched && <p className="mt-4 text-sm opacity-70">The framework is identified, but the program remains unavailable until its formulation and required approvals are complete.</p>}</div><div className="mt-7 flex flex-wrap gap-3"><button onClick={onRestart} className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold">Retake check</button><button onClick={onClose} className="rounded-full bg-[#111827] px-5 py-3 text-sm font-bold text-white">Continue exploring</button></div></div>;
}
