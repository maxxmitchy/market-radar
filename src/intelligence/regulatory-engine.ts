import { regulatoryRegistry } from "../regulatory/registry.js";
import { isRegulatoryApproved, type RegulatoryDefinition } from "../domain/regulatory.js";

export interface RegulatoryInspection {
  definition: RegulatoryDefinition;
  approved: boolean;
  blockedBy: string[];
}

export function inspectRegulatory(definition: RegulatoryDefinition): RegulatoryInspection {
  const blockedBy: string[] = [];
  if (definition.status !== "approved") blockedBy.push("Regulatory approval");
  if (definition.gate.decision !== "approved") blockedBy.push("Regulatory review gate");
  if (definition.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (definition.productClassification === null) blockedBy.push("Product classification");
  if (definition.intendedUse === null) blockedBy.push("Intended use");
  if (definition.permittedClaims.length === 0) blockedBy.push("Permitted claims");

  return { definition, approved: isRegulatoryApproved(definition), blockedBy };
}

export function inspectRegulatoryDefinitions(): RegulatoryInspection[] {
  return regulatoryRegistry.map(inspectRegulatory);
}

export function regulatorySummary() {
  const inspections = inspectRegulatoryDefinitions();
  return {
    definitions: inspections.length,
    approved: inspections.filter((item) => item.approved).length,
    classified: inspections.filter((item) => item.definition.productClassification !== null).length,
    blocked: inspections.filter((item) => !item.approved).length,
  };
}
