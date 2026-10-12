import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  Bookmark,
  Layers,
} from 'lucide-react';
import { ALL_QUESTIONS } from '../data/questions';
import { CASE_STUDIES } from '../data/caseStudies';
import { getStoredProgress, toggleQuestionCompletion } from '../lib/storage';
import { ActivePage } from '../components/Navbar';
import { CaseStudyId } from '../types';

interface QuestionsPageProps {
  initialCaseStudy?: CaseStudyId;
  onNavigate: (page: ActivePage, itemId?: string) => void;
}

export const QuestionsPage: React.FC<QuestionsPageProps> = ({ initialCaseStudy, onNavigate }) => {
  const [selectedCs, setSelectedCs] = useState<string>(initialCaseStudy || 'all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [progress, setProgress] = useState(getStoredProgress());

  const handleToggleDone = (e: React.MouseEvent, qId: string) => {
    e.stopPropagation();
    toggleQuestionCompletion(qId);
    setProgress(getStoredProgress());
  };

  const filteredQuestions = ALL_QUESTIONS.filter((q) => {
    const matchesCs = selectedCs === 'all' || q.caseStudyId === selectedCs;
    const isCompleted = progress.completedQuestions.includes(q.id);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && isCompleted) ||
      (statusFilter === 'pending' && !isCompleted);

    const cleanSearch = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !cleanSearch ||
      q.number.toString() === cleanSearch ||
      `q${q.number}` === cleanSearch ||
      q.originalQuestion.toLowerCase().includes(cleanSearch) ||
      q.solutionSql.toLowerCase().includes(cleanSearch) ||
      q.conceptTags.some((tag) => tag.toLowerCase().includes(cleanSearch)) ||
      q.tablesUsed.some((tbl) => tbl.toLowerCase().includes(cleanSearch));

    return matchesCs && matchesStatus && matchesSearch;
  });

  const totalDone = ALL_QUESTIONS.filter((q) => progress.completedQuestions.includes(q.id)).length;

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 4rem' }}>
      {/* Page Header */}
      <div style={{ maxWidth: '820px', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-blue">Lab Question Bank</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
            Course Code SEPBCAP1.7
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
          All 40 Lab Practical Questions
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Individually audited, verified, and mapped to the 4 laboratory case studies. Each question includes verified SQL solutions, cross-database dialect notes, step-by-step logic, and expected output tables.
        </p>

        {/* Real Progress Bar */}
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
              Practical Completion: {totalDone} of 40 Questions Solved
            </span>
          </div>

          <div style={{ width: '180px', height: '6px', background: 'var(--bg-card-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${(totalDone / 40) * 100}%`,
                background: 'var(--accent-primary)',
                borderRadius: '3px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Case Study Selection Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1rem',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <button
          onClick={() => setSelectedCs('all')}
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
          All 40 Questions
        </button>

        {CASE_STUDIES.map((cs) => {
          const isSelected = selectedCs === cs.id;
          const countInCs = ALL_QUESTIONS.filter((q) => q.caseStudyId === cs.id).length;

          return (
            <button
              key={cs.id}
              onClick={() => setSelectedCs(cs.id)}
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
              Case Study {cs.number}: {cs.databaseName} ({countInCs})
            </button>
          );
        })}
      </div>

      {/* Search and Status Filter Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}
      >
        {/* Search input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.4rem 0.75rem',
            gap: '0.5rem',
            flex: 1,
            minWidth: '240px',
            maxWidth: '420px',
          }}
        >
          <Search size={15} color="var(--text-subtle)" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions by text, tag, or table..."
            style={{
              border: 'none',
              outline: 'none',
              fontSize: '0.86rem',
              width: '100%',
              background: 'transparent',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        {/* Completion status toggle pills */}
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {(['all', 'completed', 'pending'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`badge ${statusFilter === status ? 'badge-blue' : 'badge-neutral'}`}
              style={{ textTransform: 'capitalize', cursor: 'pointer', padding: '0.35rem 0.65rem' }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Question Cards List */}
      {filteredQuestions.length === 0 ? (
        <div
          className="editorial-card"
          style={{
            padding: '3rem 1.5rem',
            textAlign: 'center',
            background: '#ffffff',
          }}
        >
          <HelpCircle size={32} color="var(--text-subtle)" style={{ margin: '0 auto 0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            No questions match your current filters
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Try resetting your search query or switching to "All Questions".
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filteredQuestions.map((q) => {
            const isCompleted = progress.completedQuestions.includes(q.id);
            const csInfo = CASE_STUDIES.find((cs) => cs.id === q.caseStudyId);

            return (
              <div
                key={q.id}
                className="editorial-card"
                style={{
                  padding: '1.25rem 1.5rem',
                  cursor: 'pointer',
                  borderLeft: isCompleted ? '4px solid #16a34a' : '1px solid var(--border-light)',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => onNavigate('question-detail', q.id)}
              >
                <div style={{ flex: 1 }}>
                  {/* Top tags */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-neutral" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      {csInfo?.databaseName} • Q{q.number}
                    </span>

                    {q.conceptTags.map((tag) => (
                      <span key={tag} className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                        {tag}
                      </span>
                    ))}

                    <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginLeft: '0.25rem' }}>
                      Tables: {q.tablesUsed.join(', ')}
                    </span>
                  </div>

                  {/* Question Text */}
                  <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem', lineHeight: 1.45 }}>
                    {q.originalQuestion}
                  </h3>

                  {/* Query preview */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      background: 'var(--bg-card-subtle)',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
                      display: 'inline-block',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {q.solutionSql.split('\n')[0]}
                  </div>
                </div>

                {/* Right Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                  <button
                    onClick={(e) => handleToggleDone(e, q.id)}
                    className="btn btn-secondary btn-sm"
                    style={{
                      color: isCompleted ? '#16a34a' : 'var(--text-muted)',
                      borderColor: isCompleted ? '#bbf7d0' : 'var(--border-light)',
                      background: isCompleted ? '#f0fdf4' : 'transparent',
                    }}
                    title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                  >
                    <CheckCircle2 size={15} />
                    <span>{isCompleted ? 'Solved' : 'Mark Done'}</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--accent-primary)', fontSize: '0.82rem', fontWeight: 600 }}>
                    <span>Solve & Verify</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
