export type GovernanceStatus =
  | "draft"
  | "evidence-review"
  | "safety-review"
  | "regulatory-review"
  | "approved"
  | "rejected"
  | "archived";

export type ReviewDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface ReviewGate {
  decision: ReviewDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface FormulationDefinition {
  id: string;
  version: number;
  name: string;
  status: GovernanceStatus;
  componentSetId: string | null;
  evidence: ReviewGate;
  safety: ReviewGate;
  regulatory: ReviewGate;
  quality: ReviewGate;
  createdAt: string;
  updatedAt: string;
}

export function isCommerciallyReady(formulation: FormulationDefinition): boolean {
  return (
    formulation.status === "approved" &&
    formulation.componentSetId !== null &&
    formulation.evidence.decision === "approved" &&
    formulation.safety.decision === "approved" &&
    formulation.regulatory.decision === "approved" &&
    formulation.quality.decision === "approved"
  );
}
