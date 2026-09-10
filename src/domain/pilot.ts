export type PilotStatus = "draft" | "design" | "ready" | "active" | "closed";
export type PilotDecision = "pending" | "approved" | "changes-required" | "stopped";

export interface PilotGate {
  decision: PilotDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface PilotDefinition {
  id: string;
  version: number;
  programId: string;
  status: PilotStatus;
  purpose: string;
  scope: string[];
  entryCriteria: string[];
  participantRoles: string[];
  operatingFlow: string[];
  successSignals: string[];
  learningPlan: string[];
  stopConditions: string[];
  boundaries: string[];
  gate: PilotGate;
  unresolvedQuestions: string[];
}

export function isPilotReady(pilot: PilotDefinition): boolean {
  return pilot.status === "ready" && pilot.gate.decision === "approved" && pilot.gate.reviewerId !== null;
}
