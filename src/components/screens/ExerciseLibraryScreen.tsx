import { useState } from 'react';
import { EXERCISES } from '../../data/exercises';
import type { Phase } from '../../types';
import { getPhaseColor, getPhaseLabel } from '../../lib/utils';
import ExerciseIllustration from '../ExerciseIllustration';

const PHASES: Phase[] = ['warmup', 'kraft', 'core', 'cooldown'];

export default function ExerciseLibraryScreen() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 overflow-y-auto animate-fade-up" style={{ paddingBottom: '88px' }}>
      <div className="px-6" style={{ paddingTop: 'calc(1.75rem + env(safe-area-inset-top))' }}>
        <div className="mb-1.5 text-[26px] font-extrabold tracking-[-0.8px] text-text">Übungen</div>
        <div className="mb-[22px] text-sm leading-[1.55] text-text-muted">
          Alle Übungen aus deinem Workout – mit Erklärung und Alternativen.
        </div>

        {PHASES.map((phase) => {
          const color = getPhaseColor(phase);
          const exercises = EXERCISES.filter((e) => e.phase === phase);
          return (
            <div key={phase} className="mb-5">
              <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-lg bg-tag-bg py-[5px] pl-[7px] pr-2.5">
                <div className="h-[7px] w-[7px] rounded-full" style={{ background: color }} />
                <div className="text-[11px] font-bold uppercase tracking-[1px] text-text-muted">{getPhaseLabel(phase)}</div>
              </div>

              <div className="flex flex-col gap-2.5">
                {exercises.map((ex) => {
                  const open = openId === ex.id;
                  const amount = ex.duration ? `${ex.duration}s` : `${ex.reps}×`;
                  return (
                    <div
                      key={ex.id}
                      onClick={() => setOpenId(open ? null : ex.id)}
                      className="cursor-pointer rounded-2xl border border-card-border bg-card px-4 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-xl bg-tag-bg">
                          <ExerciseIllustration exerciseId={ex.id} size={40} color={color} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[15px] font-bold leading-[1.3] text-text">{ex.name}</div>
                          <div className="text-xs font-medium text-text-muted">{amount}</div>
                        </div>
                        <div
                          className="flex-shrink-0 text-text-muted transition-transform"
                          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>

                      {open && (
                        <div className="mt-3.5 border-t border-card-border pt-3.5">
                          <div className="mb-3 text-sm leading-[1.65] text-text-muted">{ex.description}</div>
                          {(ex.easier || ex.harder) && (
                            <div className="flex flex-wrap gap-2">
                              {ex.easier && (
                                <div className="rounded-[10px] bg-tag-bg px-3 py-1.5 text-xs font-medium text-text-muted">↓ {ex.easier}</div>
                              )}
                              {ex.harder && (
                                <div className="rounded-[10px] bg-tag-bg px-3 py-1.5 text-xs font-medium text-text-muted">↑ {ex.harder}</div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
