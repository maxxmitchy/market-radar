export type PhysicalPilotStatus = "draft" | "review" | "approved" | "rejected" | "retired";
export type PhysicalPilotDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface PilotGate {
  decision: PhysicalPilotDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface PhysicalPilotDefinition {
  id: string;
  version: number;
  programId: string;
  productSpecificationId: string | null;
  status: PhysicalPilotStatus;
  purpose: string;
  entryCriteria: string[];
  participantRequirements: string[];
  operatingArtifacts: string[];
  observationSignals: string[];
  stopConditions: string[];
  learningOutputs: string[];
  gate: PilotGate;
  unresolvedQuestions: string[];
}

export function isPhysicalPilotApproved(pilot: PhysicalPilotDefinition): boolean {
  return pilot.status === "approved" && pilot.gate.decision === "approved" && pilot.gate.reviewerId !== null && pilot.productSpecificationId !== null;
}
