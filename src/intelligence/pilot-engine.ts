import { isPilotReady, type PilotDefinition } from "../domain/pilot.js";
import { pilotRegistry } from "../pilots/registry.js";

export interface PilotInspection {
  pilot: PilotDefinition;
  ready: boolean;
  blockedBy: string[];
}

export function inspectPilot(pilot: PilotDefinition): PilotInspection {
  const blockedBy: string[] = [];
  if (pilot.status !== "ready") blockedBy.push("Pilot readiness");
  if (pilot.gate.decision !== "approved") blockedBy.push("Pilot review gate");
  if (pilot.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (pilot.scope.length === 0) blockedBy.push("Pilot scope");
  if (pilot.entryCriteria.length === 0) blockedBy.push("Entry criteria");
  if (pilot.successSignals.length === 0) blockedBy.push("Success signals");
  if (pilot.stopConditions.length === 0) blockedBy.push("Stop conditions");

  return { pilot, ready: isPilotReady(pilot), blockedBy };
}

export function inspectPilots(): PilotInspection[] {
  return pilotRegistry.map(inspectPilot);
}

export function pilotSummary() {
  const inspections = inspectPilots();
  return {
    definitions: inspections.length,
    ready: inspections.filter((item) => item.ready).length,
    blocked: inspections.filter((item) => !item.ready).length,
  };
}
