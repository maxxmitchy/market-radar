export type AcademicStage =
  | "semester"
  | "assignments"
  | "tests"
  | "exams"
  | "final-year"
  | "professional-exams"
  | "break";

export type StudentObjective =
  | "daily-routine"
  | "demanding-period"
  | "exam-period"
  | "recovery-routine";

export type EatingRoutine =
  | "fairly-well"
  | "irregular"
  | "skipping-meals"
  | "very-inconsistent";

export type SleepQuality = "good" | "sometimes-poor" | "frequently-poor";

export type ProgramDuration = 7 | 14 | 30 | 0;

export interface StudentProfile {
  academicStage: AcademicStage;
  objective: StudentObjective;
  duration: ProgramDuration;
  eatingRoutine: EatingRoutine;
  sleepQuality: SleepQuality;
  pharmacistReviewRequested: boolean;
}

export type RecommendationStatus = "eligible" | "pharmacist-review" | "no-match";

export interface StudentRecommendation {
  status: RecommendationStatus;
  programId: string | null;
  title: string;
  reason: string;
  matchedSignals: string[];
  nextStep: string;
}
