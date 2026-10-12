import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    number: 1,
    name: 'Employee & Salary Management',
    databaseName: 'Employee',
    subtitle: 'SELECT Clause, Arithmetic Expressions, Dates & DDL Updates',
    description:
      'Master core projection, table relationships, derived calculations (HRA, DA, PF, Gross/Net Salary), date boundary queries, and table column modifications.',
    topicsCovered: [
      'Projection (SELECT)',
      'Filtering (WHERE)',
      'Sorting (ORDER BY)',
      'Arithmetic Operators (+, -, *, /)',
      'Date Functions & Boundaries',
      'String Length (LENGTH / LEN)',
      'DDL ALTER TABLE',
      'DML UPDATE Statements',
    ],
    tables: ['Employee', 'EmpSalary'],
  },
  {
    id: 'cs2',
    number: 2,
    name: 'Bank System',
    databaseName: 'Bank System',
    subtitle: 'GROUP BY, Aggregate Functions, HAVING Clause & Multi-table Joins',
    description:
      'Learn grouping logic, branch and city level financial aggregations (SUM, AVG, MIN, MAX, COUNT), row vs group filtering (WHERE vs HAVING), and multi-table joins.',
    topicsCovered: [
      'GROUP BY Clause',
      'HAVING vs WHERE',
      'Aggregate Functions (SUM, AVG, MIN, MAX, COUNT)',
      'Multi-table INNER JOIN',
      'Sorting Aggregations (ORDER BY DESC)',
      'Record Updates by Primary Key',
    ],
    tables: ['Account', 'Branch', 'Depositor', 'Loan'],
  },
  {
    id: 'cs3',
    number: 3,
    name: 'Library Management',
    databaseName: 'Library',
    subtitle: 'Logical & Relational Operators, Pattern Matching & Financial Bills',
    description:
      'Explore boolean logic (AND, OR, NOT), wildcard pattern matching (LIKE % and _), set membership (IN, NOT IN), ranges (BETWEEN), and financial itemized billing with VAT.',
    topicsCovered: [
      'Wildcards (LIKE %)',
      'Relational Operators (>, <, !=, <>)',
      'Range Filtering (BETWEEN ... AND)',
      'Set Membership (IN, NOT IN)',
      'Itemized Billing (Subtotal, VAT 4%, Total)',
      'Foreign Key Joins (Books to Issued)',
      'Multi-column Sorting',
    ],
    tables: ['Books', 'Issued'],
  },
  {
    id: 'cs4',
    number: 4,
    name: 'Subject & Academic Registry',
    databaseName: 'Subject',
    subtitle: 'Set Operations (UNION, UNION ALL, INTERSECT, EXCEPT) & Table Renaming',
    description:
      'Understand relational set algebra across departmental student registries, difference logic, NULL safety in subqueries, and database-specific table renaming syntax.',
    topicsCovered: [
      'UNION vs UNION ALL',
      'INTERSECT & Inner Join Equivalents',
      'Set Difference (NOT IN, NOT EXISTS, EXCEPT)',
      'Handling NULLs in Subqueries',
      'Filtering Combined Sets',
      'DDL Table Renaming (sp_rename vs RENAME TO)',
    ],
    tables: ['Physics', 'Computer_Science'],
  },
];
