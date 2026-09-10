import type { PackGenerationDefinition, PackGenerationGate } from "../domain/pack-generation.js";

const pendingGate = (): PackGenerationGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const packGenerationRegistry: PackGenerationDefinition[] = [
  {
    id: "student-foundation-pack-generation-v1",
    version: 1,
    programId: "student-foundation",
    formulationId: "student-foundation-v1",
    dailyExperienceId: "student-foundation-daily-v1",
    status: "draft",
    packIdentityRequirements: [
      "Program identity",
      "Program version",
      "Program day",
      "Pack identity / traceability marker",
    ],
    assemblyRules: [
      "Generate a daily unit only from the approved formulation reference and applicable pack specification.",
      "Preserve program and version identity through assembly.",
    ],
    traceabilityRequirements: [
      "A generated unit must be traceable back to its program, formulation and applicable specification/version records.",
    ],
    prohibitedChanges: [
      "Do not add, remove or substitute formulation components during pack generation.",
      "Do not use personalization to bypass an approved formulation or quality release gate.",
    ],
    exceptionRules: [
      "Exceptions must stop or route to the defined human review workflow rather than silently changing the pack.",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "What controlled pack specification will define the physical daily unit?",
      "Which production and traceability identifiers must be generated for each unit?",
      "What exception conditions should stop generation versus route to human review?",
      "How should a formulation or pack-specification version change invalidate previously generated units?",
    ],
  },
];

export function getPackGenerationDefinition(id: string): PackGenerationDefinition | null {
  return packGenerationRegistry.find((definition) => definition.id === id) ?? null;
}
