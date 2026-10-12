import React, { useState } from 'react';
import {
  PlayCircle,
  Lightbulb,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Database,
} from 'lucide-react';
import { ALL_QUESTIONS } from '../data/questions';
import { CASE_STUDIES } from '../data/caseStudies';
import { SYLLABUS_LESSONS } from '../data/lessons';
import { SqlCodeBlock } from '../components/SqlCodeBlock';
import { ResultTable } from '../components/ResultTable';
import { InteractiveSqlRunner } from '../components/InteractiveSqlRunner';
import { getStoredProgress, toggleQuestionCompletion } from '../lib/storage';
import { ActivePage } from '../components/Navbar';
import { LabQuestion, CaseStudyId } from '../types';

interface PracticeModePageProps {
  onNavigate: (page: ActivePage, itemId?: string) => void;
}

export const PracticeModePage: React.FC<PracticeModePageProps> = ({ onNavigate }) => {
  const [selectedCs, setSelectedCs] = useState<CaseStudyId | 'all'>('cs1');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [progress, setProgress] = useState(getStoredProgress());

  const activeQuestions =
    selectedCs === 'all'
      ? ALL_QUESTIONS
      : ALL_QUESTIONS.filter((q) => q.caseStudyId === selectedCs);

  const safeIndex = Math.min(currentIndex, Math.max(0, activeQuestions.length - 1));
  const currentQ: LabQuestion | undefined = activeQuestions[safeIndex];

  const isCompleted = currentQ ? progress.completedQuestions.includes(currentQ.id) : false;

  const handleSelectCaseStudy = (cs: CaseStudyId | 'all') => {
    setSelectedCs(cs);
    setCurrentIndex(0);
    setShowHint(false);
    setShowSolution(false);
  };

  const handleNext = () => {
    if (safeIndex < activeQuestions.length - 1) {
      setCurrentIndex(safeIndex + 1);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const handlePrev = () => {
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const handleToggleCompleted = () => {
    if (!currentQ) return;
    toggleQuestionCompletion(currentQ.id);
    setProgress(getStoredProgress());
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 4rem', maxWidth: '980px' }}>
      {/* Header */}
      <div style={{ maxWidth: '820px', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-blue">Distraction-Free Practice</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
            Exam Simulation
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
          SQL Practice Arena
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Test your query-writing skills under real lab conditions. Read the problem, draft your query in the live editor, inspect results, or reveal hints and verified solutions when you get stuck.
        </p>
      </div>

      {/* Case Study Selection Pills */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <button
          onClick={() => handleSelectCaseStudy('all')}
          style={{
            padding: '0.45rem 0.85rem',
            fontSize: '0.84rem',
            fontWeight: 600,
            borderRadius: 'var(--radius-sm)',
            background: selectedCs === 'all' ? 'var(--accent-primary)' : 'var(--bg-card)',
            color: selectedCs === 'all' ? '#ffffff' : 'var(--text-main)',
            border: `1px solid ${selectedCs === 'all' ? 'var(--accent-primary)' : 'var(--border-light)'}`,
            whiteSpace: 'nowrap',
          }}
        >
          All Questions (40)
        </button>

        {CASE_STUDIES.map((cs) => {
          const isSelected = selectedCs === cs.id;

          return (
            <button
              key={cs.id}
              onClick={() => handleSelectCaseStudy(cs.id)}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.84rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                background: isSelected ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: isSelected ? '#ffffff' : 'var(--text-main)',
                border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-light)'}`,
                whiteSpace: 'nowrap',
              }}
            >
              Case Study {cs.number}: {cs.databaseName}
            </button>
          );
        })}
      </div>

      {/* Practice Workspace */}
      {currentQ && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Question Card */}
          <section
            className="editorial-card"
            style={{
              padding: '1.75rem',
              background: '#ffffff',
              borderLeft: isCompleted ? '4px solid #16a34a' : '4px solid var(--accent-primary)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span className="badge badge-blue">
                  Question {safeIndex + 1} of {activeQuestions.length}
                </span>
                <span className="badge badge-neutral" style={{ fontFamily: 'var(--font-mono)' }}>
                  {currentQ.caseStudyId.toUpperCase()} • Q{currentQ.number}
                </span>
              </div>

              <button
                onClick={handleToggleCompleted}
                className={`btn btn-sm ${isCompleted ? 'badge-success' : 'btn-secondary'}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <CheckCircle2 size={15} color={isCompleted ? '#16a34a' : 'var(--text-subtle)'} />
                <span>{isCompleted ? 'Completed' : 'Mark as Completed'}</span>
              </button>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.85rem', lineHeight: 1.4 }}>
              {currentQ.originalQuestion}
            </h2>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
                Tables:
              </span>
              {currentQ.tablesUsed.map((tbl) => (
                <span key={tbl} className="badge badge-neutral" style={{ fontSize: '0.74rem' }}>
                  {tbl}
                </span>
              ))}

              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 600, marginLeft: '0.5rem' }}>
                Concepts:
              </span>
              {currentQ.conceptTags.map((t) => (
                <span key={t} className="badge badge-neutral" style={{ fontSize: '0.74rem' }}>
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Practice Assistance Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowHint(!showHint)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Lightbulb size={14} color="#d97706" />
              <span>{showHint ? 'Hide Hint' : 'Request Hint'}</span>
            </button>

            <button
              onClick={() => setShowSolution(!showSolution)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              {showSolution ? <EyeOff size={14} /> : <Eye size={14} />}
              <span>{showSolution ? 'Hide Verified Solution' : 'Reveal Solution & Output'}</span>
            </button>
          </div>

          {/* Hint Card */}
          {showHint && (
            <div
              className="editorial-card"
              style={{
                padding: '1.25rem',
                background: '#fffdf7',
                borderLeft: '4px solid #f59e0b',
                color: '#92400e',
                fontSize: '0.88rem',
                lineHeight: 1.6,
              }}
            >
              <strong>Practice Hint:</strong> {currentQ.examTip}
            </div>
          )}

          {/* Revealed Solution & Output */}
          {showSolution && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <SqlCodeBlock
                sql={currentQ.solutionSql}
                alternatives={currentQ.alternativeSql}
                title={`Verified Solution for Q${currentQ.number}`}
                isExecutable={true}
              />

              <ResultTable
                output={currentQ.expectedOutput}
                title={`Expected Output (Derived from ${currentQ.tablesUsed.join(', ')})`}
              />
            </div>
          )}

          {/* Live In-Browser Execution Playground */}
          <section>
            <InteractiveSqlRunner
              initialSql={`-- Write and test your query for Question ${currentQ.number} here:\nSELECT * FROM ${currentQ.tablesUsed[0]};`}
              onExecutionSuccess={handleToggleCompleted}
            />
          </section>

          {/* Navigation Controls */}
          <div
            className="editorial-card"
            style={{
              padding: '1.25rem 1.5rem',
              background: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <button
              onClick={handlePrev}
              disabled={safeIndex === 0}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', opacity: safeIndex === 0 ? 0.5 : 1 }}
            >
              <ArrowLeft size={14} />
              Previous Question
            </button>

            <span style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
              {safeIndex + 1} / {activeQuestions.length}
            </span>

            <button
              onClick={handleNext}
              disabled={safeIndex === activeQuestions.length - 1}
              className="btn btn-primary btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                opacity: safeIndex === activeQuestions.length - 1 ? 0.5 : 1,
              }}
            >
              Next Question
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
