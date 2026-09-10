export type QualityStatus = "draft" | "review" | "approved" | "rejected" | "retired";
export type QualityDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface QualityGate {
  decision: QualityDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface QualityDefinition {
  id: string;
  version: number;
  formulationId: string | null;
  status: QualityStatus;
  specificationReferences: string[];
  releaseCriteria: string[];
  traceabilityRequirements: string[];
  gate: QualityGate;
  unresolvedQuestions: string[];
}

export function isQualityApproved(definition: QualityDefinition): boolean {
  return (
    definition.status === "approved" &&
    definition.gate.decision === "approved" &&
    definition.gate.reviewerId !== null &&
    definition.formulationId !== null &&
    definition.specificationReferences.length > 0 &&
    definition.releaseCriteria.length > 0 &&
    definition.traceabilityRequirements.length > 0
  );
}
