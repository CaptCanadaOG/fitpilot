import { COACH_OPTIONS, GOAL_OPTIONS, LEVEL_OPTIONS } from '../../data/exercises';
import type { Profile } from '../../types';

interface ProfileScreenProps {
  profile: Profile | null;
  darkMode: boolean;
  onToggleDark: () => void;
  onReset: () => void;
}

export default function ProfileScreen({ profile, darkMode, onToggleDark, onReset }: ProfileScreenProps) {
  const goalLabel = profile ? GOAL_OPTIONS.find((g) => g.id === profile.goal)?.label || '' : '';
  const levelLabel = profile ? LEVEL_OPTIONS.find((l) => l.id === profile.level)?.label || '' : '';
  const coachLabel = profile ? COACH_OPTIONS.find((c) => c.id === profile.coachStyle)?.label || '' : '';

  const rows = [
    { label: 'Ziel', value: goalLabel },
    { label: 'Level', value: levelLabel },
    { label: 'Standardzeit', value: profile ? `${profile.time} min` : '' },
    { label: 'Frequenz', value: profile ? `${profile.frequency}× / Woche` : '' },
    { label: 'Coach-Stil', value: coachLabel },
  ];

  return (
    <div className="absolute inset-0 overflow-y-auto animate-fade-up" style={{ paddingBottom: '88px' }}>
      <div className="px-6" style={{ paddingTop: 'calc(1.75rem + env(safe-area-inset-top))' }}>
        <div className="mb-[22px] text-[26px] font-extrabold tracking-[-0.8px] text-text">Profil</div>

        {/* Settings */}
        <div className="mb-3 rounded-[20px] border border-card-border bg-card p-5">
          <div className="mb-4 text-[13px] font-bold uppercase tracking-[0.8px] text-text-muted">Einstellungen</div>
          <div className="flex flex-col">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between py-2.5 ${i < rows.length - 1 ? 'border-b border-card-border' : ''}`}
              >
                <div className="text-[13px] text-text-muted">{row.label}</div>
                <div className="text-[13px] font-semibold text-text">{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark mode toggle */}
        <div className="mb-3 flex items-center justify-between rounded-[20px] border border-card-border bg-card px-5 py-[18px]">
          <div>
            <div className="text-sm font-semibold text-text">Dark Mode</div>
            <div className="mt-0.5 text-xs text-text-muted">Manuelle Überschreibung</div>
          </div>
          <div onClick={onToggleDark} className="relative h-7 w-[50px] cursor-pointer rounded-[14px] bg-track">
            <div
              className="absolute top-[3px] h-[22px] w-[22px] rounded-full transition-[left] duration-200 ease-out"
              style={{
                left: darkMode ? '25px' : '3px',
                background: darkMode ? 'var(--color-accent)' : 'var(--color-text-muted)',
              }}
            />
          </div>
        </div>

        {/* Reset */}
        <div className="rounded-[20px] border border-card-border bg-card p-5">
          <div className="mb-1 text-sm font-semibold text-text">App zurücksetzen</div>
          <div className="mb-3.5 text-xs text-text-muted">Profil und alle Trainingsdaten löschen.</div>
          <button
            onClick={onReset}
            className="w-full rounded-2xl border border-[rgba(217,59,47,0.25)] bg-[rgba(217,59,47,0.1)] py-3.5 text-sm font-semibold text-accent"
          >
            Zurücksetzen
          </button>
        </div>
      </div>
    </div>
  );
}
