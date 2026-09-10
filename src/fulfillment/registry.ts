import type { FulfillmentDefinition, FulfillmentGate } from "../domain/fulfillment.js";

const pendingGate = (): FulfillmentGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const fulfillmentRegistry: FulfillmentDefinition[] = [
  {
    id: "student-foundation-fulfillment-v1",
    version: 1,
    programId: "student-foundation",
    formulationId: "student-foundation-v1",
    packGenerationId: "student-foundation-pack-generation-v1",
    status: "draft",
    allocationRequirements: [
      "Only an approved pack-generation definition may enter fulfillment.",
      "Allocation must preserve program, formulation, and pack-version identity.",
    ],
    assemblyRequirements: [
      "Fulfillment must use the approved generated pack specification without changing its governed contents.",
      "Assembly records must retain the identifiers required for traceability.",
    ],
    handoffRequirements: [
      "The handoff state must identify the intended recipient or permitted delivery destination.",
      "Completion must record the fulfillment outcome without implying clinical administration or adherence.",
    ],
    traceabilityRequirements: [
      "A fulfilled unit must remain traceable to its program, formulation, pack-generation version, and fulfillment record.",
    ],
    exceptionRules: [
      "Do not substitute an unapproved formulation, pack definition, or component during fulfillment.",
      "A traceability failure blocks handoff until resolved.",
      "Operational exceptions must not bypass safety, regulatory, quality, or pharmacist-review controls.",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "What operational system will own inventory allocation and fulfillment state?",
      "Which handoff events must be recorded for a campus pilot?",
      "What service-level rules apply when a generated daily unit cannot be fulfilled?",
      "How should failed, returned, or replaced units affect traceability?",
    ],
  },
];

export function getFulfillmentDefinition(id: string): FulfillmentDefinition | null {
  return fulfillmentRegistry.find((definition) => definition.id === id) ?? null;
}
