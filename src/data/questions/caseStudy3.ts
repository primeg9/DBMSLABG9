import { LabQuestion } from '../../types';

export const CASE_STUDY_3_QUESTIONS: LabQuestion[] = [
  {
    id: 'cs3-q1',
    caseStudyId: 'cs3',
    number: 1,
    originalQuestion: 'To show Book name, Author name and price of books of First Publ. publisher.',
    conceptTags: ['LIKE', 'Wildcards (%)', 'WHERE'],
    tablesUsed: ['Books'],
    solutionSql: `SELECT Book_Name, Author_Name, Price 
FROM Books 
WHERE Publishers LIKE 'First Publ%';`,
    explanationSteps: [
      'The Books table contains books published by various houses.',
      'Dataset Audit: Row 2 has Publishers = \'First Publ\' (without a dot) and Row 5 has Publishers = \'First Publ.\' (with a dot).',
      'Using the prefix wildcard LIKE \'First Publ%\' matches both variants seamlessly.',
      'Project Book_Name, Author_Name, and Price for all matching titles.',
    ],
    expectedOutput: {
      columns: ['Book_Name', 'Author_Name', 'Price'],
      rows: [
        ['The Tears', 'William Hopkins', 650.00],
        ['Thunderbolts', 'Ana Roberts', 750.00],
      ],
    },
    examTip: 'Using LIKE \'First Publ%\' is much safer than WHERE Publishers = \'First Publ.\' because it handles trailing punctuation discrepancies without dropping matching rows.',
  },
  {
    id: 'cs3-q2',
    caseStudyId: 'cs3',
    number: 2,
    originalQuestion: 'Display Book id, Book name and publisher of books having quantity more than 8 and price less than 500.',
    conceptTags: ['Logical AND', 'Relational Operators (>, <)', 'WHERE'],
    tablesUsed: ['Books'],
    solutionSql: `SELECT Book_Id, Book_Name, Publishers 
FROM Books 
WHERE Quantity > 8 AND Price < 500;`,
    explanationSteps: [
      'The query applies compound filtering using the AND logical operator.',
      'Condition 1: Quantity > 8 (excludes C0001 with quantity 5).',
      'Condition 2: Price < 500 (excludes F0001 with price 650 and F0002 with price 750).',
      'Both conditions are satisfied by T0001 (Qty 10, Price 350) and T0002 (Qty 15, Price 350).',
    ],
    expectedOutput: {
      columns: ['Book_Id', 'Book_Name', 'Publishers'],
      rows: [
        ['T0001', 'My First C++', 'ERP'],
        ['T0002', "C++ Brainwork's", 'TDH'],
      ],
    },
    examTip: 'Both sides of an AND condition must evaluate to TRUE for a row to be included in the final result set.',
  },
  {
    id: 'cs3-q3',
    caseStudyId: 'cs3',
    number: 3,
    originalQuestion: 'Select Book id, book name, author name of books which is published by other than ERP publishers and price between 300 to 700.',
    conceptTags: ['!=', '<>', 'BETWEEN', 'Logical AND'],
    tablesUsed: ['Books'],
    solutionSql: `SELECT Book_Id, Book_Name, Author_Name 
FROM Books 
WHERE Publishers != 'ERP' AND Price BETWEEN 300 AND 700;`,
    alternativeSql: [
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `SELECT Book_Id, Book_Name, Author_Name \nFROM Books \nWHERE Publishers <> 'ERP' AND Price BETWEEN 300 AND 700;`,
        note: '<> is the official ANSI-standard inequality operator.',
      },
    ],
    explanationSteps: [
      'Condition 1: Publishers != \'ERP\' (or <> \'ERP\') filters out books from publisher ERP (excluding T0001).',
      'Condition 2: Price BETWEEN 300 AND 700 includes books whose price is >= 300 and <= 700 (excluding F0002 at 750).',
      'Checking our dataset:',
      '- C0001: EPP, 355 (Match)',
      '- F0001: First Publ, 650 (Match)',
      '- T0001: ERP, 350 (Excluded by publisher)',
      '- T0002: TDH, 350 (Match)',
      '- F0002: First Publ., 750 (Excluded by price)',
    ],
    expectedOutput: {
      columns: ['Book_Id', 'Book_Name', 'Author_Name'],
      rows: [
        ['C0001', 'The Klone and I', 'Lata Kappor'],
        ['F0001', 'The Tears', 'William Hopkins'],
        ['T0002', "C++ Brainwork's", 'A.W.Rossaine'],
      ],
    },
    examTip: 'Both != and <> represent "not equal to". However, <> is strictly ANSI/ISO standard across every relational database engine.',
  },
  {
    id: 'cs3-q4',
    caseStudyId: 'cs3',
    number: 4,
    originalQuestion: 'Generate a Bill with Book_id, Book_name, Publisher, Price, Quantity, 4% of VAT "Total".',
    conceptTags: ['Arithmetic Expressions', 'Itemized Bill', 'VAT Calculation'],
    tablesUsed: ['Books'],
    solutionSql: `SELECT 
    Book_Id, 
    Book_Name, 
    Publishers, 
    Price, 
    Quantity, 
    (Price * Quantity) AS Subtotal,
    (Price * Quantity * 0.04) AS VAT_4_Percent,
    (Price * Quantity * 1.04) AS Total_Bill 
FROM Books;`,
    explanationSteps: [
      'The query models an itemized financial billing statement for all inventory items.',
      'Subtotal = Price * Quantity (base value of available stock).',
      'VAT_4_Percent = Price * Quantity * 0.04 (4% Value Added Tax).',
      'Total_Bill = Subtotal + VAT = Price * Quantity * 1.04.',
      'Displaying Subtotal, VAT, and Grand Total separately ensures total clarity and audit compliance.',
    ],
    expectedOutput: {
      columns: ['Book_Id', 'Book_Name', 'Publishers', 'Price', 'Quantity', 'Subtotal', 'VAT_4_Percent', 'Total_Bill'],
      rows: [
        ['C0001', 'The Klone and I', 'EPP', 355.00, 5, 1775.00, 71.00, 1846.00],
        ['F0001', 'The Tears', 'First Publ', 650.00, 20, 13000.00, 520.00, 13520.00],
        ['T0001', 'My First C++', 'ERP', 350.00, 10, 3500.00, 140.00, 3640.00],
        ['T0002', "C++ Brainwork's", 'TDH', 350.00, 15, 5250.00, 210.00, 5460.00],
        ['F0002', 'Thunderbolts', 'First Publ.', 750.00, 50, 37500.00, 1500.00, 39000.00],
      ],
    },
    examTip: 'Always project both the tax amount (Price * Quantity * 0.04) and the final gross total (Price * Quantity * 1.04) when generating billing statements in DBMS lab practicals.',
  },
  {
    id: 'cs3-q5',
    caseStudyId: 'cs3',
    number: 5,
    originalQuestion: "Display book details with book id's C0001, F0001, T0002, F0002 (Hint: use IN operator).",
    conceptTags: ['IN Operator', 'Set Membership', 'WHERE'],
    tablesUsed: ['Books'],
    solutionSql: `SELECT * FROM Books 
WHERE Book_Id IN ('C0001', 'F0001', 'T0002', 'F0002');`,
    explanationSteps: [
      'The IN operator tests if an attribute matches any value within a given list of literals.',
      'WHERE Book_Id IN (...) is shorthand for multiple OR expressions: (Book_Id = \'C0001\' OR Book_Id = \'F0001\' OR ...).',
      'Out of the 5 books in the database, 4 match the specified list (only T0001 is omitted).',
    ],
    expectedOutput: {
      columns: ['Book_Id', 'Book_Name', 'Author_Name', 'Publishers', 'Price', 'Type', 'Quantity'],
      rows: [
        ['C0001', 'The Klone and I', 'Lata Kappor', 'EPP', 355.00, 'Novel', 5],
        ['F0001', 'The Tears', 'William Hopkins', 'First Publ', 650.00, 'Fiction', 20],
        ['T0002', "C++ Brainwork's", 'A.W.Rossaine', 'TDH', 350.00, 'Text', 15],
        ['F0002', 'Thunderbolts', 'Ana Roberts', 'First Publ.', 750.00, 'Fiction', 50],
      ],
    },
    examTip: 'The IN operator is substantially faster, easier to read, and less error-prone than chaining multiple OR conditions.',
  },
  {
    id: 'cs3-q6',
    caseStudyId: 'cs3',
    number: 6,
    originalQuestion: 'Display Book list other than type Novel and Fiction.',
    conceptTags: ['NOT IN', 'Negation', 'WHERE'],
    tablesUsed: ['Books'],
    solutionSql: `SELECT * FROM Books 
WHERE Type NOT IN ('Novel', 'Fiction');`,
    explanationSteps: [
      'The NOT IN operator excludes any rows whose Type matches any of the values in the set (\'Novel\', \'Fiction\').',
      'Checking our inventory:',
      '- C0001 is Novel (Excluded)',
      '- F0001 is Fiction (Excluded)',
      '- T0001 is Text (Included)',
      '- T0002 is Text (Included)',
      '- F0002 is Fiction (Excluded)',
      'The remaining books are T0001 and T0002, both of type \'Text\'.',
    ],
    expectedOutput: {
      columns: ['Book_Id', 'Book_Name', 'Author_Name', 'Publishers', 'Price', 'Type', 'Quantity'],
      rows: [
        ['T0001', 'My First C++', 'Brain & Brooke', 'ERP', 350.00, 'Text', 10],
        ['T0002', "C++ Brainwork's", 'A.W.Rossaine', 'TDH', 350.00, 'Text', 15],
      ],
    },
    examTip: 'Be cautious when using NOT IN with subqueries if the subquery might return a NULL value. With hardcoded literal lists like (\'Novel\', \'Fiction\'), NOT IN is completely safe.',
  },
  {
    id: 'cs3-q7',
    caseStudyId: 'cs3',
    number: 7,
    originalQuestion: 'Display book details with the author name starting with letter "A".',
    conceptTags: ['LIKE', 'Wildcards (A%)', 'WHERE'],
    tablesUsed: ['Books'],
    solutionSql: `SELECT * FROM Books 
WHERE Author_Name LIKE 'A%';`,
    alternativeSql: [
      {
        dialect: 'Oracle',
        sql: `SELECT * FROM Books \nWHERE UPPER(Author_Name) LIKE 'A%';`,
        note: 'UPPER() guarantees case-insensitive pattern matching in Oracle.',
      },
    ],
    explanationSteps: [
      'The LIKE operator performs pattern matching on text strings.',
      'The percent sign (%) is a wildcard that matches zero or more arbitrary characters.',
      'LIKE \'A%\' matches any string that starts with the letter \'A\'.',
      'Checking author names in the table:',
      '- Lata Kappor (Starts with L - No)',
      '- William Hopkins (Starts with W - No)',
      '- Brain & Brooke (Starts with B - No)',
      '- A.W.Rossaine (Starts with A - Match!)',
      '- Ana Roberts (Starts with A - Match!)',
      'Two books match.',
    ],
    expectedOutput: {
      columns: ['Book_Id', 'Book_Name', 'Author_Name', 'Publishers', 'Price', 'Type', 'Quantity'],
      rows: [
        ['T0002', "C++ Brainwork's", 'A.W.Rossaine', 'TDH', 350.00, 'Text', 15],
        ['F0002', 'Thunderbolts', 'Ana Roberts', 'First Publ.', 750.00, 'Fiction', 50],
      ],
    },
    examTip: 'Remember the two main SQL wildcards: % matches any number of characters (zero or more), while _ (underscore) matches exactly one character.',
  },
  {
    id: 'cs3-q8',
    caseStudyId: 'cs3',
    number: 8,
    originalQuestion: 'Display book details with the author name starting with letter "T" and ending with "S".',
    conceptTags: ['LIKE', 'Dual Wildcard (T%s)', 'Empty Output Handling'],
    tablesUsed: ['Books'],
    solutionSql: `SELECT * FROM Books 
WHERE UPPER(Author_Name) LIKE 'T%S';`,
    alternativeSql: [
      {
        dialect: 'SQL Server (T-SQL)',
        sql: `SELECT * FROM Books \nWHERE Author_Name LIKE 'T%[sS]';`,
        note: 'Character set matching in T-SQL.',
      },
    ],
    explanationSteps: [
      'The pattern LIKE \'T%s\' or UPPER(Author_Name) LIKE \'T%S\' looks for strings that start with \'T\' and end with \'S\'.',
      'Dataset Audit Check: Let us examine all 5 authors in the Books table:',
      '1. Lata Kappor (starts with L, ends with r)',
      '2. William Hopkins (starts with W, ends with s)',
      '3. Brain & Brooke (starts with B, ends with e)',
      '4. A.W.Rossaine (starts with A, ends with e)',
      '5. Ana Roberts (starts with A, ends with s)',
      'Notice: NOT A SINGLE AUTHOR starts with the letter T!',
      'Therefore, this query returns an Empty Table (0 rows).',
    ],
    expectedOutput: {
      columns: ['Book_Id', 'Book_Name', 'Author_Name', 'Publishers', 'Price', 'Type', 'Quantity'],
      rows: [],
      isEmpty: true,
      emptyReason: 'No author in the provided sample dataset starts with \'T\'. (William Hopkins and Ana Roberts end with \'s\', but start with W and A respectively). Returning 0 rows is the authentic, verified output.',
    },
    examTip: 'Mandatory Exam Checkpoint: When your query returns 0 rows, check the source data! In this lab question, William Hopkins ends with "s" but starts with "W". The query is correct, and zero rows is the expected answer.',
    ambiguityNote: 'Some students mistakenly think William Hopkins should match because it ends with S, forgetting that the condition also requires starting with T. The empty result is mathematically correct.',
  },
  {
    id: 'cs3-q9',
    caseStudyId: 'cs3',
    number: 9,
    originalQuestion: 'Select Book_Id, Book_Name, Author_Name, Quantity Issued where Books.Books_Id = Issued.Book_Id.',
    conceptTags: ['INNER JOIN', 'Typo Correction', 'Foreign Key'],
    tablesUsed: ['Books', 'Issued'],
    solutionSql: `SELECT B.Book_Id, B.Book_Name, B.Author_Name, I.Quantity_Issued 
FROM Books B 
JOIN Issued I ON B.Book_Id = I.Book_Id;`,
    explanationSteps: [
      'Typo Correction in Question: The source question wrote "Books.Books_Id = Issued.Book_Id". In the Books table schema, the primary key column is named Book_Id, not Books_Id.',
      'We perform an INNER JOIN between Books B and Issued I on B.Book_Id = I.Book_Id.',
      'Project Book_Id, Book_Name, Author_Name, and Quantity_Issued.',
      'All 5 books in the Books table have corresponding records in the Issued table, returning 5 matched rows.',
    ],
    expectedOutput: {
      columns: ['Book_Id', 'Book_Name', 'Author_Name', 'Quantity_Issued'],
      rows: [
        ['C0001', 'The Klone and I', 'Lata Kappor', 5],
        ['F0001', 'The Tears', 'William Hopkins', 2],
        ['T0001', 'My First C++', 'Brain & Brooke', 4],
        ['T0002', "C++ Brainwork's", 'A.W.Rossaine', 5],
        ['F0002', 'Thunderbolts', 'Ana Roberts', 8],
      ],
    },
    examTip: 'Watch out for column typos in lab exam question papers! Always cross-reference the schema created in step 1. If the question writes Books.Books_Id, point out to your invigilator that the column is Book_Id.',
  },
  {
    id: 'cs3-q10',
    caseStudyId: 'cs3',
    number: 10,
    originalQuestion: 'List the book_name, Author_name, Price. In ascending order of Book_name and then in descending order of price.',
    conceptTags: ['ORDER BY', 'Multi-column Sort', 'ASC', 'DESC'],
    tablesUsed: ['Books'],
    solutionSql: `SELECT Book_Name, Author_Name, Price 
FROM Books 
ORDER BY Book_Name ASC, Price DESC;`,
    explanationSteps: [
      'SELECT Book_Name, Author_Name, Price projects the 3 requested attributes.',
      'FROM Books specifies the catalog table.',
      'ORDER BY Book_Name ASC, Price DESC performs multi-level sorting:',
      '1. Primary Sort: Book_Name in ascending alphabetical order (A to Z).',
      '2. Secondary Sort: If two books have the exact same Book_Name, Price is sorted in descending order (highest to lowest).',
    ],
    expectedOutput: {
      columns: ['Book_Name', 'Author_Name', 'Price'],
      rows: [
        ["C++ Brainwork's", 'A.W.Rossaine', 350.00],
        ['My First C++', 'Brain & Brooke', 350.00],
        ['The Klone and I', 'Lata Kappor', 355.00],
        ['The Tears', 'William Hopkins', 650.00],
        ['Thunderbolts', 'Ana Roberts', 750.00],
      ],
    },
    examTip: 'In multi-column ORDER BY, the database sorts by the first column first. The second column is only evaluated as a tie-breaker when two or more rows have identical values in the first column.',
  },
];
