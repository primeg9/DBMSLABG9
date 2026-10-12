import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Table,
  HelpCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { getLessonById, SYLLABUS_LESSONS } from '../data/lessons';
import { SqlCodeBlock } from '../components/SqlCodeBlock';
import { ResultTable } from '../components/ResultTable';
import { InteractiveSqlRunner } from '../components/InteractiveSqlRunner';
import { getStoredProgress, toggleLessonCompletion, setRecentVisited } from '../lib/storage';
import { ActivePage } from '../components/Navbar';

interface LessonDetailPageProps {
  lessonId: string;
  onNavigate: (page: ActivePage, itemId?: string) => void;
}

export const LessonDetailPage: React.FC<LessonDetailPageProps> = ({ lessonId, onNavigate }) => {
  const lesson = getLessonById(lessonId) || SYLLABUS_LESSONS[0];
  const [progress, setProgress] = useState(getStoredProgress());
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showPracticeSolution, setShowPracticeSolution] = useState<boolean>(false);

  useEffect(() => {
    setRecentVisited('lesson', lesson.id);
    setProgress(getStoredProgress());
    setShowHint(false);
    setShowPracticeSolution(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  const isCompleted = progress.completedLessons.includes(lesson.id);

  const handleToggleCompleted = () => {
    toggleLessonCompletion(lesson.id);
    setProgress(getStoredProgress());
  };

  const nextLesson = lesson.nextLessonId ? getLessonById(lesson.nextLessonId) : undefined;
  const prevLesson = SYLLABUS_LESSONS.find((l) => l.order === lesson.order - 1);

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 4rem', maxWidth: '960px' }}>
      {/* Top Navigation Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <button
          onClick={() => onNavigate('lessons')}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <ArrowLeft size={14} />
          Back to Syllabus
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleToggleCompleted}
            className={`btn btn-sm ${isCompleted ? 'badge-success' : 'btn-secondary'}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.85rem' }}
          >
            <CheckCircle2 size={16} color={isCompleted ? '#16a34a' : 'var(--text-subtle)'} />
            <span>{isCompleted ? 'Lesson Completed' : 'Mark as Completed'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge badge-neutral">Lesson {lesson.order} of {SYLLABUS_LESSONS.length}</span>
          <span className="badge badge-blue">{lesson.category}</span>
          <span className="badge badge-neutral" style={{ fontFamily: 'var(--font-mono)' }}>
            {lesson.syllabusUnitRef.split(':')[0]}
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
          {lesson.title}
        </h1>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>
          Source Reference: <em>{lesson.syllabusUnitRef}</em>
        </div>
      </div>

      {/* 1. Plain-Language Definition */}
      <section className="editorial-card" style={{ padding: '1.5rem', marginBottom: '2rem', background: '#ffffff' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          1. Plain-Language Definition
        </h3>
        <p style={{ fontSize: '0.94rem', color: 'var(--text-main)', lineHeight: 1.65 }}>
          {lesson.definition}
        </p>
      </section>

      {/* 2. Why & When Used */}
      <section className="editorial-card" style={{ padding: '1.5rem', marginBottom: '2rem', background: '#ffffff' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          2. Why and When to Use This
        </h3>
        <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
          {lesson.whyUsed}
        </p>
      </section>

      {/* 3. Basic Syntax */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
          3. Core Syntax & Grammar
        </h3>
        <SqlCodeBlock sql={lesson.syntax} title="SQL Syntax Blueprint" isExecutable={false} />
      </section>

      {/* 4. Small Example Table */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
          4. Illustrative Sample Table: <code>{lesson.exampleTable.name}</code>
        </h3>
        <div className="editorial-table-wrapper">
          <table className="editorial-table">
            <thead>
              <tr>
                {lesson.exampleTable.columns.map((c, i) => (
                  <th key={i}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lesson.exampleTable.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>{cell === null ? <em style={{ color: '#94a3b8' }}>NULL</em> : String(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Correct SQL Example */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
          5. Worked SQL Query
        </h3>
        <SqlCodeBlock sql={lesson.sqlExample} title="Demonstration Query" isExecutable={true} />
      </section>

      {/* 6. Expected Result Table */}
      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
          6. Derived Expected Result
        </h3>
        <ResultTable output={lesson.expectedResult} title={`Output from ${lesson.exampleTable.name}`} />
      </section>

      {/* 7. Step-by-Step Explanation */}
      <section className="editorial-card" style={{ padding: '1.5rem', marginBottom: '2rem', background: '#ffffff' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          7. Step-by-Step Breakdown
        </h3>
        <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
          {lesson.explanationSteps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>

      {/* 8. Common Beginner Mistake */}
      <section
        className="editorial-card"
        style={{
          padding: '1.25rem',
          marginBottom: '2rem',
          borderLeft: '4px solid #f59e0b',
          background: '#fffdf7',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <AlertTriangle size={18} color="#d97706" />
          <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#b45309' }}>
            8. Common Beginner Mistake & Exam Trap
          </h4>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#78350f', lineHeight: 1.6, margin: 0 }}>
          {lesson.commonMistake}
        </p>
      </section>

      {/* 9. Short Practice Question */}
      <section
        className="editorial-card"
        style={{
          padding: '1.5rem',
          marginBottom: '2.5rem',
          background: '#ffffff',
          border: '1px solid var(--accent-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
          <HelpCircle size={18} color="var(--accent-primary)" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
            9. Practice Challenge
          </h3>
        </div>

        <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1rem' }}>
          {lesson.practiceQuestion.prompt}
        </p>

        {/* Hint toggle */}
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => setShowHint(!showHint)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Lightbulb size={13} color="#d97706" />
            <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
          </button>

          {showHint && (
            <div
              style={{
                marginTop: '0.6rem',
                padding: '0.75rem',
                background: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: '4px',
                fontSize: '0.84rem',
                color: '#92400e',
              }}
            >
              <strong>Hint:</strong> {lesson.practiceQuestion.hint}
            </div>
          )}
        </div>

        {/* Reveal Solution */}
        <div>
          <button
            onClick={() => setShowPracticeSolution(!showPracticeSolution)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            {showPracticeSolution ? <EyeOff size={13} /> : <Eye size={13} />}
            <span>{showPracticeSolution ? 'Hide Solution' : 'Reveal Verified Solution'}</span>
          </button>

          {showPracticeSolution && (
            <div style={{ marginTop: '1rem' }}>
              <SqlCodeBlock sql={lesson.practiceQuestion.solutionSql} title="Verified Solution SQL" isExecutable={true} />
              <ResultTable output={lesson.practiceQuestion.expectedOutput} title="Practice Question Output" />
            </div>
          )}
        </div>
      </section>

      {/* 10. Next Lesson Navigation & Completion Card */}
      <div
        className="editorial-card"
        style={{
          padding: '1.5rem',
          background: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          {prevLesson ? (
            <button
              onClick={() => onNavigate('lesson-detail', prevLesson.id)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <ArrowLeft size={14} />
              Previous: {prevLesson.title}
            </button>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>First Lesson</span>
          )}
        </div>

        <div>
          {nextLesson ? (
            <button
              onClick={() => onNavigate('lesson-detail', nextLesson.id)}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <span>Next: {nextLesson.title}</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('questions')}
              className="btn btn-primary"
            >
              Go to All 40 Lab Questions <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
