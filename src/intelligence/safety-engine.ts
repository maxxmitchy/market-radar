import { isSafetyApproved, requiresEscalation, type SafetyDefinition } from "../domain/safety.js";
import { safetyRegistry } from "../safety/registry.js";

export interface SafetyInspection {
  definition: SafetyDefinition;
  approved: boolean;
  escalationConfigured: boolean;
  blockedBy: string[];
}

export function inspectSafety(definition: SafetyDefinition): SafetyInspection {
  const blockedBy: string[] = [];

  if (definition.status !== "approved") blockedBy.push("Safety approval");
  if (definition.gate.decision !== "approved") blockedBy.push("Safety review gate");
  if (definition.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (definition.reviewTriggers.length === 0) blockedBy.push("Review triggers");
  if (definition.escalationLevels.length === 0) blockedBy.push("Escalation pathways");

  return {
    definition,
    approved: isSafetyApproved(definition),
    escalationConfigured: requiresEscalation(definition),
    blockedBy,
  };
}

export function inspectSafetyDefinitions(): SafetyInspection[] {
  return safetyRegistry.map(inspectSafety);
}

export function safetySummary() {
  const inspections = inspectSafetyDefinitions();
  return {
    definitions: inspections.length,
    approved: inspections.filter((item) => item.approved).length,
    escalationConfigured: inspections.filter((item) => item.escalationConfigured).length,
    blocked: inspections.filter((item) => !item.approved).length,
  };
}
