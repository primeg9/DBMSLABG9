import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  HelpCircle,
  PlayCircle,
  Database,
  BookmarkCheck,
  Search,
  Menu,
  X,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { getStoredProgress, resetAllProgress } from '../lib/storage';
import { ALL_QUESTIONS } from '../data/questions';
import { SYLLABUS_LESSONS } from '../data/lessons';

export type ActivePage =
  | 'home'
  | 'lessons'
  | 'lesson-detail'
  | 'questions'
  | 'question-detail'
  | 'practice'
  | 'explorer'
  | 'revision'
  | 'search';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, itemId?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(getStoredProgress());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setProgress(getStoredProgress());
    };
    window.addEventListener('dbmslabg9_progress_updated', handleUpdate);
    return () => window.removeEventListener('dbmslabg9_progress_updated', handleUpdate);
  }, []);

  const totalQuestions = ALL_QUESTIONS.length;
  const completedQuestionsCount = progress.completedQuestions.length;
  const totalLessons = SYLLABUS_LESSONS.length;
  const completedLessonsCount = progress.completedLessons.length;

  const handleNavClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleConfirmReset = () => {
    resetAllProgress();
    setShowResetConfirm(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="app-header">
        <div className="container header-inner">
          {/* Brand */}
          <div
            className="brand-badge"
            onClick={() => handleNavClick('home')}
            title="DBMSLABG9 — Home"
          >
            <span className="brand-mark">G9</span>
            <div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
                DBMSLABG9
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  color: 'var(--text-subtle)',
                  marginTop: '-3px',
                }}
              >
                Understand the Query. Own the Practical.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-links" style={{ display: 'none' }} id="desktop-nav">
            <button
              onClick={() => handleNavClick('lessons')}
              className={`nav-item ${activePage === 'lessons' || activePage === 'lesson-detail' ? 'active' : ''}`}
            >
              <BookOpen size={15} />
              <span>Learn SQL</span>
            </button>

            <button
              onClick={() => handleNavClick('questions')}
              className={`nav-item ${activePage === 'questions' || activePage === 'question-detail' ? 'active' : ''}`}
            >
              <HelpCircle size={15} />
              <span>Lab Questions</span>
            </button>

            <button
              onClick={() => handleNavClick('practice')}
              className={`nav-item ${activePage === 'practice' ? 'active' : ''}`}
            >
              <PlayCircle size={15} />
              <span>Practice</span>
            </button>

            <button
              onClick={() => handleNavClick('explorer')}
              className={`nav-item ${activePage === 'explorer' ? 'active' : ''}`}
            >
              <Database size={15} />
              <span>Explorer</span>
            </button>

            <button
              onClick={() => handleNavClick('revision')}
              className={`nav-item ${activePage === 'revision' ? 'active' : ''}`}
            >
              <BookmarkCheck size={15} />
              <span>Revision</span>
            </button>
          </nav>

          {/* Actions & Progress Summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="btn btn-secondary btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--text-muted)',
              }}
              title="Search Questions & Concepts (Ctrl+K)"
            >
              <Search size={14} />
              <span style={{ fontSize: '0.8rem', display: 'none' }} className="search-label">
                Search
              </span>
            </button>

            {/* Questions Progress Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.6rem',
                background: 'var(--bg-card-subtle)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-main)',
              }}
              title={`${completedQuestionsCount} of ${totalQuestions} Lab Questions Completed`}
            >
              <Sparkles size={13} color="var(--accent-primary)" />
              <span>
                {completedQuestionsCount}/{totalQuestions}
              </span>
              <span style={{ color: 'var(--text-subtle)', fontSize: '0.72rem' }}>Q</span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-secondary btn-sm mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Responsive CSS helper */}
        <style>{`
          @media (min-width: 860px) {
            #desktop-nav { display: flex !important; }
            .mobile-toggle { display: none !important; }
            .search-label { display: inline !important; }
          }
        `}</style>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(249, 248, 246, 0.98)',
            backdropFilter: 'blur(10px)',
            zIndex: 45,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              padding: '0.85rem',
              background: '#ffffff',
              borderRadius: '6px',
              border: '1px solid var(--border-light)',
              marginBottom: '0.5rem',
            }}
          >
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              Your Study Progress
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 600 }}>
              <span>Lab Questions:</span>
              <span style={{ color: 'var(--accent-primary)' }}>
                {completedQuestionsCount} / {totalQuestions}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 600, marginTop: '0.2rem' }}>
              <span>Syllabus Lessons:</span>
              <span style={{ color: 'var(--accent-primary)' }}>
                {completedLessonsCount} / {totalLessons}
              </span>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className={`btn ${activePage === 'home' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            Home Overview
          </button>

          <button
            onClick={() => handleNavClick('lessons')}
            className={`btn ${activePage === 'lessons' || activePage === 'lesson-detail' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <BookOpen size={16} />
            Learn SQL (Unit V Syllabus)
          </button>

          <button
            onClick={() => handleNavClick('questions')}
            className={`btn ${activePage === 'questions' || activePage === 'question-detail' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <HelpCircle size={16} />
            All 40 Lab Questions (4 Case Studies)
          </button>

          <button
            onClick={() => handleNavClick('practice')}
            className={`btn ${activePage === 'practice' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <PlayCircle size={16} />
            Distraction-Free Practice Mode
          </button>

          <button
            onClick={() => handleNavClick('explorer')}
            className={`btn ${activePage === 'explorer' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <Database size={16} />
            Database Schema Explorer
          </button>

          <button
            onClick={() => handleNavClick('revision')}
            className={`btn ${activePage === 'revision' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start' }}
          >
            <BookmarkCheck size={16} />
            Exam Revision & Pitfalls
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
          >
            <Search size={16} />
            Search Topics & Questions
          </button>

          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <button
              onClick={() => setShowResetConfirm(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                color: '#b91c1c',
                padding: '0.5rem 0',
              }}
            >
              <RotateCcw size={14} />
              Reset Study Progress
            </button>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
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
          <div
            className="editorial-card"
            style={{
              maxWidth: '420px',
              width: '100%',
              padding: '1.5rem',
              background: '#ffffff',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', color: '#991b1b', marginBottom: '0.5rem' }}>
              Reset Study Progress?
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              This will clear all your completed question checkboxes, lesson marks, and bookmarks. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="btn btn-sm"
                style={{ background: '#b91c1c', color: '#ffffff' }}
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
