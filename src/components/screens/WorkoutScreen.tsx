import type { Exercise } from '../../types';
import { getPhaseColor, getPhaseLabel } from '../../lib/utils';
import ExerciseIllustration from '../ExerciseIllustration';

interface WorkoutScreenProps {
  workout: Exercise[];
  currentExIdx: number;
  timerActive: boolean;
  timerRemaining: number;
  timerTotal: number;
  timerDone: boolean;
  restActive: boolean;
  restRemaining: number;
  restTotal: number;
  onSkipRest: () => void;
  onDone: () => void;
  onEasier: () => void;
  onSkip: () => void;
}

const CIRC = 402.12;

export default function WorkoutScreen({
  workout,
  currentExIdx,
  timerActive,
  timerRemaining,
  timerTotal,
  timerDone,
  restActive,
  restRemaining,
  restTotal,
  onSkipRest,
  onDone,
  onEasier,
  onSkip,
}: WorkoutScreenProps) {
  const curEx = workout[currentExIdx];
  const phaseColor = getPhaseColor(curEx.phase);
  const phaseLabel = getPhaseLabel(curEx.phase);

  const isTimedEx = !!curEx.duration;
  const isRepsEx = !!curEx.reps;

  const timerDashOffset = timerTotal > 0 ? Math.round(CIRC * (1 - timerRemaining / timerTotal)) : 0;
  const timerDisplayText = timerDone ? 'Zeit!' : timerActive ? String(timerRemaining) : curEx.duration ? String(curEx.duration) : '';

  const exProgressPct = `${Math.round(((currentExIdx + 1) / workout.length) * 100)}%`;

  if (restActive) {
    const nextEx = workout[currentExIdx + 1];
    const nextPhaseColor = getPhaseColor(nextEx.phase);
    const restDashOffset = restTotal > 0 ? Math.round(CIRC * (1 - restRemaining / restTotal)) : 0;

    return (
      <div className="absolute inset-0 flex flex-col animate-fade-in">
        {/* Top bar */}
        <div className="flex-shrink-0 px-[22px]" style={{ paddingTop: 'calc(18px + env(safe-area-inset-top))' }}>
          <div className="mb-3.5 flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-track">
              <div
                className="h-full transition-[width] duration-500"
                style={{ width: exProgressPct, background: phaseColor }}
              />
            </div>
            <div className="min-w-[36px] flex-shrink-0 text-right text-[13px] font-semibold text-text-muted">
              {currentExIdx + 1}/{workout.length}
            </div>
          </div>
        </div>

        {/* Rest content */}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-6 py-2.5 text-center">
          <div className="mb-[22px] text-[33px] font-extrabold leading-[1.15] tracking-[-0.5px] text-text">Pause</div>

          <div className="mb-[22px] flex items-center justify-center">
            <svg width="156" height="156" viewBox="0 0 156 156">
              <circle cx="78" cy="78" r="64" fill="none" stroke="var(--color-track)" strokeWidth="7" />
              <circle
                cx="78"
                cy="78"
                r="64"
                fill="none"
                stroke={nextPhaseColor}
                strokeWidth="7"
                strokeDasharray={CIRC}
                strokeDashoffset={restDashOffset}
                strokeLinecap="round"
                transform="rotate(-90 78 78)"
                style={{ transition: 'stroke-dashoffset 0.9s linear' }}
              />
              <text x="78" y="70" textAnchor="middle" fill="var(--color-text)" fontSize="36" fontWeight="800" fontFamily="Sora, sans-serif">
                {restRemaining}
              </text>
              <text x="78" y="92" textAnchor="middle" fill="var(--color-text-muted)" fontSize="12" fontFamily="Sora, sans-serif">
                Sekunden
              </text>
            </svg>
          </div>

          <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[1px] text-text-muted">Nächste Übung</div>
          <div className="text-xl font-extrabold leading-[1.15] tracking-[-0.5px] text-text">{nextEx.name}</div>
        </div>

        {/* Action button */}
        <div className="flex flex-shrink-0 flex-col gap-2.5 px-[22px] pt-2.5" style={{ paddingBottom: 'calc(2.75rem + env(safe-area-inset-bottom))' }}>
          <button onClick={onSkipRest} className="w-full rounded-[18px] bg-accent py-[19px] text-[17px] font-bold text-white">
            Weiter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col animate-fade-in">
      {/* Top bar */}
      <div className="flex-shrink-0 px-[22px]" style={{ paddingTop: 'calc(18px + env(safe-area-inset-top))' }}>
        <div className="mb-3.5 flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-track">
            <div
              className="h-full transition-[width] duration-500"
              style={{ width: exProgressPct, background: phaseColor }}
            />
          </div>
          <div className="min-w-[36px] flex-shrink-0 text-right text-[13px] font-semibold text-text-muted">
            {currentExIdx + 1}/{workout.length}
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-lg bg-tag-bg py-[5px] pl-[7px] pr-2.5">
          <div className="h-[7px] w-[7px] rounded-full" style={{ background: phaseColor }} />
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-text-muted">{phaseLabel}</div>
        </div>
      </div>

      {/* Exercise content */}
      <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden px-6 py-2.5">
        <div className="mb-[18px] flex justify-center">
          <ExerciseIllustration exerciseId={curEx.id} size={104} color={phaseColor} />
        </div>

        <div className="mb-[22px] text-[33px] font-extrabold leading-[1.15] tracking-[-0.5px] text-text">{curEx.name}</div>

        {isTimedEx && (
          <div className="mb-[22px] flex items-center justify-center">
            <svg width="156" height="156" viewBox="0 0 156 156">
              <circle cx="78" cy="78" r="64" fill="none" stroke="var(--color-track)" strokeWidth="7" />
              <circle
                cx="78"
                cy="78"
                r="64"
                fill="none"
                stroke={phaseColor}
                strokeWidth="7"
                strokeDasharray={CIRC}
                strokeDashoffset={timerDashOffset}
                strokeLinecap="round"
                transform="rotate(-90 78 78)"
                style={{ transition: 'stroke-dashoffset 0.9s linear' }}
              />
              <text x="78" y="70" textAnchor="middle" fill="var(--color-text)" fontSize="36" fontWeight="800" fontFamily="Sora, sans-serif">
                {timerDisplayText}
              </text>
              <text x="78" y="92" textAnchor="middle" fill="var(--color-text-muted)" fontSize="12" fontFamily="Sora, sans-serif">
                Sekunden
              </text>
            </svg>
          </div>
        )}

        {isRepsEx && (
          <div className="mb-[22px] flex items-baseline gap-2">
            <div className="text-[80px] font-extrabold leading-none" style={{ color: phaseColor }}>
              {curEx.reps}
            </div>
            <div className="pb-2 text-[22px] font-medium text-text-muted">Wdh.</div>
          </div>
        )}

        <div className="mb-[18px] text-sm leading-[1.65] text-text-muted">{curEx.description}</div>

        {/* Alternatives */}
        <div className="flex flex-wrap gap-2">
          {curEx.easier && (
            <div className="rounded-[10px] bg-tag-bg px-3 py-1.5 text-xs font-medium text-text-muted">↓ {curEx.easier}</div>
          )}
          {curEx.harder && (
            <div className="rounded-[10px] bg-tag-bg px-3 py-1.5 text-xs font-medium text-text-muted">↑ {curEx.harder}</div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-shrink-0 flex-col gap-2.5 px-[22px] pt-2.5" style={{ paddingBottom: 'calc(2.75rem + env(safe-area-inset-bottom))' }}>
        <button onClick={onDone} className="w-full rounded-[18px] bg-accent py-[19px] text-[17px] font-bold text-white">
          Erledigt
        </button>
        <div className="flex gap-2.5">
          <button
            onClick={onEasier}
            className="flex-1 rounded-2xl border-[1.5px] border-card-border bg-transparent px-3.5 py-3.5 text-[13px] font-semibold text-text-muted"
          >
            Zu schwer
          </button>
          <button
            onClick={onSkip}
            className="flex-1 rounded-2xl border-[1.5px] border-card-border bg-transparent px-3.5 py-3.5 text-[13px] font-semibold text-text-muted"
          >
            Überspringen
          </button>
        </div>
      </div>
    </div>
  );
}
