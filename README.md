# DBMSLABG9 — Understand the Query. Own the Practical.

A modern, editorial SQL learning workspace and laboratory practical exam preparation platform built for college database management students.

---

## 🌟 Overview & Identity

**DBMSLABG9** is built specifically for college students studying database systems (Course Code: `SEPBCAP1.7` / Unit V SQL Syllabus). It bridges the gap between rote query memorization and deep relational understanding by providing:

1. **40 Audited Lab Questions across 4 Case Studies** from `DBMS_Lab_Solutions.pdf`.
2. **13 Complete Syllabus Lessons** derived directly from `DBMS-Unit V.pdf` (Prof. Kavita Landage notes).
3. **Verified Expected Outputs** derived from actual relational sample data, with honest representations for empty query results and data modifications.
4. **Dialect Compatibility Notes** covering differences between ANSI/ISO Standard SQL, MySQL, Microsoft SQL Server (T-SQL), SQLite, PostgreSQL, and Oracle.
5. **Interactive In-Browser SQL Engine** powered by WebAssembly SQLite (`sql.js`), preloaded with all 8 database tables across all 4 case studies.
6. **Distraction-Free Practice Arena** where solutions and hints can be revealed on demand.
7. **Database Explorer** to inspect table schemas, primary keys, foreign keys, datatypes, and sample rows.
8. **Lab Exam Revision Hub** featuring viva pitfalls, crucial concept comparisons (WHERE vs HAVING, UNION vs UNION ALL, DROP vs TRUNCATE vs DELETE), and progress checklists.

---

## 📚 Curriculum Structure

### Part 1: All 40 Lab Questions (4 Case Studies)
- **Case Study 1: Employee & Salary Management (Q1–Q10)**
  - *Focus:* SELECT clause, filtering, arithmetic expressions, date boundaries, string lengths, and schema alterations.
  - *Key Audit Points:* DATEDIFF calendar-boundary trap vs DATEADD, gross salary vs net salary calculation, empty output verification for Paris.
- **Case Study 2: Bank System (Q2.1–Q2.10)**
  - *Focus:* GROUP BY, aggregate functions (SUM, AVG, MIN, MAX, COUNT), HAVING clause, multi-table joins, and record updates.
  - *Key Audit Points:* Row-level filter (WHERE) vs group-level filter (HAVING) on loan balance > 25000; corrected "Bangalroe" city typo.
- **Case Study 3: Library Management (Q3.1–Q3.10)**
  - *Focus:* Pattern matching (LIKE %), relational operators, range filtering (BETWEEN), set membership (IN, NOT IN), itemized billing with VAT, and multi-column sorting.
  - *Key Audit Points:* Corrected `Books.Books_Id` schema typo; verified empty set for author starting with 'T'; itemized 4% VAT breakdown.
- **Case Study 4: Subject & Academic Registry (Q4.1–Q4.10)**
  - *Focus:* Relational set algebra (UNION, UNION ALL, INTERSECT, EXCEPT), subqueries, NULL-safety, and table renaming.
  - *Key Audit Points:* Performance and duplicate differences between UNION and UNION ALL; NULL safety in NOT IN subqueries; cross-engine table renaming (`sp_rename` vs `RENAME TO`).

### Part 2: Unit V Syllabus Roadmap (13 Lessons)
1. **Introduction to SQL & Command Categories** (DDL, DML, DQL, DCL, TCL)
2. **SQL Data Types & Schema Constraints** (PRIMARY KEY, UNIQUE, CHECK, NOT NULL, FOREIGN KEY)
3. **DDL: CREATE, ALTER, DROP & TRUNCATE**
4. **DQL Fundamentals: SELECT, WHERE, ORDER BY & DISTINCT**
5. **Operators & Expressions: Arithmetic, Comparison & Logical**
6. **Pattern Matching & Special Operators: LIKE, BETWEEN & IN**
7. **Aggregate Functions: COUNT, SUM, AVG, MIN & MAX**
8. **Grouping & Filtering: GROUP BY and HAVING Clause**
9. **Subquery Quantifiers: ALL and ANY Operators**
10. **Relational Joins: INNER, LEFT, RIGHT & FULL JOIN**
11. **Set Operations: UNION, UNION ALL, INTERSECT & EXCEPT**
12. **Views & WITH CHECK OPTION**
13. **TCL & DCL: Transactions (COMMIT, ROLLBACK) & Access Control (GRANT, REVOKE)**

*Every single lesson contains:*
- Plain-language definition
- Why and when used
- Syntax template
- Sample table with rows
- Worked SQL query
- Expected result table
- Step-by-step breakdown
- Common beginner mistake
- Practice challenge with hint and solution
- Direct navigation to next lesson

---

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Icons:** Lucide React (`lucide-react`)
- **Typography:** Plus Jakarta Sans & JetBrains Mono (Google Fonts)
- **Engine:** Client-side WebAssembly SQLite (`sql.js`) pre-seeded with all case study schemas
- **Styling:** Custom Vanilla CSS Design System (Warm off-white background, deep ink text, cobalt blue accents, dark editor surface)
- **Deployment:** Vercel-ready with SPA URL rewrite configuration (`vercel.json`)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (or pnpm / yarn)

### Installation
Clone or navigate to the repository directory:
```bash
cd DBMSLABG9
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
```

### Previewing the Production Build
```bash
npm run preview
```
Open [http://localhost:4173](http://localhost:4173) in your browser.

---

## ☁️ Deployment to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import the `DBMSLABG9` repository.
4. Ensure the framework preset is detected as **Vite**:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**. The included `vercel.json` ensures client-side routes and hash navigation resolve seamlessly without 404 errors.

---

## 📄 Documentation

- Comprehensive question audit: [`docs/question-audit.md`](file:///c:/Users/HP/OneDrive/Desktop/DBMSLABG9/docs/question-audit.md)
- Course Reference 1: `DBMS_Lab_Solutions.pdf`
- Course Reference 2: `DBMS-Unit V.pdf`

---

## 💌 Personal Wish from G9

> **ALL THE BEST!**  
> *“From G9 — Don't just memorise queries. Understand them, practise them, and trust your preparation. One question at a time. You've got this.”*  
> **— G9**
