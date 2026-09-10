import type { ClaimDefinition, EvidenceRecord } from "../domain/evidence.js";

export const evidenceRegistry: EvidenceRecord[] = [
  {
    id: "evidence-placeholder-student-foundation-v1",
    version: 1,
    title: "Evidence set not yet populated",
    sourceType: "placeholder",
    citation: null,
    quality: "unreviewed",
    review: "pending",
    reviewerId: null,
    reviewedAt: null,
    notes: "Placeholder only. No clinical source or evidence conclusion is asserted by the blueprint.",
  },
];

export const claimRegistry: ClaimDefinition[] = [
  {
    id: "claim-student-foundation-v1",
    version: 1,
    formulationId: "student-foundation-v1",
    statement: "Draft claim placeholder — replace only after an evidence review defines the permitted claim.",
    lifecycle: "draft",
    evidenceIds: [],
    reviewerId: null,
    reviewedAt: null,
    notes: "The architecture must never turn an unverified product concept into a clinical or performance claim.",
    unresolvedQuestions: [
      "What exact claim, if any, is justified by the approved formulation evidence?",
      "Which evidence sources meet the required quality threshold?",
      "Who is accountable for approving claim wording?",
    ],
  },
];
