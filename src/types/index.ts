export type CaseStudyId = 'cs1' | 'cs2' | 'cs3' | 'cs4';

export interface ColumnDefinition {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: string;
  nullable?: boolean;
  description?: string;
}

export interface TableSchema {
  name: string;
  caseStudyId: CaseStudyId;
  description: string;
  columns: ColumnDefinition[];
  sampleRows: Record<string, string | number | null>[];
  usedInQuestions: string[];
}

export interface CaseStudy {
  id: CaseStudyId;
  number: number;
  name: string;
  databaseName: string;
  subtitle: string;
  description: string;
  topicsCovered: string[];
  tables: string[];
}

export interface QuestionOutput {
  columns: string[];
  rows: (string | number | null)[][];
  isEmpty?: boolean;
  emptyReason?: string;
  isModification?: boolean;
  modificationDetails?: {
    table: string;
    action: string;
    beforeSummary: string;
    afterSummary: string;
  };
}

export interface DialectAlternative {
  dialect: 'MySQL' | 'SQL Server (T-SQL)' | 'PostgreSQL' | 'Oracle' | 'SQLite';
  sql: string;
  note: string;
}

export interface LabQuestion {
  id: string; // e.g. "cs1-q1"
  caseStudyId: CaseStudyId;
  number: number;
  originalQuestion: string;
  conceptTags: string[];
  tablesUsed: string[];
  solutionSql: string;
  alternativeSql?: DialectAlternative[];
  explanationSteps: string[];
  expectedOutput: QuestionOutput;
  examTip: string;
  ambiguityNote?: string;
  dialectNotes?: string;
}

export interface SyllabusLesson {
  id: string;
  order: number;
  title: string;
  category: 'Fundamentals' | 'DDL' | 'DML & DQL' | 'Filtering & Operators' | 'Aggregates' | 'Subqueries & Joins' | 'Views & Transactions';
  syllabusUnitRef: string;
  definition: string;
  whyUsed: string;
  syntax: string;
  exampleTable: {
    name: string;
    columns: string[];
    rows: (string | number | null)[][];
  };
  sqlExample: string;
  expectedResult: {
    columns: string[];
    rows: (string | number | null)[][];
  };
  explanationSteps: string[];
  commonMistake: string;
  practiceQuestion: {
    prompt: string;
    hint: string;
    solutionSql: string;
    expectedOutput: {
      columns: string[];
      rows: (string | number | null)[][];
    };
  };
  nextLessonId?: string;
}

export interface RevisionTopic {
  id: string;
  title: string;
  category: 'Comparisons' | 'Syntax Patterns' | 'Aggregates & Joins' | 'Common Traps';
  summary: string;
  points: { title: string; explanation: string; code?: string }[];
  examAdvice: string;
}

export interface UserProgress {
  completedQuestions: string[];
  completedLessons: string[];
  recentQuestionId?: string;
  recentLessonId?: string;
  bookmarkedQuestions: string[];
}
