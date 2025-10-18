import { UserSession } from '@/types';

const SESSION_KEY = 'youtube_seo_session';

export function getUserSession(): UserSession {
  if (typeof window === 'undefined') {
    return {
      userId: 'anonymous',
      topicsGeneratedToday: 0,
      lastGenerationDate: new Date().toISOString().split('T')[0] || '',
    };
  }

  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) {
    const newSession: UserSession = {
      userId: `user_${Date.now()}`,
      topicsGeneratedToday: 0,
      lastGenerationDate: new Date().toISOString().split('T')[0] || '',
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    return newSession;
  }

  const session: UserSession = JSON.parse(stored);
  const today = new Date().toISOString().split('T')[0] || '';

  // Reset count if it's a new day
  if (session.lastGenerationDate !== today) {
    session.topicsGeneratedToday = 0;
    session.lastGenerationDate = today;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return session;
}

export function incrementGenerationCount(): void {
  if (typeof window === 'undefined') return;

  const session = getUserSession();
  session.topicsGeneratedToday += 1;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function canGenerateMore(freeLimit: number): boolean {
  const session = getUserSession();
  return session.topicsGeneratedToday < freeLimit;
}