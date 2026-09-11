import type { PhysicalPilotDefinition, PilotGate } from "../domain/physical-pilot.js";

const pendingGate = (): PilotGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const physicalPilotRegistry: PhysicalPilotDefinition[] = [
  {
    id: "student-foundation-physical-pilot-v1",
    version: 1,
    programId: "student-foundation",
    productSpecificationId: "student-foundation-product-spec-v1",
    status: "draft",
    purpose: "Test whether the defined Careflux Student system can be translated into a controlled real-world experience before any broader rollout decision.",
    entryCriteria: [
      "The relevant product specification is approved for pilot use.",
      "Required safety, regulatory and quality controls have been reviewed for the pilot context.",
      "The pilot operating workflow and accountable owners are explicitly defined.",
      "Participant-facing materials are approved for the intended pilot use.",
    ],
    participantRequirements: [
      "Participant eligibility criteria must be defined before recruitment.",
      "Consent and participant-information requirements must be established for the pilot design.",
      "A clear route for pharmacist or other human review must exist where required.",
    ],
    operatingArtifacts: [
      "Pilot operating procedure",
      "Participant-facing instructions",
      "Pack and traceability record",
      "Issue / deviation record",
      "Feedback capture instrument",
    ],
    observationSignals: [
      "Can the intended daily experience be followed as designed?",
      "Where do participants or operators encounter confusion or friction?",
      "Are traceability and handoff records complete?",
      "Which product requirements fail in real-world use?",
    ],
    stopConditions: [
      "A safety-critical issue is identified without an approved response pathway.",
      "Required traceability or accountability cannot be maintained.",
      "The pilot materially departs from the approved design without review.",
      "A regulatory or quality control required for the pilot is no longer satisfied.",
    ],
    learningOutputs: [
      "Validated or failed product requirements",
      "Observed operational gaps",
      "Participant experience findings",
      "Changes requiring a new specification or version",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "What exact pilot population and setting should be used first?",
      "Which participant-information and consent process applies to the final pilot design?",
      "What evidence is sufficient to move from pilot learning to a revised product specification?",
      "Which operational owner is accountable for every pilot stop condition?",
    ],
  },
];

export function getPhysicalPilot(id: string): PhysicalPilotDefinition | null {
  return physicalPilotRegistry.find((pilot) => pilot.id === id) ?? null;
}
