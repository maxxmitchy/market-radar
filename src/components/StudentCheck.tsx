import { useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, GraduationCap, Moon, ShieldCheck, Sparkles, Utensils, X } from "lucide-react";

type Stage = "semester" | "assignments" | "tests" | "exams" | "final-year" | "professional-exams" | "break";
type Choice = { id: string; label: string; description?: string };

const stages: Choice[] = [
  { id: "semester", label: "A new semester" },
  { id: "assignments", label: "Tests & assignments" },
  { id: "tests", label: "Continuous assessment" },
  { id: "exams", label: "Exams", description: "Preparing to write or currently writing exams" },
  { id: "final-year", label: "Final-year project" },
  { id: "professional-exams", label: "Professional exams" },
  { id: "break", label: "Academic break" },
];

const durations = ["7 days", "14 days", "30 days", "More than 30 days"];
const routines = ["Eating fairly well", "Meals are irregular", "Often skipping meals", "Very inconsistent"];
const sleep = ["Good", "Sometimes poor", "Frequently poor"];

export function StudentCheck({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<Stage | null>(null);
  const [duration, setDuration] = useState("");
  const [routine, setRoutine] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");
  const [needsReview, setNeedsReview] = useState(false);

  const progress = Math.round((step / 5) * 100);
  const canContinue = [stage, duration, routine, sleepQuality][step] !== null && Boolean([stage, duration, routine, sleepQuality][step]);

  const profile = useMemo(() => ({
    stage: stages.find((item) => item.id === stage)?.label ?? "Not selected",
    duration,
    routine,
    sleep: sleepQuality,
  }), [stage, duration, routine, sleepQuality]);

  const next = () => {
    if (step < 4) setStep((current) => current + 1);
    else setStep(5);
  };

  const back = () => setStep((current) => Math.max(0, current - 1));

  const restart = () => {
    setStep(0);
    setStage(null);
    setDuration("");
    setRoutine("");
    setSleepQuality("");
    setNeedsReview(false);
  };

  const selectSafety = (review: boolean) => {
    setNeedsReview(review);
    setStep(5);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Careflux Student Check">
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-[#fbfaf7] shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 py-4">
          <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#111827] text-white"><span className="text-xl font-black">+</span></div><div><div className="text-xs font-black tracking-[.18em]">CAREFLUX STUDENT</div><div className="text-[10px] font-semibold text-slate-400">60-SECOND STUDENT CHECK</div></div></div>
          <button onClick={onClose} className="rounded-xl p-2 hover:bg-slate-100" aria-label="Close"><X size={20} /></button>
        </div>

        {step < 5 && <div className="h-1 bg-slate-100"><div className="h-1 bg-indigo-600 transition-all" style={{ width: `${Math.max(8, progress)}%` }} /></div>}

        <div className="overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
          {step === 0 && <Question icon={GraduationCap} eyebrow="01 · ACADEMIC CONTEXT" title="What are you preparing for?" subtitle="Start with where you are in your student journey."><ChoiceList options={stages} value={stage} onChange={(value) => setStage(value as Stage)} /></Question>}
          {step === 1 && <Question icon={Clock3} eyebrow="02 · DURATION" title="How much time are you planning for?" subtitle="This helps shape the length of any future approved program."><ChoiceList options={durations.map((label) => ({ id: label, label }))} value={duration} onChange={setDuration} /></Question>}
          {step === 2 && <Question icon={Utensils} eyebrow="03 · ROUTINE" title="How would you describe your current eating routine?" subtitle="This is for suitability and personalization—not diagnosis."><ChoiceList options={routines.map((label) => ({ id: label, label }))} value={routine} onChange={setRoutine} /></Question>}
          {step === 3 && <Question icon={Moon} eyebrow="04 · SLEEP" title="How is your sleep?" subtitle="We use this to understand your current routine, not to diagnose a sleep problem."><ChoiceList options={sleep.map((label) => ({ id: label, label }))} value={sleepQuality} onChange={setSleepQuality} /></Question>}
          {step === 4 && <SafetyQuestion onSelect={selectSafety} />}
          {step === 5 && <Result profile={profile} needsReview={needsReview} onRestart={restart} onClose={onClose} />}
        </div>

        {step < 4 && <div className="flex items-center justify-between border-t border-black/5 bg-white px-6 py-4 sm:px-10"><button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-slate-500 disabled:invisible"><ArrowLeft size={17} /> Back</button><button onClick={next} disabled={!canContinue} className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-30">Continue <ArrowRight size={17} /></button></div>}
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

function SafetyQuestion({ onSelect }: { onSelect: (review: boolean) => void }) {
  return <Question icon={ShieldCheck} eyebrow="05 · SAFETY CHECK" title="Anything a pharmacist should consider first?" subtitle="Careflux uses this step to identify when a recommendation should pause for professional review."><div className="grid gap-3"><button onClick={() => onSelect(false)} className="rounded-2xl border border-slate-200 bg-white p-5 text-left hover:border-slate-300"><div className="font-bold">No relevant medicines or health concerns to flag</div><div className="mt-1 text-sm text-slate-500">I can continue to the suitability result.</div></button><button onClick={() => onSelect(true)} className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left hover:border-amber-300"><div className="font-bold text-amber-900">Yes — I'd like a pharmacist to review first</div><div className="mt-1 text-sm text-amber-800">This does not mean something is wrong. It simply pauses personalization until a professional can review it.</div></button></div></Question>;
}

function Result({ profile, needsReview, onRestart, onClose }: { profile: { stage: string; duration: string; routine: string; sleep: string }; needsReview: boolean; onRestart: () => void; onClose: () => void }) {
  return <div><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700"><Sparkles size={14} /> YOUR CURRENT STUDENT PROFILE</div><h2 className="text-3xl font-black tracking-tight sm:text-4xl">{needsReview ? "Let's review this with a pharmacist." : "Your Careflux plan starts with context."}</h2><p className="mt-4 max-w-xl leading-7 text-slate-500">{needsReview ? "We've captured your academic context, but we won't recommend a wellness program until the relevant safety information has been reviewed." : "We've captured where you are right now. The next step is to match this context against Careflux's approved programs and eligibility rules."}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{[["Academic stage", profile.stage],["Program duration", profile.duration],["Routine", profile.routine],["Sleep", profile.sleep]].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</div><div className="mt-1 font-bold">{value}</div></div>)}</div>{!needsReview && <div className="mt-6 rounded-3xl bg-[#111827] p-6 text-white"><div className="text-xs font-black uppercase tracking-[.2em] text-indigo-300">Recommended experience</div><div className="mt-2 text-2xl font-black">Program matching — not product shopping</div><p className="mt-2 text-sm leading-6 text-slate-300">No supplement has been automatically selected here. An approved formulation must exist before Careflux can recommend components.</p></div>}<div className="mt-7 flex flex-wrap gap-3"><button onClick={onRestart} className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold">Retake check</button><button onClick={onClose} className="rounded-full bg-[#111827] px-5 py-3 text-sm font-bold text-white">Continue exploring</button></div></div>;
}
