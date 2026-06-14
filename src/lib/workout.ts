import { EXERCISES } from '../data/exercises';
import type { EnergyLevel, Equipment, Exercise, Phase, Profile, Restriction, WorkoutSession } from '../types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateWorkout(
  profile: Profile,
  energy: EnergyLevel,
  time: number,
  isStress: boolean,
  history: WorkoutSession[],
): Exercise[] {
  const restr: Restriction[] = (profile.restrictions || []).filter((r) => r !== 'keine');
  const equip: Equipment[] = (profile.equipment || []).filter((e) => e !== 'keins');

  let avail = EXERCISES.filter((ex) => {
    if (restr.some((r) => ex.restrictions.includes(r))) return false;
    if (ex.equipment.length > 0 && !ex.equipment.some((e) => equip.includes(e))) return false;
    return true;
  });
  if (!avail.length) {
    avail = EXERCISES.filter((e) => e.equipment.length === 0 && e.restrictions.length === 0);
  }

  const lvl = { anfaenger: 0, wiedereinstieg: 1, fortgeschritten: 2 }[profile.level] ?? 0;
  const en = { low: -1, medium: 0, high: 1 }[energy] ?? 0;
  const maxDiff = Math.max(1, Math.min(5, (isStress ? 1 : 2) + lvl + en));
  const recent = new Set(history.slice(-3).flatMap((h) => (h.exercises || []).map((e) => e.id)));

  const pick = (phase: Phase, n: number): Exercise[] => {
    let pool = avail.filter((e) => e.phase === phase && e.difficulty <= maxDiff);
    if (!pool.length) pool = avail.filter((e) => e.phase === phase);
    if (!pool.length) return [];
    const fresh = pool.filter((e) => !recent.has(e.id));
    const base = fresh.length >= Math.min(n, pool.length) ? fresh : pool;
    // Repeat through the pool (reshuffled) if more exercises are needed than it has unique entries.
    const result: Exercise[] = [];
    while (result.length < n) {
      for (const ex of shuffle(base)) {
        if (result.length >= n) break;
        if (result.length > 0 && result[result.length - 1].id === ex.id && base.length > 1) continue;
        result.push(ex);
      }
    }
    return result;
  };

  // Exercise counts per time bracket, calibrated so the realistic total duration
  // (active time per exercise + short rest in between) approximates the selected time.
  let wc: number, kc: number, cc: number, dc: number;
  if (isStress) {
    wc = 1; kc = 0; cc = 5; dc = 2;
  } else if (time <= 10) {
    wc = 1; kc = 4; cc = 3; dc = 1;
  } else if (time <= 15) {
    wc = 2; kc = 6; cc = 4; dc = 1;
  } else if (time <= 20) {
    wc = 2; kc = 8; cc = 5; dc = 2;
  } else if (time <= 30) {
    wc = 3; kc = 11; cc = 7; dc = 3;
  } else {
    wc = 4; kc = 17; cc = 11; dc = 3;
  }

  const result = [...pick('warmup', wc), ...pick('kraft', kc), ...pick('core', cc), ...pick('cooldown', dc)];
  if (result.length < 2) {
    const fallback = EXERCISES.filter((e) => e.equipment.length === 0 && e.restrictions.length === 0).slice(0, 3);
    return [...result, ...fallback].slice(0, 8);
  }
  return result;
}

export function applyAdaptiveIntensity(workout: Exercise[], lastDifficulty: number | null): Exercise[] {
  if (lastDifficulty === null) return workout;
  if (lastDifficulty >= 8) {
    return workout.map((e) => ({
      ...e,
      reps: e.reps ? Math.max(5, Math.round(e.reps * 0.85)) : e.reps,
      duration: e.duration ? Math.max(15, Math.round(e.duration * 0.85)) : e.duration,
    }));
  }
  if (lastDifficulty <= 3) {
    return workout.map((e) => ({
      ...e,
      reps: e.reps ? Math.round(e.reps * 1.15) : e.reps,
      duration: e.duration ? Math.round(e.duration * 1.1) : e.duration,
    }));
  }
  return workout;
}
