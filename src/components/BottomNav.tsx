import type { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export default function BottomNav({ activeTab, onChange }: BottomNavProps) {
  const items: { id: Tab; label: string }[] = [
    { id: 'heute', label: 'Heute' },
    { id: 'uebungen', label: 'Übungen' },
    { id: 'fortschritt', label: 'Fortschritt' },
    { id: 'profil', label: 'Profil' },
  ];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-40 border-t border-card-border bg-nav-bg backdrop-blur-2xl"
      style={{ height: '64px' }}
    >
      <div className="grid h-full grid-cols-4 items-center px-2">
        {items.map((item) => {
          const active = activeTab === item.id;
          const color = active ? 'text-nav-active' : 'text-nav-inactive';
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex flex-col items-center gap-1 ${color}`}
            >
              {item.id === 'heute' && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 12L12 4L21 12V20C21 20.6 20.6 21 20 21H15V16H9V21H4C3.4 21 3 20.6 3 20V12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {item.id === 'uebungen' && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                  <rect x="3" y="10" width="18" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                  <rect x="3" y="16" width="18" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )}
              {item.id === 'fortschritt' && (
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path d="M4 19V13H8V19H4ZM10 19V8H14V19H10ZM16 19V3H20V19H16Z" fill="currentColor" />
                </svg>
              )}
              {item.id === 'profil' && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M4 20C4 17 7.6 15 12 15C16.4 15 20 17 20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
              <div className="text-[10px] font-semibold tracking-[0.2px]">{item.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
