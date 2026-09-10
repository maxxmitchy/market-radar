import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ArchitectureLedger } from './components/ArchitectureLedger.tsx';
import { CampusPanel } from './components/CampusPanel.tsx';
import { DailyExperiencePanel } from './components/DailyExperiencePanel.tsx';
import { DecisionRulesPanel } from './components/DecisionRulesPanel.tsx';
import { DecisionSimulator } from './components/DecisionSimulator.tsx';
import { EducationPanel } from './components/EducationPanel.tsx';
import { EvidenceClaimsPanel } from './components/EvidenceClaimsPanel.tsx';
import { FormulationBlueprintPanel } from './components/FormulationBlueprintPanel.tsx';
import { FulfillmentPanel } from './components/FulfillmentPanel.tsx';
import { LabDashboard } from './components/LabDashboard.tsx';
import { LabNavigator, type LabSurface } from './components/LabNavigator.tsx';
import { PackGenerationPanel } from './components/PackGenerationPanel.tsx';
import { PersonalizationPanel } from './components/PersonalizationPanel.tsx';
import { ProgramBlueprintPanel } from './components/ProgramBlueprintPanel.tsx';
import { QualityPanel } from './components/QualityPanel.tsx';
import { RegulatoryPanel } from './components/RegulatoryPanel.tsx';
import { RequirementsPanel } from './components/RequirementsPanel.tsx';
import { SafetyEscalationPanel } from './components/SafetyEscalationPanel.tsx';
import { StudentCheck } from './components/StudentCheck.tsx';
import './index.css';

function Root() {
  const [surface, setSurface] = useState<LabSurface | null>(null);
  return (
    <>
      <App />
      <LabNavigator onOpen={setSurface} />
      {surface === 'dashboard' && <LabDashboard onClose={() => setSurface(null)} />}
      {surface === 'simulator' && <DecisionSimulator onClose={() => setSurface(null)} />}
      {surface === 'student-check' && <StudentCheck onClose={() => setSurface(null)} />}
      {surface === 'program' && <ProgramBlueprintPanel onClose={() => setSurface(null)} />}
      {surface === 'daily' && <DailyExperiencePanel onClose={() => setSurface(null)} />}
      {surface === 'formulation' && <FormulationBlueprintPanel onClose={() => setSurface(null)} />}
      {surface === 'evidence' && <EvidenceClaimsPanel onClose={() => setSurface(null)} />}
      {surface === 'safety' && <SafetyEscalationPanel onClose={() => setSurface(null)} />}
      {surface === 'regulatory' && <RegulatoryPanel onClose={() => setSurface(null)} />}
      {surface === 'quality' && <QualityPanel onClose={() => setSurface(null)} />}
      {surface === 'personalization' && <PersonalizationPanel onClose={() => setSurface(null)} />}
      {surface === 'pack-generation' && <PackGenerationPanel onClose={() => setSurface(null)} />}
      {surface === 'fulfillment' && <FulfillmentPanel onClose={() => setSurface(null)} />}
      {surface === 'education' && <EducationPanel onClose={() => setSurface(null)} />}
      {surface === 'campus' && <CampusPanel onClose={() => setSurface(null)} />}
      {surface === 'rules' && <DecisionRulesPanel onClose={() => setSurface(null)} />}
      {surface === 'requirements' && <RequirementsPanel onClose={() => setSurface(null)} />}
      {surface === 'ledger' && <ArchitectureLedger onClose={() => setSurface(null)} />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><Root /></StrictMode>);
