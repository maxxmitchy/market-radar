import { isPersonalizationApproved, type PersonalizationDefinition } from "../domain/personalization.js";
import { personalizationRegistry } from "../personalization/registry.js";

export interface PersonalizationInspection {
  definition: PersonalizationDefinition;
  approved: boolean;
  blockedBy: string[];
}

export function inspectPersonalization(definition: PersonalizationDefinition): PersonalizationInspection {
  const blockedBy: string[] = [];

  if (definition.status !== "approved") blockedBy.push("Personalization approval");
  if (definition.gate.decision !== "approved") blockedBy.push("Personalization review gate");
  if (definition.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (definition.programId === null) blockedBy.push("Program reference");
  if (definition.formulationId === null) blockedBy.push("Formulation reference");
  if (definition.permittedSignals.length === 0) blockedBy.push("Permitted signals");
  if (definition.permittedChanges.length === 0) blockedBy.push("Permitted changes");
  if (definition.prohibitedChanges.length === 0) blockedBy.push("Prohibited changes");
  if (definition.reviewTriggers.length === 0) blockedBy.push("Review triggers");

  return {
    definition,
    approved: isPersonalizationApproved(definition),
    blockedBy,
  };
}

export function inspectPersonalizationDefinitions(): PersonalizationInspection[] {
  return personalizationRegistry.map(inspectPersonalization);
}

export function personalizationSummary() {
  const inspections = inspectPersonalizationDefinitions();
  return {
    definitions: inspections.length,
    approved: inspections.filter((item) => item.approved).length,
    blocked: inspections.filter((item) => !item.approved).length,
  };
}
