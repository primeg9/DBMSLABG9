import initSqlJs, { Database } from 'sql.js';

let dbInstance: Database | null = null;
let isInitializing = false;
let initPromise: Promise<Database | null> | null = null;

const INIT_SQL_SCRIPTS = `
-- Case Study 1: Employee
CREATE TABLE Employee (
    Emp_Id INT PRIMARY KEY,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Hire_Date DATE,
    Address VARCHAR(100),
    City VARCHAR(50),
    PHONE_NO VARCHAR(15)
);

CREATE TABLE EmpSalary (
    Emp_Id INT,
    Salary DECIMAL(10,2),
    Benefits DECIMAL(10,2),
    Designation VARCHAR(50),
    FOREIGN KEY(Emp_Id) REFERENCES Employee(Emp_Id)
);

INSERT INTO Employee VALUES 
(1001, 'Raghav', 'Patel', '2006-05-11', '83 first street', 'Belagavi', NULL),
(1002, 'Mohini', 'Rathi', '2008-02-25', '842 Vine Ave', 'Athani', NULL),
(1012, 'Sham', 'Pujari', '2005-09-12', '33 Elm St.', 'Mysore', NULL),
(1015, 'Kriti', 'Dev', '2006-12-19', '11 Red Road', 'Belagavi', NULL),
(1016, 'Sarath', 'Sharma', '2007-08-22', '440 MG Road', 'New Delhi', NULL),
(1020, 'Monika', 'Gupta', '2008-06-07', '9 Bandra', 'Mumbai', NULL);

INSERT INTO EmpSalary VALUES 
(1001, 10000, 3000, 'Manager'),
(1002, 8000, 1200, 'Salesman'),
(1012, 20000, 5000, 'Director'),
(1015, 6500, 1300, 'Clerk'),
(1016, 6000, 1000, 'Clerk'),
(1020, 8000, 1200, 'Salesman');

-- Case Study 2: Bank System
CREATE TABLE Account (
    Account_No VARCHAR(20) PRIMARY KEY,
    Cust_Name VARCHAR(50),
    Branch_Id VARCHAR(10)
);

CREATE TABLE Branch (
    Branch_Id VARCHAR(10) PRIMARY KEY,
    Branch_Name VARCHAR(50),
    Branch_City VARCHAR(50)
);

CREATE TABLE Depositor (
    Account_No VARCHAR(20),
    Branch_Id VARCHAR(10),
    Balance DECIMAL(10,2)
);

CREATE TABLE Loan (
    Account_No VARCHAR(20),
    Branch_Id VARCHAR(10),
    Balance DECIMAL(10,2)
);

INSERT INTO Account VALUES 
('AE0012856', 'Reena', 'SB002'),
('AE1185698', 'Akhil', 'SB001'),
('AE1203996', 'Daniel', 'SB004'),
('AE1225889', 'Roy', 'SB002'),
('AE8532166', 'Sowparnika', 'SB003'),
('AE8552266', 'Anil', 'SB003'),
('AE1003996', 'Saathwik', 'SB004'),
('AE1100996', 'Swarna', 'SB002');

INSERT INTO Branch VALUES 
('SB001', 'Malleshwaram', 'Bangalore'),
('SB002', 'MG Road', 'Bangalore'),
('SB003', 'MG Road', 'Mysore'),
('SB004', 'Jainagar', 'Mysore');

INSERT INTO Depositor VALUES 
('AE0012856', 'SB002', 12000),
('AE1203996', 'SB004', 58900),
('AE8532166', 'SB003', 40000),
('AE1225889', 'SB002', 150000);

INSERT INTO Loan VALUES 
('AE1185698', 'SB001', 102000),
('AE8552266', 'SB003', 40000),
('AE1003996', 'SB004', 15000),
('AE1100996', 'SB002', 100000);

-- Case Study 3: Library
CREATE TABLE Books (
    Book_Id VARCHAR(10) PRIMARY KEY,
    Book_Name VARCHAR(100),
    Author_Name VARCHAR(100),
    Publishers VARCHAR(100),
    Price DECIMAL(10,2),
    Type VARCHAR(50),
    Quantity INT
);

CREATE TABLE Issued (
    Book_Id VARCHAR(10),
    Quantity_Issued INT
);

INSERT INTO Books VALUES 
('C0001', 'The Klone and I', 'Lata Kappor', 'EPP', 355, 'Novel', 5),
('F0001', 'The Tears', 'William Hopkins', 'First Publ', 650, 'Fiction', 20),
('T0001', 'My First C++', 'Brain & Brooke', 'ERP', 350, 'Text', 10),
('T0002', 'C++ Brainwork''s', 'A.W.Rossaine', 'TDH', 350, 'Text', 15),
('F0002', 'Thunderbolts', 'Ana Roberts', 'First Publ.', 750, 'Fiction', 50);

INSERT INTO Issued VALUES 
('T0001', 4),
('C0001', 5),
('F0001', 2),
('T0002', 5),
('F0002', 8);

-- Case Study 4: Subject
CREATE TABLE Physics (
    Regno VARCHAR(20) PRIMARY KEY,
    Name VARCHAR(50),
    Year VARCHAR(20),
    Combination VARCHAR(20)
);

CREATE TABLE Computer_Science (
    Regno VARCHAR(20) PRIMARY KEY,
    Name VARCHAR(50),
    Year VARCHAR(20),
    Combination VARCHAR(20)
);

INSERT INTO Physics VALUES 
('AJ00325', 'Ashwin', 'First', 'PCM'),
('AJ00225', 'Swaroop', 'Second', 'PMCs'),
('AJ00385', 'Sarika', 'Third', 'PME'),
('AJ00388', 'Rupa', 'First', 'PMCs');

INSERT INTO Computer_Science VALUES 
('AJ00225', 'Swaroop', 'Second', 'PMCs'),
('AJ00296', 'Tejas', 'Second', 'BCA'),
('AJ00112', 'Geeta', 'First', 'BCA'),
('AJ00388', 'Rupa', 'First', 'PMCs');
`;

