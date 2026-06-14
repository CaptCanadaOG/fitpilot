import Logo from '../Logo';
import {
  COACH_OPTIONS,
  EQUIPMENT_OPTIONS,
  FREQUENCY_OPTIONS,
  GOAL_OPTIONS,
  LEVEL_OPTIONS,
  RESTRICTION_OPTIONS,
  TIME_OPTIONS,
} from '../../data/exercises';
import type { Equipment, OnboardingState, Restriction } from '../../types';

interface OnboardingScreenProps {
  step: number;
  ob: OnboardingState;
  onSetField: <K extends keyof OnboardingState>(field: K, value: OnboardingState[K]) => void;
  onToggleArray: (field: 'equipment' | 'restrictions', value: Equipment | Restriction) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
}

function CheckSvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function OnboardingScreen({
  step,
  ob,
  onSetField,
  onToggleArray,
  onNext,
  onPrev,
  onFinish,
}: OnboardingScreenProps) {
  const canProceed = [true, !!ob.goal, !!ob.level, true, ob.equipment.length > 0, ob.restrictions.length > 0, true][step] ?? true;
  const isLastStep = step === 6;

  const selClasses = (selected: boolean) =>
    selected
      ? 'border-accent bg-accent-dim text-accent'
      : 'border-card-border bg-card text-text';

  return (
    <div className="absolute inset-0 flex flex-col animate-fade-in" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Progress bar */}
      <div className="h-[2px] flex-shrink-0 bg-track">
        <div
          className="h-full bg-accent transition-[width] duration-400"
          style={{ width: `${Math.round((step / 6) * 100)}%` }}
        />
      </div>

      {/* Back button row */}
      <div className="flex min-h-[52px] flex-shrink-0 items-center px-5 py-3">
        {step > 0 && (
          <button
            onClick={onPrev}
            className="rounded-xl border border-card-border bg-card px-4 py-[9px] text-sm font-medium text-text-muted"
          >
            ← Zurück
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {step === 0 && (
          <div className="flex flex-col items-center gap-[26px] pt-[10px] text-center animate-fade-up">
            <div className="animate-scale-in">
              <Logo size={80} />
            </div>
            <div>
              <div className="mb-2 text-[36px] font-extrabold tracking-[-1px] text-text">FitPilot</div>
              <div className="text-[15px] leading-[1.65] text-text-muted">
                Dein persönlicher Fitness-Pilot.
                <br />
                Kurze Workouts. Echter Effekt.
              </div>
            </div>
            <div className="flex w-full flex-col gap-2.5">
              {[
                {
                  icon: (
                    <path d="M10 2L4 11H9L8 18L16 9H11L10 2Z" fill="#d93b2f" />
                  ),
                  title: 'Ab 10 Minuten',
                  sub: 'Auch wenn wenig Zeit ist',
                },
                {
                  icon: (
                    <>
                      <circle cx="10" cy="10" r="8" stroke="#d93b2f" strokeWidth="1.5" />
                      <circle cx="10" cy="10" r="3.5" stroke="#d93b2f" strokeWidth="1.5" />
                      <circle cx="10" cy="10" r="1" fill="#d93b2f" />
                    </>
                  ),
                  title: 'Adaptiv & persönlich',
                  sub: 'Passt sich deinem Fortschritt an',
                },
                {
                  icon: (
                    <>
                      <path d="M3 14L7 10L10 13L17 6" stroke="#d93b2f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 6H17V10" stroke="#d93b2f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  ),
                  title: 'Kein Schuldgefühl',
                  sub: 'Fortschritt ohne Druck',
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 rounded-2xl border border-card-border bg-card px-[18px] py-3.5"
                >
                  <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[10px] bg-accent-dim">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      {f.icon}
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-text">{f.title}</div>
                    <div className="mt-0.5 text-xs text-text-muted">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="pt-1 animate-fade-up">
            <div className="mb-1.5 text-[26px] font-bold tracking-[-0.5px] text-text">Was ist dein Ziel?</div>
            <div className="mb-[22px] text-sm text-text-muted">Sei ehrlich – es gibt keine falsche Antwort.</div>
            <div className="flex flex-col gap-2.5">
              {GOAL_OPTIONS.map((g) => (
                <div
                  key={g.id}
                  onClick={() => onSetField('goal', g.id)}
                  className={`cursor-pointer rounded-[18px] border-[1.5px] px-5 py-4 ${selClasses(ob.goal === g.id)}`}
                >
                  <div className="mb-0.5 text-[15px] font-semibold">{g.label}</div>
                  <div className="text-xs text-text-muted">{g.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="pt-1 animate-fade-up">
            <div className="mb-1.5 text-[26px] font-bold tracking-[-0.5px] text-text">Fitnesslevel?</div>
            <div className="mb-[22px] text-sm text-text-muted">Keine Angst vor der Wahrheit.</div>
            <div className="flex flex-col gap-2.5">
              {LEVEL_OPTIONS.map((l) => (
                <div
                  key={l.id}
                  onClick={() => onSetField('level', l.id)}
                  className={`cursor-pointer rounded-[18px] border-[1.5px] p-5 ${selClasses(ob.level === l.id)}`}
                >
                  <div className="mb-[3px] text-[15px] font-semibold">{l.label}</div>
                  <div className="text-xs text-text-muted">{l.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="pt-1 animate-fade-up">
            <div className="mb-1.5 text-[26px] font-bold tracking-[-0.5px] text-text">Verfügbare Zeit?</div>
            <div className="mb-[22px] text-sm text-text-muted">Was ist realistisch – auch wenn's mal eng ist?</div>
            <div className="grid grid-cols-3 gap-2.5">
              {TIME_OPTIONS.map((t) => (
                <div
                  key={t}
                  onClick={() => onSetField('time', t)}
                  className={`flex flex-col items-center justify-center gap-[3px] rounded-[18px] border-[1.5px] px-2 py-[22px] ${selClasses(ob.time === t)}`}
                >
                  <div className="text-[26px] font-extrabold">{t}</div>
                  <div className="text-xs text-text-muted">min</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="pt-1 animate-fade-up">
            <div className="mb-1.5 text-[26px] font-bold tracking-[-0.5px] text-text">Equipment?</div>
            <div className="mb-[22px] text-sm text-text-muted">Mehrfachauswahl möglich.</div>
            <div className="flex flex-col gap-2.5">
              {EQUIPMENT_OPTIONS.map((eq) => {
                const selected = ob.equipment.includes(eq.id);
                return (
                  <div
                    key={eq.id}
                    onClick={() => onToggleArray('equipment', eq.id)}
                    className={`flex cursor-pointer items-center gap-3.5 rounded-[18px] border-[1.5px] px-[18px] py-[15px] ${selClasses(selected)}`}
                  >
                    <div
                      className={`flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-[7px] border-[1.5px] ${
                        selected ? 'border-accent bg-accent' : 'border-card-border bg-transparent'
                      }`}
                    >
                      {selected && <CheckSvg />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{eq.label}</div>
                      <div className="mt-0.5 text-xs text-text-muted">{eq.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="pt-1 animate-fade-up">
            <div className="mb-1.5 text-[26px] font-bold tracking-[-0.5px] text-text">Einschränkungen?</div>
            <div className="mb-[22px] text-sm text-text-muted">Damit dein Körper mitspielt und nicht streikt.</div>
            <div className="flex flex-col gap-2.5">
              {RESTRICTION_OPTIONS.map((r) => {
                const selected = ob.restrictions.includes(r.id);
                return (
                  <div
                    key={r.id}
                    onClick={() => onToggleArray('restrictions', r.id)}
                    className={`flex cursor-pointer items-center gap-3.5 rounded-[18px] border-[1.5px] px-[18px] py-[15px] ${selClasses(selected)}`}
                  >
                    <div
                      className={`flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-[7px] border-[1.5px] ${
                        selected ? 'border-accent bg-accent' : 'border-card-border bg-transparent'
                      }`}
                    >
                      {selected && <CheckSvg />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{r.label}</div>
                      <div className="mt-0.5 text-xs text-text-muted">{r.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="pt-1 animate-fade-up">
            <div className="mb-1.5 text-[26px] font-bold tracking-[-0.5px] text-text">Coach-Stil</div>
            <div className="mb-[18px] text-sm text-text-muted">Wie soll FitPilot mit dir reden?</div>
            <div className="mb-7 grid grid-cols-2 gap-2.5">
              {COACH_OPTIONS.map((co) => (
                <div
                  key={co.id}
                  onClick={() => onSetField('coachStyle', co.id)}
                  className={`cursor-pointer rounded-2xl border-[1.5px] px-4 py-3.5 text-center ${selClasses(ob.coachStyle === co.id)}`}
                >
                  <div className="text-sm font-semibold">{co.label}</div>
                  <div className="mt-0.5 text-[11px] text-text-muted">{co.desc}</div>
                </div>
              ))}
            </div>
            <div className="mb-[5px] text-[17px] font-bold text-text">Wochenfrequenz</div>
            <div className="mb-3.5 text-[13px] text-text-muted">Wie oft pro Woche ist realistisch?</div>
            <div className="grid grid-cols-4 gap-2.5">
              {FREQUENCY_OPTIONS.map((f) => (
                <div
                  key={f}
                  onClick={() => onSetField('frequency', f)}
                  className={`cursor-pointer rounded-2xl border-[1.5px] px-1.5 py-[18px] text-center ${selClasses(ob.frequency === f)}`}
                >
                  <div className="text-[22px] font-extrabold">{f}</div>
                  <div className="mt-[3px] text-[10px] text-text-muted">× / Woche</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="flex-shrink-0 px-6 pt-2.5" style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom))' }}>
        {isLastStep ? (
          <button
            onClick={onFinish}
            className="w-full rounded-[18px] bg-accent py-[18px] text-[17px] font-bold text-white"
          >
            FitPilot starten
          </button>
        ) : (
          <button
            onClick={() => canProceed && onNext()}
            style={{ opacity: canProceed ? 1 : 0.45 }}
            className="w-full rounded-[18px] bg-accent py-[18px] text-[17px] font-bold text-white transition-opacity duration-200"
          >
            Weiter
          </button>
        )}
      </div>
    </div>
  );
}
