import { useEffect, useRef, useState } from 'react';
import Logo from './components/Logo';
import BottomNav from './components/BottomNav';
import OnboardingScreen from './components/screens/OnboardingScreen';
import TodayScreen from './components/screens/TodayScreen';
import WorkoutScreen from './components/screens/WorkoutScreen';
import ExerciseLibraryScreen from './components/screens/ExerciseLibraryScreen';
import FeedbackScreen from './components/screens/FeedbackScreen';
import ProgressScreen from './components/screens/ProgressScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import { loadHistory, loadProfile, saveHistory, saveProfile, clearAll } from './lib/storage';
import { applyAdaptiveIntensity, generateWorkout } from './lib/workout';
import {
  DEFAULT_ONBOARDING,
  type Equipment,
  type EnergyLevel,
  type Exercise,
  type ModifiedAction,
  type Mood,
  type OnboardingState,
  type Profile,
  type Restriction,
  type Screen,
  type Tab,
  type WorkoutSession,
} from './types';

const REST_SECONDS = 20;

export default function App() {
  const [initialized, setInitialized] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [history, setHistory] = useState<WorkoutSession[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('heute');
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [ob, setOb] = useState<OnboardingState>(DEFAULT_ONBOARDING);

  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>('medium');
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const [currentWorkout, setCurrentWorkout] = useState<Exercise[] | null>(null);
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [workoutStartTime, setWorkoutStartTime] = useState<number | null>(null);
  const [exModified, setExModified] = useState<Record<string, ModifiedAction>>({});
  const [workoutDuration, setWorkoutDuration] = useState(0);

  const [fbDifficulty, setFbDifficulty] = useState(5);
  const [fbMood, setFbMood] = useState<Mood>('gut');
  const [fbNote, setFbNote] = useState('');

  const [timerActive, setTimerActive] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [timerTotal, setTimerTotal] = useState(0);
  const [timerDone, setTimerDone] = useState(false);

  const [restActive, setRestActive] = useState(false);
  const [restRemaining, setRestRemaining] = useState(0);

  const timerInterval = useRef<number | null>(null);
  const restInterval = useRef<number | null>(null);
  const restNextIdx = useRef(0);

  // Initial load
  useEffect(() => {
    const loadedProfile = loadProfile();
    const loadedHistory = loadHistory();
    const dm = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setProfile(loadedProfile);
    setHistory(loadedHistory);
    setDarkMode(dm);
    setScreen(loadedProfile ? 'today' : 'onboarding');
    setSelectedTime(loadedProfile ? loadedProfile.time : 20);
    setInitialized(true);

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
      if (restInterval.current) clearInterval(restInterval.current);
    };
  }, []);

  function advanceToExercise(nIdx: number) {
    if (!currentWorkout) return;
    const nEx = currentWorkout[nIdx];
    setRestActive(false);
    setCurrentExIdx(nIdx);
    setTimerActive(false);
    setTimerRemaining(0);
    setTimerDone(false);
    if (nEx?.duration) {
      setTimeout(() => startExerciseTimer(nEx.duration as number), 300);
    }
  }

  function startRest(nIdx: number) {
    if (restInterval.current) clearInterval(restInterval.current);
    restNextIdx.current = nIdx;
    setRestActive(true);
    setRestRemaining(REST_SECONDS);
    restInterval.current = window.setInterval(() => {
      setRestRemaining((prev) => {
        if (prev <= 1) {
          if (restInterval.current) {
            clearInterval(restInterval.current);
            restInterval.current = null;
          }
          advanceToExercise(restNextIdx.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function skipRest() {
    if (restInterval.current) {
      clearInterval(restInterval.current);
      restInterval.current = null;
    }
    advanceToExercise(restNextIdx.current);
  }

  function startExerciseTimer(seconds: number) {
    if (timerInterval.current) clearInterval(timerInterval.current);
    setTimerActive(true);
    setTimerRemaining(seconds);
    setTimerTotal(seconds);
    setTimerDone(false);
    timerInterval.current = window.setInterval(() => {
      setTimerRemaining((prev) => {
        if (prev <= 1) {
          if (timerInterval.current) {
            clearInterval(timerInterval.current);
            timerInterval.current = null;
          }
          setTimerActive(false);
          setTimerDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function setObField<K extends keyof OnboardingState>(field: K, value: OnboardingState[K]) {
    setOb((s) => ({ ...s, [field]: value }));
  }

  function toggleObArray(field: 'equipment' | 'restrictions', value: Equipment | Restriction) {
    setOb((s) => {
      const arr = s[field] as string[];
      let next: string[];
      if (value === 'keine' || value === 'keins') {
        next = [value];
      } else {
        const clean = arr.filter((x) => x !== 'keine' && x !== 'keins');
        next = clean.includes(value) ? clean.filter((x) => x !== value) : [...clean, value];
      }
      return { ...s, [field]: next };
    });
  }

  function nextOnboarding() {
    setOnboardingStep((s) => Math.min(6, s + 1));
  }

  function prevOnboarding() {
    setOnboardingStep((s) => Math.max(0, s - 1));
  }

  function finishOnboarding() {
    const newProfile: Profile = {
      goal: ob.goal || 'allgemein',
      level: ob.level || 'anfaenger',
      time: (ob.time || 20) as Profile['time'],
      equipment: ob.equipment.length ? (ob.equipment as Equipment[]) : ['keins'],
      restrictions: ob.restrictions.length ? (ob.restrictions as Restriction[]) : ['keine'],
      coachStyle: ob.coachStyle || 'humorvoll',
      frequency: ob.frequency || 3,
    };
    saveProfile(newProfile);
    setProfile(newProfile);
    setScreen('today');
    setSelectedTime(newProfile.time);
  }

  function startWorkout(isStress: boolean) {
    if (!profile) return;
    const lastDate = history.length ? new Date(history[history.length - 1].date + 'T00:00:00') : null;
    const daysSince = lastDate ? Math.floor((Date.now() - lastDate.getTime()) / 86400000) : 99;
    const time = isStress ? 10 : selectedTime || profile.time || 20;
    const energy: EnergyLevel = isStress ? 'low' : daysSince >= 4 ? 'low' : energyLevel;
    const lastDiff = history.length ? history[history.length - 1].difficulty : null;

    let workout = generateWorkout(profile, energy, time, isStress, history);
    workout = applyAdaptiveIntensity(workout, lastDiff);

    setScreen('workout');
    setCurrentWorkout(workout);
    setCurrentExIdx(0);
    setWorkoutStartTime(Date.now());
    setExModified({});
    setTimerActive(false);
    setTimerRemaining(0);
    setTimerDone(false);
    setTimerTotal(0);
    setRestActive(false);
    setRestRemaining(0);

    if (workout[0]?.duration) {
      setTimeout(() => startExerciseTimer(workout[0].duration as number), 450);
    }
  }

  function markExercise(action: 'done' | 'easier' | 'skip') {
    if (!currentWorkout) return;
    const ex = currentWorkout[currentExIdx];
    const newMod = { ...exModified };
    if (action !== 'done') newMod[`${ex.id}_${currentExIdx}`] = action;
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
    const isLast = currentExIdx >= currentWorkout.length - 1;
    if (isLast) {
      const dur = Math.max(1, Math.round((Date.now() - (workoutStartTime || Date.now())) / 60000));
      setExModified(newMod);
      setWorkoutDuration(dur);
      setTimerActive(false);
      setTimerDone(false);
      setScreen('feedback');
    } else {
      setExModified(newMod);
      setTimerActive(false);
      setTimerRemaining(0);
      setTimerDone(false);
      startRest(currentExIdx + 1);
    }
  }

  function saveFeedback() {
    const session: WorkoutSession = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      duration: workoutDuration || 0,
      completed: true,
      difficulty: fbDifficulty,
      mood: fbMood,
      note: fbNote,
      exercises: (currentWorkout || []).map((ex, i) => ({
        id: ex.id,
        name: ex.name,
        modified: exModified[`${ex.id}_${i}`] || null,
      })),
    };
    const nh = [...history, session];
    saveHistory(nh);
    setHistory(nh);
    setScreen('today');
    setActiveTab('heute');
    setCurrentWorkout(null);
    setFbDifficulty(5);
    setFbMood('gut');
    setFbNote('');
  }

  function resetProfile() {
    if (!confirm('Profil & alle Trainingsdaten löschen?')) return;
    clearAll();
    setProfile(null);
    setHistory([]);
    setScreen('onboarding');
    setOnboardingStep(0);
    setOb(DEFAULT_ONBOARDING);
  }

  if (!initialized) {
    return (
      <div className="fixed inset-0 bg-bg text-text font-sans">
        <div className="relative mx-auto h-full max-w-[430px] overflow-hidden bg-bg">
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
            <Logo size={64} />
          </div>
        </div>
      </div>
    );
  }

  const inWorkout = screen === 'workout';
  const inFeedback = screen === 'feedback';
  const inOnboarding = screen === 'onboarding';
  const showBottomNav = !inOnboarding && !inWorkout && !inFeedback;

  return (
    <div className="fixed inset-0 bg-bg text-text font-sans">
      <div className="relative mx-auto h-full max-w-[430px] overflow-hidden bg-bg">
        {inOnboarding && (
          <OnboardingScreen
            step={onboardingStep}
            ob={ob}
            onSetField={setObField}
            onToggleArray={toggleObArray}
            onNext={nextOnboarding}
            onPrev={prevOnboarding}
            onFinish={finishOnboarding}
          />
        )}

        {!inOnboarding && !inWorkout && !inFeedback && activeTab === 'heute' && (
          <TodayScreen
            profile={profile}
            history={history}
            energyLevel={energyLevel}
            selectedTime={selectedTime}
            onSetEnergy={setEnergyLevel}
            onSetTime={setSelectedTime}
            onStartWorkout={startWorkout}
          />
        )}

        {inWorkout && currentWorkout && (
          <WorkoutScreen
            workout={currentWorkout}
            currentExIdx={currentExIdx}
            timerActive={timerActive}
            timerRemaining={timerRemaining}
            timerTotal={timerTotal}
            timerDone={timerDone}
            restActive={restActive}
            restRemaining={restRemaining}
            restTotal={REST_SECONDS}
            onSkipRest={skipRest}
            onDone={() => markExercise('done')}
            onEasier={() => markExercise('easier')}
            onSkip={() => markExercise('skip')}
          />
        )}

        {inFeedback && (
          <FeedbackScreen
            workoutDuration={workoutDuration}
            fbDifficulty={fbDifficulty}
            fbMood={fbMood}
            fbNote={fbNote}
            onSetDifficulty={setFbDifficulty}
            onSetMood={setFbMood}
            onSetNote={setFbNote}
            onSave={saveFeedback}
          />
        )}

        {!inOnboarding && !inWorkout && !inFeedback && activeTab === 'uebungen' && <ExerciseLibraryScreen />}

        {!inOnboarding && !inWorkout && !inFeedback && activeTab === 'fortschritt' && (
          <ProgressScreen history={history} />
        )}

        {!inOnboarding && !inWorkout && !inFeedback && activeTab === 'profil' && (
          <ProfileScreen
            profile={profile}
            darkMode={darkMode}
            onToggleDark={() => setDarkMode((d) => !d)}
            onReset={resetProfile}
          />
        )}

        {showBottomNav && <BottomNav activeTab={activeTab} onChange={setActiveTab} />}

        {/* Blend with the Dynamic Island / notch cutout, which iOS always renders pure black */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-50 bg-black"
          style={{ height: 'env(safe-area-inset-top)' }}
        />
      </div>
    </div>
  );
}
