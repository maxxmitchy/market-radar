import type { PilotDefinition, PilotGate } from "../domain/pilot.js";

const pendingGate = (): PilotGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

export const pilotRegistry: PilotDefinition[] = [
  {
    id: "student-foundation-pilot-v1",
    version: 1,
    programId: "student-foundation",
    status: "draft",
    purpose: "Define the smallest controlled real-world pilot that can test whether the designed Careflux Student system is understandable, operable and learnable before broader implementation.",
    scope: [
      "One explicitly defined program version",
      "A bounded participant population and access route",
      "Approved daily-experience and fulfillment workflow",
      "Defined education and feedback touchpoints",
      "Structured observation of the complete pilot loop",
    ],
    entryCriteria: [
      "Program, formulation, evidence, safety, regulatory and quality gates are resolved to the level required for the pilot.",
      "Pack generation, fulfillment, education and feedback workflows have accountable owners.",
      "Pilot scope, participant permissions and escalation paths are explicitly defined.",
      "Success signals and stop conditions are agreed before activation.",
    ],
    participantRoles: [
      "Student participant",
      "Campus participant where applicable",
      "Careflux operating owner",
      "Pharmacist or other accountable reviewer where required",
    ],
    operatingFlow: [
      "Define pilot scope and approved version",
      "Enroll or grant access through the approved channel",
      "Deliver the governed daily experience",
      "Capture education, operational and experience signals",
      "Review safety, quality and product-learning signals",
      "Close the pilot and decide what changes, if any, should be versioned",
    ],
    successSignals: [
      "Students understand what the program is and how the daily experience works",
      "The defined operating workflow can be executed consistently",
      "Safety and escalation pathways behave as designed",
      "Feedback produces structured, actionable product-learning signals",
      "The pilot reveals measurable questions that can guide the next build increment",
    ],
    learningPlan: [
      "Compare observed behavior with the intended product workflow",
      "Group recurring friction rather than treating every comment as a product requirement",
      "Separate safety, regulatory, quality and usability findings before prioritization",
      "Convert validated learning into requirements or blueprint changes through normal governance",
      "Version approved changes before testing them again",
    ],
    stopConditions: [
      "A safety-sensitive issue requires escalation or the defined human-review path is unavailable",
      "A required regulatory or quality condition is no longer satisfied",
      "The pilot cannot preserve the approved product or operating specification",
      "Participant privacy or permission boundaries cannot be maintained",
      "A critical workflow failure makes continued participation inappropriate",
    ],
    boundaries: [
      "A pilot is not evidence that the product is clinically effective.",
      "Pilot observations do not automatically authorize a new formulation, claim or clinical recommendation.",
      "Pilot success does not equal commercial readiness.",
      "The pilot must remain bounded to its approved scope and version.",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "What is the smallest physical pilot that can test the complete loop without unnecessary complexity?",
      "Which participant count and duration are appropriate for the first pilot design?",
      "Which signals must be captured manually versus digitally at pilot stage?",
      "Who owns the final go / change / stop decision at pilot close?",
    ],
  },
];

export function getPilotDefinition(id: string): PilotDefinition | null {
  return pilotRegistry.find((pilot) => pilot.id === id) ?? null;
}
