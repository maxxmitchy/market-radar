import { useMemo, useState } from "react";
import { ArrowUpRight, CircleStop, GitBranch, ShieldCheck, UserRound, X } from "lucide-react";
import { decisionRules, sortDecisionRules, type DecisionRule } from "../domain/decision-rules.js";

const actionMeta = {
  continue: { label: "CONTINUE", icon: ArrowUpRight, className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  review: { label: "HUMAN REVIEW", icon: UserRound, className: "bg-amber-50 text-amber-700 border-amber-200" },
  stop: { label: "STOP", icon: CircleStop, className: "bg-rose-50 text-rose-700 border-rose-200" },
};

export function DecisionRulesPanel({ onClose }: { onClose: () => void }) {
  const rules = useMemo(() => sortDecisionRules(), []);
  const [selectedId, setSelectedId] = useState(rules[0]?.id ?? "");
  const selected: DecisionRule | undefined = rules.find((rule) => rule.id === selectedId);

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/50 p-4 backdrop-blur-sm sm:p-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8f9fc] shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div><div className="flex items-center gap-2 text-indigo-600"><GitBranch size={16} /><span className="text-[10px] font-black tracking-[.16em]">DECISION SYSTEM</span></div><h2 className="mt-1 text-2xl font-black">Decision rules</h2><p className="mt-1 text-xs text-slate-500">Inspect the rules before they become software behavior.</p></div>
          <button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close"><X size={18} /></button>
        </header>
        <div className="grid min-h-0 flex-1 md:grid-cols-[.8fr_1.2fr]">
          <div className="overflow-y-auto border-r border-slate-200 bg-white p-4">
            <div className="mb-3 text-[10px] font-black tracking-[.14em] text-slate-400">{rules.length} RULES • PRIORITY ORDER</div>
            <div className="space-y-2">{rules.map((rule) => { const meta = actionMeta[rule.action]; return <button key={rule.id} onClick={() => setSelectedId(rule.id)} className={`w-full rounded-xl border p-4 text-left ${selectedId === rule.id ? "border-indigo-300 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}`}><div className="flex items-center justify-between gap-3"><span className="text-sm font-black">{rule.name}</span><span className="text-[9px] font-black text-slate-400">P{rule.priority}</span></div><div className="mt-2 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">{rule.stage.replace("-", " ")} · {rule.status}</div></button>; })}</div>
          </div>
          {selected ? <div className="overflow-y-auto p-6 sm:p-8"><div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black tracking-[.12em] ${actionMeta[selected.action].className}`}>{(() => { const Icon = actionMeta[selected.action].icon; return <Icon size={13} />; })()}{actionMeta[selected.action].label}</div><h3 className="mt-5 text-3xl font-black">{selected.name}</h3><p className="mt-2 text-sm font-bold text-indigo-600">{selected.stage.replace("-", " ").toUpperCase()} · PRIORITY {selected.priority}</p><div className="mt-8 grid gap-4"><Detail label="Condition" value={selected.condition} /><Detail label="Why this rule exists" value={selected.rationale} /><Detail label="Status" value={selected.status} /><div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2 text-slate-400"><ShieldCheck size={15} /><span className="text-[10px] font-black tracking-[.15em]">CONTROL PRINCIPLE</span></div><p className="mt-3 text-sm leading-6 text-slate-600">A rule is a product-design artifact. It should be testable, versioned and reviewable before it is allowed to control a production workflow.</p></div></div></div> : <div className="grid place-items-center p-8 text-sm text-slate-400">No rule selected.</div>}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="text-[10px] font-black tracking-[.15em] text-slate-400">{label}</div><p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{value}</p></div>; }
