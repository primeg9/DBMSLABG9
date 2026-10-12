import { UserProgress } from '../types';

const PROGRESS_STORAGE_KEY = 'dbmslabg9_user_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  completedQuestions: [],
  completedLessons: [],
  recentQuestionId: 'cs1-q1',
  recentLessonId: 'lesson-sql-intro',
  bookmarkedQuestions: [],
};

export function getStoredProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      completedQuestions: Array.isArray(parsed.completedQuestions) ? parsed.completedQuestions : [],
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      recentQuestionId: parsed.recentQuestionId || 'cs1-q1',
      recentLessonId: parsed.recentLessonId || 'lesson-sql-intro',
      bookmarkedQuestions: Array.isArray(parsed.bookmarkedQuestions) ? parsed.bookmarkedQuestions : [],
    };
  } catch (err) {
    console.warn('Failed to parse localStorage progress:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event('dbmslabg9_progress_updated'));
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

export function toggleQuestionCompletion(questionId: string): boolean {
  const current = getStoredProgress();
  const isCompleted = current.completedQuestions.includes(questionId);
  const updated = isCompleted
    ? current.completedQuestions.filter((id) => id !== questionId)
    : [...current.completedQuestions, questionId];

  saveProgress({
    ...current,
    completedQuestions: updated,
    recentQuestionId: questionId,
  });
  return !isCompleted;
}

export function toggleLessonCompletion(lessonId: string): boolean {
  const current = getStoredProgress();
  const isCompleted = current.completedLessons.includes(lessonId);
  const updated = isCompleted
    ? current.completedLessons.filter((id) => id !== lessonId)
    : [...current.completedLessons, lessonId];

  saveProgress({
    ...current,
    completedLessons: updated,
    recentLessonId: lessonId,
  });
  return !isCompleted;
}

export function toggleQuestionBookmark(questionId: string): boolean {
  const current = getStoredProgress();
  const isBookmarked = current.bookmarkedQuestions.includes(questionId);
  const updated = isBookmarked
    ? current.bookmarkedQuestions.filter((id) => id !== questionId)
    : [...current.bookmarkedQuestions, questionId];

  saveProgress({
    ...current,
    bookmarkedQuestions: updated,
  });
  return !isBookmarked;
}

export function setRecentVisited(type: 'question' | 'lesson', id: string): void {
  const current = getStoredProgress();
  if (type === 'question') {
    saveProgress({ ...current, recentQuestionId: id });
  } else {
    saveProgress({ ...current, recentLessonId: id });
  }
}

export function resetAllProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
    window.dispatchEvent(new Event('dbmslabg9_progress_updated'));
  } catch (err) {
    console.error('Failed to reset progress:', err);
  }
}
