import React, { useState, useEffect } from 'react';
import { Navbar, ActivePage } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { LessonsPage } from './pages/LessonsPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { QuestionDetailPage } from './pages/QuestionDetailPage';
import { PracticeModePage } from './pages/PracticeModePage';
import { DatabaseExplorerPage } from './pages/DatabaseExplorerPage';
import { RevisionPage } from './pages/RevisionPage';
import { CaseStudyId } from './types';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [activeItemId, setActiveItemId] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Synchronize hash routing with state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setActivePage('home');
        setActiveItemId(undefined);
        return;
      }

      const parts = hash.split('/');
      const route = parts[0] as ActivePage;
      const param = parts[1];

      if (route === 'lesson-detail' && param) {
        setActivePage('lesson-detail');
        setActiveItemId(param);
      } else if (route === 'question-detail' && param) {
        setActivePage('question-detail');
        setActiveItemId(param);
      } else if (route === 'questions' && param) {
        setActivePage('questions');
        setActiveItemId(param);
      } else if (
        ['home', 'lessons', 'questions', 'practice', 'explorer', 'revision'].includes(route)
      ) {
        setActivePage(route);
        setActiveItemId(param);
      } else {
        setActivePage('home');
        setActiveItemId(undefined);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: ActivePage, itemId?: string) => {
    setActivePage(page);
    setActiveItemId(itemId);

    if (page === 'lesson-detail' && itemId) {
      window.location.hash = `lesson-detail/${itemId}`;
    } else if (page === 'question-detail' && itemId) {
      window.location.hash = `question-detail/${itemId}`;
    } else if (page === 'questions' && itemId) {
      window.location.hash = `questions/${itemId}`;
    } else {
      window.location.hash = page;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}

        {activePage === 'lessons' && <LessonsPage onNavigate={handleNavigate} />}

        {activePage === 'lesson-detail' && activeItemId && (
          <LessonDetailPage lessonId={activeItemId} onNavigate={handleNavigate} />
        )}

        {activePage === 'questions' && (
          <QuestionsPage
            initialCaseStudy={activeItemId as CaseStudyId | undefined}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'question-detail' && activeItemId && (
          <QuestionDetailPage questionId={activeItemId} onNavigate={handleNavigate} />
        )}

        {activePage === 'practice' && <PracticeModePage onNavigate={handleNavigate} />}

        {activePage === 'explorer' && <DatabaseExplorerPage onNavigate={handleNavigate} />}

        {activePage === 'revision' && <RevisionPage onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};
