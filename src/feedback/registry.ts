import type { FeedbackDefinition, FeedbackGate } from "../domain/feedback.js";

const pendingGate = (): FeedbackGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const feedbackRegistry: FeedbackDefinition[] = [
  {
    id: "student-foundation-feedback-v1",
    version: 1,
    programId: "student-foundation",
    status: "draft",
    purpose: "Turn observations from the student, pharmacist, campus and operating experience into structured product-learning signals without bypassing governance.",
    signalTypes: ["student", "pharmacist", "campus", "operations"],
    captureMoments: [
      "Program onboarding",
      "Daily-experience use",
      "Completion or discontinuation",
      "Support or pharmacist interaction",
      "Campus activity",
      "Operational handoff",
    ],
    structuredSignals: [
      "Comprehension or usability friction",
      "Repeated questions or confusion",
      "Experience or fulfillment friction",
      "Safety-sensitive observations",
      "Requests for product change",
      "Signals that indicate a workflow is not behaving as designed",
    ],
    routingRules: [
      "Safety-sensitive signals route to the defined human review path.",
      "Signals that imply a regulatory or quality change remain blocked from release until the relevant review occurs.",
      "Product-learning signals are grouped and reviewed before becoming requirements or design changes.",
    ],
    learningOutputs: [
      "Validated product insight",
      "New or revised requirement",
      "Open architecture question",
      "Safety or escalation review item",
      "Evidence or claim review item",
      "Operational improvement candidate",
    ],
    privacyBoundaries: [
      "Collect only information necessary for the defined feedback purpose.",
      "Separate identifiable information from product-learning data when identification is not required.",
      "Do not expose individual student information to participants who do not have an authorized need to see it.",
    ],
    safetyBoundaries: [
      "Feedback is not a diagnosis or treatment workflow.",
      "A feedback signal cannot authorize a clinical recommendation or override a safety stop.",
    ],
    governanceBoundaries: [
      "Feedback cannot directly change an approved formulation, claim, regulatory status or quality release decision.",
      "A learning signal becomes a product change only through the appropriate review and versioning process.",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "Which feedback moments are essential for the first physical pilot?",
      "What is the minimum structured signal set that people will actually use consistently?",
      "Who reviews and prioritizes aggregated feedback into product decisions?",
      "How should feedback remain linked to the exact program, version and experience being evaluated?",
    ],
  },
];

export function getFeedbackDefinition(id: string): FeedbackDefinition | null {
  return feedbackRegistry.find((definition) => definition.id === id) ?? null;
}
