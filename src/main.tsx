import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ArchitectureLedger } from './components/ArchitectureLedger.tsx';
import { DailyExperiencePanel } from './components/DailyExperiencePanel.tsx';
import { DecisionRulesPanel } from './components/DecisionRulesPanel.tsx';
import { DecisionSimulator } from './components/DecisionSimulator.tsx';
import { EvidenceClaimsPanel } from './components/EvidenceClaimsPanel.tsx';
import { FormulationBlueprintPanel } from './components/FormulationBlueprintPanel.tsx';
import { LabDashboard } from './components/LabDashboard.tsx';
import { ProgramBlueprintPanel } from './components/ProgramBlueprintPanel.tsx';
import { RequirementsPanel } from './components/RequirementsPanel.tsx';
import { StudentCheck } from './components/StudentCheck.tsx';
import './index.css';

function Root() {
  const [showStudentCheck, setShowStudentCheck] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [showProgramBlueprint, setShowProgramBlueprint] = useState(false);
  const [showDailyExperience, setShowDailyExperience] = useState(false);
  const [showFormulationBlueprint, setShowFormulationBlueprint] = useState(false);
  const [showEvidenceClaims, setShowEvidenceClaims] = useState(false);

  return (
    <>
      <App />
      <div className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-2rem)] flex-wrap justify-end gap-2">
        <button onClick={() => setShowDashboard(true)} className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-3 text-xs font-black text-indigo-800 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-indigo-300">Lab Status</button>
        <button onClick={() => setShowSimulator(true)} className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-black text-emerald-800 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-emerald-300">Scenario Simulator</button>
        <button onClick={() => setShowProgramBlueprint(true)} className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-3 text-xs font-black text-cyan-800 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-cyan-300">Program Blueprint</button>
        <button onClick={() => setShowDailyExperience(true)} className="rounded-full border border-orange-200 bg-orange-50 px-4 py-3 text-xs font-black text-orange-800 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-orange-300">Daily Experience</button>
        <button onClick={() => setShowFormulationBlueprint(true)} className="rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-3 text-xs font-black text-fuchsia-800 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-fuchsia-300">Formulation Blueprint</button>
        <button onClick={() => setShowEvidenceClaims(true)} className="rounded-full border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-black text-amber-800 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-amber-300">Evidence & Claims</button>
        <button onClick={() => setShowRules(true)} className="rounded-full border border-violet-200 bg-violet-50 px-4 py-3 text-xs font-black text-violet-800 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-violet-300">Decision Rules</button>
        <button onClick={() => setShowRequirements(true)} className="rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-900 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-indigo-300">Product Requirements</button>
        <button onClick={() => setShowLedger(true)} className="rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-900 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-indigo-300">Architecture Ledger</button>
        <button onClick={() => setShowStudentCheck(true)} className="rounded-full bg-slate-950 px-4 py-3 text-xs font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-indigo-700" aria-label="Open Student Check prototype">Student Check</button>
      </div>
      {showDashboard && <LabDashboard onClose={() => setShowDashboard(false)} />}
      {showSimulator && <DecisionSimulator onClose={() => setShowSimulator(false)} />}
      {showProgramBlueprint && <ProgramBlueprintPanel onClose={() => setShowProgramBlueprint(false)} />}
      {showDailyExperience && <DailyExperiencePanel onClose={() => setShowDailyExperience(false)} />}
      {showFormulationBlueprint && <FormulationBlueprintPanel onClose={() => setShowFormulationBlueprint(false)} />}
      {showEvidenceClaims && <EvidenceClaimsPanel onClose={() => setShowEvidenceClaims(false)} />}
      {showRules && <DecisionRulesPanel onClose={() => setShowRules(false)} />}
      {showRequirements && <RequirementsPanel onClose={() => setShowRequirements(false)} />}
      {showLedger && <ArchitectureLedger onClose={() => setShowLedger(false)} />}
      {showStudentCheck && <StudentCheck onClose={() => setShowStudentCheck(false)} />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Root /></StrictMode>);
