import { isPlatformArchitectureApproved, type ProductionPlatformDefinition } from "../domain/production-platform.js";
import { productionPlatformRegistry } from "../platform/registry.js";

export interface PlatformInspection {
  platform: ProductionPlatformDefinition;
  approved: boolean;
  blockedBy: string[];
}

export function inspectProductionPlatform(platform: ProductionPlatformDefinition): PlatformInspection {
  const blockedBy: string[] = [];
  if (platform.status !== "approved") blockedBy.push("Architecture approval");
  if (platform.gate.decision !== "approved") blockedBy.push("Architecture review gate");
  if (platform.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (platform.modules.length === 0) blockedBy.push("Production modules");
  if (platform.systemBoundaries.length === 0) blockedBy.push("System boundaries");
  if (platform.humanControls.length === 0) blockedBy.push("Human controls");
  return { platform, approved: isPlatformArchitectureApproved(platform), blockedBy };
}

export function inspectProductionPlatforms(): PlatformInspection[] {
  return productionPlatformRegistry.map(inspectProductionPlatform);
}

export function productionPlatformSummary() {
  const inspections = inspectProductionPlatforms();
  return { definitions: inspections.length, approved: inspections.filter((item) => item.approved).length, blocked: inspections.filter((item) => !item.approved).length };
}
