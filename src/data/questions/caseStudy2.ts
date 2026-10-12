import { LabQuestion } from '../../types';

export const CASE_STUDY_2_QUESTIONS: LabQuestion[] = [
  {
    id: 'cs2-q1',
    caseStudyId: 'cs2',
    number: 1,
    originalQuestion: 'Display the Total Number of accounts present in each branch.',
    conceptTags: ['GROUP BY', 'COUNT', 'Aggregate Functions'],
    tablesUsed: ['Account'],
    solutionSql: `SELECT Branch_Id, COUNT(Account_No) AS Total_Accounts 
FROM Account 
GROUP BY Branch_Id;`,
    explanationSteps: [
      'The Account table contains records for 8 customer accounts distributed across various branches.',
      'GROUP BY Branch_Id groups the account rows by their branch identifier.',
      'COUNT(Account_No) counts the number of accounts within each branch group.',
      'The result displays each unique Branch_Id alongside its corresponding account count.',
    ],
    expectedOutput: {
      columns: ['Branch_Id', 'Total_Accounts'],
      rows: [
        ['SB001', 1],
        ['SB002', 3],
        ['SB003', 2],
        ['SB004', 2],
      ],
    },
    examTip: 'Whenever you use an aggregate function like COUNT() with a non-aggregated column in the SELECT list (like Branch_Id), that column MUST appear in the GROUP BY clause.',
  },
  {
    id: 'cs2-q2',
    caseStudyId: 'cs2',
    number: 2,
    originalQuestion: 'Display the Total Loan amount in each branch.',
    conceptTags: ['GROUP BY', 'SUM', 'Aggregate Functions'],
    tablesUsed: ['Loan'],
    solutionSql: `SELECT Branch_Id, SUM(Balance) AS Total_Loan_Amount 
FROM Loan 
GROUP BY Branch_Id;`,
    explanationSteps: [
      'The Loan table stores individual loan disbursements with their balances.',
      'GROUP BY Branch_Id aggregates all loans belonging to each branch.',
      'SUM(Balance) adds up the loan balances for each branch.',
      'The result lists the branch ID and the cumulative total loan amount.',
    ],
    expectedOutput: {
      columns: ['Branch_Id', 'Total_Loan_Amount'],
      rows: [
        ['SB001', 102000.00],
        ['SB002', 100000.00],
        ['SB003', 40000.00],
        ['SB004', 15000.00],
      ],
    },
    examTip: 'SUM() only works on numeric data types (INT, DECIMAL, FLOAT). It automatically ignores NULL values when computing the total.',
  },
  {
    id: 'cs2-q3',
    caseStudyId: 'cs2',
    number: 3,
    originalQuestion: 'Display the Total deposited amount in each branch by descending order.',
    conceptTags: ['GROUP BY', 'SUM', 'ORDER BY DESC'],
    tablesUsed: ['Depositor'],
    solutionSql: `SELECT Branch_Id, SUM(Balance) AS Total_Deposited 
FROM Depositor 
GROUP BY Branch_Id 
ORDER BY Total_Deposited DESC;`,
    explanationSteps: [
      'GROUP BY Branch_Id groups records from the Depositor table by branch.',
      'SUM(Balance) calculates the total deposits held in that branch.',
      'ORDER BY Total_Deposited DESC sorts the branches starting from the highest deposit volume to the lowest.',
      'Note: Branch SB001 does not appear because it has no records in the Depositor table in the sample data.',
    ],
    expectedOutput: {
      columns: ['Branch_Id', 'Total_Deposited'],
      rows: [
        ['SB002', 162000.00],
        ['SB004', 58900.00],
        ['SB003', 40000.00],
      ],
    },
    examTip: 'In standard SQL, you can order by either the column alias (Total_Deposited) or by the aggregate expression itself: ORDER BY SUM(Balance) DESC.',
  },
  {
    id: 'cs2-q4',
    caseStudyId: 'cs2',
    number: 4,
    originalQuestion: 'Display max, min loan amount present in each city.',
    conceptTags: ['INNER JOIN', 'GROUP BY', 'MAX', 'MIN'],
    tablesUsed: ['Loan', 'Branch'],
    solutionSql: `SELECT B.Branch_City, MAX(L.Balance) AS Max_Loan, MIN(L.Balance) AS Min_Loan 
FROM Loan L 
JOIN Branch B ON L.Branch_Id = B.Branch_Id 
GROUP BY B.Branch_City;`,
    explanationSteps: [
      'The Loan table stores the loan balance and Branch_Id, but the city name is in the Branch table.',
      'We join Loan L with Branch B on Branch_Id.',
      'GROUP BY B.Branch_City groups loans by city.',
      'MAX(L.Balance) and MIN(L.Balance) find the highest and lowest loans in each city.',
      'Correction note: The PDF had a typo "Bangalroe" for SB002. With the typo corrected to "Bangalore", Bangalore loans (SB001: 102000, SB002: 100000) group into a single city group.',
    ],
    expectedOutput: {
      columns: ['Branch_City', 'Max_Loan', 'Min_Loan'],
      rows: [
        ['Bangalore', 102000.00, 100000.00],
        ['Mysore', 40000.00, 15000.00],
      ],
    },
    examTip: 'Sample Data Trap: In the original lab PDF, branch SB002 had its city misspelled as "Bangalroe". If left uncorrected, GROUP BY produces three rows instead of two. Always mention this typo to your examiner!',
    ambiguityNote: 'The sample database in the PDF spells Branch SB002 city as "Bangalroe". In our verified solution, this typo is documented and normalized to "Bangalore" so city-level aggregations remain conceptually accurate.',
  },
  {
    id: 'cs2-q5',
    caseStudyId: 'cs2',
    number: 5,
    originalQuestion: 'Display average amount deposited in each branch, each city.',
    conceptTags: ['INNER JOIN', 'GROUP BY', 'AVG', 'Multi-column Grouping'],
    tablesUsed: ['Depositor', 'Branch'],
    solutionSql: `SELECT B.Branch_Id, B.Branch_City, AVG(D.Balance) AS Avg_Deposit 
FROM Depositor D 
JOIN Branch B ON D.Branch_Id = B.Branch_Id 
GROUP BY B.Branch_Id, B.Branch_City;`,
    explanationSteps: [
      'Join Depositor D with Branch B on Branch_Id.',
      'GROUP BY B.Branch_Id, B.Branch_City creates composite groups for every unique branch and city combination.',
      'AVG(D.Balance) computes the arithmetic mean deposit for each group.',
      'Branch SB002 (MG Road, Bangalore) has deposits of 12000 and 150000, yielding an average of (12000 + 150000) / 2 = 81000.00.',
    ],
    expectedOutput: {
      columns: ['Branch_Id', 'Branch_City', 'Avg_Deposit'],
      rows: [
        ['SB002', 'Bangalore', 81000.00],
        ['SB003', 'Mysore', 40000.00],
        ['SB004', 'Mysore', 58900.00],
      ],
    },
    examTip: 'When grouping by multiple columns, a separate subtotal group is generated for every unique combination of values across those columns.',
  },
  {
    id: 'cs2-q6',
    caseStudyId: 'cs2',
    number: 6,
    originalQuestion: 'Display maximum of loan amount in each branch where the balance is more than 25000.',
    conceptTags: ['GROUP BY', 'WHERE vs HAVING', 'MAX'],
    tablesUsed: ['Loan'],
    solutionSql: `-- Interpretation 1: Row-level filter (WHERE) - considers only individual loans > 25000:
SELECT Branch_Id, MAX(Balance) AS Max_Loan 
FROM Loan 
WHERE Balance > 25000 
GROUP BY Branch_Id;`,
    alternativeSql: [
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `-- Interpretation 2: Group-level filter (HAVING) - branches whose max loan exceeds 25000:\nSELECT Branch_Id, MAX(Balance) AS Max_Loan \nFROM Loan \nGROUP BY Branch_Id \nHAVING MAX(Balance) > 25000;`,
        note: 'HAVING filters groups after calculating MAX(Balance), whereas WHERE filters individual rows before grouping.',
      },
    ],
    explanationSteps: [
      'This question illustrates the fundamental DBMS distinction between WHERE and HAVING.',
      'If the condition "where the balance is more than 25000" refers to individual loan balances before grouping, we use WHERE Balance > 25000.',
      'If it means "display only branches where the maximum loan amount exceeds 25000", we use HAVING MAX(Balance) > 25000.',
      'In this dataset:',
      '- SB001 loan is 102000 (> 25000)',
      '- SB002 loan is 100000 (> 25000)',
      '- SB003 loan is 40000 (> 25000)',
      '- SB004 loan is 15000 (NOT > 25000, so excluded)',
      'Both queries return SB001, SB002, and SB003.',
    ],
    expectedOutput: {
      columns: ['Branch_Id', 'Max_Loan'],
      rows: [
        ['SB001', 102000.00],
        ['SB002', 100000.00],
        ['SB003', 40000.00],
      ],
    },
    examTip: 'Classic Exam Question: "What is the difference between WHERE and HAVING?" WHERE filters rows BEFORE aggregation and cannot contain aggregate functions. HAVING filters groups AFTER aggregation and operates on aggregate results.',
  },
  {
    id: 'cs2-q7',
    caseStudyId: 'cs2',
    number: 7,
    originalQuestion: 'Display Total Number of accounts present in each city.',
    conceptTags: ['INNER JOIN', 'GROUP BY', 'COUNT'],
    tablesUsed: ['Account', 'Branch'],
    solutionSql: `SELECT B.Branch_City, COUNT(A.Account_No) AS Total_Accounts 
FROM Account A 
JOIN Branch B ON A.Branch_Id = B.Branch_Id 
GROUP BY B.Branch_City;`,
    explanationSteps: [
      'Account holds customer account numbers, while Branch holds city information.',
      'Join Account A with Branch B on Branch_Id.',
      'GROUP BY B.Branch_City groups accounts by their branch city.',
      'COUNT(A.Account_No) tallies total accounts per city.',
      'Bangalore accounts: Akhil (SB001), Reena (SB002), Roy (SB002), Swarna (SB002) = 4 accounts.',
      'Mysore accounts: Sowparnika (SB003), Anil (SB003), Daniel (SB004), Saathwik (SB004) = 4 accounts.',
    ],
    expectedOutput: {
      columns: ['Branch_City', 'Total_Accounts'],
      rows: [
        ['Bangalore', 4],
        ['Mysore', 4],
      ],
    },
    examTip: 'Always join on the primary key-foreign key pair (Branch_Id in this case) to ensure you associate each customer with the correct city.',
  },
  {
    id: 'cs2-q8',
    caseStudyId: 'cs2',
    number: 8,
    originalQuestion: 'Display all customer details in ascending order of branch_id.',
    conceptTags: ['SELECT *', 'ORDER BY ASC'],
    tablesUsed: ['Account'],
    solutionSql: `SELECT * FROM Account 
ORDER BY Branch_Id ASC;`,
    explanationSteps: [
      'SELECT * retrieves all attributes from the Account table (Account_No, Cust_Name, Branch_Id).',
      'ORDER BY Branch_Id ASC sorts rows in ascending alphanumeric order of Branch_Id (SB001, SB002, SB003, SB004).',
      'The ASC keyword specifies ascending sort (though it is also the SQL default).',
    ],
    expectedOutput: {
      columns: ['Account_No', 'Cust_Name', 'Branch_Id'],
      rows: [
        ['AE1185698', 'Akhil', 'SB001'],
        ['AE0012856', 'Reena', 'SB002'],
        ['AE1225889', 'Roy', 'SB002'],
        ['AE1100996', 'Swarna', 'SB002'],
        ['AE8532166', 'Sowparnika', 'SB003'],
        ['AE8552266', 'Anil', 'SB003'],
        ['AE1203996', 'Daniel', 'SB004'],
        ['AE1003996', 'Saathwik', 'SB004'],
      ],
    },
    examTip: 'Even though ASC is the default sort direction in SQL, writing it explicitly in exams demonstrates attention to detail and clear intent.',
  },
  {
    id: 'cs2-q9',
    caseStudyId: 'cs2',
    number: 9,
    originalQuestion: "Update Balance to 26000 where account_no='AE1003996'.",
    conceptTags: ['UPDATE', 'SET', 'WHERE', 'Schema Audit'],
    tablesUsed: ['Loan'],
    solutionSql: `UPDATE Loan 
SET Balance = 26000 
WHERE Account_No = 'AE1003996';`,
    explanationSteps: [
      'Schema Audit Check: In the Bank System database:',
      '- Account table has columns (Account_No, Cust_Name, Branch_Id) and does NOT have a Balance column.',
      '- Depositor table has a Balance column, but Account_No \'AE1003996\' does NOT exist in Depositor.',
      '- Loan table has (Account_No, Branch_Id, Balance) and contains \'AE1003996\' with initial balance 15000.00.',
      'Therefore, the table to update is definitively the Loan table.',
      'The UPDATE statement sets Balance = 26000 specifically for Account_No = \'AE1003996\'.',
    ],
    expectedOutput: {
      columns: ['Account_No', 'Branch_Id', 'Balance'],
      rows: [
        ['AE1003996', 'SB004', 26000.00],
      ],
      isModification: true,
      modificationDetails: {
        table: 'Loan',
        action: 'UPDATE Balance',
        beforeSummary: 'Loan record AE1003996 had Balance = 15000.00',
        afterSummary: 'Loan record AE1003996 now has Balance = 26000.00',
      },
    },
    examTip: 'Exam Traps: When a question says "Update Balance where account_no=...", verify which table actually contains that account_no and a Balance column! Here, only the Loan table has both.',
    ambiguityNote: 'The prompt does not state which table to update. Cross-referencing Account_No \'AE1003996\' against Depositor and Loan proves conclusively that it belongs to Loan.',
  },
  {
    id: 'cs2-q10',
    caseStudyId: 'cs2',
    number: 10,
    originalQuestion: 'Display Customer Names with their branch Name.',
    conceptTags: ['INNER JOIN', 'Table Projection'],
    tablesUsed: ['Account', 'Branch'],
    solutionSql: `SELECT A.Cust_Name, B.Branch_Name 
FROM Account A 
JOIN Branch B ON A.Branch_Id = B.Branch_Id;`,
    explanationSteps: [
      'Cust_Name resides in the Account table.',
      'Branch_Name resides in the Branch table.',
      'We perform an INNER JOIN between Account A and Branch B on Branch_Id.',
      'Project A.Cust_Name and B.Branch_Name.',
      'All 8 customers are matched with their corresponding branch location names.',
    ],
    expectedOutput: {
      columns: ['Cust_Name', 'Branch_Name'],
      rows: [
        ['Akhil', 'Malleshwaram'],
        ['Reena', 'MG Road'],
        ['Roy', 'MG Road'],
        ['Swarna', 'MG Road'],
        ['Sowparnika', 'MG Road'],
        ['Anil', 'MG Road'],
        ['Daniel', 'Jainagar'],
        ['Saathwik', 'Jainagar'],
      ],
    },
    examTip: 'Note that MG Road exists in both Bangalore (SB002) and Mysore (SB003). The join accurately links each customer to their exact branch based on the Branch_Id code.',
  },
];
