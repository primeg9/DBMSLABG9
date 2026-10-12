import { LabQuestion, CaseStudyId } from '../../types';
import { CASE_STUDY_1_QUESTIONS } from './caseStudy1';
import { CASE_STUDY_2_QUESTIONS } from './caseStudy2';
import { CASE_STUDY_3_QUESTIONS } from './caseStudy3';
import { CASE_STUDY_4_QUESTIONS } from './caseStudy4';

export const ALL_QUESTIONS: LabQuestion[] = [
  ...CASE_STUDY_1_QUESTIONS,
  ...CASE_STUDY_2_QUESTIONS,
  ...CASE_STUDY_3_QUESTIONS,
  ...CASE_STUDY_4_QUESTIONS,
];

export const QUESTIONS_BY_CASE_STUDY: Record<CaseStudyId, LabQuestion[]> = {
  cs1: CASE_STUDY_1_QUESTIONS,
  cs2: CASE_STUDY_2_QUESTIONS,
  cs3: CASE_STUDY_3_QUESTIONS,
  cs4: CASE_STUDY_4_QUESTIONS,
};

export const getQuestionById = (id: string): LabQuestion | undefined => {
  return ALL_QUESTIONS.find((q) => q.id === id);
};

export const getNextQuestion = (currentId: string): LabQuestion | undefined => {
  const index = ALL_QUESTIONS.findIndex((q) => q.id === currentId);
  if (index !== -1 && index < ALL_QUESTIONS.length - 1) {
    return ALL_QUESTIONS[index + 1];
  }
  return undefined;
};

export const getPreviousQuestion = (currentId: string): LabQuestion | undefined => {
  const index = ALL_QUESTIONS.findIndex((q) => q.id === currentId);
  if (index > 0) {
    return ALL_QUESTIONS[index - 1];
  }
  return undefined;
};
