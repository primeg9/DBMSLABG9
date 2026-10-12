import React, { useState, useEffect, useRef } from 'react';
import { Search, X, HelpCircle, BookOpen, Database, ArrowRight } from 'lucide-react';
import { ALL_QUESTIONS } from '../data/questions';
import { SYLLABUS_LESSONS } from '../data/lessons';
import { ALL_SCHEMAS } from '../data/datasets/schemas';
import { ActivePage } from './Navbar';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: ActivePage, itemId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'questions' | 'lessons' | 'tables'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via custom event or prop
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  // Search results calculation
  const matchedQuestions = cleanQ
    ? ALL_QUESTIONS.filter((q) => {
        return (
          q.number.toString() === cleanQ ||
          `q${q.number}` === cleanQ ||
          q.id.toLowerCase().includes(cleanQ) ||
          q.originalQuestion.toLowerCase().includes(cleanQ) ||
          q.solutionSql.toLowerCase().includes(cleanQ) ||
          q.conceptTags.some((tag) => tag.toLowerCase().includes(cleanQ)) ||
          q.tablesUsed.some((tbl) => tbl.toLowerCase().includes(cleanQ))
        );
      })
    : [];

  const matchedLessons = cleanQ
    ? SYLLABUS_LESSONS.filter((l) => {
        return (
          l.title.toLowerCase().includes(cleanQ) ||
          l.definition.toLowerCase().includes(cleanQ) ||
          l.category.toLowerCase().includes(cleanQ) ||
          l.syntax.toLowerCase().includes(cleanQ) ||
          l.sqlExample.toLowerCase().includes(cleanQ)
        );
      })
    : [];

  const matchedTables = cleanQ
    ? ALL_SCHEMAS.filter((t) => {
        return (
          t.name.toLowerCase().includes(cleanQ) ||
          t.description.toLowerCase().includes(cleanQ) ||
          t.columns.some((c) => c.name.toLowerCase().includes(cleanQ))
        );
      })
    : [];

  const totalResults =
    (filterType === 'all' || filterType === 'questions' ? matchedQuestions.length : 0) +
    (filterType === 'all' || filterType === 'lessons' ? matchedLessons.length : 0) +
    (filterType === 'all' || filterType === 'tables' ? matchedTables.length : 0);

  const handleSelectQuestion = (id: string) => {
    onNavigate('question-detail', id);
    onClose();
  };

  const handleSelectLesson = (id: string) => {
    onNavigate('lesson-detail', id);
    onClose();
  };

  const handleSelectTable = () => {
    onNavigate('explorer');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '3rem 1rem 1rem',
      }}
      onClick={onClose}
    >
      <div
        className="editorial-card"
        style={{
          maxWidth: '680px',
          width: '100%',
          background: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.85rem 1.25rem',
            borderBottom: '1px solid var(--border-light)',
            gap: '0.75rem',
          }}
        >
          <Search size={18} color="var(--accent-primary)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 40 questions, SQL keywords (HAVING, UNION, LIKE), or Unit V lessons..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-main)',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: 'var(--text-subtle)' }}>
              <X size={16} />
            </button>
          )}
          <span
            style={{
              fontSize: '0.72rem',
              background: 'var(--bg-card-subtle)',
              padding: '0.15rem 0.4rem',
              borderRadius: '4px',
              border: '1px solid var(--border-light)',
              color: 'var(--text-muted)',
            }}
          >
            ESC
          </span>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            padding: '0.6rem 1.25rem',
            background: 'var(--bg-card-subtle)',
            borderBottom: '1px solid var(--border-light)',
            fontSize: '0.78rem',
          }}
        >
          <button
            onClick={() => setFilterType('all')}
            className={`badge ${filterType === 'all' ? 'badge-blue' : 'badge-neutral'}`}
          >
            All Results
          </button>
          <button
            onClick={() => setFilterType('questions')}
            className={`badge ${filterType === 'questions' ? 'badge-blue' : 'badge-neutral'}`}
          >
            Lab Questions ({matchedQuestions.length})
          </button>
          <button
            onClick={() => setFilterType('lessons')}
            className={`badge ${filterType === 'lessons' ? 'badge-blue' : 'badge-neutral'}`}
          >
            Syllabus Lessons ({matchedLessons.length})
          </button>
          <button
            onClick={() => setFilterType('tables')}
            className={`badge ${filterType === 'tables' ? 'badge-blue' : 'badge-neutral'}`}
          >
            Tables ({matchedTables.length})
          </button>
        </div>

        {/* Search Results List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '0.75rem 1.25rem' }}>
          {!cleanQ ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-subtle)' }}>
              <p style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                Type a question number (e.g. <strong>Q5</strong>), case study, or SQL concept (e.g. <strong>HAVING</strong>, <strong>JOIN</strong>, <strong>VAT</strong>, <strong>UNION</strong>).
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
                {['Q6', 'HAVING vs WHERE', 'UNION ALL', 'DATEADD', 'VAT 4%', 'INTERSECT', 'LIKE'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="badge badge-neutral"
                    style={{ cursor: 'pointer' }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                No matches found for "{query}"
              </p>
              <p style={{ fontSize: '0.82rem' }}>
                Try searching by case study (Employee, Bank, Library, Subject) or standard SQL clauses.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {/* Questions Section */}
              {(filterType === 'all' || filterType === 'questions') && matchedQuestions.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--text-subtle)',
                      textTransform: 'uppercase',
                      marginBottom: '0.4rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Lab Questions ({matchedQuestions.length})
                  </div>
                  {matchedQuestions.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => handleSelectQuestion(q.id)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '6px',
                        background: '#ffffff',
                        border: '1px solid var(--border-light)',
                        cursor: 'pointer',
                        marginBottom: '0.4rem',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-border)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-accent-tint)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-light)';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span className="badge badge-blue">
                          {q.caseStudyId.toUpperCase()} • Q{q.number}
                        </span>
                        <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-main)' }}>
                          {q.originalQuestion}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {q.solutionSql.slice(0, 90)}...
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Lessons Section */}
              {(filterType === 'all' || filterType === 'lessons') && matchedLessons.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--text-subtle)',
                      textTransform: 'uppercase',
                      marginBottom: '0.4rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Syllabus Lessons ({matchedLessons.length})
                  </div>
                  {matchedLessons.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => handleSelectLesson(l.id)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '6px',
                        background: '#ffffff',
                        border: '1px solid var(--border-light)',
                        cursor: 'pointer',
                        marginBottom: '0.4rem',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-border)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-accent-tint)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-light)';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <BookOpen size={14} color="var(--accent-primary)" />
                        <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-main)' }}>
                          {l.title}
                        </span>
                        <span className="badge badge-neutral" style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>
                          {l.category}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                        {l.definition.slice(0, 110)}...
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tables Section */}
              {(filterType === 'all' || filterType === 'tables') && matchedTables.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--text-subtle)',
                      textTransform: 'uppercase',
                      marginBottom: '0.4rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Schemas & Tables ({matchedTables.length})
                  </div>
                  {matchedTables.map((t) => (
                    <div
                      key={t.name}
                      onClick={handleSelectTable}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '6px',
                        background: '#ffffff',
                        border: '1px solid var(--border-light)',
                        cursor: 'pointer',
                        marginBottom: '0.4rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Database size={14} color="var(--accent-primary)" />
                        <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {t.name}
                        </span>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          ({t.columns.length} columns) — {t.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
