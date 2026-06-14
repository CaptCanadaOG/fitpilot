import { DIFFICULTY_LABELS, MOOD_OPTIONS } from '../../data/exercises';
import type { Mood } from '../../types';

interface FeedbackScreenProps {
  workoutDuration: number;
  fbDifficulty: number;
  fbMood: Mood;
  fbNote: string;
  onSetDifficulty: (value: number) => void;
  onSetMood: (value: Mood) => void;
  onSetNote: (value: string) => void;
  onSave: () => void;
}

export default function FeedbackScreen({
  workoutDuration,
  fbDifficulty,
  fbMood,
  fbNote,
  onSetDifficulty,
  onSetMood,
  onSetNote,
  onSave,
}: FeedbackScreenProps) {
  return (
    <div className="absolute inset-0 overflow-y-auto animate-fade-up">
      <div className="px-6 py-10 pb-10">
        <div className="mb-9 text-center animate-success-pop">
          <div className="mb-2 text-[64px] font-extrabold leading-none tracking-[-2px] text-accent">Fertig.</div>
          <div className="text-base text-text-muted">{workoutDuration} Minuten gut investiert.</div>
        </div>

        {/* Difficulty */}
        <div className="mb-3 rounded-[20px] border border-card-border bg-card p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <div className="text-sm font-bold text-text">Wie schwer war es?</div>
            <div className="text-[13px] font-semibold text-accent">{DIFFICULTY_LABELS[fbDifficulty] || ''}</div>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={fbDifficulty}
            onChange={(e) => onSetDifficulty(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-2 flex justify-between">
            <div className="text-[11px] text-text-muted">1 · Sehr leicht</div>
            <div className="text-[11px] text-text-muted">10 · Maximum</div>
          </div>
        </div>

        {/* Mood */}
        <div className="mb-3 rounded-[20px] border border-card-border bg-card p-5">
          <div className="mb-3.5 text-sm font-bold text-text">Stimmung danach?</div>
          <div className="grid grid-cols-4 gap-2">
            {MOOD_OPTIONS.map((m) => {
              const selected = fbMood === m.value;
              return (
                <div
                  key={m.value}
                  onClick={() => onSetMood(m.value)}
                  className={`cursor-pointer rounded-xl border-[1.5px] px-1.5 py-[11px] text-center text-[13px] font-semibold ${
                    selected ? 'border-accent bg-accent-dim text-accent' : 'border-card-border bg-card text-text'
                  }`}
                >
                  {m.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="mb-6 rounded-[20px] border border-card-border bg-card p-5">
          <div className="mb-3 text-sm font-bold text-text">Notiz (optional)</div>
          <textarea
            value={fbNote}
            onChange={(e) => onSetNote(e.target.value)}
            placeholder="Wie hat's sich angefühlt?"
            rows={3}
            className="min-h-[64px] w-full text-sm leading-[1.6] text-text"
          />
        </div>

        <button onClick={onSave} className="w-full rounded-[18px] bg-accent py-[19px] text-[17px] font-bold text-white">
          Speichern &amp; weiter
        </button>
      </div>
    </div>
  );
}
