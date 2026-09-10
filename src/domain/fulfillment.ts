export type FulfillmentStatus = "draft" | "ready" | "allocated" | "assembled" | "handoff" | "completed" | "exception" | "cancelled";
export type FulfillmentDecision = "pending" | "approved" | "changes-required" | "blocked";

export interface FulfillmentGate {
  decision: FulfillmentDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface FulfillmentDefinition {
  id: string;
  version: number;
  programId: string;
  formulationId: string | null;
  packGenerationId: string | null;
  status: FulfillmentStatus;
  allocationRequirements: string[];
  assemblyRequirements: string[];
  handoffRequirements: string[];
  traceabilityRequirements: string[];
  exceptionRules: string[];
  gate: FulfillmentGate;
  unresolvedQuestions: string[];
}

export function isFulfillmentReady(definition: FulfillmentDefinition): boolean {
  return (
    definition.status === "ready" &&
    definition.gate.decision === "approved" &&
    definition.gate.reviewerId !== null &&
    definition.formulationId !== null &&
    definition.packGenerationId !== null &&
    definition.allocationRequirements.length > 0 &&
    definition.assemblyRequirements.length > 0 &&
    definition.handoffRequirements.length > 0 &&
    definition.traceabilityRequirements.length > 0
  );
}
