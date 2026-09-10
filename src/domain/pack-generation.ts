export type PackGenerationStatus = "draft" | "review" | "approved" | "retired";
export type PackGenerationDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface PackGenerationGate {
  decision: PackGenerationDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface PackGenerationDefinition {
  id: string;
  version: number;
  programId: string | null;
  formulationId: string | null;
  dailyExperienceId: string | null;
  status: PackGenerationStatus;
  packIdentityRequirements: string[];
  assemblyRules: string[];
  traceabilityRequirements: string[];
  prohibitedChanges: string[];
  exceptionRules: string[];
  gate: PackGenerationGate;
  unresolvedQuestions: string[];
}

export function isPackGenerationApproved(definition: PackGenerationDefinition): boolean {
  return (
    definition.status === "approved" &&
    definition.gate.decision === "approved" &&
    definition.gate.reviewerId !== null &&
    definition.programId !== null &&
    definition.formulationId !== null &&
    definition.dailyExperienceId !== null &&
    definition.packIdentityRequirements.length > 0 &&
    definition.assemblyRules.length > 0 &&
    definition.traceabilityRequirements.length > 0 &&
    definition.prohibitedChanges.length > 0
  );
}
