import type { EducationDefinition, EducationGate } from "../domain/education.js";

const pendingGate = (): EducationGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const educationRegistry: EducationDefinition[] = [
  {
    id: "student-foundation-education-v1",
    version: 1,
    programId: "student-foundation",
    dailyExperienceId: "student-foundation-daily-v1",
    status: "draft",
    purpose: "Help a student understand the approved program, follow the intended daily routine, and know where to seek human help without turning education into diagnosis or treatment.",
    learningObjectives: [
      "Understand what the enrolled program is designed to do.",
      "Understand the daily routine and what each program day represents.",
      "Recognize important boundaries, cautions and when to seek human support.",
    ],
    deliveryMoments: [
      "Before the program begins",
      "At the daily pack / daily experience",
      "When a student encounters a relevant exception or safety boundary",
      "At program completion or review",
    ],
    contentBoundaries: [
      "Education must describe the approved program and its permitted use.",
      "Education must not introduce claims that have not passed evidence and regulatory review.",
      "Education is not a substitute for diagnosis, treatment or individualized clinical advice.",
    ],
    personalizationBoundaries: [
      "Presentation and pacing may be personalized only within approved experience rules.",
      "Personalization cannot alter approved formulation, safety boundaries or permitted claims.",
    ],
    safetyBoundaries: [
      "Safety-sensitive questions must route to the appropriate human review path.",
      "The education layer must not invent a clinical response when a defined escalation path is required.",
    ],
    traceabilityRequirements: [
      "Education version must remain linked to the program version.",
      "Published content must be traceable to the approved claim / governance context where applicable.",
      "Changes must create a new version rather than silently changing released education.",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "What is the minimum education a student needs before Day 1?",
      "Which content belongs on the daily unit versus the digital experience?",
      "How should comprehension or useful feedback be measured without turning education into a clinical assessment?",
      "Who owns final approval of education content and its relationship to approved claims?",
    ],
  },
];

export function getEducationDefinition(id: string): EducationDefinition | null {
  return educationRegistry.find((definition) => definition.id === id) ?? null;
}
