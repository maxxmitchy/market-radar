export type EducationStatus = "draft" | "review" | "approved" | "retired";
export type EducationDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface EducationGate {
  decision: EducationDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface EducationDefinition {
  id: string;
  version: number;
  programId: string;
  dailyExperienceId: string | null;
  status: EducationStatus;
  purpose: string;
  learningObjectives: string[];
  deliveryMoments: string[];
  contentBoundaries: string[];
  personalizationBoundaries: string[];
  safetyBoundaries: string[];
  traceabilityRequirements: string[];
  gate: EducationGate;
  unresolvedQuestions: string[];
}

export function isEducationApproved(definition: EducationDefinition): boolean {
  return definition.status === "approved" && definition.gate.decision === "approved" && definition.gate.reviewerId !== null;
}
