export type EvidenceQuality = "unreviewed" | "low" | "moderate" | "high";
export type EvidenceSourceType = "placeholder" | "guideline" | "systematic-review" | "clinical-trial" | "reference";
export type ClaimLifecycle = "draft" | "evidence-review" | "approved" | "rejected" | "retired";
export type ReviewDecision = "pending" | "approved" | "changes-required" | "rejected";

export interface EvidenceRecord {
  id: string;
  version: number;
  title: string;
  sourceType: EvidenceSourceType;
  citation: string | null;
  quality: EvidenceQuality;
  review: ReviewDecision;
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
}

export interface ClaimDefinition {
  id: string;
  version: number;
  formulationId: string;
  statement: string;
  lifecycle: ClaimLifecycle;
  evidenceIds: string[];
  reviewerId: string | null;
  reviewedAt: string | null;
  notes: string | null;
  unresolvedQuestions: string[];
}

export function isEvidenceReviewed(evidence: EvidenceRecord): boolean {
  return evidence.review === "approved" && evidence.quality !== "unreviewed";
}

export function isClaimReady(claim: ClaimDefinition, evidence: EvidenceRecord[]): boolean {
  if (claim.lifecycle !== "approved" || claim.evidenceIds.length === 0) return false;

  return claim.evidenceIds.every((evidenceId) => {
    const record = evidence.find((item) => item.id === evidenceId);
    return record ? isEvidenceReviewed(record) : false;
  });
}

export function getClaim(id: string, claims: ClaimDefinition[]): ClaimDefinition | null {
  return claims.find((claim) => claim.id === id) ?? null;
}
