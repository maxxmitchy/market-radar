import { fulfillmentRegistry } from "../fulfillment/registry.js";
import { isFulfillmentReady, type FulfillmentDefinition } from "../domain/fulfillment.js";

export interface FulfillmentInspection {
  definition: FulfillmentDefinition;
  ready: boolean;
  blockedBy: string[];
}

export function inspectFulfillment(definition: FulfillmentDefinition): FulfillmentInspection {
  const blockedBy: string[] = [];
  if (definition.status !== "ready") blockedBy.push("Fulfillment readiness");
  if (definition.gate.decision !== "approved") blockedBy.push("Fulfillment review gate");
  if (definition.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (definition.formulationId === null) blockedBy.push("Formulation reference");
  if (definition.packGenerationId === null) blockedBy.push("Pack-generation reference");
  if (definition.allocationRequirements.length === 0) blockedBy.push("Allocation requirements");
  if (definition.assemblyRequirements.length === 0) blockedBy.push("Assembly requirements");
  if (definition.handoffRequirements.length === 0) blockedBy.push("Handoff requirements");
  if (definition.traceabilityRequirements.length === 0) blockedBy.push("Traceability requirements");

  return { definition, ready: isFulfillmentReady(definition), blockedBy };
}

export function inspectFulfillmentDefinitions(): FulfillmentInspection[] {
  return fulfillmentRegistry.map(inspectFulfillment);
}

export function fulfillmentSummary() {
  const inspections = inspectFulfillmentDefinitions();
  return {
    definitions: inspections.length,
    ready: inspections.filter((item) => item.ready).length,
    blocked: inspections.filter((item) => !item.ready).length,
  };
}
