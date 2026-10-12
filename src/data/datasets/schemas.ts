import { TableSchema } from '../../types';

export const CASE_STUDY_SCHEMAS: Record<string, TableSchema[]> = {
  cs1: [
    {
      name: 'Employee',
      caseStudyId: 'cs1',
      description: 'Stores personal details, residence city, and hiring date of staff members.',
      columns: [
        { name: 'Emp_Id', type: 'INT', isPrimaryKey: true, nullable: false, description: 'Unique Employee Identifier' },
        { name: 'First_Name', type: 'VARCHAR(50)', nullable: false, description: 'Employee First Name' },
        { name: 'Last_Name', type: 'VARCHAR(50)', nullable: false, description: 'Employee Last Name' },
        { name: 'Hire_Date', type: 'DATE', nullable: false, description: 'Date of joining the organization' },
        { name: 'Address', type: 'VARCHAR(100)', nullable: true, description: 'Street address' },
        { name: 'City', type: 'VARCHAR(50)', nullable: true, description: 'City of residence' },
        { name: 'PHONE_NO', type: 'VARCHAR(15)', nullable: true, description: 'Contact phone number (added in Q8)' },
      ],
      sampleRows: [
        { Emp_Id: 1001, First_Name: 'Raghav', Last_Name: 'Patel', Hire_Date: '2006-05-11', Address: '83 first street', City: 'Belagavi', PHONE_NO: '9876543210' },
        { Emp_Id: 1002, First_Name: 'Mohini', Last_Name: 'Rathi', Hire_Date: '2008-02-25', Address: '842 Vine Ave', City: 'Athani', PHONE_NO: null },
        { Emp_Id: 1012, First_Name: 'Sham', Last_Name: 'Pujari', Hire_Date: '2005-09-12', Address: '33 Elm St.', City: 'Mysore', PHONE_NO: null },
        { Emp_Id: 1015, First_Name: 'Kriti', Last_Name: 'Dev', Hire_Date: '2006-12-19', Address: '11 Red Road', City: 'Belagavi', PHONE_NO: null },
        { Emp_Id: 1016, First_Name: 'Sarath', Last_Name: 'Sharma', Hire_Date: '2007-08-22', Address: '440 MG Road', City: 'New Delhi', PHONE_NO: null },
        { Emp_Id: 1020, First_Name: 'Monika', Last_Name: 'Gupta', Hire_Date: '2008-06-07', Address: '9 Bandra', City: 'Mumbai', PHONE_NO: null },
      ],
      usedInQuestions: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q7', 'Q8', 'Q9', 'Q10'],
    },
    {
      name: 'EmpSalary',
      caseStudyId: 'cs1',
      description: 'Stores financial compensation, benefits, and job designation linked to Employee.',
      columns: [
        { name: 'Emp_Id', type: 'INT', isForeignKey: true, references: 'Employee(Emp_Id)', nullable: false, description: 'Foreign Key to Employee' },
        { name: 'Salary', type: 'DECIMAL(10,2)', nullable: false, description: 'Base monthly salary in INR' },
        { name: 'Benefits', type: 'DECIMAL(10,2)', nullable: false, description: 'Fixed perks/benefits amount' },
        { name: 'Designation', type: 'VARCHAR(50)', nullable: false, description: 'Job title / role in the organization' },
      ],
      sampleRows: [
        { Emp_Id: 1001, Salary: 10000.00, Benefits: 3000.00, Designation: 'Manager' },
        { Emp_Id: 1002, Salary: 8000.00, Benefits: 1200.00, Designation: 'Salesman' },
        { Emp_Id: 1012, Salary: 20000.00, Benefits: 5000.00, Designation: 'Director' },
        { Emp_Id: 1015, Salary: 6500.00, Benefits: 1300.00, Designation: 'Clerk' },
        { Emp_Id: 1016, Salary: 6000.00, Benefits: 1000.00, Designation: 'Clerk' },
        { Emp_Id: 1020, Salary: 8000.00, Benefits: 1200.00, Designation: 'Salesman' },
      ],
      usedInQuestions: ['Q3', 'Q4', 'Q6', 'Q10'],
    },
  ],
  cs2: [
    {
      name: 'Account',
      caseStudyId: 'cs2',
      description: 'Customer account registrations linked to bank branches.',
      columns: [
        { name: 'Account_No', type: 'VARCHAR(20)', isPrimaryKey: true, nullable: false, description: 'Bank Account Number' },
        { name: 'Cust_Name', type: 'VARCHAR(50)', nullable: false, description: 'Customer Name' },
        { name: 'Branch_Id', type: 'VARCHAR(10)', nullable: false, description: 'Branch Identifier' },
      ],
      sampleRows: [
        { Account_No: 'AE0012856', Cust_Name: 'Reena', Branch_Id: 'SB002' },
        { Account_No: 'AE1185698', Cust_Name: 'Akhil', Branch_Id: 'SB001' },
        { Account_No: 'AE1203996', Cust_Name: 'Daniel', Branch_Id: 'SB004' },
        { Account_No: 'AE1225889', Cust_Name: 'Roy', Branch_Id: 'SB002' },
        { Account_No: 'AE8532166', Cust_Name: 'Sowparnika', Branch_Id: 'SB003' },
        { Account_No: 'AE8552266', Cust_Name: 'Anil', Branch_Id: 'SB003' },
        { Account_No: 'AE1003996', Cust_Name: 'Saathwik', Branch_Id: 'SB004' },
        { Account_No: 'AE1100996', Cust_Name: 'Swarna', Branch_Id: 'SB002' },
      ],
      usedInQuestions: ['Q1', 'Q7', 'Q8', 'Q10'],
    },
    {
      name: 'Branch',
      caseStudyId: 'cs2',
      description: 'Physical branches of the bank across cities.',
      columns: [
        { name: 'Branch_Id', type: 'VARCHAR(10)', isPrimaryKey: true, nullable: false, description: 'Branch Identifier' },
        { name: 'Branch_Name', type: 'VARCHAR(50)', nullable: false, description: 'Name of the branch location' },
        { name: 'Branch_City', type: 'VARCHAR(50)', nullable: false, description: 'City location of the branch' },
      ],
      sampleRows: [
        { Branch_Id: 'SB001', Branch_Name: 'Malleshwaram', Branch_City: 'Bangalore' },
        { Branch_Id: 'SB002', Branch_Name: 'MG Road', Branch_City: 'Bangalore' }, // Corrected from typo 'Bangalroe'
        { Branch_Id: 'SB003', Branch_Name: 'MG Road', Branch_City: 'Mysore' },
        { Branch_Id: 'SB004', Branch_Name: 'Jainagar', Branch_City: 'Mysore' },
      ],
      usedInQuestions: ['Q4', 'Q5', 'Q7', 'Q10'],
    },
    {
      name: 'Depositor',
      caseStudyId: 'cs2',
      description: 'Records customer deposit balances in specific branches.',
      columns: [
        { name: 'Account_No', type: 'VARCHAR(20)', nullable: false, description: 'Account number of depositor' },
        { name: 'Branch_Id', type: 'VARCHAR(10)', nullable: false, description: 'Branch where deposit is held' },
        { name: 'Balance', type: 'DECIMAL(10,2)', nullable: false, description: 'Current deposited balance' },
      ],
      sampleRows: [
        { Account_No: 'AE0012856', Branch_Id: 'SB002', Balance: 12000.00 },
        { Account_No: 'AE1203996', Branch_Id: 'SB004', Balance: 58900.00 },
        { Account_No: 'AE8532166', Branch_Id: 'SB003', Balance: 40000.00 },
        { Account_No: 'AE1225889', Branch_Id: 'SB002', Balance: 150000.00 },
      ],
      usedInQuestions: ['Q3', 'Q5'],
    },
    {
      name: 'Loan',
      caseStudyId: 'cs2',
      description: 'Records disbursed loan balances in specific branches.',
      columns: [
        { name: 'Account_No', type: 'VARCHAR(20)', nullable: false, description: 'Account number of borrower' },
        { name: 'Branch_Id', type: 'VARCHAR(10)', nullable: false, description: 'Disbursing branch' },
        { name: 'Balance', type: 'DECIMAL(10,2)', nullable: false, description: 'Current outstanding loan balance' },
      ],
      sampleRows: [
        { Account_No: 'AE1185698', Branch_Id: 'SB001', Balance: 102000.00 },
        { Account_No: 'AE8552266', Branch_Id: 'SB003', Balance: 40000.00 },
        { Account_No: 'AE1003996', Branch_Id: 'SB004', Balance: 15000.00 }, // Updated to 26000 in Q9
        { Account_No: 'AE1100996', Branch_Id: 'SB002', Balance: 100000.00 },
      ],
      usedInQuestions: ['Q2', 'Q4', 'Q6', 'Q9'],
    },
  ],
  cs3: [
    {
      name: 'Books',
      caseStudyId: 'cs3',
      description: 'Library catalog containing book titles, authors, publishers, pricing, and stock count.',
      columns: [
        { name: 'Book_Id', type: 'VARCHAR(10)', isPrimaryKey: true, nullable: false, description: 'Unique Book Identifier' },
        { name: 'Book_Name', type: 'VARCHAR(100)', nullable: false, description: 'Title of the book' },
        { name: 'Author_Name', type: 'VARCHAR(100)', nullable: false, description: 'Name of the author' },
        { name: 'Publishers', type: 'VARCHAR(100)', nullable: false, description: 'Publishing company' },
        { name: 'Price', type: 'DECIMAL(10,2)', nullable: false, description: 'Unit book price in INR' },
        { name: 'Type', type: 'VARCHAR(50)', nullable: false, description: 'Genre/category (Novel, Fiction, Text)' },
        { name: 'Quantity', type: 'INT', nullable: false, description: 'Available stock quantity' },
      ],
      sampleRows: [
        { Book_Id: 'C0001', Book_Name: 'The Klone and I', Author_Name: 'Lata Kappor', Publishers: 'EPP', Price: 355.00, Type: 'Novel', Quantity: 5 },
        { Book_Id: 'F0001', Book_Name: 'The Tears', Author_Name: 'William Hopkins', Publishers: 'First Publ', Price: 650.00, Type: 'Fiction', Quantity: 20 },
        { Book_Id: 'T0001', Book_Name: 'My First C++', Author_Name: 'Brain & Brooke', Publishers: 'ERP', Price: 350.00, Type: 'Text', Quantity: 10 },
        { Book_Id: 'T0002', Book_Name: "C++ Brainwork's", Author_Name: 'A.W.Rossaine', Publishers: 'TDH', Price: 350.00, Type: 'Text', Quantity: 15 },
        { Book_Id: 'F0002', Book_Name: 'Thunderbolts', Author_Name: 'Ana Roberts', Publishers: 'First Publ.', Price: 750.00, Type: 'Fiction', Quantity: 50 },
      ],
      usedInQuestions: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
    },
    {
      name: 'Issued',
      caseStudyId: 'cs3',
      description: 'Tracks quantities of books currently loaned/issued out to library patrons.',
      columns: [
        { name: 'Book_Id', type: 'VARCHAR(10)', isForeignKey: true, references: 'Books(Book_Id)', nullable: false, description: 'Book Identifier' },
        { name: 'Quantity_Issued', type: 'INT', nullable: false, description: 'Number of copies currently issued' },
      ],
      sampleRows: [
        { Book_Id: 'T0001', Quantity_Issued: 4 },
        { Book_Id: 'C0001', Quantity_Issued: 5 },
        { Book_Id: 'F0001', Quantity_Issued: 2 },
        { Book_Id: 'T0002', Quantity_Issued: 5 },
        { Book_Id: 'F0002', Quantity_Issued: 8 },
      ],
      usedInQuestions: ['Q9'],
    },
  ],
  cs4: [
    {
      name: 'Physics',
      caseStudyId: 'cs4',
      description: 'Departmental register for students enrolled in Physics courses.',
      columns: [
        { name: 'Regno', type: 'VARCHAR(20)', isPrimaryKey: true, nullable: false, description: 'Student Registration Number' },
        { name: 'Name', type: 'VARCHAR(50)', nullable: false, description: 'Student Full Name' },
        { name: 'Year', type: 'VARCHAR(20)', nullable: false, description: 'Academic Year (First, Second, Third)' },
        { name: 'Combination', type: 'VARCHAR(20)', nullable: false, description: 'Subject Combination Code (PCM, PMCs, PME)' },
      ],
      sampleRows: [
        { Regno: 'AJ00325', Name: 'Ashwin', Year: 'First', Combination: 'PCM' },
        { Regno: 'AJ00225', Name: 'Swaroop', Year: 'Second', Combination: 'PMCs' },
        { Regno: 'AJ00385', Name: 'Sarika', Year: 'Third', Combination: 'PME' },
        { Regno: 'AJ00388', Name: 'Rupa', Year: 'First', Combination: 'PMCs' },
      ],
      usedInQuestions: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q7', 'Q8', 'Q9'],
    },
    {
      name: 'Computer_Science',
      caseStudyId: 'cs4',
      description: 'Departmental register for students enrolled in Computer Science courses (renamed CS in Q10).',
      columns: [
        { name: 'Regno', type: 'VARCHAR(20)', isPrimaryKey: true, nullable: false, description: 'Student Registration Number' },
        { name: 'Name', type: 'VARCHAR(50)', nullable: false, description: 'Student Full Name' },
        { name: 'Year', type: 'VARCHAR(20)', nullable: false, description: 'Academic Year (First, Second, Third)' },
        { name: 'Combination', type: 'VARCHAR(20)', nullable: false, description: 'Subject Combination Code (PMCs, BCA)' },
      ],
      sampleRows: [
        { Regno: 'AJ00225', Name: 'Swaroop', Year: 'Second', Combination: 'PMCs' },
        { Regno: 'AJ00296', Name: 'Tejas', Year: 'Second', Combination: 'BCA' },
        { Regno: 'AJ00112', Name: 'Geeta', Year: 'First', Combination: 'BCA' },
        { Regno: 'AJ00388', Name: 'Rupa', Year: 'First', Combination: 'PMCs' },
      ],
      usedInQuestions: ['Q1', 'Q2', 'Q3', 'Q4', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
    },
  ],
};

export const ALL_SCHEMAS: TableSchema[] = Object.values(CASE_STUDY_SCHEMAS).flat();
