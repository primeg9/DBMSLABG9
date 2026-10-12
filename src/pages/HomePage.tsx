import React from 'react';
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  PlayCircle,
  Database,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { ActivePage } from '../components/Navbar';
import { CASE_STUDIES } from '../data/caseStudies';
import { SYLLABUS_LESSONS } from '../data/lessons';
import { ALL_QUESTIONS } from '../data/questions';
import { getStoredProgress } from '../lib/storage';

interface HomePageProps {
  onNavigate: (page: ActivePage, itemId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const progress = getStoredProgress();
  const totalQuestions = ALL_QUESTIONS.length;
  const completedQCount = progress.completedQuestions.length;
  const totalLessons = SYLLABUS_LESSONS.length;
  const completedLCount = progress.completedLessons.length;

  // Calculate continue learning target
  const recentQ = ALL_QUESTIONS.find((q) => q.id === progress.recentQuestionId) || ALL_QUESTIONS[0];
  const recentL = SYLLABUS_LESSONS.find((l) => l.id === progress.recentLessonId) || SYLLABUS_LESSONS[0];

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Editorial Hero Section */}
      <section
        style={{
          padding: '3.5rem 0 3rem',
          borderBottom: '1px solid var(--border-light)',
          background: 'radial-gradient(ellipse at top, #ffffff 0%, var(--bg-page) 80%)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '820px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.25rem 0.65rem',
                background: 'var(--bg-accent-tint)',
                border: '1px solid var(--accent-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                marginBottom: '1.25rem',
                letterSpacing: '0.02em',
              }}
            >
              <Sparkles size={13} />
              <span>DBMS Practical & Lab Exam Masterclass • Course SEPBCAP1.7</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
              }}
            >
              SQL becomes easier when you understand the logic.
            </h1>

            <p
              style={{
                fontSize: '1.12rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: '680px',
                marginBottom: '2rem',
              }}
            >
              Learn the concepts, understand every query, and prepare for your DBMS practical one step at a time. Verified solutions for all 40 lab exercises and Unit V syllabus topics.
            </p>

            {/* Hero Action Buttons */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('lessons')}
                className="btn btn-primary"
                style={{ padding: '0.7rem 1.4rem', fontSize: '0.94rem' }}
              >
                <BookOpen size={17} />
                Start Learning Syllabus
              </button>

              <button
                onClick={() => onNavigate('questions')}
                className="btn btn-secondary"
                style={{ padding: '0.7rem 1.4rem', fontSize: '0.94rem' }}
              >
                <HelpCircle size={17} />
                Open All 40 Lab Questions
              </button>
            </div>
          </div>

          {/* Genuine Progress Card (Not Fake Metrics) */}
          <div
            className="editorial-card"
            style={{
              marginTop: '3rem',
              padding: '1.5rem',
              background: '#ffffff',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--text-subtle)', fontWeight: 700, letterSpacing: '0.04em' }}>
                Your Practical Readiness
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.2rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                  {completedQCount}
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                  / {totalQuestions} Lab Questions Solved
                </span>
              </div>
              <div
                style={{
                  height: '6px',
                  width: '100%',
                  background: 'var(--bg-card-subtle)',
                  borderRadius: '3px',
                  marginTop: '0.5rem',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(completedQCount / totalQuestions) * 100}%`,
                    background: 'var(--accent-primary)',
                    borderRadius: '3px',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--text-subtle)', fontWeight: 700, letterSpacing: '0.04em' }}>
                Syllabus Mastery
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.2rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                  {completedLCount}
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                  / {totalLessons} Unit V Topics
                </span>
              </div>
              <div
                style={{
                  height: '6px',
                  width: '100%',
                  background: 'var(--bg-card-subtle)',
                  borderRadius: '3px',
                  marginTop: '0.5rem',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(completedLCount / totalLessons) * 100}%`,
                    background: '#16a34a',
                    borderRadius: '3px',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Continue Learning Jump */}
            <div
              style={{
                borderLeft: '1px solid var(--border-light)',
                paddingLeft: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-subtle)', fontSize: '0.75rem', fontWeight: 600 }}>
                <Clock size={12} />
                <span>CONTINUE STUDYING</span>
              </div>
              <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.3rem 0' }}>
                {recentQ ? `Case Study ${recentQ.caseStudyId.toUpperCase().replace('CS', '')}: Q${recentQ.number}` : recentL.title}
              </p>
              <button
                onClick={() => onNavigate('question-detail', recentQ.id)}
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '0.25rem' }}
              >
                Resume Question <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Hub */}
      <div className="container" style={{ marginTop: '3.5rem' }}>
        {/* Section 1: The 4 Lab Case Studies */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>
                Laboratory Curriculum
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>The 4 Lab Case Studies</h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                All 40 original questions from the college lab solution PDF, individually audited, verified, and explained.
              </p>
            </div>

            <button
              onClick={() => onNavigate('questions')}
              className="btn btn-secondary btn-sm"
            >
              View All Questions <ArrowRight size={14} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {CASE_STUDIES.map((cs) => {
              const csQuestions = ALL_QUESTIONS.filter((q) => q.caseStudyId === cs.id);
              const completedInCs = csQuestions.filter((q) =>
                progress.completedQuestions.includes(q.id)
              ).length;

              return (
                <div
                  key={cs.id}
                  className="editorial-card"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                  }}
                  onClick={() => onNavigate('questions', cs.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span className="badge badge-neutral" style={{ fontFamily: 'var(--font-mono)' }}>
                      CASE STUDY {cs.number}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: completedInCs === 10 ? '#16a34a' : 'var(--text-subtle)', fontWeight: 600 }}>
                      {completedInCs}/10 Solved
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.12rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    {cs.name}
                  </h3>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5, flex: 1 }}>
                    {cs.subtitle}
                  </p>

                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {cs.tables.map((tbl) => (
                      <span key={tbl} className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                        {tbl}
                      </span>
                    ))}
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
                    <span>Practice 10 Questions</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Syllabus Learning Progression */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-neutral" style={{ marginBottom: '0.4rem' }}>
                College Syllabus Notes
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Unit V SQL Syllabus Roadmap</h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Master SQL fundamentals step-by-step with practical examples, syntax, common pitfalls, and worked problems.
              </p>
            </div>

            <button
              onClick={() => onNavigate('lessons')}
              className="btn btn-secondary btn-sm"
            >
              Explore All Lessons <ArrowRight size={14} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '1rem',
            }}
          >
            {SYLLABUS_LESSONS.slice(0, 6).map((lesson) => {
              const isDone = progress.completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  className="editorial-card"
                  style={{
                    padding: '1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onClick={() => onNavigate('lesson-detail', lesson.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                      Lesson {lesson.order} • {lesson.category}
                    </span>
                    {isDone && <CheckCircle2 size={16} color="#16a34a" />}
                  </div>

                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    {lesson.title}
                  </h4>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, flex: 1, marginBottom: '0.75rem' }}>
                    {lesson.definition.slice(0, 105)}...
                  </p>

                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    Read Concept & Practice <ChevronRight size={13} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={() => onNavigate('lessons')}
              className="btn btn-secondary"
            >
              View Full 13-Lesson Syllabus <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* Section 3: Essential Exam Audit Checkpoints */}
        <section
          className="editorial-card"
          style={{
            padding: '2rem',
            background: '#ffffff',
            border: '1px solid var(--border-medium)',
            marginBottom: '3.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <BookmarkCheck size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Critical Lab Audit Checkpoints</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Key exam nuances discovered during our comprehensive audit of <code>DBMS_Lab_Solutions.pdf</code> that frequently trick students during practical exams:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <div style={{ padding: '1rem', background: 'var(--bg-card-subtle)', borderRadius: '6px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                1. DATEDIFF Trap (CS1-Q5)
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                In SQL Server, DATEDIFF only checks boundary years crossed, not 365 elapsed days. Use <code>DATEADD(year, -1, GETDATE())</code> for real tenure.
              </p>
            </div>

            <div style={{ padding: '1rem', background: 'var(--bg-card-subtle)', borderRadius: '6px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                2. WHERE vs HAVING (CS2-Q6)
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                WHERE filters rows before aggregation; HAVING filters groups after aggregation. Know when to use each for maximum loan queries.
              </p>
            </div>

            <div style={{ padding: '1rem', background: 'var(--bg-card-subtle)', borderRadius: '6px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                3. Empty Set Realities (CS1-Q1, CS3-Q8)
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Queries for Paris employees or authors starting with 'T' legitimately produce 0 rows on the sample data. Do not alter queries in fear.
              </p>
            </div>

            <div style={{ padding: '1rem', background: 'var(--bg-card-subtle)', borderRadius: '6px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                4. Set Difference & NULLs (CS4-Q5)
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                A subquery inside <code>NOT IN</code> that returns a NULL causes the entire condition to return zero rows. Always filter NULLs.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Personal Encouraging Wish From G9 */}
        <section
          style={{
            background: 'linear-gradient(135deg, #fdfdfc 0%, #f7f6f2 100%)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '2.5rem 2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              fontSize: '8rem',
              fontWeight: 900,
              color: 'rgba(29, 78, 216, 0.04)',
              userSelect: 'none',
              fontFamily: 'var(--font-mono)',
            }}
          >
            G9
          </div>

          <div style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'var(--accent-light)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '3px',
                }}
              >
                A Personal Message From G9
              </span>
              <Heart size={15} color="#dc2626" fill="#dc2626" />
            </div>

            <h3
              style={{
                fontSize: '1.75rem',
                fontWeight: 900,
                color: 'var(--text-main)',
                letterSpacing: '-0.02em',
                marginBottom: '0.85rem',
              }}
            >
              ALL THE BEST!
            </h3>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-main)',
                lineHeight: 1.65,
                fontWeight: 500,
                fontStyle: 'italic',
                marginBottom: '1rem',
              }}
            >
              “From G9 — Don't just memorise queries. Understand them, practise them, and trust your preparation. One question at a time. You've got this.”
            </p>

            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              — G9
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
