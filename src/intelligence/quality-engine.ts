import { isQualityApproved, type QualityDefinition } from "../domain/quality.js";
import { qualityRegistry } from "../quality/registry.js";

export interface QualityInspection {
  definition: QualityDefinition;
  approved: boolean;
  blockedBy: string[];
}

export function inspectQuality(definition: QualityDefinition): QualityInspection {
  const blockedBy: string[] = [];

  if (definition.status !== "approved") blockedBy.push("Quality approval");
  if (definition.gate.decision !== "approved") blockedBy.push("Quality review gate");
  if (definition.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (definition.formulationId === null) blockedBy.push("Formulation reference");
  if (definition.specificationReferences.length === 0) blockedBy.push("Controlled specification");
  if (definition.releaseCriteria.length === 0) blockedBy.push("Release criteria");
  if (definition.traceabilityRequirements.length === 0) blockedBy.push("Traceability requirements");

  return {
    definition,
    approved: isQualityApproved(definition),
    blockedBy,
  };
}

export function inspectQualityDefinitions(): QualityInspection[] {
  return qualityRegistry.map(inspectQuality);
}

export function qualitySummary() {
  const inspections = inspectQualityDefinitions();
  return {
    definitions: inspections.length,
    approved: inspections.filter((item) => item.approved).length,
    specified: inspections.filter((item) => item.definition.specificationReferences.length > 0).length,
    blocked: inspections.filter((item) => !item.approved).length,
  };
}
