import { useState } from "react";
import { CircleStop, Play, UserRound } from "lucide-react";
import { sortDecisionRules, type RuleAction } from "../domain/decision-rules.js";
import { DecisionSimulator } from "./DecisionSimulator.js";

export function RuleSimulator() {
  const [showSimulator, setShowSimulator] = useState(false);

  return (
    <section className="rounded-[2rem] border border-violet-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-[10px] font-black tracking-[.16em] text-violet-600">RULE SIMULATOR</p>
          <h2 className="mt-2 text-2xl font-black">Interrogate the decision system.</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Change hypothetical inputs and see the architecture's current stop/review behavior. This is a product-design simulator, not clinical advice.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-500">{sortDecisionRules().length} RULES</span>
      </div>
      
      <div className="mt-7">
        <button 
          onClick={() => setShowSimulator(true)} 
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-950 px-8 py-4 text-sm font-black text-white hover:bg-violet-700"
        >
          <Play size={16}/>
          Open Simulator
        </button>
      </div>

      {showSimulator && <DecisionSimulator onClose={() => setShowSimulator(false)} />}
    </section>
  );
}
