import { LabQuestion } from '../../types';

export const CASE_STUDY_1_QUESTIONS: LabQuestion[] = [
  {
    id: 'cs1-q1',
    caseStudyId: 'cs1',
    number: 1,
    originalQuestion: 'Display FIRSTNAME, LASTNAME, ADDRESS, and CITY of all employees living in PARIS.',
    conceptTags: ['SELECT', 'WHERE', 'String Functions', 'UPPER'],
    tablesUsed: ['Employee'],
    solutionSql: `SELECT First_Name, Last_Name, Address, City 
FROM Employee 
WHERE UPPER(City) = 'PARIS';`,
    alternativeSql: [
      {
        dialect: 'MySQL',
        sql: `SELECT First_Name, Last_Name, Address, City \nFROM Employee \nWHERE City = 'Paris';`,
        note: 'MySQL string comparison is case-insensitive by default under standard collations.',
      },
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `SELECT First_Name, Last_Name, Address, City \nFROM Employee \nWHERE UPPER(City) = 'PARIS';`,
        note: 'UPPER() ensures match regardless of server collation settings.',
      },
    ],
    explanationSteps: [
      'The SELECT clause projects the 4 required attributes: First_Name, Last_Name, Address, and City.',
      'The FROM clause targets the Employee table.',
      'The WHERE clause filters rows using UPPER(City) = \'PARIS\' to ensure case-insensitive matching.',
      'Dataset Check: The cities in the sample database are Belagavi, Athani, Mysore, New Delhi, and Mumbai.',
      'Because no employee resides in Paris, the query legitimately returns an empty set (0 rows).',
    ],
    expectedOutput: {
      columns: ['First_Name', 'Last_Name', 'Address', 'City'],
      rows: [],
      isEmpty: true,
      emptyReason: 'No employee in the supplied sample database has City = \'Paris\'. In a lab exam, an empty result table is the strictly correct and expected outcome for this query.',
    },
    examTip: 'Do not panic if a query produces zero rows in your practical exam! If your WHERE clause matches the question requirement and the underlying data contains no matching records, an empty table is 100% correct.',
    ambiguityNote: 'The sample dataset contains Indian cities (Belagavi, Athani, Mysore, New Delhi, Mumbai). The question specifically asks for "PARIS". The query is executed as asked without inventing fake rows.',
  },
  {
    id: 'cs1-q2',
    caseStudyId: 'cs1',
    number: 2,
    originalQuestion: 'Display the content of the employee table in descending order of FIRSTNAME.',
    conceptTags: ['SELECT *', 'ORDER BY', 'DESC'],
    tablesUsed: ['Employee'],
    solutionSql: `SELECT * FROM Employee 
ORDER BY First_Name DESC;`,
    explanationSteps: [
      'SELECT * retrieves all columns from the Employee table.',
      'FROM Employee specifies the source table.',
      'ORDER BY First_Name sorts the result set alphabetically by the First_Name column.',
      'The DESC keyword reverses the default ascending order, sorting from Z to A.',
    ],
    expectedOutput: {
      columns: ['Emp_Id', 'First_Name', 'Last_Name', 'Hire_Date', 'Address', 'City'],
      rows: [
        [1012, 'Sham', 'Pujari', '2005-09-12', '33 Elm St.', 'Mysore'],
        [1016, 'Sarath', 'Sharma', '2007-08-22', '440 MG Road', 'New Delhi'],
        [1001, 'Raghav', 'Patel', '2006-05-11', '83 first street', 'Belagavi'],
        [1020, 'Monika', 'Gupta', '2008-06-07', '9 Bandra', 'Mumbai'],
        [1002, 'Mohini', 'Rathi', '2008-02-25', '842 Vine Ave', 'Athani'],
        [1015, 'Kriti', 'Dev', '2006-12-19', '11 Red Road', 'Belagavi'],
      ],
    },
    examTip: 'The default sorting order in SQL is ASC (ascending). To sort descending, the DESC keyword is strictly required at the end of the column name in the ORDER BY clause.',
  },
  {
    id: 'cs1-q3',
    caseStudyId: 'cs1',
    number: 3,
    originalQuestion: 'Select the FIRSTNAME and SALARY of the salesman.',
    conceptTags: ['INNER JOIN', 'Table Aliases', 'WHERE'],
    tablesUsed: ['Employee', 'EmpSalary'],
    solutionSql: `SELECT E.First_Name, S.Salary 
FROM Employee E 
JOIN EmpSalary S ON E.Emp_Id = S.Emp_Id 
WHERE S.Designation = 'Salesman';`,
    explanationSteps: [
      'First_Name is stored in Employee, while Salary and Designation are stored in EmpSalary.',
      'We perform an INNER JOIN between Employee E and EmpSalary S on the matching primary/foreign key Emp_Id.',
      'The WHERE clause filters rows to only include those where Designation is \'Salesman\'.',
      'The projection lists E.First_Name and S.Salary.',
    ],
    expectedOutput: {
      columns: ['First_Name', 'Salary'],
      rows: [
        ['Mohini', 8000.00],
        ['Monika', 8000.00],
      ],
    },
    examTip: 'Always prefix column names with table aliases (e.g. E.First_Name, S.Salary) when querying across multiple joined tables to eliminate ambiguity and write professional SQL.',
  },
  {
    id: 'cs1-q4',
    caseStudyId: 'cs1',
    number: 4,
    originalQuestion: 'Display FIRSTNAME, LASTNAME, and TOTAL SALARY of all employees (TOTAL SALARY = SALARY + BENEFITS).',
    conceptTags: ['INNER JOIN', 'Arithmetic Operator (+)', 'Column Aliases'],
    tablesUsed: ['Employee', 'EmpSalary'],
    solutionSql: `SELECT E.First_Name, E.Last_Name, (S.Salary + S.Benefits) AS TOTAL_SALARY 
FROM Employee E 
JOIN EmpSalary S ON E.Emp_Id = S.Emp_Id;`,
    explanationSteps: [
      'Join Employee E with EmpSalary S on the common key Emp_Id.',
      'Use the arithmetic addition operator (+) to sum S.Salary and S.Benefits.',
      'Assign the alias TOTAL_SALARY using the AS keyword to name the computed column in the output.',
      'Project E.First_Name and E.Last_Name alongside the computed sum.',
    ],
    expectedOutput: {
      columns: ['First_Name', 'Last_Name', 'TOTAL_SALARY'],
      rows: [
        ['Raghav', 'Patel', 13000.00],
        ['Mohini', 'Rathi', 9200.00],
        ['Sham', 'Pujari', 25000.00],
        ['Kriti', 'Dev', 7800.00],
        ['Sarath', 'Sharma', 7000.00],
        ['Monika', 'Gupta', 9200.00],
      ],
    },
    examTip: 'If any column used in arithmetic contains a NULL value, the entire addition evaluates to NULL in standard SQL unless wrapped in COALESCE(Benefits, 0) or IFNULL(Benefits, 0).',
  },
  {
    id: 'cs1-q5',
    caseStudyId: 'cs1',
    number: 5,
    originalQuestion: 'List the Names of employees who are more than 1 year old in the organization.',
    conceptTags: ['Date Functions', 'DATEDIFF', 'DATEADD', 'CURDATE'],
    tablesUsed: ['Employee'],
    solutionSql: `-- Standard ANSI / Portable Approach:
SELECT First_Name, Last_Name 
FROM Employee 
WHERE Hire_Date <= DATEADD(year, -1, GETDATE());`,
    alternativeSql: [
      {
        dialect: 'MySQL',
        sql: `SELECT First_Name, Last_Name \nFROM Employee \nWHERE Hire_Date <= DATE_SUB(CURDATE(), INTERVAL 1 YEAR);`,
        note: 'DATE_SUB with INTERVAL 1 YEAR calculates the exact 365-day threshold.',
      },
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `SELECT First_Name, Last_Name \nFROM Employee \nWHERE Hire_Date <= DATEADD(year, -1, GETDATE());`,
        note: 'Subtracts exactly 1 year from the current system timestamp.',
      },
      {
        dialect: 'SQLite',
        sql: `SELECT First_Name, Last_Name \nFROM Employee \nWHERE Hire_Date <= date('now', '-1 year');`,
        note: 'Uses SQLite\'s built-in date modifier string.',
      },
      {
        dialect: 'PostgreSQL',
        sql: `SELECT First_Name, Last_Name \nFROM Employee \nWHERE Hire_Date <= CURRENT_DATE - INTERVAL '1 year';`,
        note: 'Uses standard interval subtraction.',
      },
    ],
    explanationSteps: [
      'To test if an employee has been with the company for > 1 year, we compare Hire_Date against the date exactly one year ago from today.',
      'Subtracting 1 year from today gives the cutoff date. Anyone hired on or before this cutoff date has served > 1 year.',
      'Trap Alert: In SQL Server, DATEDIFF(year, Hire_Date, GETDATE()) only counts calendar year boundaries crossed. Comparing December 31 to January 1 gives DATEDIFF of 1 even though only 1 day elapsed! Use DATEADD(year, -1, GETDATE()) for true tenure measurement.',
      'Since all sample employee hire dates range from 2005 to 2008, all 6 employees qualify when evaluated relative to the present day.',
    ],
    expectedOutput: {
      columns: ['First_Name', 'Last_Name'],
      rows: [
        ['Raghav', 'Patel'],
        ['Mohini', 'Rathi'],
        ['Sham', 'Pujari'],
        ['Kriti', 'Dev'],
        ['Sarath', 'Sharma'],
        ['Monika', 'Gupta'],
      ],
    },
    examTip: 'Beware of DATEDIFF(year, date1, date2) in SQL Server! It only checks year boundary transitions (e.g. 2023 to 2024 is 1 year even if only 1 day passed). Mentioning DATEADD(year, -1, GETDATE()) shows deep mastery to the examiner.',
    dialectNotes: 'Date arithmetic varies significantly across DBMS engines. SQL Server uses GETDATE() and DATEADD(); MySQL uses CURDATE() and DATE_SUB(); PostgreSQL uses CURRENT_DATE and INTERVAL; SQLite uses date(\'now\', \'-1 year\').',
  },
  {
    id: 'cs1-q6',
    caseStudyId: 'cs1',
    number: 6,
    originalQuestion: 'Count the number of distinct DESIGNATION from EMPSALARY.',
    conceptTags: ['COUNT', 'DISTINCT', 'Aggregate Functions'],
    tablesUsed: ['EmpSalary'],
    solutionSql: `SELECT COUNT(DISTINCT Designation) AS Distinct_Designations 
FROM EmpSalary;`,
    explanationSteps: [
      'The EmpSalary table contains 6 rows with designations: Manager, Salesman, Director, Clerk, Clerk, Salesman.',
      'DISTINCT Designation isolates the unique values: Manager, Salesman, Director, Clerk (4 unique values).',
      'COUNT(DISTINCT ...) computes the count of these unique non-null entries, returning 4.',
      'The result is aliased as Distinct_Designations.',
    ],
    expectedOutput: {
      columns: ['Distinct_Designations'],
      rows: [[4]],
    },
    examTip: 'Without DISTINCT, COUNT(Designation) returns 6 (total non-null rows). Adding DISTINCT inside COUNT(DISTINCT column) is essential to eliminate duplicates before counting.',
  },
  {
    id: 'cs1-q7',
    caseStudyId: 'cs1',
    number: 7,
    originalQuestion: 'List the employees whose names have exactly 6 characters.',
    conceptTags: ['LENGTH', 'LEN', 'String Functions', 'WHERE'],
    tablesUsed: ['Employee'],
    solutionSql: `-- Standard ANSI / MySQL / SQLite / PostgreSQL / Oracle:
SELECT * FROM Employee 
WHERE LENGTH(First_Name) = 6;`,
    alternativeSql: [
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `SELECT * FROM Employee \nWHERE LEN(First_Name) = 6;`,
        note: 'SQL Server uses LEN() instead of LENGTH().',
      },
      {
        dialect: 'MySQL',
        sql: `SELECT * FROM Employee \nWHERE CHAR_LENGTH(First_Name) = 6;`,
        note: 'CHAR_LENGTH() measures character count, immune to multi-byte encoding.',
      },
    ],
    explanationSteps: [
      'The string function LENGTH() (or LEN() in SQL Server) calculates the character count of a string.',
      'Checking First_Name length = 6 filters the rows:',
      '- Raghav: 6 chars (Match)',
      '- Mohini: 6 chars (Match)',
      '- Sham: 4 chars (No match)',
      '- Kriti: 5 chars (No match)',
      '- Sarath: 6 chars (Match)',
      '- Monika: 6 chars (Match)',
      'Four employees match this criteria.',
    ],
    expectedOutput: {
      columns: ['Emp_Id', 'First_Name', 'Last_Name', 'Hire_Date', 'Address', 'City'],
      rows: [
        [1001, 'Raghav', 'Patel', '2006-05-11', '83 first street', 'Belagavi'],
        [1002, 'Mohini', 'Rathi', '2008-02-25', '842 Vine Ave', 'Athani'],
        [1016, 'Sarath', 'Sharma', '2007-08-22', '440 MG Road', 'New Delhi'],
        [1020, 'Monika', 'Gupta', '2008-06-07', '9 Bandra', 'Mumbai'],
      ],
    },
    examTip: 'Engine distinction: MySQL, Oracle, SQLite, and PostgreSQL use LENGTH(). Microsoft SQL Server exclusively uses LEN(). Remember to write the dialect used in your college lab!',
    ambiguityNote: 'The prompt specifies "names have exactly 6 characters". The solution applies this to First_Name. If evaluated on Last_Name, Pujari (6) and Sharma (6) would match.',
  },
  {
    id: 'cs1-q8',
    caseStudyId: 'cs1',
    number: 8,
    originalQuestion: 'Add new column PHONE_NO to EMPLOYEE and update the records.',
    conceptTags: ['ALTER TABLE', 'ADD COLUMN', 'UPDATE', 'SET', 'WHERE'],
    tablesUsed: ['Employee'],
    solutionSql: `-- Step 1: DDL to add the column
ALTER TABLE Employee ADD PHONE_NO VARCHAR(15);

-- Step 2: DML to update the record with specific employee ID
UPDATE Employee SET PHONE_NO = '9876543210' WHERE Emp_Id = 1001;`,
    alternativeSql: [
      {
        dialect: 'MySQL',
        sql: `ALTER TABLE Employee ADD COLUMN PHONE_NO VARCHAR(15);\nUPDATE Employee SET PHONE_NO = '9876543210' WHERE Emp_Id = 1001;`,
        note: 'The COLUMN keyword is optional in MySQL.',
      },
      {
        dialect: 'Oracle',
        sql: `ALTER TABLE Employee ADD (PHONE_NO VARCHAR2(15));\nUPDATE Employee SET PHONE_NO = '9876543210' WHERE Emp_Id = 1001;`,
        note: 'Oracle requires parentheses around column additions.',
      },
    ],
    explanationSteps: [
      'Step 1 (DDL): ALTER TABLE Employee ADD PHONE_NO VARCHAR(15) modifies the schema, adding a nullable phone number column.',
      'Step 2 (DML): UPDATE Employee SET PHONE_NO = \'9876543210\' WHERE Emp_Id = 1001 updates the contact info for Raghav (1001).',
      'Safety Note: Omitting the WHERE clause would update EVERY employee in the table with the same number! In database exams, always include a WHERE clause when updating specific records.',
    ],
    expectedOutput: {
      columns: ['Emp_Id', 'First_Name', 'Last_Name', 'Hire_Date', 'Address', 'City', 'PHONE_NO'],
      rows: [
        [1001, 'Raghav', 'Patel', '2006-05-11', '83 first street', 'Belagavi', '9876543210'],
        [1002, 'Mohini', 'Rathi', '2008-02-25', '842 Vine Ave', 'Athani', null],
        [1012, 'Sham', 'Pujari', '2005-09-12', '33 Elm St.', 'Mysore', null],
        [1015, 'Kriti', 'Dev', '2006-12-19', '11 Red Road', 'Belagavi', null],
        [1016, 'Sarath', 'Sharma', '2007-08-22', '440 MG Road', 'New Delhi', null],
        [1020, 'Monika', 'Gupta', '2008-06-07', '9 Bandra', 'Mumbai', null],
      ],
      isModification: true,
      modificationDetails: {
        table: 'Employee',
        action: 'ALTER TABLE ADD + UPDATE',
        beforeSummary: 'Table had 6 columns. PHONE_NO did not exist.',
        afterSummary: 'Table now has 7 columns. Emp_Id 1001 has PHONE_NO = \'9876543210\', other rows have NULL.',
      },
    },
    examTip: 'NEVER run an UPDATE statement without a WHERE clause in an exam or production unless explicitly told to update all records. An UPDATE without WHERE modifies the entire table!',
  },
  {
    id: 'cs1-q9',
    caseStudyId: 'cs1',
    number: 9,
    originalQuestion: 'List employee names who have joined before 15-Jun-08 and after 16-Jun-07.',
    conceptTags: ['WHERE', 'BETWEEN', 'Logical AND', 'Date Range'],
    tablesUsed: ['Employee'],
    solutionSql: `SELECT First_Name, Last_Name 
FROM Employee 
WHERE Hire_Date > '2007-06-16' AND Hire_Date < '2008-06-15';`,
    alternativeSql: [
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `SELECT First_Name, Last_Name \nFROM Employee \nWHERE Hire_Date BETWEEN '2007-06-17' AND '2008-06-14';`,
        note: 'Source PDF representation using BETWEEN with boundary offset dates.',
      },
    ],
    explanationSteps: [
      'The question specifies two strict boundary conditions: joined "before 15-Jun-08" AND "after 16-Jun-07".',
      'The ANSI standard date literal format is ISO-8601: \'YYYY-MM-DD\'.',
      'Using Hire_Date > \'2007-06-16\' AND Hire_Date < \'2008-06-15\' strictly excludes the boundary dates.',
      'Checking our dataset:',
      '- Raghav: 2006-05-11 (Too early)',
      '- Mohini: 2008-02-25 (Within range - Match)',
      '- Sham: 2005-09-12 (Too early)',
      '- Kriti: 2006-12-19 (Too early)',
      '- Sarath: 2007-08-22 (Within range - Match)',
      '- Monika: 2008-06-07 (Within range - Match)',
      'Three employees meet the criteria: Mohini, Sarath, and Monika.',
    ],
    expectedOutput: {
      columns: ['First_Name', 'Last_Name'],
      rows: [
        ['Mohini', 'Rathi'],
        ['Sarath', 'Sharma'],
        ['Monika', 'Gupta'],
      ],
    },
    examTip: 'Remember that the BETWEEN operator in SQL is always INCLUSIVE (equivalent to >= AND <=). For strict inequality ("before" and "after"), use > and < operators.',
  },
  {
    id: 'cs1-q10',
    caseStudyId: 'cs1',
    number: 10,
    originalQuestion: 'Generate Salary slip with Name, Salary, Benefits, HRA-50%, DA-30%, PF-12%, Calculate gross. Order descending by gross.',
    conceptTags: ['Arithmetic Expressions', 'JOIN', 'ORDER BY DESC', 'Payroll Logic'],
    tablesUsed: ['Employee', 'EmpSalary'],
    solutionSql: `SELECT 
    E.First_Name, 
    E.Last_Name, 
    S.Salary, 
    S.Benefits,
    (S.Salary * 0.50) AS HRA,
    (S.Salary * 0.30) AS DA,
    (S.Salary * 0.12) AS PF_Deduction,
    (S.Salary + (S.Salary * 0.50) + (S.Salary * 0.30) + S.Benefits) AS Gross_Salary,
    ((S.Salary + (S.Salary * 0.50) + (S.Salary * 0.30) + S.Benefits) - (S.Salary * 0.12)) AS Net_Salary
FROM Employee E 
JOIN EmpSalary S ON E.Emp_Id = S.Emp_Id
ORDER BY Gross_Salary DESC;`,
    alternativeSql: [
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `SELECT \n    E.First_Name, E.Last_Name, S.Salary, S.Benefits,\n    (S.Salary * 0.50) AS HRA,\n    (S.Salary * 0.30) AS DA,\n    (S.Salary * 0.12) AS PF,\n    (S.Salary + S.Benefits + (S.Salary * 0.50) + (S.Salary * 0.30) - (S.Salary * 0.12)) AS Gross_Salary\nFROM Employee E \nJOIN EmpSalary S ON E.Emp_Id = S.Emp_Id\nORDER BY Gross_Salary DESC;`,
        note: 'Source PDF query (Note: Source subtracted PF inside Gross_Salary, which represents Net Take-Home Salary in payroll standards).',
      },
    ],
    explanationSteps: [
      'Join Employee E with EmpSalary S on Emp_Id.',
      'HRA (House Rent Allowance) is calculated as 50% of Salary: (S.Salary * 0.50).',
      'DA (Dearness Allowance) is calculated as 30% of Salary: (S.Salary * 0.30).',
      'PF (Provident Fund) is calculated as 12% of Salary: (S.Salary * 0.12).',
      'Accounting Distinction: Gross Salary = Basic Salary + Allowances + Benefits. PF is an employee deduction. Subtracting PF produces Net / Take-Home Salary.',
      'Our query outputs both the true Gross Salary and the Net Salary, sorted by Gross_Salary DESC.',
    ],
    expectedOutput: {
      columns: ['First_Name', 'Last_Name', 'Salary', 'Benefits', 'HRA', 'DA', 'PF_Deduction', 'Gross_Salary', 'Net_Salary'],
      rows: [
        ['Sham', 'Pujari', 20000.00, 5000.00, 10000.00, 6000.00, 2400.00, 41000.00, 38600.00],
        ['Raghav', 'Patel', 10000.00, 3000.00, 5000.00, 3000.00, 1200.00, 21000.00, 19800.00],
        ['Mohini', 'Rathi', 8000.00, 1200.00, 4000.00, 2400.00, 960.00, 15600.00, 14640.00],
        ['Monika', 'Gupta', 8000.00, 1200.00, 4000.00, 2400.00, 960.00, 15600.00, 14640.00],
        ['Kriti', 'Dev', 6500.00, 1300.00, 3250.00, 1950.00, 780.00, 13000.00, 12220.00],
        ['Sarath', 'Sharma', 6000.00, 1000.00, 3000.00, 1800.00, 720.00, 11800.00, 11080.00],
      ],
    },
    examTip: 'In standard Indian payroll standards, Gross Salary is earnings BEFORE deductions. PF is a deduction. Explain this distinction to the examiner if your college lab solution subtracts PF into gross salary.',
  },
];
