import type { Profile, WorkoutSession } from '../types';

const PROFILE_KEY = 'fp_profile';
const HISTORY_KEY = 'fp_history';

export function loadProfile(): Profile | null {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null');
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // localStorage unavailable, ignore
  }
}

export function loadHistory(): WorkoutSession[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveHistory(history: WorkoutSession[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // localStorage unavailable, ignore
  }
}

export function clearAll(): void {
  try {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // localStorage unavailable, ignore
  }
}
