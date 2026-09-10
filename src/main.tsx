import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { StudentCheck } from './components/StudentCheck.tsx';
import './index.css';

function Root() {
  const [showStudentCheck, setShowStudentCheck] = useState(false);

  return (
    <>
      <App />
      <button
        onClick={() => setShowStudentCheck(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3.5 text-sm font-black text-white shadow-xl shadow-indigo-900/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
        aria-label="Open Careflux Student Check"
      >
        Find my plan
      </button>
      {showStudentCheck && <StudentCheck onClose={() => setShowStudentCheck(false)} />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
