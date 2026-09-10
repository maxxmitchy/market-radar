import { productRequirements, type ProductRequirement, type RequirementStatus } from "../domain/requirements.js";

export function getRequirementsByStatus(status: RequirementStatus): ProductRequirement[] {
  return productRequirements.filter((requirement) => requirement.status === status);
}

export function getRequirement(id: string): ProductRequirement | null {
  return productRequirements.find((requirement) => requirement.id === id) ?? null;
}

export function requirementSummary() {
  return productRequirements.reduce<Record<RequirementStatus, number>>(
    (summary, requirement) => {
      summary[requirement.status] += 1;
      return summary;
    },
    { defined: 0, prototype: 0, "needs-validation": 0, unresolved: 0 },
  );
}
