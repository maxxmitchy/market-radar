import type { ProductSpecificationDefinition, ProductSpecificationGate } from "../domain/product-specification.js";

const pendingGate = (): ProductSpecificationGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const productSpecificationRegistry: ProductSpecificationDefinition[] = [
  {
    id: "student-foundation-build-v1",
    version: 1,
    programId: "student-foundation",
    status: "draft",
    productContract: [
      "The build must implement the approved program, formulation, daily experience and governed operating boundaries.",
      "A specification describes what must be built; it does not assume that an implementation already exists.",
    ],
    softwareArtifacts: [
      "Student context and decision-system interfaces",
      "Version-aware program and governance records",
      "Operational interfaces required by the approved workflow",
    ],
    physicalArtifacts: [
      "Daily-unit / pack representation derived from an approved specification",
      "Identification and traceability elements required by the governed design",
    ],
    operatingArtifacts: [
      "Defined roles and handoff responsibilities",
      "Education and feedback touchpoints",
      "Pilot operating instructions and review records",
    ],
    acceptanceCriteria: [
      "Every required artifact has an accountable definition or an explicitly unresolved question.",
      "Build outputs remain traceable to the relevant approved version.",
      "No implementation step bypasses safety, regulatory, quality or human-review gates.",
    ],
    dependencies: [
      "Approved program definition",
      "Approved formulation and quality specification",
      "Daily experience, fulfillment, education and campus definitions",
      "Pilot entry criteria",
    ],
    traceabilityRequirements: [
      "Program version → specification version",
      "Specification artifact → accountable requirement",
      "Physical or software output → approved source definition",
      "Change → review decision → new version",
    ],
    boundaries: [
      "This specification does not choose a technology stack.",
      "This specification does not invent manufacturing dimensions, materials, doses or test values.",
      "A complete specification is not the same as regulatory, clinical or commercial approval.",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "What is the minimum set of artifacts required for the first physical pilot?",
      "Which implementation decisions should be fixed at product level versus left to the build team?",
      "What acceptance evidence is required before each pilot artifact is considered usable?",
    ],
  },
];

export function getProductSpecification(id: string): ProductSpecificationDefinition | null {
  return productSpecificationRegistry.find((specification) => specification.id === id) ?? null;
}
