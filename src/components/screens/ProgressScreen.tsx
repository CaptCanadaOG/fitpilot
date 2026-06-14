import { DIFFICULTY_LABELS } from '../../data/exercises';
import type { WorkoutSession } from '../../types';
import {
  formatDate,
  formatTotalMinutes,
  getAreaScores,
  getCurrentStreak,
  getTotalMinutes,
} from '../../lib/utils';

interface ProgressScreenProps {
  history: WorkoutSession[];
}

export default function ProgressScreen({ history }: ProgressScreenProps) {
  const streak = getCurrentStreak(history);
  const totalMins = getTotalMinutes(history);
  const totalWorkouts = history.filter((h) => h.completed).length;
  const scores = getAreaScores(history);
  const recentHistory = history
    .slice(-10)
    .reverse()
    .map((h) => ({ ...h, dateLabel: formatDate(h.date), diffLabel: DIFFICULTY_LABELS[h.difficulty] || '' }));

  const areas = [
    { label: 'Kraft', value: scores.kraft, color: '#d93b2f' },
    { label: 'Core', value: scores.core, color: '#7c3aed' },
    { label: 'Ausdauer', value: scores.ausdauer, color: '#e8a32f' },
    { label: 'Mobilität', value: scores.mobility, color: '#2fb87e' },
  ];

  return (
    <div className="absolute inset-0 overflow-y-auto animate-fade-up" style={{ paddingBottom: 'calc(96px + env(safe-area-inset-bottom))' }}>
      <div className="px-6" style={{ paddingTop: 'calc(1.75rem + env(safe-area-inset-top))' }}>
        <div className="mb-[22px] text-[26px] font-extrabold tracking-[-0.8px] text-text">Fortschritt</div>

        {/* Stats row */}
        <div className="mb-4 grid grid-cols-3 gap-2.5">
          <div className="rounded-2xl border border-card-border bg-card px-2.5 py-3.5 text-center">
            <div className="text-2xl font-extrabold leading-none text-text">{totalWorkouts}</div>
            <div className="mt-1 text-[10px] font-medium text-text-muted">Workouts</div>
          </div>
          <div className="rounded-2xl border border-card-border bg-card px-2.5 py-3.5 text-center">
            <div className="text-2xl font-extrabold leading-none text-text">{streak}</div>
            <div className="mt-1 text-[10px] font-medium text-text-muted">Streak</div>
          </div>
          <div className="rounded-2xl border border-card-border bg-card px-2.5 py-3.5 text-center">
            <div className="mt-1 text-base font-extrabold leading-none text-text">{formatTotalMinutes(totalMins)}</div>
            <div className="mt-1 text-[10px] font-medium text-text-muted">Gesamt</div>
          </div>
        </div>

        {/* Areas */}
        <div className="mb-4 rounded-[20px] border border-card-border bg-card p-5">
          <div className="mb-[18px] text-sm font-bold text-text">Bereiche</div>
          <div className="flex flex-col gap-[15px]">
            {areas.map((area) => (
              <div key={area.label}>
                <div className="mb-1.5 flex justify-between">
                  <div className="text-[13px] font-semibold text-text">{area.label}</div>
                  <div className="text-xs text-text-muted">{area.value}%</div>
                </div>
                <div className="h-[7px] overflow-hidden rounded-full bg-track">
                  <div className="h-full rounded-full" style={{ width: `${area.value}%`, background: area.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="mb-3 text-sm font-bold text-text">Letzte Trainings</div>
        {recentHistory.length > 0 ? (
          <div className="flex flex-col gap-2">
            {recentHistory.map((h) => (
              <div
                key={h.id}
                className="flex items-center justify-between rounded-2xl border border-card-border bg-card px-4 py-3.5"
              >
                <div>
                  <div className="text-sm font-semibold text-text">{h.dateLabel}</div>
                  <div className="mt-[3px] text-xs text-text-muted">
                    {h.duration} min · {h.diffLabel}
                  </div>
                </div>
                <div className="text-[13px] text-text-muted">→</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-10 text-center text-sm leading-[1.6] text-text-muted">
            Noch keine Trainings gespeichert.
            <br />
            Leg einfach los.
          </div>
        )}
      </div>
    </div>
  );
}
