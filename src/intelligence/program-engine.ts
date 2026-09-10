import { programDefinitions, isProgramReady, type ProgramDefinition } from "../domain/program.js";

export interface ProgramInspection {
  program: ProgramDefinition;
  ready: boolean;
  missingArtifacts: string[];
}

export function inspectProgram(program: ProgramDefinition): ProgramInspection {
  const missingArtifacts: string[] = [];

  if (program.formulationId === null) missingArtifacts.push("Approved formulation");
  if (program.dailyPackSpecId === null) missingArtifacts.push("Daily pack specification");
  if (program.educationPlanId === null) missingArtifacts.push("Education plan");

  return {
    program,
    ready: isProgramReady(program),
    missingArtifacts,
  };
}

export function inspectPrograms() {
  return programDefinitions.map(inspectProgram);
}
