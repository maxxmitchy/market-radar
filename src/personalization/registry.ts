import type { PersonalizationDefinition, PersonalizationGate } from "../domain/personalization.js";

const pendingGate = (): PersonalizationGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const personalizationRegistry: PersonalizationDefinition[] = [
  {
    id: "student-foundation-personalization-v1",
    version: 1,
    programId: "student-foundation",
    formulationId: "student-foundation-v1",
    status: "draft",
    permittedSignals: [
      "Approved student profile context",
      "Program enrollment and program day",
      "Experience preferences explicitly supported by the product design",
    ],
    permittedChanges: [
      "Adjust permitted presentation, education or routine details without changing the approved formulation.",
    ],
    prohibitedChanges: [
      "Creating or modifying an ingredient/formulation decision outside the approved formulation workflow.",
      "Bypassing safety, regulatory, quality or pharmacist-review gates.",
      "Inferring a diagnosis or treatment decision from personalization signals.",
    ],
    reviewTriggers: [
      "A requested change could alter formulation, dose, eligibility, safety or regulatory meaning.",
      "Required context is missing, contradictory or outside the approved personalization boundary.",
    ],
    dataRequirements: [
      "Only the minimum approved signals needed for the permitted experience change should be retained and used.",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "Which experience attributes are genuinely useful enough to personalize?",
      "Which student signals are allowed to influence presentation, education or routine details?",
      "What data should be stored, for how long, and for what operational purpose?",
      "Which personalization requests must always route to pharmacist or other accountable review?",
    ],
  },
];

export function getPersonalizationDefinition(id: string): PersonalizationDefinition | null {
  return personalizationRegistry.find((definition) => definition.id === id) ?? null;
}
