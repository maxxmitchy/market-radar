export type ProductSpecificationStatus = "draft" | "review" | "approved" | "retired";
export type ProductSpecificationDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface ProductSpecificationGate {
  decision: ProductSpecificationDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface ProductSpecificationDefinition {
  id: string;
  version: number;
  programId: string;
  status: ProductSpecificationStatus;
  productContract: string[];
  softwareArtifacts: string[];
  physicalArtifacts: string[];
  operatingArtifacts: string[];
  acceptanceCriteria: string[];
  dependencies: string[];
  traceabilityRequirements: string[];
  boundaries: string[];
  gate: ProductSpecificationGate;
  unresolvedQuestions: string[];
}

export function isProductSpecificationApproved(definition: ProductSpecificationDefinition): boolean {
  return definition.status === "approved" && definition.gate.decision === "approved" && definition.gate.reviewerId !== null;
}
