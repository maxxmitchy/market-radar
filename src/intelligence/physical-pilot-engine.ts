import { isPhysicalPilotApproved, type PhysicalPilotDefinition } from "../domain/physical-pilot.js";
import { physicalPilotRegistry } from "../pilot/physical-registry.js";

export interface PhysicalPilotInspection {
  pilot: PhysicalPilotDefinition;
  approved: boolean;
  blockedBy: string[];
}

export function inspectPhysicalPilot(pilot: PhysicalPilotDefinition): PhysicalPilotInspection {
  const blockedBy: string[] = [];
  if (pilot.status !== "approved") blockedBy.push("Pilot approval");
  if (pilot.gate.decision !== "approved") blockedBy.push("Pilot review gate");
  if (pilot.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (pilot.productSpecificationId === null) blockedBy.push("Product specification reference");
  if (pilot.entryCriteria.length === 0) blockedBy.push("Entry criteria");
  if (pilot.operatingArtifacts.length === 0) blockedBy.push("Operating artifacts");
  if (pilot.stopConditions.length === 0) blockedBy.push("Stop conditions");

  return { pilot, approved: isPhysicalPilotApproved(pilot), blockedBy };
}

export function inspectPhysicalPilots(): PhysicalPilotInspection[] {
  return physicalPilotRegistry.map(inspectPhysicalPilot);
}

export function physicalPilotSummary() {
  const inspections = inspectPhysicalPilots();
  return {
    definitions: inspections.length,
    approved: inspections.filter((item) => item.approved).length,
    blocked: inspections.filter((item) => !item.approved).length,
  };
}
