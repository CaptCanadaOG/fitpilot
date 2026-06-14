export type Goal = 'kraft' | 'fettabbau' | 'beweglichkeit' | 'ausdauer' | 'allgemein';
export type Level = 'anfaenger' | 'wiedereinstieg' | 'fortgeschritten';
export type Equipment = 'keins' | 'matte' | 'kurzhanteln' | 'widerstandsband' | 'klimmzugstange';
export type Restriction = 'keine' | 'rücken' | 'knie' | 'schulter' | 'handgelenke';
export type CoachStyle = 'freundlich' | 'direkt' | 'humorvoll' | 'streng';
export type EnergyLevel = 'low' | 'medium' | 'high';
export type Mood = 'schlecht' | 'neutral' | 'gut' | 'super';
export type Phase = 'warmup' | 'kraft' | 'core' | 'cooldown';
export type TimeOption = 10 | 15 | 20 | 30 | 45;
export type Frequency = 2 | 3 | 4 | 5;
export type ModifiedAction = 'easier' | 'skip' | null;

export interface Profile {
  goal: Goal;
  level: Level;
  time: TimeOption;
  equipment: Equipment[];
  restrictions: Restriction[];
  coachStyle: CoachStyle;
  frequency: Frequency;
}

export interface OnboardingState {
  goal: Goal | null;
  level: Level | null;
  time: TimeOption;
  equipment: Equipment[];
  restrictions: Restriction[];
  coachStyle: CoachStyle;
  frequency: Frequency;
}

export interface Exercise {
  id: string;
  name: string;
  phase: Phase;
  equipment: Equipment[];
  restrictions: Restriction[];
  reps: number | null;
  duration: number | null;
  description: string;
  easier: string | null;
  harder: string | null;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface WorkoutSessionExercise {
  id: string;
  name: string;
  modified: ModifiedAction;
}

export interface WorkoutSession {
  id: number;
  date: string;
  duration: number;
  completed: boolean;
  difficulty: number;
  mood: Mood;
  note: string;
  exercises: WorkoutSessionExercise[];
}

export type Screen = 'onboarding' | 'today' | 'workout' | 'feedback';
export type Tab = 'heute' | 'uebungen' | 'fortschritt' | 'profil';

export const DEFAULT_ONBOARDING: OnboardingState = {
  goal: null,
  level: null,
  time: 20,
  equipment: [],
  restrictions: [],
  coachStyle: 'humorvoll',
  frequency: 3,
};
