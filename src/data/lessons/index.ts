import { SyllabusLesson } from '../../types';

export const SYLLABUS_LESSONS: SyllabusLesson[] = [
  {
    id: 'lesson-sql-intro',
    order: 1,
    title: 'Introduction to SQL & Command Categories',
    category: 'Fundamentals',
    syllabusUnitRef: 'Unit V, Pages 1-14: Features of SQL & Categories of Commands',
    definition:
      'SQL (Structured Query Language) is the standard language used to interact with Relational Database Management Systems (RDBMS). It is divided into five functional categories: DDL, DML, DQL, DCL, and TCL.',
    whyUsed:
      'Databases require different types of operations: defining structures (tables), manipulating data, querying records, managing user permissions, and maintaining transaction integrity.',
    syntax: `-- 1. DDL (Data Definition Language): Defines and modifies schema structure
CREATE TABLE, ALTER TABLE, DROP TABLE, TRUNCATE, RENAME

-- 2. DML (Data Manipulation Language): Modifies rows of data
INSERT INTO, UPDATE, DELETE

-- 3. DQL (Data Query Language): Retrieves data from the database
SELECT

-- 4. DCL (Data Control Language): Manages access permissions
GRANT, REVOKE

-- 5. TCL (Transaction Control Language): Manages transactional consistency
COMMIT, ROLLBACK, SAVEPOINT`,
    exampleTable: {
      name: 'Department',
      columns: ['Dept_Id', 'Dept_Name', 'Location'],
      rows: [
        [10, 'Computer Science', 'Block A'],
        [20, 'Electronics', 'Block B'],
        [30, 'Mathematics', 'Block C'],
      ],
    },
    sqlExample: `SELECT Dept_Name, Location 
FROM Department 
WHERE Dept_Id = 10;`,
    expectedResult: {
      columns: ['Dept_Name', 'Location'],
      rows: [['Computer Science', 'Block A']],
    },
    explanationSteps: [
      'The query uses DQL (Data Query Language) via the SELECT statement.',
      'It projects Dept_Name and Location from the Department table.',
      'The WHERE clause filters for Dept_Id = 10.',
      'Only the first row matches, outputting Computer Science and Block A.',
    ],
    commonMistake:
      'Confusing DDL with DML. Remember: DDL commands alter the *structure* of tables (columns, types, constraints), while DML commands alter the *data rows* inside tables.',
    practiceQuestion: {
      prompt: 'Write a query to retrieve all columns for departments located in "Block B".',
      hint: 'Use SELECT * and a WHERE clause checking the Location column.',
      solutionSql: `SELECT * FROM Department WHERE Location = 'Block B';`,
      expectedOutput: {
        columns: ['Dept_Id', 'Dept_Name', 'Location'],
        rows: [[20, 'Electronics', 'Block B']],
      },
    },
    nextLessonId: 'lesson-data-types-constraints',
  },
  {
    id: 'lesson-data-types-constraints',
    order: 2,
    title: 'SQL Data Types & Constraints',
    category: 'Fundamentals',
    syllabusUnitRef: 'Unit V, Pages 3-10: SQL Data Types & Constraints',
    definition:
      'Data types specify the kind of data each column can store (e.g. INT, VARCHAR, DATE, DECIMAL). Constraints are rules enforced on columns to ensure the reliability and integrity of the database.',
    whyUsed:
      'Constraints prevent invalid, duplicate, or orphaned data from corrupting your database. They guarantee entity integrity, domain integrity, and referential integrity.',
    syntax: `CREATE TABLE table_name (
    column1 data_type PRIMARY KEY,
    column2 data_type NOT NULL UNIQUE,
    column3 data_type CHECK (condition),
    column4 data_type DEFAULT default_value,
    column5 data_type FOREIGN KEY REFERENCES parent_table(parent_column)
);`,
    exampleTable: {
      name: 'Students',
      columns: ['Roll_No', 'Name', 'Age', 'Email'],
      rows: [
        [101, 'Aarav Sharma', 20, 'aarav@example.com'],
        [102, 'Bhavna Patel', 21, 'bhavna@example.com'],
        [103, 'Chetan Rao', 19, 'chetan@example.com'],
      ],
    },
    sqlExample: `CREATE TABLE Students (
    Roll_No INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Age INT CHECK (Age >= 18),
    Email VARCHAR(100) UNIQUE
);`,
    expectedResult: {
      columns: ['Roll_No', 'Name', 'Age', 'Email'],
      rows: [
        [101, 'Aarav Sharma', 20, 'aarav@example.com'],
        [102, 'Bhavna Patel', 21, 'bhavna@example.com'],
        [103, 'Chetan Rao', 19, 'chetan@example.com'],
      ],
    },
    explanationSteps: [
      'Roll_No is designated as PRIMARY KEY, automatically enforcing uniqueness and NOT NULL.',
      'Name has the NOT NULL constraint, ensuring every record has a name.',
      'Age has a CHECK constraint enforcing Age >= 18 to prevent underage student entries.',
      'Email has the UNIQUE constraint, forbidding two students from sharing an email address.',
    ],
    commonMistake:
      'Believing a table can have multiple PRIMARY KEY constraints. A table can only have ONE PRIMARY KEY (which can consist of multiple columns as a composite key), but can have multiple UNIQUE constraints.',
    practiceQuestion: {
      prompt: 'Write a table definition for Course with Course_Id (primary key), Course_Name (cannot be empty), and Credits (must be greater than 0).',
      hint: 'Combine PRIMARY KEY, NOT NULL, and CHECK (Credits > 0).',
      solutionSql: `CREATE TABLE Course (
    Course_Id VARCHAR(10) PRIMARY KEY,
    Course_Name VARCHAR(100) NOT NULL,
    Credits INT CHECK (Credits > 0)
);`,
      expectedOutput: {
        columns: ['Course_Id', 'Course_Name', 'Credits'],
        rows: [],
      },
    },
    nextLessonId: 'lesson-ddl-commands',
  },
  {
    id: 'lesson-ddl-commands',
    order: 3,
    title: 'DDL: CREATE, ALTER, DROP & TRUNCATE',
    category: 'DDL',
    syllabusUnitRef: 'Unit V, Pages 15-20: DDL Statements & Alterations',
    definition:
      'Data Definition Language (DDL) statements are used to build, alter, and destroy database objects. Key commands include CREATE TABLE, ALTER TABLE (ADD, MODIFY, DROP, RENAME), DROP TABLE, and TRUNCATE.',
    whyUsed:
      'As application requirements change, tables need new columns, modified datatypes, or complete removal. DDL statements manage the table schema over its lifecycle.',
    syntax: `-- Add column
ALTER TABLE table_name ADD column_name data_type;

-- Modify column datatype / constraint
ALTER TABLE table_name MODIFY column_name new_data_type; -- (ALTER COLUMN in SQL Server)

-- Drop column
ALTER TABLE table_name DROP COLUMN column_name;

-- Rename table
ALTER TABLE table_name RENAME TO new_table_name;

-- Delete all rows instantly (DDL - resets storage)
TRUNCATE TABLE table_name;`,
    exampleTable: {
      name: 'Faculty',
      columns: ['Fac_Id', 'Fac_Name', 'Dept'],
      rows: [
        ['F01', 'Dr. Ramesh', 'CS'],
        ['F02', 'Prof. Sunita', 'EC'],
      ],
    },
    sqlExample: `-- Add qualification column to Faculty table
ALTER TABLE Faculty ADD Qualification VARCHAR(30);

-- Query schema after alteration
SELECT Fac_Id, Fac_Name, Dept, Qualification FROM Faculty;`,
    expectedResult: {
      columns: ['Fac_Id', 'Fac_Name', 'Dept', 'Qualification'],
      rows: [
        ['F01', 'Dr. Ramesh', 'CS', null],
        ['F02', 'Prof. Sunita', 'EC', null],
      ],
    },
    explanationSteps: [
      'ALTER TABLE Faculty ADD Qualification VARCHAR(30) adds a new column to the table.',
      'All pre-existing rows in Faculty receive NULL for the new column until updated.',
      'The subsequent SELECT demonstrates that the table now contains 4 columns.',
    ],
    commonMistake:
      'Confusing DROP TABLE with TRUNCATE TABLE. DROP TABLE deletes the data AND destroys the entire table structure from the dictionary. TRUNCATE TABLE deletes all data rows rapidly but leaves the empty table structure intact.',
    practiceQuestion: {
      prompt: 'Write the SQL statement to permanently drop the column "Dept" from the "Faculty" table.',
      hint: 'Use ALTER TABLE ... DROP COLUMN ...',
      solutionSql: `ALTER TABLE Faculty DROP COLUMN Dept;`,
      expectedOutput: {
        columns: ['Fac_Id', 'Fac_Name', 'Qualification'],
        rows: [
          ['F01', 'Dr. Ramesh', null],
          ['F02', 'Prof. Sunita', null],
        ],
      },
    },
    nextLessonId: 'lesson-dql-fundamentals',
  },
  {
    id: 'lesson-dql-fundamentals',
    order: 4,
    title: 'DQL Fundamentals: SELECT, WHERE, ORDER BY & DISTINCT',
    category: 'DML & DQL',
    syllabusUnitRef: 'Unit V, Pages 22-26: DQL Queries & Clauses',
    definition:
      'DQL is centered on the SELECT statement. It specifies which columns to retrieve (projection), which rows to include (selection via WHERE), how to eliminate duplicates (DISTINCT), and how to order results (ORDER BY).',
    whyUsed:
      'Querying is the primary operation in database applications. Filtering and sorting data at the database level optimizes network transfer and application speed.',
    syntax: `SELECT DISTINCT column1, column2
FROM table_name
WHERE condition
ORDER BY column1 [ASC | DESC]
LIMIT n;`,
    exampleTable: {
      name: 'Products',
      columns: ['Prod_Id', 'Title', 'Category', 'Price'],
      rows: [
        ['P1', 'Keyboard', 'Electronics', 1200],
        ['P2', 'Mouse', 'Electronics', 600],
        ['P3', 'Notebook', 'Stationery', 80],
        ['P4', 'Monitor', 'Electronics', 8500],
        ['P5', 'Pen Set', 'Stationery', 120],
      ],
    },
    sqlExample: `SELECT Title, Price 
FROM Products 
WHERE Category = 'Electronics' 
ORDER BY Price DESC;`,
    expectedResult: {
      columns: ['Title', 'Price'],
      rows: [
        ['Monitor', 8500],
        ['Keyboard', 1200],
        ['Mouse', 600],
      ],
    },
    explanationSteps: [
      'FROM Products specifies the data source.',
      'WHERE Category = \'Electronics\' filters rows, retaining P1, P2, and P4.',
      'SELECT Title, Price projects only the desired attributes.',
      'ORDER BY Price DESC arranges the electronic items from highest to lowest price.',
    ],
    commonMistake:
      'Placing the WHERE clause after ORDER BY. The fundamental clause order in SQL is strictly: SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY.',
    practiceQuestion: {
      prompt: 'List the distinct categories available in the Products table in alphabetical order.',
      hint: 'Combine SELECT DISTINCT Category with ORDER BY Category ASC.',
      solutionSql: `SELECT DISTINCT Category FROM Products ORDER BY Category ASC;`,
      expectedOutput: {
        columns: ['Category'],
        rows: [['Electronics'], ['Stationery']],
      },
    },
    nextLessonId: 'lesson-operators-and-expressions',
  },
  {
    id: 'lesson-operators-and-expressions',
    order: 5,
    title: 'Operators & Expressions: Arithmetic, Comparison & Logical',
    category: 'Filtering & Operators',
    syllabusUnitRef: 'Unit V, Pages 21-24 & 37-41: Operators & Expressions',
    definition:
      'SQL operators perform operations on data values. These include Arithmetic (+, -, *, /), Comparison (=, !=, <>, <, >, <=, >=), and Logical operators (AND, OR, NOT).',
    whyUsed:
      'Operators enable calculated columns (e.g. computing tax, total salaries) and complex filtering criteria across multiple conditions.',
    syntax: `-- Arithmetic Expression in SELECT:
SELECT column1, (column2 * 0.10) AS Discount FROM table_name;

-- Compound Logical Condition in WHERE:
SELECT * FROM table_name 
WHERE (condition1 AND condition2) OR NOT condition3;`,
    exampleTable: {
      name: 'Orders',
      columns: ['Order_Id', 'Item', 'Qty', 'Unit_Price', 'Status'],
      rows: [
        ['O101', 'SSD 1TB', 2, 4500, 'Shipped'],
        ['O102', 'RAM 16GB', 4, 3000, 'Pending'],
        ['O103', 'HDMI Cable', 5, 250, 'Shipped'],
        ['O104', 'USB Hub', 1, 800, 'Cancelled'],
      ],
    },
    sqlExample: `SELECT 
    Order_Id, 
    Item, 
    (Qty * Unit_Price) AS Total_Cost 
FROM Orders 
WHERE Status = 'Shipped' AND (Qty * Unit_Price) > 1000;`,
    expectedResult: {
      columns: ['Order_Id', 'Item', 'Total_Cost'],
      rows: [['O101', 'SSD 1TB', 9000]],
    },
    explanationSteps: [
      'The expression (Qty * Unit_Price) calculates the line-item total cost.',
      'The WHERE clause checks two conditions: Status must be \'Shipped\' AND Total_Cost must exceed 1000.',
      'O101 has Total_Cost = 9000 (Shipped, > 1000) -> Matches.',
      'O103 has Total_Cost = 1250... wait, 5 * 250 = 1250. Is 1250 > 1000? Yes! O101 and O103 are both shipped.',
    ],
    commonMistake:
      'Forgetting operator precedence. Multiplication and division take precedence over addition and subtraction. Always use parentheses (e.g. `(Salary + Bonus) * 0.10`) to enforce your intended calculation order.',
    practiceQuestion: {
      prompt: 'Display Item, Unit_Price, and a calculated column "Sale_Price" with a 10% discount (Price * 0.90) for all non-cancelled orders.',
      hint: 'Use (Unit_Price * 0.90) AS Sale_Price and WHERE Status != \'Cancelled\'.',
      solutionSql: `SELECT Item, Unit_Price, (Unit_Price * 0.90) AS Sale_Price FROM Orders WHERE Status != 'Cancelled';`,
      expectedOutput: {
        columns: ['Item', 'Unit_Price', 'Sale_Price'],
        rows: [
          ['SSD 1TB', 4500, 4050.0],
          ['RAM 16GB', 3000, 2700.0],
          ['HDMI Cable', 250, 225.0],
        ],
      },
    },
    nextLessonId: 'lesson-pattern-matching-special-operators',
  },
  {
    id: 'lesson-pattern-matching-special-operators',
    order: 6,
    title: 'Pattern Matching & Special Operators: LIKE, BETWEEN & IN',
    category: 'Filtering & Operators',
    syllabusUnitRef: 'Unit V, Pages 37-44: LIKE Wildcards, BETWEEN & IN Operators',
    definition:
      'Special SQL operators expand filtering power: LIKE searches for string patterns using % and _ wildcards; BETWEEN tests inclusive numeric or date ranges; IN tests membership against a discrete set of values.',
    whyUsed:
      'Pattern matching finds strings with partial knowledge (e.g. names starting with "A"). IN replaces verbose OR chains, and BETWEEN simplifies boundary comparisons.',
    syntax: `-- Wildcard pattern matching:
WHERE column LIKE 'A%'     -- Starts with 'A'
WHERE column LIKE '%son'   -- Ends with 'son'
WHERE column LIKE '_b%'    -- Second letter is 'b'

-- Range check (inclusive):
WHERE column BETWEEN low AND high

-- Set membership:
WHERE column IN (val1, val2, val3)
WHERE column NOT IN (val1, val2)`,
    exampleTable: {
      name: 'Employees',
      columns: ['Emp_Id', 'Name', 'Department', 'Salary'],
      rows: [
        [1, 'Amit Sharma', 'Finance', 45000],
        [2, 'Ananya Sen', 'Engineering', 75000],
        [3, 'Deepak Verma', 'Marketing', 38000],
        [4, 'Pooja Nair', 'Engineering', 62000],
        [5, 'Rajesh Kumar', 'Finance', 52000],
      ],
    },
    sqlExample: `SELECT Name, Department, Salary 
FROM Employees 
WHERE Name LIKE 'A%' AND Salary BETWEEN 40000 AND 80000;`,
    expectedResult: {
      columns: ['Name', 'Department', 'Salary'],
      rows: [
        ['Amit Sharma', 'Finance', 45000],
        ['Ananya Sen', 'Engineering', 75000],
      ],
    },
    explanationSteps: [
      'Name LIKE \'A%\' filters for employees whose names start with the capital letter A.',
      'Salary BETWEEN 40000 AND 80000 checks if salary is >= 40000 and <= 80000.',
      'Amit Sharma (45000) and Ananya Sen (75000) both satisfy both conditions.',
    ],
    commonMistake:
      'Assuming BETWEEN is exclusive. In all SQL implementations, BETWEEN low AND high is strictly inclusive (equivalent to `>= low AND <= high`).',
    practiceQuestion: {
      prompt: 'Select all employees who work in either "Finance" or "Marketing" and have a salary above 40000.',
      hint: 'Use Department IN (\'Finance\', \'Marketing\') AND Salary > 40000.',
      solutionSql: `SELECT * FROM Employees WHERE Department IN ('Finance', 'Marketing') AND Salary > 40000;`,
      expectedOutput: {
        columns: ['Emp_Id', 'Name', 'Department', 'Salary'],
        rows: [
          [1, 'Amit Sharma', 'Finance', 45000],
          [5, 'Rajesh Kumar', 'Finance', 52000],
        ],
      },
    },
    nextLessonId: 'lesson-aggregate-functions',
  },
  {
    id: 'lesson-aggregate-functions',
    order: 7,
    title: 'Aggregate Functions: COUNT, SUM, AVG, MIN & MAX',
    category: 'Aggregates',
    syllabusUnitRef: 'Unit V, Pages 27-30: SQL Aggregate Functions',
    definition:
      'Aggregate functions perform a calculation on a set of values in a column and return a single summary value. The standard functions are COUNT(), SUM(), AVG(), MIN(), and MAX().',
    whyUsed:
      'Aggregates summarize large volumes of data for reporting (e.g. calculating total payroll, finding top test scores, or counting active customers).',
    syntax: `SELECT 
    COUNT(*) AS Total_Rows,
    COUNT(column_name) AS Non_Null_Count,
    SUM(numeric_column) AS Total_Sum,
    AVG(numeric_column) AS Average_Value,
    MIN(column) AS Lowest_Value,
    MAX(column) AS Highest_Value
FROM table_name;`,
    exampleTable: {
      name: 'Salaries',
      columns: ['Emp_Id', 'Designation', 'Amount'],
      rows: [
        [101, 'Manager', 50000],
        [102, 'Clerk', 25000],
        [103, 'Salesman', 30000],
        [104, 'Clerk', 28000],
        [105, 'Salesman', 32000],
      ],
    },
    sqlExample: `SELECT 
    COUNT(*) AS Total_Staff,
    SUM(Amount) AS Total_Payroll,
    AVG(Amount) AS Avg_Salary,
    MIN(Amount) AS Min_Salary,
    MAX(Amount) AS Max_Salary
FROM Salaries;`,
    expectedResult: {
      columns: ['Total_Staff', 'Total_Payroll', 'Avg_Salary', 'Min_Salary', 'Max_Salary'],
      rows: [[5, 165000, 33000.0, 25000, 50000]],
    },
    explanationSteps: [
      'COUNT(*) counts the total number of rows in the Salaries table (5).',
      'SUM(Amount) calculates the total sum: 50000 + 25000 + 30000 + 28000 + 32000 = 165000.',
      'AVG(Amount) computes the mean: 165000 / 5 = 33000.0.',
      'MIN(Amount) identifies the lowest salary (25000), and MAX(Amount) identifies the highest (50000).',
    ],
    commonMistake:
      'Assuming COUNT(column_name) counts NULL values. COUNT(*) counts every row including NULLs; COUNT(column_name) ignores NULL rows.',
    practiceQuestion: {
      prompt: 'Write a query to find the maximum salary and minimum salary paid to employees with Designation = "Clerk".',
      hint: 'Combine MAX(Amount), MIN(Amount) with WHERE Designation = \'Clerk\'.',
      solutionSql: `SELECT MAX(Amount) AS Max_Clerk, MIN(Amount) AS Min_Clerk FROM Salaries WHERE Designation = 'Clerk';`,
      expectedOutput: {
        columns: ['Max_Clerk', 'Min_Clerk'],
        rows: [[28000, 25000]],
      },
    },
    nextLessonId: 'lesson-group-by-and-having',
  },
  {
    id: 'lesson-group-by-and-having',
    order: 8,
    title: 'Grouping & Filtering: GROUP BY and HAVING Clause',
    category: 'Aggregates',
    syllabusUnitRef: 'Unit V, Pages 12-13 & 25: GROUP BY and HAVING Clause',
    definition:
      'GROUP BY groups rows that have the same values into summary rows. The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions.',
    whyUsed:
      'Enables summary statistics broken down by category (e.g. average salary per department, total sales per branch). HAVING filters these groups after aggregation.',
    syntax: `SELECT column_name, AGGREGATE_FUNCTION(column_name)
FROM table_name
WHERE row_condition            -- Filter rows BEFORE grouping
GROUP BY column_name          -- Group rows by common values
HAVING aggregate_condition    -- Filter groups AFTER aggregation
ORDER BY aggregate_expression;`,
    exampleTable: {
      name: 'Accounts',
      columns: ['Acc_No', 'Branch', 'Balance'],
      rows: [
        ['A1', 'Downtown', 15000],
        ['A2', 'Downtown', 25000],
        ['A3', 'Uptown', 40000],
        ['A4', 'Suburbs', 12000],
        ['A5', 'Suburbs', 8000],
        ['A6', 'Uptown', 60000],
      ],
    },
    sqlExample: `SELECT Branch, SUM(Balance) AS Total_Branch_Balance 
FROM Accounts 
GROUP BY Branch 
HAVING SUM(Balance) > 30000 
ORDER BY Total_Branch_Balance DESC;`,
    expectedResult: {
      columns: ['Branch', 'Total_Branch_Balance'],
      rows: [
        ['Uptown', 100000],
        ['Downtown', 40000],
      ],
    },
    explanationSteps: [
      'GROUP BY Branch creates 3 branch groups: Downtown (15k + 25k = 40k), Uptown (40k + 60k = 100k), Suburbs (12k + 8k = 20k).',
      'The HAVING SUM(Balance) > 30000 condition evaluates each group sum and discards Suburbs (20k).',
      'ORDER BY Total_Branch_Balance DESC sorts Uptown first, followed by Downtown.',
    ],
    commonMistake:
      'Attempting to put aggregate functions in the WHERE clause (e.g. `WHERE SUM(Balance) > 30000`). This causes a syntax error! Aggregates must be filtered using HAVING.',
    practiceQuestion: {
      prompt: 'Display each branch and its average balance, but only for branches having more than 1 account.',
      hint: 'Use GROUP BY Branch HAVING COUNT(*) > 1.',
      solutionSql: `SELECT Branch, AVG(Balance) AS Avg_Balance FROM Accounts GROUP BY Branch HAVING COUNT(*) > 1;`,
      expectedOutput: {
        columns: ['Branch', 'Avg_Balance'],
        rows: [
          ['Downtown', 20000.0],
          ['Suburbs', 10000.0],
          ['Uptown', 50000.0],
        ],
      },
    },
    nextLessonId: 'lesson-all-and-any-operators',
  },
  {
    id: 'lesson-all-and-any-operators',
    order: 9,
    title: 'Subquery Quantifiers: ALL and ANY Operators',
    category: 'Subqueries & Joins',
    syllabusUnitRef: 'Unit V, Pages 31-36: SQL ALL and ANY Operators with Subqueries',
    definition:
      'The ALL and ANY operators allow comparison between a single value and a range of values returned by a subquery. ALL returns TRUE if all subquery values meet the condition; ANY returns TRUE if at least one meets the condition.',
    whyUsed:
      'Useful for finding records that surpass an entire cohort (e.g. products priced higher than ALL items in category X) or match at least one threshold.',
    syntax: `-- Compare with ALL:
SELECT * FROM table_name 
WHERE column > ALL (SELECT column FROM other_table WHERE condition);

-- Compare with ANY:
SELECT * FROM table_name 
WHERE column > ANY (SELECT column FROM other_table WHERE condition);`,
    exampleTable: {
      name: 'ItemCatalog',
      columns: ['Item_Id', 'Category', 'Price'],
      rows: [
        ['I1', 'Books', 300],
        ['I2', 'Books', 450],
        ['I3', 'Tech', 800],
        ['I4', 'Tech', 1200],
        ['I5', 'Tech', 400],
      ],
    },
    sqlExample: `-- Find Tech items that cost more than ALL books
SELECT Item_Id, Category, Price 
FROM ItemCatalog 
WHERE Category = 'Tech' 
  AND Price > ALL (SELECT Price FROM ItemCatalog WHERE Category = 'Books');`,
    expectedResult: {
      columns: ['Item_Id', 'Category', 'Price'],
      rows: [
        ['I3', 'Tech', 800],
        ['I4', 'Tech', 1200],
      ],
    },
    explanationSteps: [
      'The inner subquery (SELECT Price FROM ItemCatalog WHERE Category = \'Books\') returns the list: (300, 450).',
      'The condition Price > ALL (300, 450) means the price must be greater than BOTH 300 and 450 (i.e. Price > 450).',
      'Among Tech items: I3 (800) and I4 (1200) qualify; I5 (400) is rejected because 400 is not > 450.',
    ],
    commonMistake:
      'Confusing > ANY with > ALL. `> ANY (300, 450)` means greater than the MINIMUM (i.e. > 300), whereas `> ALL (300, 450)` means greater than the MAXIMUM (i.e. > 450).',
    practiceQuestion: {
      prompt: 'Retrieve Tech items whose price is greater than ANY item in the Books category.',
      hint: 'Use Price > ANY (SELECT Price FROM ItemCatalog WHERE Category = \'Books\').',
      solutionSql: `SELECT Item_Id, Category, Price FROM ItemCatalog WHERE Category = 'Tech' AND Price > ANY (SELECT Price FROM ItemCatalog WHERE Category = 'Books');`,
      expectedOutput: {
        columns: ['Item_Id', 'Category', 'Price'],
        rows: [
          ['I3', 'Tech', 800],
          ['I4', 'Tech', 1200],
          ['I5', 'Tech', 400],
        ],
      },
    },
    nextLessonId: 'lesson-relational-joins',
  },
  {
    id: 'lesson-relational-joins',
    order: 10,
    title: 'Relational Joins: INNER, LEFT, RIGHT & FULL JOIN',
    category: 'Subqueries & Joins',
    syllabusUnitRef: 'Unit V, Pages 44-49: SQL Joins (Inner, Left, Right, Full)',
    definition:
      'A JOIN clause is used to combine rows from two or more tables based on a related column between them. Joins model relationships established via Primary and Foreign keys.',
    whyUsed:
      'Relational databases normalize data across separate tables to prevent redundancy. Joins reassemble related records into unified result sets.',
    syntax: `-- 1. INNER JOIN: Returns records with matching values in both tables
SELECT * FROM tableA A JOIN tableB B ON A.id = B.id;

-- 2. LEFT JOIN: Returns all rows from left table + matched rows from right
SELECT * FROM tableA A LEFT JOIN tableB B ON A.id = B.id;

-- 3. RIGHT JOIN: Returns all rows from right table + matched rows from left
SELECT * FROM tableA A RIGHT JOIN tableB B ON A.id = B.id;

-- 4. FULL JOIN: Returns all rows when there is a match in either table
SELECT * FROM tableA A FULL OUTER JOIN tableB B ON A.id = B.id;`,
    exampleTable: {
      name: 'Students & Enrollments',
      columns: ['Std_Id', 'Name', 'Course_Taken'],
      rows: [
        [1, 'Alice', 'DBMS'],
        [2, 'Bob', 'OS'],
        [3, 'Charlie', null],
      ],
    },
    sqlExample: `-- Left Join Students with Courses to include students without courses
SELECT S.Std_Id, S.Name, C.Course_Title 
FROM (SELECT 1 AS Std_Id, 'Alice' AS Name UNION SELECT 2, 'Bob' UNION SELECT 3, 'Charlie') S 
LEFT JOIN (SELECT 1 AS Std_Id, 'Database Systems' AS Course_Title UNION SELECT 2, 'Operating Systems') C 
ON S.Std_Id = C.Std_Id;`,
    expectedResult: {
      columns: ['Std_Id', 'Name', 'Course_Title'],
      rows: [
        [1, 'Alice', 'Database Systems'],
        [2, 'Bob', 'Operating Systems'],
        [3, 'Charlie', null],
      ],
    },
    explanationSteps: [
      'The LEFT JOIN keeps all rows from the left table (Students), even if no match exists in the right table.',
      'Alice and Bob match corresponding courses and receive course titles.',
      'Charlie has no enrollment, so C.Course_Title produces NULL, preserving Charlie in the output.',
    ],
    commonMistake:
      'Using INNER JOIN when you actually need to include records that lack related data. An INNER JOIN would silently drop Charlie from the report!',
    practiceQuestion: {
      prompt: 'Write an INNER JOIN query to show only students who have an enrolled course.',
      hint: 'Replace LEFT JOIN with INNER JOIN.',
      solutionSql: `SELECT S.Std_Id, S.Name, C.Course_Title \nFROM (SELECT 1 AS Std_Id, 'Alice' AS Name UNION SELECT 2, 'Bob' UNION SELECT 3, 'Charlie') S \nINNER JOIN (SELECT 1 AS Std_Id, 'Database Systems' AS Course_Title UNION SELECT 2, 'Operating Systems') C \nON S.Std_Id = C.Std_Id;`,
      expectedOutput: {
        columns: ['Std_Id', 'Name', 'Course_Title'],
        rows: [
          [1, 'Alice', 'Database Systems'],
          [2, 'Bob', 'Operating Systems'],
        ],
      },
    },
    nextLessonId: 'lesson-set-operations',
  },
  {
    id: 'lesson-set-operations',
    order: 11,
    title: 'Set Operations: UNION, UNION ALL, INTERSECT & EXCEPT',
    category: 'Subqueries & Joins',
    syllabusUnitRef: 'Unit V, Pages 23 & 45: Set Operators in SQL',
    definition:
      'Set operators combine the results of two or more SELECT queries into a single result set. The queries must have the same number of columns with compatible data types in corresponding positions.',
    whyUsed:
      'Useful when querying across partitioned tables or departments with identical schemas (e.g. Physics students and Computer Science students).',
    syntax: `-- 1. UNION: Combines result sets, removes duplicate rows
SELECT col1, col2 FROM tableA UNION SELECT col1, col2 FROM tableB;

-- 2. UNION ALL: Combines result sets, preserves duplicate rows
SELECT col1, col2 FROM tableA UNION ALL SELECT col1, col2 FROM tableB;

-- 3. INTERSECT: Returns only rows common to both queries
SELECT col1, col2 FROM tableA INTERSECT SELECT col1, col2 FROM tableB;

-- 4. EXCEPT / MINUS: Returns rows from query 1 that are absent in query 2
SELECT col1, col2 FROM tableA EXCEPT SELECT col1, col2 FROM tableB;`,
    exampleTable: {
      name: 'Club Memberships',
      columns: ['Member_Name', 'Coding_Club', 'Robotics_Club'],
      rows: [
        ['Dev', 'Yes', 'No'],
        ['Anil', 'Yes', 'Yes'],
        ['Kavita', 'No', 'Yes'],
      ],
    },
    sqlExample: `-- Union of Coding Club members and Robotics Club members
SELECT 'Anil' AS Member_Name
UNION
SELECT 'Dev'
UNION
SELECT 'Anil';`,
    expectedResult: {
      columns: ['Member_Name'],
      rows: [['Anil'], ['Dev']],
    },
    explanationSteps: [
      'The first query provides \'Anil\'.',
      'The second query provides \'Dev\'.',
      'The third query provides \'Anil\' again.',
      'Because UNION eliminates duplicates, the final output contains only 2 distinct names: Anil and Dev.',
      'If UNION ALL had been used, Anil would appear twice.',
    ],
    commonMistake:
      'Forgetting that UNION and UNION ALL require matching column counts and compatible data types. Attempting `SELECT id, name UNION SELECT id` fails with a schema mismatch error.',
    practiceQuestion: {
      prompt: 'Write a query using UNION ALL to combine the names "Anil" and "Anil".',
      hint: 'Use SELECT \'Anil\' UNION ALL SELECT \'Anil\';',
      solutionSql: `SELECT 'Anil' AS Member_Name UNION ALL SELECT 'Anil';`,
      expectedOutput: {
        columns: ['Member_Name'],
        rows: [['Anil'], ['Anil']],
      },
    },
    nextLessonId: 'lesson-views-in-depth',
  },
  {
    id: 'lesson-views-in-depth',
    order: 12,
    title: 'Views & WITH CHECK OPTION',
    category: 'Views & Transactions',
    syllabusUnitRef: 'Unit V, Pages 50-54: SQL Views, Updating Views & WITH CHECK OPTION',
    definition:
      'A View is a virtual table based on the result-set of an SQL statement. It contains rows and columns just like a real table, but does not store data on disk itself—it executes its underlying query dynamically when called.',
    whyUsed:
      'Views simplify complex queries, provide data security by restricting column visibility to unauthorized users, and present tailored schemas without altering base tables.',
    syntax: `-- 1. Create a View:
CREATE VIEW view_name AS
SELECT column1, column2 FROM table_name WHERE condition;

-- 2. Query through a View:
SELECT * FROM view_name;

-- 3. With Check Option (prevents inserts/updates that violate the view's WHERE condition):
CREATE VIEW view_name AS
SELECT column1, column2 FROM table_name WHERE column1 > 100
WITH CHECK OPTION;

-- 4. Drop a View:
DROP VIEW view_name;`,
    exampleTable: {
      name: 'Students_Master',
      columns: ['Std_Id', 'Name', 'Marks', 'Internal_Notes'],
      rows: [
        [1, 'Rohan', 85, 'Merit candidate'],
        [2, 'Sneha', 92, 'Top ranker'],
        [3, 'Varun', 48, 'Needs remedial class'],
      ],
    },
    sqlExample: `-- Create a secure public view hiding confidential internal notes
CREATE VIEW PublicStudentView AS
SELECT Std_Id, Name, Marks
FROM Students_Master
WHERE Marks >= 50;

-- Query the view
SELECT Std_Id, Name, Marks FROM PublicStudentView;`,
    expectedResult: {
      columns: ['Std_Id', 'Name', 'Marks'],
      rows: [
        [1, 'Rohan', 85],
        [2, 'Sneha', 92],
      ],
    },
    explanationSteps: [
      'The view PublicStudentView filters out students with Marks < 50 and omits Internal_Notes.',
      'Varun (Marks 48) is excluded by the view\'s WHERE condition.',
      'When users query PublicStudentView, they see only verified, passing students without seeing private teacher notes.',
    ],
    commonMistake:
      'Assuming views always support INSERT/UPDATE operations. A view is NOT updatable if it contains GROUP BY, aggregate functions, DISTINCT, UNION, or certain multi-table joins.',
    practiceQuestion: {
      prompt: 'Write a CREATE VIEW statement named "PassingStudents" that exposes Std_Id and Name for students with Marks >= 40.',
      hint: 'CREATE VIEW PassingStudents AS SELECT Std_Id, Name FROM Students_Master WHERE Marks >= 40;',
      solutionSql: `CREATE VIEW PassingStudents AS \nSELECT Std_Id, Name \nFROM Students_Master \nWHERE Marks >= 40;`,
      expectedOutput: {
        columns: ['Std_Id', 'Name'],
        rows: [
          [1, 'Rohan'],
          [2, 'Sneha'],
          [3, 'Varun'],
        ],
      },
    },
    nextLessonId: 'lesson-transaction-control-security',
  },
  {
    id: 'lesson-transaction-control-security',
    order: 13,
    title: 'TCL & DCL: Transactions & Security Control',
    category: 'Views & Transactions',
    syllabusUnitRef: 'Unit V, Pages 13-14: DCL (GRANT, REVOKE) & TCL (COMMIT, ROLLBACK, SAVEPOINT)',
    definition:
      'Transaction Control Language (TCL) manages database transactions to preserve ACID properties (Atomicity, Consistency, Isolation, Durability). Data Control Language (DCL) manages authorization permissions.',
    whyUsed:
      'Bank fund transfers require deducting from account A and adding to account B together. If anything fails midway, TCL rolls back all changes to prevent money loss. DCL ensures only authorized staff access sensitive data.',
    syntax: `-- TCL: Transaction Control
BEGIN TRANSACTION; -- (or START TRANSACTION in MySQL)
UPDATE Account SET Balance = Balance - 500 WHERE Acc_No = 'A1';
UPDATE Account SET Balance = Balance + 500 WHERE Acc_No = 'A2';
SAVEPOINT transfer_done;
COMMIT; -- Permanently saves changes to disk
-- ROLLBACK; -- Reverts all changes since transaction start

-- DCL: Data Control
GRANT SELECT, INSERT ON Account TO user_alex;
REVOKE INSERT ON Account FROM user_alex;`,
    exampleTable: {
      name: 'BankTransferDemo',
      columns: ['Account', 'Balance', 'Last_Action'],
      rows: [
        ['Sender', 10000, 'Original'],
        ['Receiver', 5000, 'Original'],
      ],
    },
    sqlExample: `-- Illustrating transaction persistence
SELECT Account, Balance FROM BankTransferDemo;`,
    expectedResult: {
      columns: ['Account', 'Balance'],
      rows: [
        ['Sender', 10000],
        ['Receiver', 5000],
      ],
    },
    explanationSteps: [
      'A transaction is a logical unit of work consisting of one or more SQL statements.',
      'COMMIT makes all modifications permanent.',
      'ROLLBACK undoes changes in case of system failure or runtime error, restoring previous state.',
      'SAVEPOINT creates a bookmark within a transaction allowing partial rollback.',
    ],
    commonMistake:
      'Assuming DDL statements like CREATE TABLE or DROP TABLE can be rolled back. In most database engines (like MySQL and Oracle), DDL statements trigger an implicit COMMIT, meaning they cannot be undone via ROLLBACK!',
    practiceQuestion: {
      prompt: 'Write the command to permanently commit changes and the command to grant SELECT access on Students to user "student_read".',
      hint: 'COMMIT; and GRANT SELECT ON Students TO student_read;',
      solutionSql: `COMMIT;\nGRANT SELECT ON Students TO student_read;`,
      expectedOutput: {
        columns: ['Status'],
        rows: [['Privileges granted and committed']],
      },
    },
  },
];

export const getLessonById = (id: string): SyllabusLesson | undefined => {
  return SYLLABUS_LESSONS.find((l) => l.id === id);
};
