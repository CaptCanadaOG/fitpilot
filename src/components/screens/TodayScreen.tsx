import Logo from '../Logo';
import { TIME_OPTIONS } from '../../data/exercises';
import type { EnergyLevel, Profile, WorkoutSession } from '../../types';
import {
  formatTotalMinutes,
  getCurrentStreak,
  getGreeting,
  getThisWeekCount,
  getTotalMinutes,
  getWeekDays,
} from '../../lib/utils';

interface TodayScreenProps {
  profile: Profile | null;
  history: WorkoutSession[];
  energyLevel: EnergyLevel;
  selectedTime: number | null;
  onSetEnergy: (level: EnergyLevel) => void;
  onSetTime: (time: number) => void;
  onStartWorkout: (isStress: boolean) => void;
}

function CheckSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TodayScreen({
  profile,
  history,
  energyLevel,
  selectedTime,
  onSetEnergy,
  onSetTime,
  onStartWorkout,
}: TodayScreenProps) {
  const streak = getCurrentStreak(history);
  const weekCount = getThisWeekCount(history);
  const totalMins = getTotalMinutes(history);
  const weekDays = getWeekDays(history);

  const lastWorkout = history.length ? history[history.length - 1] : null;
  const lastDate = lastWorkout ? new Date(lastWorkout.date + 'T00:00:00') : null;
  const daysSince = lastDate ? Math.floor((Date.now() - lastDate.getTime()) / 86400000) : 99;
  const isReentryMode = daysSince >= 4 && history.length > 0;

  let motivation = 'Dein nächstes Workout wartet. Jetzt ist ein guter Zeitpunkt.';
  if (isReentryMode) motivation = `${daysSince} Tage Pause. Kein Problem – sanfter Wiedereinstieg.`;
  else if (energyLevel === 'low') motivation = '10 Minuten reichen. Du hast Schlimmeres überlebt.';
  else if (streak >= 5) motivation = `${streak} Tage Streak. Respekt – und weitermachen.`;
  else if (streak >= 3) motivation = `${streak} Tage in Folge. Du machst das wirklich.`;
  else if (weekCount === 0) motivation = 'Diese Woche noch kein Training. Jetzt ist ein guter Zeitpunkt.';
  else motivation = `${weekCount}× diese Woche. Gut. Noch eine dazu?`;

  const selTime = selectedTime ?? profile?.time ?? 20;

  const energyOptions: { value: EnergyLevel; label: string }[] = [
    { value: 'low', label: 'Niedrig' },
    { value: 'medium', label: 'Mittel' },
    { value: 'high', label: 'Hoch' },
  ];

  return (
    <div className="absolute inset-0 overflow-y-auto animate-fade-up" style={{ paddingBottom: 'calc(90px + env(safe-area-inset-bottom))' }}>
      <div className="px-6 pt-7">
        {/* Header */}
        <div className="mb-[18px] flex items-start justify-between">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-[1.2px] text-text-muted">{getGreeting()}</div>
            <div className="text-[28px] font-extrabold leading-none tracking-[-0.8px] text-text">FitPilot</div>
          </div>
          <Logo size={38} rounded={14} />
        </div>

        {/* Motivation card */}
        <div className="mb-[22px] rounded-2xl border border-accent-dim-bright bg-accent-dim px-[18px] py-3.5">
          <div className="text-sm font-medium leading-[1.55] text-text">{motivation}</div>
        </div>

        {/* Week strip */}
        <div className="mb-5 flex items-end justify-between">
          {weekDays.map((day, i) => {
            let dotBg = 'transparent';
            let borderColor: string;
            let labelColor: string;
            if (day.done) {
              dotBg = 'var(--color-accent)';
              borderColor = 'var(--color-accent)';
              labelColor = 'var(--color-accent)';
            } else if (day.isToday) {
              borderColor = 'var(--color-accent)';
              labelColor = 'var(--color-accent)';
            } else if (day.future) {
              borderColor = 'var(--color-track)';
              labelColor = 'var(--color-track)';
            } else {
              borderColor = 'var(--color-track)';
              labelColor = 'var(--color-text-muted)';
            }
            return (
              <div key={i} className="flex flex-col items-center gap-1.5" style={{ opacity: day.future ? 0.4 : 1 }}>
                <div
                  className="text-[10px] font-semibold uppercase tracking-[0.3px]"
                  style={{ color: labelColor }}
                >
                  {day.label}
                </div>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px]"
                  style={{ background: dotBg, borderColor }}
                >
                  {day.done && <CheckSvg />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-3 gap-2.5">
          <div className="rounded-2xl border border-card-border bg-card px-2.5 py-3.5 text-center">
            <div className="text-2xl font-extrabold leading-none text-text">{streak}</div>
            <div className="mt-1 text-[10px] font-medium text-text-muted">Streak</div>
          </div>
          <div className="rounded-2xl border border-card-border bg-card px-2.5 py-3.5 text-center">
            <div className="text-2xl font-extrabold leading-none text-text">{weekCount}</div>
            <div className="mt-1 text-[10px] font-medium text-text-muted">Woche</div>
          </div>
          <div className="rounded-2xl border border-card-border bg-card px-2.5 py-3.5 text-center">
            <div className="mt-[3px] text-[17px] font-extrabold leading-none text-text">{formatTotalMinutes(totalMins)}</div>
            <div className="mt-1 text-[10px] font-medium text-text-muted">Gesamt</div>
          </div>
        </div>

        {/* Energy */}
        <div className="mb-4">
          <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[1px] text-text-muted">Energie heute</div>
          <div className="grid grid-cols-3 gap-2">
            {energyOptions.map((opt) => {
              const selected = energyLevel === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => onSetEnergy(opt.value)}
                  className={`cursor-pointer rounded-2xl border-[1.5px] px-1.5 py-3 text-center text-[13px] font-semibold ${
                    selected ? 'border-accent bg-accent-dim text-accent' : 'border-card-border bg-card text-text'
                  }`}
                >
                  {opt.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Time */}
        <div className="mb-[26px]">
          <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[1px] text-text-muted">Zeit</div>
          <div className="flex gap-[7px]">
            {TIME_OPTIONS.map((t) => {
              const selected = selTime === t;
              return (
                <div
                  key={t}
                  onClick={() => onSetTime(t)}
                  className={`flex-1 cursor-pointer rounded-2xl border-[1.5px] px-1 py-3 text-center text-[13px] font-semibold ${
                    selected ? 'border-accent bg-accent-dim text-accent' : 'border-card-border bg-card text-text'
                  }`}
                >
                  {t}'
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => onStartWorkout(false)}
            className="w-full rounded-[18px] bg-accent py-[19px] text-[17px] font-bold tracking-[0.2px] text-white"
          >
            {isReentryMode ? 'Sanfter Wiedereinstieg' : 'Workout starten'}
          </button>
          <button
            onClick={() => onStartWorkout(true)}
            className="w-full rounded-[18px] border-[1.5px] border-card-border bg-transparent py-4 text-[15px] font-semibold text-text-muted"
          >
            Stressmodus · 10 Minuten
          </button>
        </div>
      </div>
    </div>
  );
}
