export type RequirementStatus = "defined" | "prototype" | "needs-validation" | "unresolved";
export type RequirementType = "product" | "decision" | "safety" | "evidence" | "operations";

export interface ProductRequirement {
  id: string;
  title: string;
  type: RequirementType;
  status: RequirementStatus;
  statement: string;
  rationale: string;
  inputs: string[];
  output: string;
  boundary: string;
  nextArtifact: string;
}

export const productRequirements: ProductRequirement[] = [
  {
    id: "req-context-first",
    title: "Context before program",
    type: "decision",
    status: "defined",
    statement: "The system must establish the student's situation and objective before selecting a program.",
    rationale: "A program should respond to a defined student context rather than act as a generic product picker.",
    inputs: ["Academic stage", "Objective", "Routine constraints"],
    output: "Structured student context",
    boundary: "Does not diagnose or independently determine a medical condition.",
    nextArtifact: "Student context schema",
  },
  {
    id: "req-program-match",
    title: "Program matching",
    type: "product",
    status: "prototype",
    statement: "The system should match structured context to an approved program definition.",
    rationale: "Program selection should be deterministic, inspectable, versioned, and separated from formulation selection.",
    inputs: ["Student context", "Program catalogue", "Eligibility rules"],
    output: "Program candidate or no-match",
    boundary: "Cannot activate a draft or unapproved program for commercial use.",
    nextArtifact: "Eligibility rule registry",
  },
  {
    id: "req-formulation-gate",
    title: "Formulation governance",
    type: "safety",
    status: "prototype",
    statement: "A formulation must pass evidence, safety, regulatory, and quality gates before commercial readiness.",
    rationale: "The product architecture must prevent an attractive concept from becoming an unreviewed recommendation.",
    inputs: ["Formulation version", "Evidence review", "Safety review", "Regulatory review", "Quality review"],
    output: "Governance state",
    boundary: "No ingredient stack is implied by the architecture until a separate formulation workflow establishes one.",
    nextArtifact: "Review workflow and audit trail",
  },
  {
    id: "req-escalation",
    title: "Human escalation",
    type: "safety",
    status: "defined",
    statement: "The system must be able to stop automated matching and route the case for pharmacist review.",
    rationale: "Uncertainty and safety-sensitive situations require a human control point.",
    inputs: ["Safety signals", "Student request", "Decision confidence"],
    output: "Pharmacist review state",
    boundary: "The engine does not replace pharmacist assessment or clinical diagnosis.",
    nextArtifact: "Escalation rule catalogue",
  },
  {
    id: "req-daily-experience",
    title: "Daily experience",
    type: "product",
    status: "defined",
    statement: "An approved program should eventually translate into a simple, clearly identified daily experience.",
    rationale: "The daily pack is an execution layer, not the place where program logic is invented.",
    inputs: ["Approved program", "Approved formulation", "Pack specification"],
    output: "Daily pack specification",
    boundary: "Does not change formulation or dose outside approved definitions.",
    nextArtifact: "Daily pack specification model",
  },
  {
    id: "req-evidence-trace",
    title: "Evidence traceability",
    type: "evidence",
    status: "needs-validation",
    statement: "Claims and formulation decisions should be traceable to reviewed evidence and their applicable review state.",
    rationale: "Evidence-first positioning requires an inspectable connection between a claim and the evidence supporting it.",
    inputs: ["Claim", "Evidence source", "Review decision", "Version"],
    output: "Evidence trace",
    boundary: "A citation alone does not constitute clinical or regulatory approval.",
    nextArtifact: "Evidence and claims registry",
  },
  {
    id: "req-campus-loop",
    title: "Campus learning loop",
    type: "operations",
    status: "defined",
    statement: "Campus activity should create structured feedback that can inform product decisions without silently changing approved rules.",
    rationale: "The campus network is a learning channel as well as an access model.",
    inputs: ["Student feedback", "Usage signals", "Campus observations"],
    output: "Product learning signal",
    boundary: "Feedback cannot directly alter an approved formulation or safety rule.",
    nextArtifact: "Feedback taxonomy",
  },
];

export const requirementStatusLabel: Record<RequirementStatus, string> = {
  defined: "Defined",
  prototype: "Prototype",
  "needs-validation": "Needs validation",
  unresolved: "Unresolved",
};
