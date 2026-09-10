export type DailyExperienceLifecycle = "draft" | "review" | "approved" | "retired";
export type DailyStep = "open" | "take" | "continue";

export interface DailyExperienceDefinition {
  id: string;
  version: number;
  programId: string;
  name: string;
  lifecycle: DailyExperienceLifecycle;
  sequence: DailyStep[];
  packFormat: string;
  identificationRequirements: string[];
  educationPlanId: string | null;
  fulfillmentRequirements: string[];
  personalizationBoundaries: string[];
  safetyBoundaries: string[];
  unresolvedQuestions: string[];
}

export const dailyExperiences: DailyExperienceDefinition[] = [
  {
    id: "student-foundation-daily-v1",
    version: 1,
    programId: "student-foundation",
    name: "Careflux Student Daily Experience",
    lifecycle: "draft",
    sequence: ["open", "take", "continue"],
    packFormat: "One clearly identified daily unit associated with the enrolled program and program day.",
    identificationRequirements: [
      "Program identity",
      "Program version",
      "Program day",
      "Pack identity / traceability marker",
    ],
    educationPlanId: null,
    fulfillmentRequirements: [
      "Pack contents must come from an approved formulation reference.",
      "Assembly must preserve program and version traceability.",
      "A daily unit must not alter an approved formulation at fulfillment time.",
    ],
    personalizationBoundaries: [
      "Personalization may change presentation or permitted experience details only where explicitly defined.",
      "Personalization cannot create a new formulation or bypass governance.",
    ],
    safetyBoundaries: [
      "The daily experience is not a diagnosis or treatment instruction.",
      "Safety-sensitive changes require the appropriate human review workflow.",
    ],
    unresolvedQuestions: [
      "What physical pack format is most practical for a campus pilot?",
      "Which identifiers must appear on every daily unit for traceability?",
      "What education should accompany each program day?",
    ],
  },
];

export function getDailyExperience(id: string): DailyExperienceDefinition | null {
  return dailyExperiences.find((experience) => experience.id === id) ?? null;
}

export function isDailyExperienceReady(experience: DailyExperienceDefinition): boolean {
  return experience.lifecycle === "approved" && experience.educationPlanId !== null;
}
