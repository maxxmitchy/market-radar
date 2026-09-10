import { productSpecificationRegistry } from "../product-specifications/registry.js";
import { isProductSpecificationApproved, type ProductSpecificationDefinition } from "../domain/product-specification.js";

export interface ProductSpecificationInspection {
  definition: ProductSpecificationDefinition;
  approved: boolean;
  blockedBy: string[];
}

export function inspectProductSpecification(definition: ProductSpecificationDefinition): ProductSpecificationInspection {
  const blockedBy: string[] = [];
  if (definition.status !== "approved") blockedBy.push("Specification approval");
  if (definition.gate.decision !== "approved") blockedBy.push("Specification review gate");
  if (definition.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (definition.productContract.length === 0) blockedBy.push("Product contract");
  if (definition.acceptanceCriteria.length === 0) blockedBy.push("Acceptance criteria");
  if (definition.traceabilityRequirements.length === 0) blockedBy.push("Traceability requirements");

  return {
    definition,
    approved: isProductSpecificationApproved(definition),
    blockedBy,
  };
}

export function inspectProductSpecifications(): ProductSpecificationInspection[] {
  return productSpecificationRegistry.map(inspectProductSpecification);
}

export function productSpecificationSummary() {
  const inspections = inspectProductSpecifications();
  return {
    definitions: inspections.length,
    approved: inspections.filter((item) => item.approved).length,
    blocked: inspections.filter((item) => !item.approved).length,
  };
}
