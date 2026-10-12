import { LabQuestion } from '../../types';

export const CASE_STUDY_4_QUESTIONS: LabQuestion[] = [
  {
    id: 'cs4-q1',
    caseStudyId: 'cs4',
    number: 1,
    originalQuestion: 'Select all students from Physics and Computer Science (Union / All combined).',
    conceptTags: ['UNION', 'UNION ALL', 'Set Operations'],
    tablesUsed: ['Physics', 'Computer_Science'],
    solutionSql: `-- Option A: Distinct Students (removes duplicate students):
SELECT Regno, Name, Year, Combination FROM Physics
UNION
SELECT Regno, Name, Year, Combination FROM Computer_Science;

-- Option B: All Enrollments (keeps duplicate enrollments):
-- SELECT Regno, Name, Year, Combination FROM Physics
-- UNION ALL
-- SELECT Regno, Name, Year, Combination FROM Computer_Science;`,
    alternativeSql: [
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `SELECT Regno, Name, Year, Combination FROM Physics\nUNION ALL\nSELECT Regno, Name, Year, Combination FROM Computer_Science;`,
        note: 'UNION ALL retains all 8 records including duplicates (Swaroop and Rupa appear twice).',
      },
    ],
    explanationSteps: [
      'This question demonstrates relational union across two structurally compatible tables.',
      'Core Difference: UNION vs UNION ALL:',
      '- UNION combines records from both tables and removes duplicate rows. In our dataset, Swaroop (AJ00225) and Rupa (AJ00388) appear in BOTH Physics and Computer_Science. With UNION, they appear only once, producing 6 distinct students.',
      '- UNION ALL merges all rows without checking for duplicates. This retains all 8 enrollment records.',
      'In a college DBMS practical, demonstrating an understanding of both UNION and UNION ALL shows mastery of set theory.',
    ],
    expectedOutput: {
      columns: ['Regno', 'Name', 'Year', 'Combination'],
      rows: [
        ['AJ00112', 'Geeta', 'First', 'BCA'],
        ['AJ00225', 'Swaroop', 'Second', 'PMCs'],
        ['AJ00296', 'Tejas', 'Second', 'BCA'],
        ['AJ00325', 'Ashwin', 'First', 'PCM'],
        ['AJ00385', 'Sarika', 'Third', 'PME'],
        ['AJ00388', 'Rupa', 'First', 'PMCs'],
      ],
    },
    examTip: 'Exam Golden Rule: UNION performs an internal sort to eliminate duplicate rows, making it computationally heavier. UNION ALL is faster because it simply appends the result sets without duplicate checking.',
  },
  {
    id: 'cs4-q2',
    caseStudyId: 'cs4',
    number: 2,
    originalQuestion: 'Select students common in Physics and Computer Science (Intersection).',
    conceptTags: ['INTERSECT', 'INNER JOIN', 'Set Intersection'],
    tablesUsed: ['Physics', 'Computer_Science'],
    solutionSql: `-- Approach 1: Portable INNER JOIN (Supported by all SQL engines):
SELECT P.Regno, P.Name, P.Year, P.Combination 
FROM Physics P 
INNER JOIN Computer_Science C ON P.Regno = C.Regno;`,
    alternativeSql: [
      {
        dialect: 'PostgreSQL',
        sql: `SELECT * FROM Physics\nINTERSECT\nSELECT * FROM Computer_Science;`,
        note: 'Standard ANSI INTERSECT operator (also supported in SQLite and SQL Server).',
      },
      {
        dialect: 'MySQL',
        sql: `SELECT P.Regno, P.Name, P.Year, P.Combination \nFROM Physics P \nJOIN Computer_Science C ON P.Regno = C.Regno;`,
        note: 'MySQL versions prior to 8.0.31 lacked INTERSECT, so INNER JOIN is the standard solution.',
      },
    ],
    explanationSteps: [
      'Intersection identifies entities that exist simultaneously in both sets.',
      'Students enrolled in both Physics and Computer Science have matching registration numbers (Regno).',
      'The INNER JOIN on P.Regno = C.Regno matches students present in both tables.',
      'In our dataset, Swaroop (AJ00225) and Rupa (AJ00388) are enrolled in both departments.',
    ],
    expectedOutput: {
      columns: ['Regno', 'Name', 'Year', 'Combination'],
      rows: [
        ['AJ00225', 'Swaroop', 'Second', 'PMCs'],
        ['AJ00388', 'Rupa', 'First', 'PMCs'],
      ],
    },
    examTip: 'If your college lab uses MySQL version 8.0.30 or older, INTERSECT will throw a syntax error! The INNER JOIN syntax or WHERE Regno IN (SELECT Regno FROM ...) is the most universally accepted answer.',
  },
  {
    id: 'cs4-q3',
    caseStudyId: 'cs4',
    number: 3,
    originalQuestion: 'Display all student details those are studying in the second year.',
    conceptTags: ['UNION', 'WHERE', 'Set Operations'],
    tablesUsed: ['Physics', 'Computer_Science'],
    solutionSql: `SELECT * FROM Physics WHERE Year = 'Second'
UNION
SELECT * FROM Computer_Science WHERE Year = 'Second';`,
    explanationSteps: [
      'Students in the second year may be enrolled in Physics, Computer Science, or both.',
      'Query 1 filters Physics for Year = \'Second\' (yields Swaroop).',
      'Query 2 filters Computer_Science for Year = \'Second\' (yields Swaroop and Tejas).',
      'The UNION operator combines both subsets, eliminating the duplicate entry for Swaroop.',
      'The final result contains 2 distinct second-year students: Swaroop and Tejas.',
    ],
    expectedOutput: {
      columns: ['Regno', 'Name', 'Year', 'Combination'],
      rows: [
        ['AJ00225', 'Swaroop', 'Second', 'PMCs'],
        ['AJ00296', 'Tejas', 'Second', 'BCA'],
      ],
    },
    examTip: 'Always apply WHERE filtering in each individual SELECT before the UNION keyword when filtering subsets from multiple tables.',
  },
  {
    id: 'cs4-q4',
    caseStudyId: 'cs4',
    number: 4,
    originalQuestion: 'Display students who are studying both Physics and Computer Science in the second year.',
    conceptTags: ['INNER JOIN', 'WHERE', 'Intersection with Condition'],
    tablesUsed: ['Physics', 'Computer_Science'],
    solutionSql: `SELECT P.Regno, P.Name, P.Year, P.Combination 
FROM Physics P 
JOIN Computer_Science C ON P.Regno = C.Regno 
WHERE P.Year = 'Second' AND C.Year = 'Second';`,
    alternativeSql: [
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `SELECT * FROM Physics WHERE Year = 'Second'\nINTERSECT\nSELECT * FROM Computer_Science WHERE Year = 'Second';`,
        note: 'Using INTERSECT between two filtered queries.',
      },
    ],
    explanationSteps: [
      'This question requires two conditions simultaneously:',
      '1. The student must be in both subjects (INNER JOIN on Regno).',
      '2. The student must be studying in the Second year (P.Year = \'Second\' AND C.Year = \'Second\').',
      'In our dataset:',
      '- Swaroop (AJ00225) is in both Physics and Computer Science, and is in Second Year in both.',
      '- Rupa (AJ00388) is in both subjects, but is in First Year.',
      '- Tejas is in Second Year, but only in Computer Science.',
      'Therefore, only Swaroop matches all conditions.',
    ],
    expectedOutput: {
      columns: ['Regno', 'Name', 'Year', 'Combination'],
      rows: [
        ['AJ00225', 'Swaroop', 'Second', 'PMCs'],
      ],
    },
    examTip: 'To ensure data consistency in schemas where a student could be recorded in different years across departments, apply the condition to both tables (P.Year = \'Second\' AND C.Year = \'Second\').',
  },
  {
    id: 'cs4-q5',
    caseStudyId: 'cs4',
    number: 5,
    originalQuestion: 'Display the students studying only physics.',
    conceptTags: ['Subqueries', 'NOT IN', 'NOT EXISTS', 'EXCEPT / MINUS', 'NULL Safety'],
    tablesUsed: ['Physics', 'Computer_Science'],
    solutionSql: `-- Approach 1: Subquery with NOT IN (NULL-safe filter):
SELECT * FROM Physics 
WHERE Regno NOT IN (
    SELECT Regno FROM Computer_Science WHERE Regno IS NOT NULL
);`,
    alternativeSql: [
      {
        dialect: 'PostgreSQL',
        sql: `SELECT * FROM Physics\nEXCEPT\nSELECT * FROM Computer_Science;`,
        note: 'ANSI EXCEPT operator (supported in PostgreSQL, SQLite, and modern SQL engines).',
      },
      {
        dialect: 'Oracle',
        sql: `SELECT * FROM Physics\nMINUS\nSELECT * FROM Computer_Science;`,
        note: 'Oracle uses the keyword MINUS for set difference.',
      },
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `SELECT * FROM Physics P \nWHERE NOT EXISTS (\n    SELECT 1 FROM Computer_Science C WHERE C.Regno = P.Regno\n);`,
        note: 'NOT EXISTS is inherently NULL-safe and highly optimized.',
      },
    ],
    explanationSteps: [
      'Set Difference: We want students in Physics MINUS students in Computer Science.',
      'Physics contains 4 students: Ashwin, Swaroop, Sarika, Rupa.',
      'Computer Science contains: Swaroop, Tejas, Geeta, Rupa.',
      'Students in Physics who are NOT in Computer Science: Ashwin (AJ00325) and Sarika (AJ00385).',
      'Critical Exam Checkpoint: When using NOT IN with a subquery, if the subquery returns even a single NULL, SQL 3-valued logic causes the entire expression to evaluate to UNKNOWN, returning 0 rows! Adding WHERE Regno IS NOT NULL prevents this disaster.',
    ],
    expectedOutput: {
      columns: ['Regno', 'Name', 'Year', 'Combination'],
      rows: [
        ['AJ00325', 'Ashwin', 'First', 'PCM'],
        ['AJ00385', 'Sarika', 'Third', 'PME'],
      ],
    },
    examTip: 'Viva Favorite Question: "Why can NOT IN fail when a subquery contains NULLs?" Because `val NOT IN (1, NULL)` becomes `val != 1 AND val != NULL`. Since `val != NULL` is UNKNOWN, the whole condition fails to match! Always add `WHERE col IS NOT NULL` or use `NOT EXISTS`.',
  },
  {
    id: 'cs4-q6',
    caseStudyId: 'cs4',
    number: 6,
    originalQuestion: 'Display the students studying only Computer Science.',
    conceptTags: ['Subqueries', 'NOT IN', 'NOT EXISTS', 'Set Difference'],
    tablesUsed: ['Physics', 'Computer_Science'],
    solutionSql: `SELECT * FROM Computer_Science 
WHERE Regno NOT IN (
    SELECT Regno FROM Physics WHERE Regno IS NOT NULL
);`,
    alternativeSql: [
      {
        dialect: 'PostgreSQL',
        sql: `SELECT * FROM Computer_Science\nEXCEPT\nSELECT * FROM Physics;`,
        note: 'Standard set difference.',
      },
      {
        dialect: 'Oracle',
        sql: `SELECT * FROM Computer_Science\nMINUS\nSELECT * FROM Physics;`,
        note: 'Oracle MINUS operator.',
      },
    ],
    explanationSteps: [
      'Set Difference: Computer Science students MINUS Physics students.',
      'Computer Science has: Swaroop, Tejas, Geeta, Rupa.',
      'Physics contains: Ashwin, Swaroop, Sarika, Rupa.',
      'Excluding Swaroop and Rupa leaves Tejas (AJ00296) and Geeta (AJ00112).',
    ],
    expectedOutput: {
      columns: ['Regno', 'Name', 'Year', 'Combination'],
      rows: [
        ['AJ00296', 'Tejas', 'Second', 'BCA'],
        ['AJ00112', 'Geeta', 'First', 'BCA'],
      ],
    },
    examTip: 'Notice the symmetry between Q5 and Q6. In Q5, Physics is the outer table; in Q6, Computer_Science is the outer table.',
  },
  {
    id: 'cs4-q7',
    caseStudyId: 'cs4',
    number: 7,
    originalQuestion: 'Select all students having PMCs combination.',
    conceptTags: ['UNION', 'WHERE', 'Set Operations'],
    tablesUsed: ['Physics', 'Computer_Science'],
    solutionSql: `SELECT * FROM Physics WHERE Combination = 'PMCs'
UNION
SELECT * FROM Computer_Science WHERE Combination = 'PMCs';`,
    explanationSteps: [
      'The PMCs combination exists in both tables.',
      'Physics PMCs students: Swaroop (AJ00225) and Rupa (AJ00388).',
      'Computer Science PMCs students: Swaroop (AJ00225) and Rupa (AJ00388).',
      'Using UNION unites both queries and eliminates duplicates, returning Swaroop and Rupa.',
    ],
    expectedOutput: {
      columns: ['Regno', 'Name', 'Year', 'Combination'],
      rows: [
        ['AJ00225', 'Swaroop', 'Second', 'PMCs'],
        ['AJ00388', 'Rupa', 'First', 'PMCs'],
      ],
    },
    examTip: 'If UNION ALL were used here, Swaroop and Rupa would each appear twice in the result table.',
  },
  {
    id: 'cs4-q8',
    caseStudyId: 'cs4',
    number: 8,
    originalQuestion: 'Select all students having a BCA combination.',
    conceptTags: ['UNION', 'WHERE', 'Schema Audit'],
    tablesUsed: ['Physics', 'Computer_Science'],
    solutionSql: `-- Option 1: Robust query checking both departmental registers:
SELECT * FROM Physics WHERE Combination = 'BCA'
UNION
SELECT * FROM Computer_Science WHERE Combination = 'BCA';

-- Option 2: Direct query against Computer_Science:
-- SELECT * FROM Computer_Science WHERE Combination = 'BCA';`,
    alternativeSql: [
      {
        dialect: 'MySQL',
        sql: `SELECT * FROM Computer_Science WHERE Combination = 'BCA';`,
        note: 'Source PDF solution (queries only Computer_Science because Physics has no BCA students in the sample data).',
      },
    ],
    explanationSteps: [
      'Dataset Audit Check: In the Physics table, combinations are PCM, PMCs, and PME. There are no BCA students in Physics.',
      'In the Computer_Science table, Tejas and Geeta both have the BCA combination.',
      'The source PDF queried only Computer_Science directly. However, in an academic practical where the question says "Select ALL students having a BCA combination", querying both tables using UNION is architecturally superior because it guarantees students in any department with that combination are found.',
      'Both approaches produce the exact same two rows: Tejas and Geeta.',
    ],
    expectedOutput: {
      columns: ['Regno', 'Name', 'Year', 'Combination'],
      rows: [
        ['AJ00112', 'Geeta', 'First', 'BCA'],
        ['AJ00296', 'Tejas', 'Second', 'BCA'],
      ],
    },
    examTip: 'Exam Insight: When writing this in an exam, write Option 1 and mention in a comment that Physics currently has 0 BCA rows. This shows thoroughness that examiners appreciate.',
    ambiguityNote: 'The PDF solution queries only Computer_Science. Since the question asks for "all students", querying both department tables with UNION is safer and more consistent with Q7 and Q9.',
  },
  {
    id: 'cs4-q9',
    caseStudyId: 'cs4',
    number: 9,
    originalQuestion: 'Select all students studying in the Third year.',
    conceptTags: ['UNION', 'WHERE', 'Set Operations'],
    tablesUsed: ['Physics', 'Computer_Science'],
    solutionSql: `SELECT * FROM Physics WHERE Year = 'Third'
UNION
SELECT * FROM Computer_Science WHERE Year = 'Third';`,
    explanationSteps: [
      'Query 1 checks Physics for Year = \'Third\' -> Sarika (AJ00385).',
      'Query 2 checks Computer_Science for Year = \'Third\' -> 0 students.',
      'The UNION merges both sets, returning Sarika.',
    ],
    expectedOutput: {
      columns: ['Regno', 'Name', 'Year', 'Combination'],
      rows: [
        ['AJ00385', 'Sarika', 'Third', 'PME'],
      ],
    },
    examTip: 'Even when one side of a UNION returns zero rows, the UNION executes smoothly and returns the non-empty side without error.',
  },
  {
    id: 'cs4-q10',
    caseStudyId: 'cs4',
    number: 10,
    originalQuestion: 'Rename table Computer Science to CS.',
    conceptTags: ['DDL', 'RENAME TABLE', 'sp_rename', 'Dialect Variations'],
    tablesUsed: ['Computer_Science'],
    solutionSql: `-- ANSI Standard SQL / SQLite / PostgreSQL:
ALTER TABLE Computer_Science RENAME TO CS;`,
    alternativeSql: [
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `EXEC sp_rename 'Computer_Science', 'CS';`,
        note: 'Source PDF syntax (SQL Server stored procedure).',
      },
      {
        dialect: 'MySQL',
        sql: `RENAME TABLE Computer_Science TO CS;\n-- Or: ALTER TABLE Computer_Science RENAME TO CS;`,
        note: 'MySQL supports both RENAME TABLE and ALTER TABLE RENAME TO.',
      },
      {
        dialect: 'Oracle',
        sql: `RENAME Computer_Science TO CS;`,
        note: 'Oracle supports direct RENAME old_name TO new_name.',
      },
    ],
    explanationSteps: [
      'Mandatory Dialect Checkpoint: Table renaming syntax differs drastically across database engines:',
      '1. ANSI Standard, SQLite, PostgreSQL: ALTER TABLE Computer_Science RENAME TO CS;',
      '2. Microsoft SQL Server (T-SQL): EXEC sp_rename \'Computer_Science\', \'CS\'; (This is the syntax used in the original lab solution PDF).',
      '3. MySQL: RENAME TABLE Computer_Science TO CS; (or ALTER TABLE ... RENAME TO).',
      '4. Oracle: RENAME Computer_Science TO CS;',
      'In a lab exam, always write the syntax specific to the database engine installed in your computer lab.',
    ],
    expectedOutput: {
      columns: ['Regno', 'Name', 'Year', 'Combination'],
      rows: [
        ['AJ00225', 'Swaroop', 'Second', 'PMCs'],
        ['AJ00296', 'Tejas', 'Second', 'BCA'],
        ['AJ00112', 'Geeta', 'First', 'BCA'],
        ['AJ00388', 'Rupa', 'First', 'PMCs'],
      ],
      isModification: true,
      modificationDetails: {
        table: 'Computer_Science -> CS',
        action: 'DDL Table Rename',
        beforeSummary: 'Table was named Computer_Science',
        afterSummary: 'Table is now named CS. Querying SELECT * FROM CS returns the 4 student records.',
      },
    },
    examTip: 'High-Risk Exam Trap: If your lab uses MySQL or Oracle, EXEC sp_rename will throw an error! Memorize the command for your lab\'s specific database engine.',
  },
];
