import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, Filter, Sparkles } from 'lucide-react';
import { SYLLABUS_LESSONS } from '../data/lessons';
import { getStoredProgress, toggleLessonCompletion } from '../lib/storage';
import { ActivePage } from '../components/Navbar';

interface LessonsPageProps {
  onNavigate: (page: ActivePage, itemId?: string) => void;
}

export const LessonsPage: React.FC<LessonsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [progress, setProgress] = useState(getStoredProgress());

  const categories = [
    'All',
    'Fundamentals',
    'DDL',
    'DML & DQL',
    'Filtering & Operators',
    'Aggregates',
    'Subqueries & Joins',
    'Views & Transactions',
  ];

  const filteredLessons =
    selectedCategory === 'All'
      ? SYLLABUS_LESSONS
      : SYLLABUS_LESSONS.filter((l) => l.category === selectedCategory);

  const completedCount = SYLLABUS_LESSONS.filter((l) =>
    progress.completedLessons.includes(l.id)
  ).length;

  const handleToggleDone = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleLessonCompletion(id);
    setProgress(getStoredProgress());
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 4rem' }}>
      {/* Header */}
      <div style={{ maxWidth: '780px', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-blue">Unit V SQL Syllabus</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
            Prof. Kavita Landage Notes
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
          Learn SQL Concepts & Theory
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Master the theoretical foundations of SQL required by the college syllabus. Every lesson includes formal definitions, syntax, sample tables, step-by-step breakdowns, common mistakes, and practice questions.
        </p>

        {/* Completion Progress Bar */}
        <div
          style={{
            marginTop: '1.25rem',
            padding: '1rem',
            background: '#ffffff',
            borderRadius: '6px',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>
              Syllabus Progress: {completedCount} of {SYLLABUS_LESSONS.length} Lessons Finished
            </span>
          </div>

          <div style={{ width: '180px', height: '6px', background: 'var(--bg-card-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${(completedCount / SYLLABUS_LESSONS.length) * 100}%`,
                background: '#16a34a',
                borderRadius: '3px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-subtle)', fontSize: '0.78rem', marginRight: '0.5rem' }}>
          <Filter size={13} />
          <span>FILTER:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              background: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-card)',
              color: selectedCategory === cat ? '#ffffff' : 'var(--text-muted)',
              border: `1px solid ${selectedCategory === cat ? 'var(--accent-primary)' : 'var(--border-light)'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lesson Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filteredLessons.map((lesson) => {
          const isDone = progress.completedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              className="editorial-card"
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: isDone ? '4px solid #16a34a' : '1px solid var(--border-light)',
              }}
              onClick={() => onNavigate('lesson-detail', lesson.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                <span className="badge badge-neutral" style={{ fontSize: '0.74rem' }}>
                  Lesson {lesson.order} • {lesson.category}
                </span>

                <button
                  onClick={(e) => handleToggleDone(e, lesson.id)}
                  title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                  style={{
                    color: isDone ? '#16a34a' : 'var(--text-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  <CheckCircle2 size={16} fill={isDone ? '#bbf7d0' : 'none'} />
                  <span>{isDone ? 'Done' : 'Mark'}</span>
                </button>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                {lesson.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, flex: 1, marginBottom: '1rem' }}>
                {lesson.definition}
              </p>

              <div style={{ fontSize: '0.74rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', marginBottom: '0.85rem' }}>
                Ref: {lesson.syllabusUnitRef.split(':')[0]}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                }}
              >
                <span>Read Lesson & Worked Example</span>
                <ChevronRight size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
