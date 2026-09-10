import type { StudentProfile } from "../domain/student.js";
import { sortDecisionRules, type DecisionRule, type RuleAction } from "../domain/decision-rules.js";
import { recommendStudentProgram } from "./student-decision.js";

export interface DecisionTraceStep {
  ruleId: string;
  ruleName: string;
  action: RuleAction;
  matched: boolean;
  explanation: string;
}

export interface DecisionSimulation {
  outcome: RuleAction;
  recommendation: ReturnType<typeof recommendStudentProgram>;
  trace: DecisionTraceStep[];
}

function matches(rule: DecisionRule, profile: StudentProfile, recommendation: ReturnType<typeof recommendStudentProgram>): boolean {
  switch (rule.id) {
    case "rule-review-request":
      return profile.pharmacistReviewRequested === true;
    case "rule-duration-required":
      return profile.duration === 0;
    case "rule-program-approval":
      return recommendation.programId !== null && recommendation.status === "no-match";
    case "rule-formulation-governance":
      return recommendation.status === "no-match" && recommendation.programId !== null;
    case "rule-feedback-no-bypass":
      return false;
    default:
      return false;
  }
}

export function simulateStudentDecision(profile: StudentProfile): DecisionSimulation {
  const recommendation = recommendStudentProgram(profile);
  const rules = sortDecisionRules();
  let outcome: RuleAction = recommendation.status === "pharmacist-review"
    ? "review"
    : recommendation.status === "no-match"
      ? "stop"
      : "continue";

  const trace = rules.map((rule) => {
    const matched = matches(rule, profile, recommendation);
    return {
      ruleId: rule.id,
      ruleName: rule.name,
      action: rule.action,
      matched,
      explanation: matched
        ? `Matched: ${rule.condition}`
        : `Not matched: ${rule.condition}`,
    };
  });

  const firstMatched = trace.find((step) => step.matched);
  if (firstMatched) outcome = firstMatched.action;

  return { outcome, recommendation, trace };
}
