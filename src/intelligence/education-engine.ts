import { educationRegistry } from "../education/registry.js";
import { isEducationApproved, type EducationDefinition } from "../domain/education.js";

export interface EducationInspection {
  definition: EducationDefinition;
  approved: boolean;
  blockedBy: string[];
}

export function inspectEducation(definition: EducationDefinition): EducationInspection {
  const blockedBy: string[] = [];
  if (definition.status !== "approved") blockedBy.push("Education approval");
  if (definition.gate.decision !== "approved") blockedBy.push("Education review gate");
  if (definition.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (definition.dailyExperienceId === null) blockedBy.push("Daily experience reference");
  if (definition.learningObjectives.length === 0) blockedBy.push("Learning objectives");
  if (definition.deliveryMoments.length === 0) blockedBy.push("Delivery moments");
  if (definition.traceabilityRequirements.length === 0) blockedBy.push("Traceability requirements");

  return { definition, approved: isEducationApproved(definition), blockedBy };
}

export function inspectEducationDefinitions(): EducationInspection[] {
  return educationRegistry.map(inspectEducation);
}

export function educationSummary() {
  const inspections = inspectEducationDefinitions();
  return {
    definitions: inspections.length,
    approved: inspections.filter((item) => item.approved).length,
    blocked: inspections.filter((item) => !item.approved).length,
  };
}
