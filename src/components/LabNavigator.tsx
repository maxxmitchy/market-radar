import { useState } from "react";
import { Boxes, BrainCircuit, ChevronRight, ClipboardCheck, FileBox, FileText, FlaskConical, GitBranch, LayoutDashboard, Menu, Network, ShieldAlert, SlidersHorizontal, Sparkles, UserRoundCog, X, type LucideIcon } from "lucide-react";

export type LabSurface =
  | "dashboard"
  | "simulator"
  | "student-check"
  | "program"
  | "daily"
  | "formulation"
  | "evidence"
  | "safety"
  | "regulatory"
  | "quality"
  | "personalization"
  | "pack-generation"
  | "rules"
  | "requirements"
  | "ledger";

interface LabNavigatorProps {
  onOpen: (surface: LabSurface) => void;
}

interface LabGroup {
  label: string;
  hint: string;
  items: Array<[LabSurface, string, LucideIcon]>;
}

const groups: LabGroup[] = [
  {
    label: "UNDERSTAND",
    hint: "Start here",
    items: [
      ["dashboard", "Lab Status", LayoutDashboard],
      ["student-check", "Student Check", SlidersHorizontal],
      ["simulator", "Scenario Simulator", BrainCircuit],
    ],
  },
  {
    label: "DEFINE",
    hint: "Shape the product",
    items: [
      ["program", "Program Blueprint", GitBranch],
      ["daily", "Daily Experience", Boxes],
      ["formulation", "Formulation Blueprint", FlaskConical],
    ],
  },
  {
    label: "CONTROL",
    hint: "Decide what can proceed",
    items: [
      ["evidence", "Evidence & Claims", FileText],
      ["safety", "Safety & Escalation", ShieldAlert],
      ["regulatory", "Regulatory Blueprint", Network],
      ["quality", "Quality Blueprint", ClipboardCheck],
    ],
  },
  {
    label: "OPERATE",
    hint: "Translate approved design into a permitted experience",
    items: [
      ["personalization", "Personalization Blueprint", UserRoundCog],
      ["pack-generation", "Pack Generation Blueprint", FileBox],
    ],
  },
  {
    label: "BUILD THE SYSTEM",
    hint: "Keep the architecture coherent",
    items: [
      ["rules", "Decision Rules", Sparkles],
      ["requirements", "Product Requirements", FileText],
      ["ledger", "Architecture Ledger", Network],
    ],
  },
];

export function LabNavigator({ onOpen }: LabNavigatorProps) {
  const [open, setOpen] = useState(false);

  const choose = (surface: LabSurface) => {
    setOpen(false);
    onOpen(surface);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <div className="absolute bottom-14 right-0 mb-3 w-[min(92vw,420px)] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 sm:bottom-16 sm:w-[420px]">
          <div className="border-b border-slate-200 bg-slate-950 p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black tracking-[0.18em] text-indigo-300">CAREFLUX STUDENT / LAB</p>
                <h2 className="mt-1 text-lg font-black">Where do you want to inspect?</h2>
                <p className="mt-1 text-xs leading-5 text-slate-300">Move through the product in the same order we are designing it.</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full border border-white/10 p-2 text-slate-300 hover:bg-white/10" aria-label="Close lab navigator"><X size={16} /></button>
            </div>
          </div>

          <div className="max-h-[68vh] overflow-y-auto p-3 sm:max-h-[620px] sm:p-4">
            {groups.map((group) => (
              <section key={group.label} className="mb-4 last:mb-0">
                <div className="px-2 pb-2">
                  <p className="text-[10px] font-black tracking-[0.16em] text-indigo-600">{group.label}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{group.hint}</p>
                </div>
                <div className="grid gap-1">
                  {group.items.map(([surface, label, Icon]) => (
                    <button key={surface} onClick={() => choose(surface)} className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition group-hover:border-indigo-200 group-hover:text-indigo-600"><Icon size={16} /></span>
                      <span className="min-w-0 flex-1 text-sm font-bold text-slate-800">{label}</span>
                      <ChevronRight size={15} className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" />
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}

      <button onClick={() => setOpen((value) => !value)} className="flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-xs font-black text-white shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-indigo-700" aria-expanded={open} aria-label="Open lab navigator">
        <Menu size={15} />
        <span>LAB NAVIGATOR</span>
      </button>
    </div>
  );
}
