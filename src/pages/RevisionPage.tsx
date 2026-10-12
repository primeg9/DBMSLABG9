import React, { useState } from 'react';
import {
  BookmarkCheck,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Filter,
  Sparkles,
  ChevronRight,
  Code,
  Layers,
} from 'lucide-react';
import { REVISION_TOPICS } from '../data/revision';
import { ALL_QUESTIONS } from '../data/questions';
import { SYLLABUS_LESSONS } from '../data/lessons';
import { CASE_STUDIES } from '../data/caseStudies';
import { SqlCodeBlock } from '../components/SqlCodeBlock';
import { getStoredProgress, toggleQuestionCompletion, toggleLessonCompletion } from '../lib/storage';
import { ActivePage } from '../components/Navbar';

interface RevisionPageProps {
  onNavigate: (page: ActivePage, itemId?: string) => void;
}

export const RevisionPage: React.FC<RevisionPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'questionChecklist' | 'syllabusChecklist'>('concepts');
  const [questionFilter, setQuestionFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [progress, setProgress] = useState(getStoredProgress());

  const handleToggleQuestion = (id: string) => {
    toggleQuestionCompletion(id);
    setProgress(getStoredProgress());
  };

  const handleToggleLesson = (id: string) => {
    toggleLessonCompletion(id);
    setProgress(getStoredProgress());
  };

  const filteredQuestions = ALL_QUESTIONS.filter((q) => {
    const isDone = progress.completedQuestions.includes(q.id);
    if (questionFilter === 'completed') return isDone;
    if (questionFilter === 'pending') return !isDone;
    return true;
  });

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 4rem', maxWidth: '1020px' }}>
      {/* Header */}
      <div style={{ maxWidth: '820px', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-blue">Exam Preparation Hub</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
            Course Code SEPBCAP1.7
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
          Quick Lab Exam Revision
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Review high-yield concepts, compare common confusing SQL keywords (WHERE vs HAVING, UNION vs UNION ALL), inspect common examiner traps, and audit your revision checklist before entering the computer lab.
        </p>
      </div>

      {/* Main Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-light)',
          marginBottom: '2rem',
          paddingBottom: '0.5rem',
        }}
      >
        <button
          onClick={() => setActiveTab('concepts')}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.88rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-sm)',
            background: activeTab === 'concepts' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'concepts' ? '#ffffff' : 'var(--text-muted)',
            border: 'none',
          }}
        >
          High-Yield Concepts & Viva Traps
        </button>

        <button
          onClick={() => setActiveTab('questionChecklist')}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.88rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-sm)',
            background: activeTab === 'questionChecklist' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'questionChecklist' ? '#ffffff' : 'var(--text-muted)',
            border: 'none',
          }}
        >
          40 Lab Questions Checklist ({progress.completedQuestions.length}/40)
        </button>

        <button
          onClick={() => setActiveTab('syllabusChecklist')}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.88rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-sm)',
            background: activeTab === 'syllabusChecklist' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'syllabusChecklist' ? '#ffffff' : 'var(--text-muted)',
            border: 'none',
          }}
        >
          Unit V Topics Checklist ({progress.completedLessons.length}/13)
        </button>
      </div>

      {/* Tab 1: Concepts & Comparisons */}
      {activeTab === 'concepts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {REVISION_TOPICS.map((topic) => (
            <section
              key={topic.id}
              className="editorial-card"
              style={{
                padding: '1.75rem',
                background: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                  {topic.category}
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {topic.title}
              </h3>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {topic.summary}
              </p>

              {/* Detailed Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
                {topic.points.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-card-subtle)',
                      borderRadius: '6px',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      {pt.title}
                    </div>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                      {pt.explanation}
                    </p>
                    {pt.code && (
                      <div style={{ marginTop: '0.65rem' }}>
                        <SqlCodeBlock sql={pt.code} isExecutable={false} title="Code Pattern" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Viva Exam Advice Banner */}
              <div
                style={{
                  padding: '0.85rem 1rem',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '4px',
                  color: '#166534',
                  fontSize: '0.86rem',
                  lineHeight: 1.5,
                }}
              >
                <strong>Examiner Viva Tip:</strong> {topic.examAdvice}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Tab 2: 40 Questions Checklist */}
      {activeTab === 'questionChecklist' && (
        <div>
          {/* Question Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Check off questions as you practice and verify them:
            </div>

            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                onClick={() => setQuestionFilter('all')}
                className={`badge ${questionFilter === 'all' ? 'badge-blue' : 'badge-neutral'}`}
                style={{ cursor: 'pointer', padding: '0.35rem 0.65rem' }}
              >
                All 40 Questions
              </button>
              <button
                onClick={() => setQuestionFilter('completed')}
                className={`badge ${questionFilter === 'completed' ? 'badge-blue' : 'badge-neutral'}`}
                style={{ cursor: 'pointer', padding: '0.35rem 0.65rem' }}
              >
                Revise Completed ({progress.completedQuestions.length})
              </button>
              <button
                onClick={() => setQuestionFilter('pending')}
                className={`badge ${questionFilter === 'pending' ? 'badge-blue' : 'badge-neutral'}`}
                style={{ cursor: 'pointer', padding: '0.35rem 0.65rem' }}
              >
                Not Yet Completed ({40 - progress.completedQuestions.length})
              </button>
            </div>
          </div>

          {/* List grouped by Case Study */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {CASE_STUDIES.map((cs) => {
              const csQuestions = filteredQuestions.filter((q) => q.caseStudyId === cs.id);
              if (csQuestions.length === 0) return null;

              return (
                <div key={cs.id} className="editorial-card" style={{ padding: '1.25rem', background: '#ffffff' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                    Case Study {cs.number}: {cs.name} ({cs.databaseName})
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {csQuestions.map((q) => {
                      const isDone = progress.completedQuestions.includes(q.id);

                      return (
                        <div
                          key={q.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '4px',
                            background: isDone ? '#f0fdf4' : 'var(--bg-card-subtle)',
                            border: `1px solid ${isDone ? '#bbf7d0' : 'var(--border-light)'}`,
                            gap: '0.75rem',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1 }}>
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => handleToggleQuestion(q.id)}
                              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                            />
                            <span style={{ fontWeight: 700, fontSize: '0.84rem', fontFamily: 'var(--font-mono)' }}>
                              Q{q.number}.
                            </span>
                            <span style={{ fontSize: '0.86rem', color: 'var(--text-main)' }}>
                              {q.originalQuestion}
                            </span>
                          </div>

                          <button
                            onClick={() => onNavigate('question-detail', q.id)}
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.74rem', padding: '0.25rem 0.5rem' }}
                          >
                            Open <ChevronRight size={12} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Syllabus Topics Checklist */}
      {activeTab === 'syllabusChecklist' && (
        <div className="editorial-card" style={{ padding: '1.5rem', background: '#ffffff' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
            Unit V Syllabus Concept Audit
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {SYLLABUS_LESSONS.map((lesson) => {
              const isDone = progress.completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '4px',
                    background: isDone ? '#f0fdf4' : 'var(--bg-card-subtle)',
                    border: `1px solid ${isDone ? '#bbf7d0' : 'var(--border-light)'}`,
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => handleToggleLesson(lesson.id)}
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        Lesson {lesson.order}: {lesson.title}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>
                        {lesson.syllabusUnitRef.split(':')[0]} • Category: {lesson.category}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('lesson-detail', lesson.id)}
                    className="btn btn-secondary btn-sm"
                  >
                    Review Lesson
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
