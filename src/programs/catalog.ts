import type { ProgramDuration, StudentObjective } from "../domain/student.js";

export interface StudentProgramDefinition {
  id: string;
  version: number;
  name: string;
  duration: ProgramDuration;
  supportedObjectives: StudentObjective[];
  status: "draft" | "review" | "approved";
  formulationId: string | null;
  description: string;
}

/**
 * Product catalog deliberately contains no ingredient stack.
 * A program can only point to a formulation after that formulation has
 * completed Careflux's evidence, safety, quality and regulatory workflow.
 */
export const studentPrograms: StudentProgramDefinition[] = [
  {
    id: "student-foundation-7",
    version: 1,
    name: "Careflux Student Foundation — 7 Days",
    duration: 7,
    supportedObjectives: ["daily-routine", "demanding-period", "exam-period", "recovery-routine"],
    status: "draft",
    formulationId: null,
    description: "A short student wellness-program format for learning the routine before committing to a longer period.",
  },
  {
    id: "student-foundation-14",
    version: 1,
    name: "Careflux Student Foundation — 14 Days",
    duration: 14,
    supportedObjectives: ["daily-routine", "demanding-period", "exam-period", "recovery-routine"],
    status: "draft",
    formulationId: null,
    description: "A two-week student wellness-program format built around a simple daily routine.",
  },
  {
    id: "student-foundation-30",
    version: 1,
    name: "Careflux Student Foundation — 30 Days",
    duration: 30,
    supportedObjectives: ["daily-routine", "demanding-period", "exam-period", "recovery-routine"],
    status: "draft",
    formulationId: null,
    description: "A month-long student wellness-program format for a sustained daily routine.",
  },
];

export function findProgram(duration: ProgramDuration, objective: StudentObjective) {
  if (duration === 0) return null;
  return studentPrograms.find(
    (program) =>
      program.duration === duration &&
      program.supportedObjectives.includes(objective),
  ) ?? null;
}
