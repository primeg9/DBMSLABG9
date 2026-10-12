import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Sparkles,
  Info,
  Database,
} from 'lucide-react';
import { getQuestionById, getNextQuestion, getPreviousQuestion, ALL_QUESTIONS } from '../data/questions';
import { CASE_STUDIES } from '../data/caseStudies';
import { SqlCodeBlock } from '../components/SqlCodeBlock';
import { ResultTable } from '../components/ResultTable';
import { InteractiveSqlRunner } from '../components/InteractiveSqlRunner';
import { getStoredProgress, toggleQuestionCompletion, toggleQuestionBookmark, setRecentVisited } from '../lib/storage';
import { ActivePage } from '../components/Navbar';

interface QuestionDetailPageProps {
  questionId: string;
  onNavigate: (page: ActivePage, itemId?: string) => void;
}

export const QuestionDetailPage: React.FC<QuestionDetailPageProps> = ({ questionId, onNavigate }) => {
  const question = getQuestionById(questionId) || ALL_QUESTIONS[0];
  const caseStudy = CASE_STUDIES.find((cs) => cs.id === question.caseStudyId);

  const [progress, setProgress] = useState(getStoredProgress());
  const [explainOpen, setExplainOpen] = useState<boolean>(true);

  useEffect(() => {
    setRecentVisited('question', question.id);
    setProgress(getStoredProgress());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [question.id]);

  const isCompleted = progress.completedQuestions.includes(question.id);
  const isBookmarked = progress.bookmarkedQuestions.includes(question.id);

  const handleToggleCompleted = () => {
    toggleQuestionCompletion(question.id);
    setProgress(getStoredProgress());
  };

  const handleToggleBookmark = () => {
    toggleQuestionBookmark(question.id);
    setProgress(getStoredProgress());
  };

  const nextQ = getNextQuestion(question.id);
  const prevQ = getPreviousQuestion(question.id);

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 4rem', maxWidth: '960px' }}>
      {/* Top Nav Controls */}
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
          onClick={() => onNavigate('questions', question.caseStudyId)}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <ArrowLeft size={14} />
          Back to Case Study {caseStudy?.number}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handleToggleBookmark}
            className="btn btn-secondary btn-sm"
            style={{
              color: isBookmarked ? 'var(--accent-primary)' : 'var(--text-subtle)',
              borderColor: isBookmarked ? 'var(--accent-border)' : 'var(--border-light)',
            }}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark for revision'}
          >
            <Bookmark size={15} fill={isBookmarked ? 'var(--accent-primary)' : 'none'} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleToggleCompleted}
            className={`btn btn-sm ${isCompleted ? 'badge-success' : 'btn-secondary'}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.85rem' }}
          >
            <CheckCircle2 size={16} color={isCompleted ? '#16a34a' : 'var(--text-subtle)'} />
            <span>{isCompleted ? 'Solved & Verified' : 'Mark as Solved'}</span>
          </button>
        </div>
      </div>

      {/* Main Question Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="badge badge-neutral" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            CASE STUDY {caseStudy?.number}: {caseStudy?.databaseName}
          </span>
          <span className="badge badge-blue">
            QUESTION {question.number} OF 10
          </span>
          {question.conceptTags.map((tag) => (
            <span key={tag} className="badge badge-neutral" style={{ fontSize: '0.74rem' }}>
              {tag}
            </span>
          ))}
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            lineHeight: 1.3,
            marginBottom: '0.75rem',
          }}
        >
          {question.originalQuestion}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Database size={14} color="var(--accent-primary)" />
            <span>Tables Referenced: <strong>{question.tablesUsed.join(', ')}</strong></span>
          </div>
        </div>
      </div>

      {/* Ambiguity or Audit Note Alert if applicable */}
      {question.ambiguityNote && (
        <div
          className="editorial-card"
          style={{
            padding: '1rem',
            borderLeft: '4px solid #3b82f6',
            background: '#f8fafc',
            marginBottom: '1.5rem',
            fontSize: '0.86rem',
            color: '#1e3a8a',
            lineHeight: 1.55,
          }}
        >
          <strong>Audit & Source Verification Note:</strong> {question.ambiguityNote}
        </div>
      )}

      {/* Verified SQL Solution */}
      <section style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Verified SQL Solution
          </h3>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>
            ANSI / Dialect-Aware
          </span>
        </div>

        <SqlCodeBlock
          sql={question.solutionSql}
          alternatives={question.alternativeSql}
          title={`Q${question.number} Solution Query`}
          isExecutable={true}
        />
      </section>

      {/* Expandable Explanation Breakdown */}
      <section
        className="editorial-card"
        style={{
          background: '#ffffff',
          marginBottom: '2rem',
          overflow: 'hidden',
        }}
      >
        <div
          onClick={() => setExplainOpen(!explainOpen)}
          style={{
            padding: '0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            background: 'var(--bg-card-subtle)',
            borderBottom: explainOpen ? '1px solid var(--border-light)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={16} color="var(--accent-primary)" />
            <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              Explain This Query (Step-by-Step Logic)
            </h4>
          </div>
          {explainOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {explainOpen && (
          <div style={{ padding: '1.25rem' }}>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              {question.explanationSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </section>

      {/* Expected Output Table */}
      <section style={{ marginBottom: '2rem' }}>
        <ResultTable
          output={question.expectedOutput}
          title={`Expected Output (Derived from ${question.tablesUsed.join(', ')})`}
        />
      </section>

      {/* Exam Tip or Pitfall */}
      <section
        className="editorial-card"
        style={{
          padding: '1.25rem',
          marginBottom: '2rem',
          borderLeft: '4px solid #f59e0b',
          background: '#fffdf7',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <Sparkles size={17} color="#d97706" />
          <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#b45309', margin: 0 }}>
            Practical Exam Tip & Examiner Insight
          </h4>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#78350f', lineHeight: 1.6, margin: 0 }}>
          {question.examTip}
        </p>
      </section>

      {/* Live In-Browser SQL Execution Runner */}
      <section style={{ marginBottom: '2.5rem' }}>
        <InteractiveSqlRunner
          initialSql={question.solutionSql}
          onExecutionSuccess={() => {
            // Can celebrate or offer completion
          }}
        />
      </section>

      {/* Bottom Navigation Between Questions */}
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
          {prevQ ? (
            <button
              onClick={() => onNavigate('question-detail', prevQ.id)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <ArrowLeft size={14} />
              Previous: Q{prevQ.number} ({prevQ.caseStudyId.toUpperCase()})
            </button>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>First Question</span>
          )}
        </div>

        <div>
          {nextQ ? (
            <button
              onClick={() => onNavigate('question-detail', nextQ.id)}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <span>Next: Q{nextQ.number} ({nextQ.caseStudyId.toUpperCase()})</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('revision')}
              className="btn btn-primary"
            >
              Go to Final Revision <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
