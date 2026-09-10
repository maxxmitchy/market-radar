import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ArchitectureLedger } from './components/ArchitectureLedger.tsx';
import { StudentCheck } from './components/StudentCheck.tsx';
import './index.css';

function Root() {
  const [showStudentCheck, setShowStudentCheck] = useState(false);
  const [showLedger, setShowLedger] = useState(false);

  return (
    <>
      <App />
      <div className="fixed bottom-5 right-5 z-50 flex gap-2">
        <button
          onClick={() => setShowLedger(true)}
          className="rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-900 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-indigo-300"
        >
          Architecture Ledger
        </button>
        <button
          onClick={() => setShowStudentCheck(true)}
          className="rounded-full bg-slate-950 px-4 py-3 text-xs font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
          aria-label="Open Student Check prototype"
        >
          Student Check
        </button>
      </div>
      {showLedger && <ArchitectureLedger onClose={() => setShowLedger(false)} />}
      {showStudentCheck && <StudentCheck onClose={() => setShowStudentCheck(false)} />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
