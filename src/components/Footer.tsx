import React, { useState } from 'react';
import { Heart, RotateCcw, BookOpen, HelpCircle, Database, BookmarkCheck } from 'lucide-react';
import { resetAllProgress } from '../lib/storage';
import { ActivePage } from './Navbar';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    resetAllProgress();
    setShowConfirm(false);
  };

  return (
    <footer className="app-footer">
      <div className="container">
        {/* Distinctive Personal Message from G9 */}
        <section
          style={{
            background: 'linear-gradient(135deg, #fdfdfc 0%, #f7f6f2 100%)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem 1.75rem',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-15px',
              right: '-10px',
              fontSize: '6rem',
              fontWeight: 900,
              color: 'rgba(29, 78, 216, 0.03)',
              userSelect: 'none',
              fontFamily: 'var(--font-mono)',
            }}
          >
            G9
          </div>

          <div style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'var(--accent-light)',
                  color: 'var(--accent-primary)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '3px',
                }}
              >
                A Personal Note From The Creator
              </span>
              <Heart size={14} color="#dc2626" fill="#dc2626" />
            </div>

            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                letterSpacing: '-0.02em',
                marginBottom: '0.6rem',
              }}
            >
              ALL THE BEST!
            </h3>

            <p
              style={{
                fontSize: '0.98rem',
                color: 'var(--text-main)',
                lineHeight: 1.65,
                fontWeight: 500,
                fontStyle: 'italic',
                marginBottom: '0.85rem',
              }}
            >
              “From G9 — Don't just memorise queries. Understand them, practise them, and trust your preparation. One question at a time. You've got this.”
            </p>

            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
              — G9
            </div>
          </div>
        </section>

        {/* Footer Navigation Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          {/* Col 1: Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="brand-mark">G9</span>
              <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>DBMSLABG9</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              A dedicated, distraction-free SQL workspace built for college students preparing for database laboratory practical exams.
            </p>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
              Ref: Course Code SEPBCAP1.7 | Unit V Syllabus
            </div>
          </div>

          {/* Col 2: Learning Sections */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
              Learning & Lab
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem' }}>
              <li>
                <button
                  onClick={() => onNavigate('lessons')}
                  style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <BookOpen size={13} />
                  Unit V SQL Concepts (13 Lessons)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('questions')}
                  style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <HelpCircle size={13} />
                  All 40 Lab Questions (4 Case Studies)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('practice')}
                  style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  Distraction-Free Practice Mode
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explorer')}
                  style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Database size={13} />
                  Database Schema Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('revision')}
                  style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <BookmarkCheck size={13} />
                  Quick Exam Revision Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Case Studies Direct Links */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
              Case Studies
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              <li>Case Study 1: Employee & Salary (Q1–Q10)</li>
              <li>Case Study 2: Bank System (Q1–Q10)</li>
              <li>Case Study 3: Library Catalog (Q1–Q10)</li>
              <li>Case Study 4: Subject Registers (Q1–Q10)</li>
            </ul>
          </div>

          {/* Col 4: Progress Controls */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
              Data & Storage
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
              Progress is stored privately in your browser's localStorage. No cookies, trackers, or accounts needed.
            </p>
            <button
              onClick={() => setShowConfirm(true)}
              className="btn btn-secondary btn-sm"
              style={{ color: '#b91c1c' }}
            >
              <RotateCcw size={12} />
              Reset My Progress
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.5rem',
            fontSize: '0.78rem',
            color: 'var(--text-subtle)',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} DBMSLABG9. Built with precision for college database engineering students.
          </div>
          <div>
            Learn it. Query it. Own your practical.
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div className="editorial-card" style={{ maxWidth: '400px', width: '100%', padding: '1.5rem', background: '#fff' }}>
            <h4 style={{ color: '#991b1b', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
              Confirm Reset
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Are you sure you want to clear your study progress and checked questions?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setShowConfirm(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleReset} className="btn btn-sm" style={{ background: '#b91c1c', color: '#fff' }}>
                Reset Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
