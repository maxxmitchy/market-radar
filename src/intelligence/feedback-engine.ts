import { feedbackRegistry } from "../feedback/registry.js";
import { isFeedbackApproved, type FeedbackDefinition } from "../domain/feedback.js";

export interface FeedbackInspection {
  definition: FeedbackDefinition;
  approved: boolean;
  blockedBy: string[];
}

export function inspectFeedback(definition: FeedbackDefinition): FeedbackInspection {
  const blockedBy: string[] = [];
  if (definition.status !== "approved") blockedBy.push("Feedback architecture approval");
  if (definition.gate.decision !== "approved") blockedBy.push("Feedback review gate");
  if (definition.gate.reviewerId === null) blockedBy.push("Accountable reviewer");
  if (definition.signalTypes.length === 0) blockedBy.push("Signal types");
  if (definition.captureMoments.length === 0) blockedBy.push("Capture moments");
  if (definition.structuredSignals.length === 0) blockedBy.push("Structured signal set");
  if (definition.routingRules.length === 0) blockedBy.push("Routing rules");
  if (definition.learningOutputs.length === 0) blockedBy.push("Learning outputs");

  return { definition, approved: isFeedbackApproved(definition), blockedBy };
}

export function inspectFeedbackDefinitions(): FeedbackInspection[] {
  return feedbackRegistry.map(inspectFeedback);
}

export function feedbackSummary() {
  const inspections = inspectFeedbackDefinitions();
  return {
    definitions: inspections.length,
    approved: inspections.filter((item) => item.approved).length,
    blocked: inspections.filter((item) => !item.approved).length,
  };
}
