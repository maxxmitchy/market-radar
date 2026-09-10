export type RuleAction = "continue" | "review" | "stop";

export interface DecisionRule {
  id: string;
  name: string;
  stage: "student-check" | "program" | "formulation" | "governance";
  priority: number;
  condition: string;
  action: RuleAction;
  rationale: string;
  status: "draft" | "prototype" | "validated";
}

/**
 * Product-design rules are deliberately expressed as inspectable objects.
 * They are not clinical guidelines and do not contain treatment instructions.
 */
export const decisionRules: DecisionRule[] = [
  {
    id: "rule-review-request",
    name: "Explicit pharmacist review request",
    stage: "student-check",
    priority: 100,
    condition: "student.pharmacistReviewRequested === true",
    action: "review",
    rationale: "A requested professional review must stop automated program matching.",
    status: "validated",
  },
  {
    id: "rule-duration-required",
    name: "Program duration required",
    stage: "student-check",
    priority: 90,
    condition: "student.duration === 0",
    action: "stop",
    rationale: "The system cannot select a program without a defined program period.",
    status: "validated",
  },
  {
    id: "rule-program-approval",
    name: "Approved program gate",
    stage: "program",
    priority: 80,
    condition: "program.status !== 'approved'",
    action: "stop",
    rationale: "A framework can be identified during design without becoming commercially selectable.",
    status: "validated",
  },
  {
    id: "rule-formulation-governance",
    name: "Formulation governance gate",
    stage: "formulation",
    priority: 70,
    condition: "evidence + safety + regulatory + quality are not all approved",
    action: "stop",
    rationale: "An ungoverned formulation must not be treated as commercially ready.",
    status: "validated",
  },
  {
    id: "rule-feedback-no-bypass",
    name: "Feedback cannot bypass governance",
    stage: "governance",
    priority: 60,
    condition: "feedback proposes changing an approved rule or formulation",
    action: "review",
    rationale: "Learning signals create a change request; they do not silently modify controlled decisions.",
    status: "prototype",
  },
];

export function sortDecisionRules(rules = decisionRules): DecisionRule[] {
  return [...rules].sort((a, b) => b.priority - a.priority);
}

export function getDecisionRule(id: string): DecisionRule | null {
  return decisionRules.find((rule) => rule.id === id) ?? null;
}
