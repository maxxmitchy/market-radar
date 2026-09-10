import { isPackGenerationApproved, type PackGenerationDefinition } from "../domain/pack-generation.js";
import { packGenerationRegistry } from "../pack-generation/registry.js";

export interface PackGenerationInspection {
  definition: PackGenerationDefinition;
  approved: boolean;
  blockedBy: string[];
}

export function inspectPackGeneration(definition: PackGenerationDefinition): PackGenerationInspection {
  const blockedBy: string[] = [];

  if (definition.status !== "approved") blockedBy.push("Pack generation approval");
  if (definition.gate.decision !== "approved") blockedBy.push("Pack generation review gate");
  if (definition.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (definition.programId === null) blockedBy.push("Program reference");
  if (definition.formulationId === null) blockedBy.push("Formulation reference");
  if (definition.dailyExperienceId === null) blockedBy.push("Daily experience reference");
  if (definition.packIdentityRequirements.length === 0) blockedBy.push("Pack identity requirements");
  if (definition.assemblyRules.length === 0) blockedBy.push("Assembly rules");
  if (definition.traceabilityRequirements.length === 0) blockedBy.push("Traceability requirements");
  if (definition.prohibitedChanges.length === 0) blockedBy.push("Prohibited changes");

  return {
    definition,
    approved: isPackGenerationApproved(definition),
    blockedBy,
  };
}

export function inspectPackGenerationDefinitions(): PackGenerationInspection[] {
  return packGenerationRegistry.map(inspectPackGeneration);
}

export function packGenerationSummary() {
  const inspections = inspectPackGenerationDefinitions();
  return {
    definitions: inspections.length,
    approved: inspections.filter((item) => item.approved).length,
    blocked: inspections.filter((item) => !item.approved).length,
  };
}
