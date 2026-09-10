export type FeedbackStatus = "draft" | "review" | "approved" | "retired";
export type FeedbackDecision = "pending" | "approved" | "changes-required" | "rejected";
export type FeedbackSignalType = "student" | "pharmacist" | "campus" | "operations";

export interface FeedbackGate {
  decision: FeedbackDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface FeedbackDefinition {
  id: string;
  version: number;
  programId: string;
  status: FeedbackStatus;
  purpose: string;
  signalTypes: FeedbackSignalType[];
  captureMoments: string[];
  structuredSignals: string[];
  routingRules: string[];
  learningOutputs: string[];
  privacyBoundaries: string[];
  safetyBoundaries: string[];
  governanceBoundaries: string[];
  gate: FeedbackGate;
  unresolvedQuestions: string[];
}

export function isFeedbackApproved(definition: FeedbackDefinition): boolean {
  return definition.status === "approved" && definition.gate.decision === "approved" && definition.gate.reviewerId !== null;
}
