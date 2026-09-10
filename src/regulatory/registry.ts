import type { RegulatoryDefinition, RegulatoryGate } from "../domain/regulatory.js";

const pendingGate = (): RegulatoryGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const regulatoryRegistry: RegulatoryDefinition[] = [
  {
    id: "student-foundation-regulatory-v1",
    version: 1,
    programId: "student-foundation",
    formulationId: "student-foundation-v1",
    status: "draft",
    jurisdiction: "Nigeria",
    productClassification: null,
    intendedUse: null,
    permittedClaims: [],
    prohibitedClaims: [
      "No disease-treatment or diagnosis claim without the applicable regulatory basis and approval.",
      "No unsupported cognitive, performance, or health-outcome claim.",
    ],
    labelingRequirements: [
      "Final labeling requirements must be defined against the confirmed product classification and applicable Nigerian requirements.",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "What is the final regulatory classification of the physical product?",
      "Which Nigerian regulatory pathway and submissions apply to that classification?",
      "Which exact claims and label elements are permissible after classification is confirmed?",
    ],
  },
];

export function getRegulatoryDefinition(id: string): RegulatoryDefinition | null {
  return regulatoryRegistry.find((definition) => definition.id === id) ?? null;
}
