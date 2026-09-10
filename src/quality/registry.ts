import type { QualityDefinition, QualityGate } from "../domain/quality.js";

const pendingGate = (): QualityGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const qualityRegistry: QualityDefinition[] = [
  {
    id: "student-foundation-quality-v1",
    version: 1,
    formulationId: "student-foundation-v1",
    status: "draft",
    specificationReferences: [],
    releaseCriteria: [
      "Final release criteria must be defined against the approved formulation and confirmed production specification.",
    ],
    traceabilityRequirements: [
      "Released units must remain traceable to the approved formulation and applicable specification/version records.",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "What specification documents and controlled values will define the physical product?",
      "Which quality checks are required before a batch or daily unit can be released?",
      "Who owns the final quality release decision and how is that decision recorded?",
      "How should specification changes trigger formulation, regulatory, and pack-version review?",
    ],
  },
];

export function getQualityDefinition(id: string): QualityDefinition | null {
  return qualityRegistry.find((definition) => definition.id === id) ?? null;
}
