import { RevisionTopic } from '../../types';

export const REVISION_TOPICS: RevisionTopic[] = [
  {
    id: 'rev-where-vs-having',
    title: 'WHERE vs HAVING: When and Why to Use Each',
    category: 'Comparisons',
    summary:
      'The #1 most frequently asked question in DBMS viva and lab exams. The core distinction lies in when the filtering occurs relative to row grouping.',
    points: [
      {
        title: 'Timing of Evaluation',
        explanation:
          'WHERE filters individual rows BEFORE they are grouped by GROUP BY. HAVING filters the synthesized groups AFTER aggregation has taken place.',
      },
      {
        title: 'Use of Aggregate Functions',
        explanation:
          'WHERE cannot contain aggregate functions (e.g. WHERE SUM(Salary) > 50000 will throw an error). HAVING can and usually does contain aggregate functions (e.g. HAVING COUNT(*) > 2).',
        code: `-- Correct usage:\nSELECT Branch_Id, MAX(Balance) AS Max_Loan \nFROM Loan \nWHERE Balance > 25000 \nGROUP BY Branch_Id \nHAVING COUNT(*) >= 1;`,
      },
      {
        title: 'Indexes and Performance',
        explanation:
          'WHERE can utilize table indexes to prune rows early, drastically reducing processing load. HAVING operates on the in-memory aggregated result set.',
      },
    ],
    examAdvice:
      'In viva exams, summarize in one sentence: "WHERE filters rows before grouping; HAVING filters groups after aggregation."',
  },
  {
    id: 'rev-union-vs-union-all',
    title: 'UNION vs UNION ALL: Set Theory & Performance',
    category: 'Comparisons',
    summary:
      'Both combine records from multiple SELECT queries with matching projections, but handle duplicates and performance differently.',
    points: [
      {
        title: 'Duplicate Handling',
        explanation:
          'UNION removes duplicate rows so that each unique record appears only once. UNION ALL preserves every single row from all queries, including duplicates.',
        code: `-- UNION produces 6 distinct students:\nSELECT Regno, Name FROM Physics\nUNION\nSELECT Regno, Name FROM Computer_Science;\n\n-- UNION ALL produces 8 total rows (duplicates retained):\nSELECT Regno, Name FROM Physics\nUNION ALL\nSELECT Regno, Name FROM Computer_Science;`,
      },
      {
        title: 'Underlying Execution & Speed',
        explanation:
          'UNION performs an expensive sort or hash operation to identify and eliminate duplicates. UNION ALL merely appends streams together, making UNION ALL substantially faster.',
      },
      {
        title: 'Schema Compatibility Rule',
        explanation:
          'Both require that participating SELECT queries have the exact same number of columns and that corresponding columns share compatible data types.',
      },
    ],
    examAdvice:
      'If the question asks for "all students without duplicates", use UNION. If it asks for "all enrollments" or total records, use UNION ALL.',
  },
  {
    id: 'rev-drop-truncate-delete',
    title: 'DROP vs TRUNCATE vs DELETE: Data Removal Taxonomy',
    category: 'Comparisons',
    summary:
      'Understanding the boundary between DDL and DML operations when purging or resetting data in a relational database.',
    points: [
      {
        title: 'DELETE (DML)',
        explanation:
          'Deletes rows one by one. Can have a WHERE clause. Triggers row-level triggers. Can be rolled back if inside an uncommitted transaction.',
        code: `DELETE FROM Employee WHERE Emp_Id = 1001;`,
      },
      {
        title: 'TRUNCATE (DDL)',
        explanation:
          'Removes all rows instantly by deallocating data pages. Cannot have a WHERE clause. Faster than DELETE. Retains table structure, columns, constraints, and indexes.',
        code: `TRUNCATE TABLE Employee;`,
      },
      {
        title: 'DROP TABLE (DDL)',
        explanation:
          'Completely deletes the table definition, columns, data, constraints, and dictionary metadata from disk. Table ceases to exist.',
        code: `DROP TABLE Employee;`,
      },
    ],
    examAdvice:
      'Remember: DELETE removes rows conditionally; TRUNCATE empties the table structure instantly; DROP destroys the entire table.',
  },
  {
    id: 'rev-joins-breakdown',
    title: 'Relational Joins Quick Reference Guide',
    category: 'Aggregates & Joins',
    summary:
      'Visualizing how INNER, LEFT, RIGHT, and FULL joins match entities across primary and foreign key relationships.',
    points: [
      {
        title: 'INNER JOIN',
        explanation:
          'Returns only the intersection: rows where the join condition evaluates to TRUE in both the left and right tables.',
        code: `SELECT E.First_Name, S.Salary \nFROM Employee E \nJOIN EmpSalary S ON E.Emp_Id = S.Emp_Id;`,
      },
      {
        title: 'LEFT OUTER JOIN',
        explanation:
          'Guarantees all rows from the LEFT table are returned. If no matching row exists on the right, right-side columns are filled with NULL.',
      },
      {
        title: 'RIGHT OUTER JOIN',
        explanation:
          'Guarantees all rows from the RIGHT table are returned. If no matching row exists on the left, left-side columns are filled with NULL.',
      },
      {
        title: 'FULL OUTER JOIN',
        explanation:
          'Combines results of LEFT and RIGHT joins: preserves unmatched rows from both tables, filling missing counterparts with NULL.',
      },
    ],
    examAdvice:
      'Always qualify column names with table aliases (e.g. E.First_Name, S.Salary) to avoid "ambiguous column name" errors when columns exist in multiple tables.',
  },
  {
    id: 'rev-common-traps',
    title: 'Top 5 DBMS Lab Practical Exam Pitfalls',
    category: 'Common Traps',
    summary:
      'Avoid these common mistakes made by students during practical exams.',
    points: [
      {
        title: '1. The DATEDIFF Year-Boundary Trap (CS1-Q5)',
        explanation:
          'In SQL Server, DATEDIFF(year, date1, date2) counts calendar year transitions, not 365 elapsed days. Dec 31 to Jan 1 is 1 year in DATEDIFF! Use DATEADD(year, -1, GETDATE()) for accurate 1-year tenure.',
      },
      {
        title: '2. The UPDATE Without WHERE Trap (CS1-Q8)',
        explanation:
          'Executing `UPDATE Employee SET PHONE_NO = \'987...\';` without a `WHERE Emp_Id = ...` clause will overwrite every single record in the entire table with that phone number!',
      },
      {
        title: '3. The NOT IN with NULL Subquery Trap (CS4-Q5)',
        explanation:
          'If a subquery inside `NOT IN (...)` produces even a single NULL, SQL three-valued logic causes the whole condition to evaluate to UNKNOWN, returning 0 rows! Always filter NULLs: `WHERE col NOT IN (SELECT col FROM ... WHERE col IS NOT NULL)`.',
      },
      {
        title: '4. The Gross vs Net Salary Trap (CS1-Q10)',
        explanation:
          'Gross Salary = Basic Salary + Allowances (HRA + DA) + Benefits. Provident Fund (PF) is an employee deduction. Subtracting PF gives Net Salary (Take-Home), not Gross Salary.',
      },
      {
        title: '5. The Empty Set Fear Trap (CS1-Q1, CS3-Q8)',
        explanation:
          'If your query returns 0 rows (Empty Set) because the underlying sample data contains no matching records (e.g. Paris in Employee, or author starting with T in Books), do not panic or alter the query. An empty table is the correct output.',
      },
    ],
    examAdvice:
      'Read questions twice. Check if they ask for Gross Salary vs Net Salary, distinct rows, or specific table columns.',
  },
  {
    id: 'rev-syntax-patterns',
    title: 'Essential Syntax Patterns Cheatsheet',
    category: 'Syntax Patterns',
    summary:
      'High-yield syntax templates for quick reference right before entering the exam lab.',
    points: [
      {
        title: 'Table Creation with Constraints',
        explanation: 'Primary key, foreign key, check constraint, unique constraint.',
        code: `CREATE TABLE EmpSalary (\n    Emp_Id INT FOREIGN KEY REFERENCES Employee(Emp_Id),\n    Salary DECIMAL(10,2),\n    Benefits DECIMAL(10,2),\n    Designation VARCHAR(50)\n);`,
      },
      {
        title: 'GROUP BY with Aggregation & Sorting',
        explanation: 'Group summary with sorting on aggregate column.',
        code: `SELECT Branch_Id, SUM(Balance) AS Total_Deposited \nFROM Depositor \nGROUP BY Branch_Id \nORDER BY Total_Deposited DESC;`,
      },
      {
        title: 'Subquery with Set Difference',
        explanation: 'Safe difference between two tables.',
        code: `SELECT * FROM Physics \nWHERE Regno NOT IN (\n    SELECT Regno FROM Computer_Science WHERE Regno IS NOT NULL\n);`,
      },
    ],
    examAdvice:
      'Keep this syntax cheat sheet open during practice to commit standard clause orders to memory.',
  },
];
