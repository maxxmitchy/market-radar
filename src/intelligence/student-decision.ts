import type { StudentProfile, StudentRecommendation } from "../domain/student.js";
import { findProgram } from "../programs/catalog.js";

/**
 * Deterministic matching only. This is not a diagnostic engine and never
 * selects ingredients. Safety requests always take precedence over matching.
 */
export function recommendStudentProgram(profile: StudentProfile): StudentRecommendation {
  if (profile.pharmacistReviewRequested) {
    return {
      status: "pharmacist-review",
      programId: null,
      title: "Pharmacist review first",
      reason: "The student has asked for professional review, so Careflux pauses program matching before any recommendation is made.",
      matchedSignals: [],
      nextStep: "Connect the student with a pharmacist for review.",
    };
  }

  if (profile.duration === 0) {
    return {
      status: "no-match",
      programId: null,
      title: "Choose a program duration",
      reason: "Careflux needs a defined program period before it can match the student to a program.",
      matchedSignals: [],
      nextStep: "Choose 7, 14 or 30 days to continue.",
    };
  }

  const program = findProgram(profile.duration, profile.objective);

  if (!program || program.status !== "approved" || !program.formulationId) {
    return {
      status: "no-match",
      programId: program?.id ?? null,
      title: "Program framework identified",
      reason: "The student's context matches a Careflux program framework, but that program is not yet commercially approved.",
      matchedSignals: [
        `Academic context: ${profile.academicStage}`,
        `Objective: ${profile.objective}`,
        `Duration: ${profile.duration} days`,
      ],
      nextStep: "Continue through the approved-program and pharmacist-review workflow before purchasing or recommending components.",
    };
  }

  return {
    status: "eligible",
    programId: program.id,
    title: program.name,
    reason: program.description,
    matchedSignals: [
      `Academic context: ${profile.academicStage}`,
      `Objective: ${profile.objective}`,
      `Duration: ${profile.duration} days`,
    ],
    nextStep: "Review the approved program before continuing to fulfillment.",
  };
}
