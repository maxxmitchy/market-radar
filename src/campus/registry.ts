import type { CampusDefinition, CampusGate } from "../domain/campus.js";

const pendingGate = (): CampusGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const campusRegistry: CampusDefinition[] = [
  {
    id: "student-foundation-campus-v1",
    version: 1,
    programId: "student-foundation",
    status: "draft",
    purpose: "Define how Careflux Student can operate around a campus as a governed access, education and feedback network rather than as an unstructured sales channel.",
    accessModel: [
      "Students reach an approved program through a defined campus access point.",
      "Access should preserve the same eligibility, safety, regulatory and quality controls as other channels.",
      "Campus participation must not bypass pharmacist or other required human review.",
    ],
    participantRoles: [
      "Student",
      "Campus representative / ambassador",
      "Careflux operating team",
      "Pharmacist or other accountable reviewer where required",
    ],
    educationTouchpoints: [
      "Program introduction",
      "Daily-experience orientation",
      "Appropriate campus education activity",
      "Feedback and completion touchpoint",
    ],
    feedbackSignals: [
      "Questions students repeatedly ask",
      "Program comprehension or usability signals",
      "Operational friction reported through the campus channel",
      "Requests or observations that should inform future product design",
    ],
    conductBoundaries: [
      "Campus representatives must not diagnose, prescribe or provide individualized clinical advice outside their authorized role.",
      "Campus activity must not turn into pressure to enroll or make unsupported product claims.",
      "Representative permissions must be explicit and auditable.",
    ],
    privacyBoundaries: [
      "Only the minimum information required for the defined campus workflow should be collected.",
      "Student information must not be exposed to campus representatives beyond their permitted role.",
      "Feedback should be separated from identifiable student information where identification is not required.",
    ],
    escalationBoundaries: [
      "Safety-sensitive questions route to the defined human review path.",
      "A campus channel cannot override a product or regulatory stop condition.",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "What is the first campus access model to pilot?",
      "What exactly can a campus representative see, say and do?",
      "Which student data, if any, is necessary at the campus layer?",
      "How will campus feedback become structured product-learning input?",
    ],
  },
];

export function getCampusDefinition(id: string): CampusDefinition | null {
  return campusRegistry.find((definition) => definition.id === id) ?? null;
}
