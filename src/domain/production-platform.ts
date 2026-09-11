export type PlatformStatus = "draft" | "review" | "approved" | "blocked";
export type PlatformGateDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface PlatformGate {
  decision: PlatformGateDecision;
  reviewerId: string | null;
  notes: string | null;
}

export interface PlatformModule {
  id: string;
  name: string;
  purpose: string;
  consumes: string[];
  produces: string[];
  owns: string[];
  controls: string[];
  unresolvedQuestions: string[];
}

export interface ProductionPlatformDefinition {
  id: string;
  version: number;
  status: PlatformStatus;
  purpose: string;
  modules: PlatformModule[];
  systemBoundaries: string[];
  humanControls: string[];
  externalDependencies: string[];
  gate: PlatformGate;
  unresolvedQuestions: string[];
}

export function isPlatformArchitectureApproved(platform: ProductionPlatformDefinition): boolean {
  return platform.status === "approved" && platform.gate.decision === "approved" && platform.gate.reviewerId !== null && platform.modules.length > 0;
}
