import type { PlatformGate, ProductionPlatformDefinition } from "../domain/production-platform.js";

const pendingGate = (): PlatformGate => ({ decision: "pending", reviewerId: null, notes: null });

export const productionPlatformRegistry: ProductionPlatformDefinition[] = [
  {
    id: "student-foundation-production-platform-v1",
    version: 1,
    status: "draft",
    purpose: "Define the software and operating architecture that turns approved Careflux Student design into a controlled production service.",
    modules: [
      { id: "student-context", name: "Student Context", purpose: "Capture the inputs needed for a bounded product decision.", consumes: ["student profile", "request context"], produces: ["decision input"], owns: ["student context record"], controls: ["input validation", "data minimization"], unresolvedQuestions: ["Which student fields are essential at launch?"] },
      { id: "decision-engine", name: "Decision Engine", purpose: "Apply versioned product rules to determine an eligible path or human review.", consumes: ["decision input", "approved programs", "active rules"], produces: ["recommendation", "rule trace", "review trigger"], owns: ["decision trace"], controls: ["rule versioning", "stop conditions"], unresolvedQuestions: ["Where is rule approval recorded at runtime?"] },
      { id: "product-catalog", name: "Approved Product Catalog", purpose: "Expose only governed programs, formulations and pack specifications to downstream services.", consumes: ["approved product artifacts"], produces: ["active product versions"], owns: ["catalog state"], controls: ["lifecycle status", "effective version"], unresolvedQuestions: ["Who owns catalog publication and retirement?"] },
      { id: "pack-and-fulfillment", name: "Pack & Fulfillment", purpose: "Translate an approved order into traceable operational handoff without changing product design.", consumes: ["approved product version", "order"], produces: ["pack instruction", "fulfillment record", "handoff event"], owns: ["fulfillment state"], controls: ["identity", "traceability", "exceptions"], unresolvedQuestions: ["Which physical fulfillment system is the first integration?"] },
      { id: "education-and-campus", name: "Education & Campus", purpose: "Deliver approved education and campus workflows without becoming a clinical decision authority.", consumes: ["approved education content", "campus context"], produces: ["education event", "campus interaction"], owns: ["delivery event"], controls: ["content version", "role permissions"], unresolvedQuestions: ["What campus roles require authenticated access?"] },
      { id: "feedback-and-audit", name: "Feedback & Audit", purpose: "Capture operational learning, exceptions and traceability for controlled product evolution.", consumes: ["feedback", "deviations", "system events"], produces: ["learning signal", "audit record", "change request"], owns: ["audit trail"], controls: ["immutability boundary", "access", "retention"], unresolvedQuestions: ["What retention policy applies to each event class?"] },
    ],
    systemBoundaries: [
      "Production software may execute approved rules; it may not invent or silently modify product design.",
      "Clinical, safety, regulatory and quality authority remains outside autonomous runtime decisions where human review is required.",
      "Physical inventory, manufacturing and campus operations are represented through controlled interfaces rather than assumed to be solved by the software.",
    ],
    humanControls: [
      "Approve and retire product versions",
      "Review escalated student cases and operational exceptions",
      "Authorize changes to governed rules and specifications",
      "Investigate audit and deviation records",
    ],
    externalDependencies: [
      "Identity/authentication provider",
      "Payment/order infrastructure when commercialized",
      "Fulfillment or inventory system",
      "Approved messaging/notification provider",
    ],
    gate: pendingGate(),
    unresolvedQuestions: [
      "What is the minimum production scope for the first real deployment?",
      "Which source of truth owns product/version state?",
      "What event model is required for end-to-end traceability?",
      "Which integrations are mandatory versus operator-assisted at launch?",
    ],
  },
];

export function getProductionPlatform(id: string): ProductionPlatformDefinition | null {
  return productionPlatformRegistry.find((platform) => platform.id === id) ?? null;
}