export interface QueryExecutionResult {
  columns: string[];
  values: (string | number | null)[][];
  error?: string;
  executionTimeMs?: number;
  isModification?: boolean;
  rowsAffected?: number;
}

export async function getSqlDatabase(): Promise<Database | null> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  isInitializing = true;
  initPromise = (async () => {
    try {
      const SQL = await initSqlJs({
        locateFile: (file) => `/${file}`,
      });
      const db = new SQL.Database();
      db.run(INIT_SQL_SCRIPTS);
      dbInstance = db;
      return db;
    } catch (err) {
      console.warn('WASM SQLite initialization fallback:', err);
      return null;
    } finally {
      isInitializing = false;
    }
  })();

  return initPromise;
}

export async function resetSqlDatabase(): Promise<boolean> {
  try {
    if (dbInstance) {
      dbInstance.close();
      dbInstance = null;
      initPromise = null;
    }
    await getSqlDatabase();
    return true;
  } catch (err) {
    console.error('Failed to reset database:', err);
    return false;
  }
}

export async function executeSqlQuery(sql: string): Promise<QueryExecutionResult> {
  const db = await getSqlDatabase();
  if (!db) {
    return {
      columns: [],
      values: [],
      error: 'In-browser SQLite engine is not available in this environment. Showing verified pre-calculated lab solution output.',
    };
  }

  const cleanSql = sql.trim();
  if (!cleanSql) {
    return { columns: [], values: [], error: 'Please enter an SQL query to execute.' };
  }

  const startTime = performance.now();
  try {
    const isModifying = /^(UPDATE|INSERT|DELETE|ALTER|DROP|CREATE|TRUNCATE)/i.test(cleanSql);

    if (isModifying) {
      db.run(cleanSql);
      const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
      return {
        columns: ['Status'],
        values: [['Command executed successfully. Database state updated.']],
        isModification: true,
        executionTimeMs,
      };
    }

    const results = db.exec(cleanSql);
    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

    if (!results || results.length === 0) {
      return {
        columns: [],
        values: [],
        executionTimeMs,
      };
    }

    const firstResult = results[0];
    return {
      columns: firstResult.columns,
      values: firstResult.values as (string | number | null)[][],
      executionTimeMs,
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      columns: [],
      values: [],
      error: errMsg,
      executionTimeMs: Math.round((performance.now() - startTime) * 100) / 100,
    };
  }
}
