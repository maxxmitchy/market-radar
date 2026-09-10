import { isCommerciallyReady, type FormulationDefinition } from "../domain/formulation.js";
import { formulationRegistry } from "../formulations/registry.js";

export interface FormulationInspection {
  formulation: FormulationDefinition;
  commerciallyReady: boolean;
  pendingGates: string[];
}

export function inspectFormulation(formulation: FormulationDefinition): FormulationInspection {
  const pendingGates: string[] = [];
  if (formulation.componentSetId === null) pendingGates.push("Component set");
  if (formulation.evidence.decision !== "approved") pendingGates.push("Evidence review");
  if (formulation.safety.decision !== "approved") pendingGates.push("Safety review");
  if (formulation.regulatory.decision !== "approved") pendingGates.push("Regulatory review");
  if (formulation.quality.decision !== "approved") pendingGates.push("Quality review");
  if (formulation.status !== "approved") pendingGates.push("Formulation approval");

  return {
    formulation,
    commerciallyReady: isCommerciallyReady(formulation),
    pendingGates,
  };
}

export function inspectFormulations() {
  return formulationRegistry.map(inspectFormulation);
}
