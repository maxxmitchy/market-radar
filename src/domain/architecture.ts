export type BuildStatus = "defined" | "prototype" | "needs-validation" | "blocked";

export interface ArchitectureRequirement {
  id: string;
  layer: string;
  title: string;
  status: BuildStatus;
  purpose: string;
  openQuestion: string;
  nextArtifact: string;
}

/**
 * The ledger deliberately describes what must be built without pretending
 * that unresolved clinical, regulatory, commercial, or operational choices
 * have already been made.
 */
export const architectureRequirements: ArchitectureRequirement[] = [
  {
    id: "AR-001",
    layer: "Student Check",
    title: "Structured student context",
    status: "prototype",
    purpose: "Capture the minimum context needed for safe program routing.",
    openQuestion: "What additional context is required before any real-world deployment?",
    nextArtifact: "Validated question set + escalation rules",
  },
  {
    id: "AR-002",
    layer: "Program Engine",
    title: "Versioned program catalogue",
    status: "prototype",
    purpose: "Represent programs independently from formulations and preserve version history.",
    openQuestion: "What makes a program eligible, active, superseded, or retired?",
    nextArtifact: "Program schema + lifecycle rules",
  },
  {
    id: "AR-003",
    layer: "Formulation Engine",
    title: "Formulation governance",
    status: "prototype",
    purpose: "Keep component sets behind explicit evidence, safety, regulatory, and quality gates.",
    openQuestion: "What evidence and review records are mandatory for each formulation version?",
    nextArtifact: "Governance record model + review workflow",
  },
  {
    id: "AR-004",
    layer: "Daily Experience",
    title: "Daily pack specification",
    status: "defined",
    purpose: "Translate an approved program into a clear, repeatable student-facing routine.",
    openQuestion: "What physical packaging, labelling, education, and fulfilment constraints apply?",
    nextArtifact: "Pack specification + operational prototype",
  },
  {
    id: "AR-005",
    layer: "Campus Network",
    title: "Feedback and learning loop",
    status: "defined",
    purpose: "Capture useful student, pharmacist, and operational signals without bypassing governance.",
    openQuestion: "Which signals should change product design and which require formal review?",
    nextArtifact: "Feedback taxonomy + insight workflow",
  },
  {
    id: "AR-006",
    layer: "Platform",
    title: "Founder control surface",
    status: "needs-validation",
    purpose: "Give the product owner a single place to inspect requirements, versions, decisions, and unresolved questions.",
    openQuestion: "Which decisions need editing, simulation, approval, or audit history?",
    nextArtifact: "Architecture workspace information model",
  },
];
