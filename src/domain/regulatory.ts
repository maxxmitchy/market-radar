export type RegulatoryStatus = "draft" | "review" | "approved" | "rejected" | "retired";
export type RegulatoryDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface RegulatoryGate {
  decision: RegulatoryDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface RegulatoryDefinition {
  id: string;
  version: number;
  programId: string;
  formulationId: string | null;
  status: RegulatoryStatus;
  jurisdiction: string;
  productClassification: string | null;
  intendedUse: string | null;
  permittedClaims: string[];
  prohibitedClaims: string[];
  labelingRequirements: string[];
  gate: RegulatoryGate;
  unresolvedQuestions: string[];
}

export function isRegulatoryApproved(definition: RegulatoryDefinition): boolean {
  return definition.status === "approved" && definition.gate.decision === "approved" && definition.gate.reviewerId !== null;
}
