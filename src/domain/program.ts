import type { ProgramDuration, StudentObjective } from "./student.js";

export type ProgramLifecycle = "draft" | "review" | "approved" | "retired";

export interface ProgramEligibility {
  objective: StudentObjective;
  academicStages: string[];
  allowedDurations: ProgramDuration[];
  requiresPharmacistReview: boolean;
}

export interface ProgramDefinition {
  id: string;
  version: number;
  name: string;
  proposition: string;
  lifecycle: ProgramLifecycle;
  eligibility: ProgramEligibility;
  formulationId: string | null;
  dailyPackSpecId: string | null;
  educationPlanId: string | null;
  boundaries: string[];
  unresolvedQuestions: string[];
}

export const programDefinitions: ProgramDefinition[] = [
  {
    id: "student-foundation",
    version: 1,
    name: "Careflux Student Foundation",
    proposition: "A defined student wellness program that translates an approved program decision into a simple daily routine.",
    lifecycle: "draft",
    eligibility: {
      objective: "daily-routine",
      academicStages: ["semester", "assignments", "tests", "exams", "final-year", "professional-exams", "break"],
      allowedDurations: [7, 14, 30],
      requiresPharmacistReview: false,
    },
    formulationId: null,
    dailyPackSpecId: null,
    educationPlanId: null,
    boundaries: [
      "A program is not a diagnosis.",
      "A draft program cannot become a commercial recommendation.",
      "The program does not define an ingredient stack by itself.",
    ],
    unresolvedQuestions: [
      "What student outcomes should define program success?",
      "What minimum evidence standard is required for each program claim?",
      "What should trigger pharmacist review before enrollment?",
    ],
  },
];

export function getProgramDefinition(id: string): ProgramDefinition | null {
  return programDefinitions.find((program) => program.id === id) ?? null;
}

export function isProgramReady(program: ProgramDefinition): boolean {
  return (
    program.lifecycle === "approved" &&
    program.formulationId !== null &&
    program.dailyPackSpecId !== null &&
    program.educationPlanId !== null
  );
}
