import type { SafetyDefinition, SafetyGate } from "../domain/safety.js";

const pendingGate = (): SafetyGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const safetyRegistry: SafetyDefinition[] = [
  {
    id: "student-foundation-safety-v1",
    version: 1,
    programId: "student-foundation",
    status: "draft",
    gate: pendingGate(),
    reviewTriggers: [
      "Relevant health or medication information is disclosed.",
      "The student requests advice outside the program's defined scope.",
      "A safety-sensitive exception is detected.",
    ],
    prohibitedBehaviors: [
      "Do not diagnose from the Student Check.",
      "Do not start, stop, or change prescription treatment through the program engine.",
      "Do not allow personalization to bypass a safety or pharmacist-review gate.",
    ],
    escalationLevels: ["pharmacist-review", "clinical-referral", "urgent-care"],
    unresolvedQuestions: [
      "What exact signals should trigger each escalation level?",
      "What information must be captured before pharmacist review?",
      "Which urgent situations require an immediate handoff rather than program continuation?",
    ],
  },
];

export function getSafetyDefinition(id: string): SafetyDefinition | null {
  return safetyRegistry.find((definition) => definition.id === id) ?? null;
}
