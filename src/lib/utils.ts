import { EXERCISES } from '../data/exercises';
import type { Phase, WorkoutSession } from '../types';

export function formatDate(ds: string): string {
  const d = new Date(ds + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yest = new Date(today);
  yest.setDate(yest.getDate() - 1);
  if (d.getTime() === today.getTime()) return 'Heute';
  if (d.getTime() === yest.getTime()) return 'Gestern';
  return d.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 10) return 'Guten Morgen';
  if (h < 14) return 'Hallo';
  if (h < 18) return 'Hey';
  return 'Guten Abend';
}

export interface WeekDay {
  label: string;
  done: boolean;
  isToday: boolean;
  future: boolean;
}

export function getWeekDays(history: WorkoutSession[]): WeekDay[] {
  const today = new Date();
  const todayIdx = (today.getDay() + 6) % 7;
  return ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((label, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - todayIdx + i);
    const ds = d.toISOString().split('T')[0];
    const done = history.some((h) => h.date === ds && h.completed);
    return { label, done, isToday: i === todayIdx, future: i > todayIdx };
  });
}

export function getCurrentStreak(history: WorkoutSession[]): number {
  if (!history.length) return 0;
  const today = new Date().toISOString().split('T')[0];
  const check = new Date();
  let streak = 0;
  if (!history.some((e) => e.date === today && e.completed)) check.setDate(check.getDate() - 1);
  for (let i = 0; i < 365; i++) {
    const ds = check.toISOString().split('T')[0];
    if (history.some((e) => e.date === ds && e.completed)) {
      streak++;
      check.setDate(check.getDate() - 1);
    } else break;
  }
  return streak;
}

export function getThisWeekCount(history: WorkoutSession[]): number {
  const today = new Date();
  const mon = new Date(today);
  mon.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  mon.setHours(0, 0, 0, 0);
  return history.filter((h) => new Date(h.date + 'T00:00:00') >= mon && h.completed).length;
}

export function getTotalMinutes(history: WorkoutSession[]): number {
  return history.reduce((s, h) => s + (h.duration || 0), 0);
}

export function formatTotalMinutes(totalMins: number): string {
  return totalMins >= 60 ? `${Math.floor(totalMins / 60)}h ${totalMins % 60}m` : `${totalMins}min`;
}

export const PHASE_LABELS: Record<Phase, string> = {
  warmup: 'Warm-up',
  kraft: 'Kraftblock',
  core: 'Core',
  cooldown: 'Cooldown',
};

export const PHASE_COLORS: Record<Phase, string> = {
  warmup: '#e8a32f',
  kraft: '#d93b2f',
  core: '#7c3aed',
  cooldown: '#2fb87e',
};

export function getPhaseLabel(p?: Phase): string {
  return p ? PHASE_LABELS[p] : '';
}

export function getPhaseColor(p?: Phase): string {
  return p ? PHASE_COLORS[p] : '#d93b2f';
}

export interface AreaScores {
  kraft: number;
  core: number;
  ausdauer: number;
  mobility: number;
}

export function getAreaScores(history: WorkoutSession[]): AreaScores {
  const exCounts = history
    .flatMap((h) => h.exercises || [])
    .reduce<Record<string, number>>((acc, ex) => {
      const found = EXERCISES.find((e) => e.id === ex.id);
      if (found) acc[found.phase] = (acc[found.phase] || 0) + 1;
      return acc;
    }, {});

  const totalMins = getTotalMinutes(history);

  return {
    kraft: Math.min(100, (exCounts.kraft || 0) * 5),
    core: Math.min(100, (exCounts.core || 0) * 7),
    ausdauer: Math.min(100, Math.floor(totalMins / 2)),
    mobility: Math.min(100, (exCounts.cooldown || 0) * 10),
  };
}
