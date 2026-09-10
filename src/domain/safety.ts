export type SafetyStatus = "draft" | "review" | "approved" | "rejected" | "retired";
export type EscalationLevel = "none" | "pharmacist-review" | "clinical-referral" | "urgent-care";
export type SafetyDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface SafetyGate {
  decision: SafetyDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface SafetyDefinition {
  id: string;
  version: number;
  programId: string;
  status: SafetyStatus;
  gate: SafetyGate;
  reviewTriggers: string[];
  prohibitedBehaviors: string[];
  escalationLevels: EscalationLevel[];
  unresolvedQuestions: string[];
}

export function isSafetyApproved(definition: SafetyDefinition): boolean {
  return definition.status === "approved" && definition.gate.decision === "approved" && definition.gate.reviewerId !== null;
}

export function requiresEscalation(definition: SafetyDefinition): boolean {
  return definition.escalationLevels.some((level) => level !== "none");
}
