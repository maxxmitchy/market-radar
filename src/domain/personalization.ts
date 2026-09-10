export type PersonalizationStatus = "draft" | "review" | "approved" | "retired";
export type PersonalizationDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface PersonalizationGate {
  decision: PersonalizationDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface PersonalizationDefinition {
  id: string;
  version: number;
  programId: string | null;
  formulationId: string | null;
  status: PersonalizationStatus;
  permittedSignals: string[];
  permittedChanges: string[];
  prohibitedChanges: string[];
  reviewTriggers: string[];
  dataRequirements: string[];
  gate: PersonalizationGate;
  unresolvedQuestions: string[];
}

export function isPersonalizationApproved(definition: PersonalizationDefinition): boolean {
  return (
    definition.status === "approved" &&
    definition.gate.decision === "approved" &&
    definition.gate.reviewerId !== null &&
    definition.programId !== null &&
    definition.formulationId !== null &&
    definition.permittedSignals.length > 0 &&
    definition.permittedChanges.length > 0 &&
    definition.prohibitedChanges.length > 0 &&
    definition.reviewTriggers.length > 0
  );
}
