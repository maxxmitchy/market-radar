import type { ProgramDefinition } from "../domain/program.js";

export interface ProgramReadiness {
  ready: boolean;
  missingArtifacts: string[];
}

export function getProgramReadiness(program: ProgramDefinition): ProgramReadiness {
  const missingArtifacts: string[] = [];
  if (program.lifecycle !== "approved") missingArtifacts.push("Program approval");
  if (program.formulationId === null) missingArtifacts.push("Approved formulation");
  if (program.dailyPackSpecId === null) missingArtifacts.push("Daily pack specification");
  if (program.educationPlanId === null) missingArtifacts.push("Education plan");
  return { ready: missingArtifacts.length === 0, missingArtifacts };
}
