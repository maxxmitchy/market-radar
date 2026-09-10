import { campusRegistry } from "../campus/registry.js";
import { isCampusApproved, type CampusDefinition } from "../domain/campus.js";

export interface CampusInspection {
  definition: CampusDefinition;
  approved: boolean;
  blockedBy: string[];
}

export function inspectCampus(definition: CampusDefinition): CampusInspection {
  const blockedBy: string[] = [];
  if (definition.status !== "approved") blockedBy.push("Campus approval");
  if (definition.gate.decision !== "approved") blockedBy.push("Campus review gate");
  if (definition.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (definition.programId === "") blockedBy.push("Program reference");
  if (definition.accessModel.length === 0) blockedBy.push("Access model");
  if (definition.participantRoles.length === 0) blockedBy.push("Participant roles");
  if (definition.privacyBoundaries.length === 0) blockedBy.push("Privacy boundaries");
  if (definition.escalationBoundaries.length === 0) blockedBy.push("Escalation boundaries");

  return { definition, approved: isCampusApproved(definition), blockedBy };
}

export function inspectCampusDefinitions(): CampusInspection[] {
  return campusRegistry.map(inspectCampus);
}

export function campusSummary() {
  const inspections = inspectCampusDefinitions();
  return {
    definitions: inspections.length,
    approved: inspections.filter((item) => item.approved).length,
    blocked: inspections.filter((item) => !item.approved).length,
  };
}
