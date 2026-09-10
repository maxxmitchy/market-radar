import type { FormulationDefinition, ReviewGate } from "../domain/formulation.js";

const pendingGate = (): ReviewGate => ({
  decision: "pending",
  reviewerId: null,
  reviewedAt: null,
  notes: null,
});

/**
 * Registry is intentionally empty of ingredient stacks. A component set is
 * referenced by ID only after a separate formulation workflow establishes it.
 */
export const formulationRegistry: FormulationDefinition[] = [
  {
    id: "student-foundation-v1",
    version: 1,
    name: "Careflux Student Foundation",
    status: "draft",
    componentSetId: null,
    evidence: pendingGate(),
    safety: pendingGate(),
    regulatory: pendingGate(),
    quality: pendingGate(),
    createdAt: "2026-09-10T00:00:00.000Z",
    updatedAt: "2026-09-10T00:00:00.000Z",
  },
];

export function getFormulation(id: string): FormulationDefinition | null {
  return formulationRegistry.find((formulation) => formulation.id === id) ?? null;
}
