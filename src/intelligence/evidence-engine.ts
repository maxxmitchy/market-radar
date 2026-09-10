import { claimRegistry, evidenceRegistry } from "../evidence/registry.js";
import { isClaimReady, isEvidenceReviewed, type ClaimDefinition, type EvidenceRecord } from "../domain/evidence.js";

export interface ClaimInspection {
  claim: ClaimDefinition;
  ready: boolean;
  evidenceCount: number;
  missingEvidence: string[];
  blockedBy: string[];
}

export function inspectClaim(claim: ClaimDefinition, evidence: EvidenceRecord[] = evidenceRegistry): ClaimInspection {
  const linkedEvidence = claim.evidenceIds
    .map((id) => evidence.find((record) => record.id === id))
    .filter((record): record is EvidenceRecord => Boolean(record));

  const missingEvidence = claim.evidenceIds.filter((id) => !evidence.some((record) => record.id === id));
  const blockedBy: string[] = [];

  if (claim.evidenceIds.length === 0) blockedBy.push("Evidence set");
  if (missingEvidence.length > 0) blockedBy.push("Linked evidence records");
  if (linkedEvidence.some((record) => !isEvidenceReviewed(record))) blockedBy.push("Evidence review / quality gate");
  if (claim.lifecycle !== "approved") blockedBy.push("Claim approval");
  if (claim.reviewerId === null) blockedBy.push("Claim reviewer");

  return {
    claim,
    ready: isClaimReady(claim, evidence),
    evidenceCount: linkedEvidence.length,
    missingEvidence,
    blockedBy,
  };
}

export function inspectClaims(): ClaimInspection[] {
  return claimRegistry.map((claim) => inspectClaim(claim));
}

export function evidenceSummary() {
  const claims = inspectClaims();
  return {
    evidenceCount: evidenceRegistry.length,
    reviewedEvidenceCount: evidenceRegistry.filter(isEvidenceReviewed).length,
    claimCount: claimRegistry.length,
    readyClaimCount: claims.filter((claim) => claim.ready).length,
    blockedClaimCount: claims.filter((claim) => !claim.ready).length,
  };
}
