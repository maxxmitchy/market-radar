import { AlertOctagon, ShieldAlert, X } from "lucide-react";
import { safetySummary, inspectSafetyDefinitions } from "../intelligence/safety-engine.js";

interface SafetyEscalationPanelProps {
  onClose: () => void;
}

export function SafetyEscalationPanel({ onClose }: SafetyEscalationPanelProps) {
  const summary = safetySummary();
  const inspections = inspectSafetyDefinitions();

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="mx-auto my-8 max-w-5xl rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 p-6 md:p-8">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-rose-600">SAFETY & ESCALATION</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Safety is a gate, not a disclaimer</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">The safety layer defines review triggers, prohibited behaviors, escalation pathways, and accountable approval. It prevents the program engine from quietly becoming a diagnostic or treatment system.</p>
          </div>
          <button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close safety panel"><X size={18} /></button>
        </div>

        <div className="grid gap-3 p-6 md:grid-cols-4 md:p-8">
          <Metric label="Safety definitions" value={summary.definitions} />
          <Metric label="Approved" value={summary.approved} />
          <Metric label="Escalation configured" value={summary.escalationConfigured} />
          <Metric label="Blocked" value={summary.blocked} />
        </div>

        <div className="mx-6 mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-5 md:mx-8 md:mb-8">
          <div className="flex gap-3">
            <AlertOctagon className="mt-0.5 shrink-0 text-rose-700" size={19} />
            <div>
              <p className="font-black text-rose-950">Current control point: safety is not approved.</p>
              <p className="mt-1 text-sm leading-6 text-rose-900">A program cannot be treated as commercially or operationally ready until its safety review, accountable reviewer, review triggers, and escalation design are explicitly defined.</p>
            </div>
          </div>
        </div>

        {inspections.map(({ definition, approved, escalationConfigured, blockedBy }) => (
          <div key={definition.id} className="border-t border-slate-200 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{definition.id} · v{definition.version}</p>
                <h3 className="mt-1 text-lg font-black text-slate-950">Program safety contract</h3>
              </div>
              <span className={`rounded-full px-3 py-1.5 text-xs font-black ${approved ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{approved ? "APPROVED" : "BLOCKED"}</span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Gate label="Lifecycle" value={definition.status} />
              <Gate label="Review decision" value={definition.gate.decision} />
              <Gate label="Reviewer" value={definition.gate.reviewerId ?? "Not assigned"} />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <ListBlock title="Review triggers" items={definition.reviewTriggers} />
              <ListBlock title="Prohibited behaviors" items={definition.prohibitedBehaviors} />
              <ListBlock title="Escalation pathways" items={definition.escalationLevels} />
              <ListBlock title="Blocking gates" items={blockedBy} empty={approved ? "None" : undefined} />
            </div>

            <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <div className="flex gap-3"><ShieldAlert className="mt-0.5 shrink-0 text-indigo-700" size={18} /><p className="text-sm leading-6 text-indigo-950">Escalation is a product behavior: the system must know when to stop, what human pathway to invoke, and what it must not do while waiting for review.</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{value}</p></div>;
}

function Gate({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-3"><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-sm font-bold text-slate-800">{value}</p></div>;
}

function ListBlock({ title, items, empty = "Not defined" }: { title: string; items: string[]; empty?: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[11px] font-black uppercase tracking-wider text-slate-500">{title}</p><ul className="mt-2 space-y-1 text-sm leading-5 text-slate-700">{items.length ? items.map((item) => <li key={item}>• {item}</li>) : <li>{empty}</li>}</ul></div>;
}
