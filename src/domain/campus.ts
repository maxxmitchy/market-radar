export type CampusStatus = "draft" | "review" | "approved" | "retired";
export type CampusDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface CampusGate {
  decision: CampusDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface CampusDefinition {
  id: string;
  version: number;
  programId: string;
  status: CampusStatus;
  purpose: string;
  accessModel: string[];
  participantRoles: string[];
  educationTouchpoints: string[];
  feedbackSignals: string[];
  conductBoundaries: string[];
  privacyBoundaries: string[];
  escalationBoundaries: string[];
  gate: CampusGate;
  unresolvedQuestions: string[];
}

export function isCampusApproved(definition: CampusDefinition): boolean {
  return definition.status === "approved" && definition.gate.decision === "approved" && definition.gate.reviewerId !== null;
}
