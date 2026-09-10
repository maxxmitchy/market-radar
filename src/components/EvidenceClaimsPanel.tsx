import { X, ShieldCheck, FileSearch, AlertTriangle } from "lucide-react";
import { inspectClaims, evidenceSummary } from "../intelligence/evidence-engine.js";

interface EvidenceClaimsPanelProps {
  onClose: () => void;
}

export function EvidenceClaimsPanel({ onClose }: EvidenceClaimsPanelProps) {
  const summary = evidenceSummary();
  const claims = inspectClaims();

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="mx-auto my-8 max-w-5xl rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 p-6 md:p-8">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-indigo-600">EVIDENCE & CLAIMS</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Claims must be traceable, not invented</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              This layer connects a formulation version to an explicit claim, the evidence supporting it, evidence quality, and accountable human review. The blueprint does not create clinical evidence or approve claims automatically.
            </p>
          </div>
          <button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close evidence and claims panel"><X size={18} /></button>
        </div>

        <div className="grid gap-3 p-6 md:grid-cols-4 md:p-8">
          <Metric label="Evidence records" value={summary.evidenceCount} />
          <Metric label="Reviewed evidence" value={summary.reviewedEvidenceCount} />
          <Metric label="Claims" value={summary.claimCount} />
          <Metric label="Ready claims" value={summary.readyClaimCount} />
        </div>

        <div className="mx-6 mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 md:mx-8 md:mb-8">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 shrink-0 text-amber-700" size={19} />
            <div>
              <p className="font-black text-amber-950">Current control point: nothing is claim-ready.</p>
              <p className="mt-1 text-sm leading-6 text-amber-900">The registry intentionally contains placeholders only. Evidence must be sourced, assessed, reviewed, and linked to a precise claim before the claim can become approved.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 p-6 md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-700"><FileSearch size={19} /></div>
            <div>
              <h3 className="font-black text-slate-950">Traceability chain</h3>
              <p className="text-xs text-slate-500">Formulation version → Claim → Evidence → Quality → Review → Approved claim</p>
            </div>
          </div>

          <div className="space-y-4">
            {claims.map(({ claim, ready, evidenceCount, blockedBy }) => (
              <div key={claim.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Claim v{claim.version} · {claim.formulationId}</p>
                    <p className="mt-2 max-w-3xl font-bold leading-6 text-slate-900">{claim.statement}</p>
                  </div>
                  <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${ready ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>
                    {ready ? <ShieldCheck size={14} /> : null}{ready ? "READY" : "BLOCKED"}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <Gate label="Lifecycle" value={claim.lifecycle} />
                  <Gate label="Linked evidence" value={String(evidenceCount)} />
                  <Gate label="Reviewer" value={claim.reviewerId ?? "Not assigned"} />
                </div>

                {!ready && blockedBy.length > 0 && (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Blocking gates</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {blockedBy.map((item) => <span key={item} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">{item}</span>)}
                    </div>
                  </div>
                )}

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Unresolved questions</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {claim.unresolvedQuestions.map((question) => <li key={question}>• {question}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
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
