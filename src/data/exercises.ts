import type { CoachStyle, Equipment, Exercise, Goal, Level, Restriction } from '../types';

export const EXERCISES: Exercise[] = [
  // WARM-UP
  { id: 'jumping_jacks', name: 'Jumping Jacks', phase: 'warmup', equipment: [], restrictions: [], reps: null, duration: 40, description: 'Arme und Beine gleichzeitig spreizen und schließen – schön locker bleiben.', easier: 'Marching on the Spot', harder: 'High Knees', difficulty: 1 },
  { id: 'high_knees', name: 'High Knees', phase: 'warmup', equipment: [], restrictions: ['knie'], reps: null, duration: 40, description: 'Knie abwechselnd hoch zur Brust ziehen, Tempo gleichmäßig halten.', easier: 'Marching on the Spot', harder: 'Sprint-Knieheben', difficulty: 2 },
  { id: 'cat_cow', name: 'Cat-Cow', phase: 'warmup', equipment: ['matte'], restrictions: ['knie'], reps: 12, duration: null, description: 'Rücken rund machen (Katze) und hohlkreuzen (Kuh). Wer hätte das gedacht.', easier: null, harder: null, difficulty: 1 },
  { id: 'good_mornings_w', name: 'Good Mornings', phase: 'warmup', equipment: [], restrictions: ['rücken'], reps: 12, duration: null, description: 'Hände am Hinterkopf, langsam nach vorne beugen – Rücken gerade halten.', easier: 'Mini Bereich', harder: 'Mit Gewicht', difficulty: 1 },
  // KRAFT
  { id: 'squats', name: 'Squats', phase: 'kraft', equipment: [], restrictions: ['knie'], reps: 20, duration: null, description: 'Füße schulterbreit, Knie über Zehen, tief in die Hocke. König der Übungen.', easier: 'Sit-to-Stand', harder: 'Jump Squats', difficulty: 2 },
  { id: 'pushups', name: 'Push-ups', phase: 'kraft', equipment: [], restrictions: ['handgelenke', 'schulter'], reps: 12, duration: null, description: 'Körper gerade wie ein Brett, Brust fast den Boden berühren. Fast.', easier: 'Incline Push-ups', harder: 'Diamond Push-ups', difficulty: 3 },
  { id: 'incline_pushups', name: 'Incline Push-ups', phase: 'kraft', equipment: [], restrictions: ['handgelenke', 'schulter'], reps: 15, duration: null, description: 'Hände auf erhöhter Fläche (Stuhl, Sofa), kontrolliert auf und ab.', easier: 'Wall Push-ups', harder: 'Push-ups', difficulty: 2 },
  { id: 'lunges', name: 'Lunges', phase: 'kraft', equipment: [], restrictions: ['knie'], reps: 12, duration: null, description: 'Ausfallschritt vorwärts: hinteres Knie geht fast auf den Boden. 12 pro Seite.', easier: 'Half Lunge', harder: 'Reverse Lunges', difficulty: 3 },
  { id: 'glute_bridges', name: 'Glute Bridges', phase: 'kraft', equipment: ['matte'], restrictions: ['rücken'], reps: 18, duration: null, description: 'Rücken flach am Boden, Hüfte zur Decke drücken und kurz oben halten.', easier: null, harder: 'Single-leg Bridge', difficulty: 1 },
  { id: 'wall_sit', name: 'Wall Sit', phase: 'kraft', equipment: [], restrictions: ['knie'], reps: null, duration: 40, description: 'Rücken an der Wand, Knie 90°. Halten bis die Oberschenkel sich melden.', easier: 'High Wall Sit', harder: 'Wall Sit + Arm Raise', difficulty: 3 },
  { id: 'step_ups', name: 'Step-ups', phase: 'kraft', equipment: [], restrictions: ['knie'], reps: 14, duration: null, description: 'Auf eine Stufe steigen, sauber abrollen – 14 pro Seite.', easier: 'Langsame Variante', harder: 'Step-up + Knieheben', difficulty: 2 },
  { id: 'calf_raises', name: 'Calf Raises', phase: 'kraft', equipment: [], restrictions: [], reps: 25, duration: null, description: 'Auf Zehenspitzen steigen und langsam wieder senken. Unterschätz die Waden nicht.', easier: 'Sitzende Variante', harder: 'Einbeinig', difficulty: 1 },
  { id: 'bear_crawl', name: 'Bear Crawl', phase: 'kraft', equipment: [], restrictions: ['handgelenke', 'schulter'], reps: null, duration: 30, description: 'Auf Händen und Knien vorwärts kriechen, Knie leicht vom Boden – ja, das ist eine Übung.', easier: 'Bird Dog', harder: 'Bear Crawl + Reach', difficulty: 3 },
  { id: 'burpees', name: 'Burpees', phase: 'kraft', equipment: [], restrictions: ['rücken', 'knie', 'handgelenke'], reps: 10, duration: null, description: 'Plank – Push-up – Sprung. Der Klassiker der Selbstüberwindung. Zehn Stück.', easier: 'Step-Burpees', harder: 'Burpee + Tuck Jump', difficulty: 5 },
  { id: 'rows_band', name: 'Band Rows', phase: 'kraft', equipment: ['widerstandsband'], restrictions: ['schulter'], reps: 15, duration: null, description: 'Band befestigen, Ellbogen nah am Körper zurückziehen. Starker Rücken.', easier: 'Band Pull-Apart', harder: 'Band Row + 2s Hold', difficulty: 2 },
  { id: 'bicep_curl', name: 'Bizeps Curl (Band)', phase: 'kraft', equipment: ['widerstandsband'], restrictions: ['handgelenke'], reps: 15, duration: null, description: 'Band unter den Füßen, Arme wechselnd kontrolliert beugen.', easier: 'Langsamer Curl', harder: 'Isometrisch halten', difficulty: 2 },
  { id: 'overhead_press', name: 'Overhead Press', phase: 'kraft', equipment: ['kurzhanteln'], restrictions: ['schulter'], reps: 12, duration: null, description: 'Kurzhanteln auf Schulterhöhe, senkrecht nach oben drücken – kein Hohlkreuz.', easier: 'Seitliches Heben', harder: 'Arnold Press', difficulty: 3 },
  { id: 'rdl', name: 'Romanian Deadlift', phase: 'kraft', equipment: ['kurzhanteln'], restrictions: ['rücken'], reps: 12, duration: null, description: 'Hanteln nahe am Körper nach unten führen, Knie leicht gebeugt, Rücken gerade.', easier: 'Good Mornings', harder: 'Single-leg RDL', difficulty: 3 },
  { id: 'farmer_carry', name: 'Farmer Carry', phase: 'kraft', equipment: ['kurzhanteln'], restrictions: [], reps: null, duration: 40, description: 'Schwere Hanteln nehmen und aufrecht durch den Raum marschieren.', easier: 'Suitcase Carry', harder: 'Overhead Carry', difficulty: 2 },
  // CORE
  { id: 'plank', name: 'Plank', phase: 'core', equipment: [], restrictions: ['handgelenke', 'schulter', 'rücken'], reps: null, duration: 40, description: 'Körper gerade halten, Bauch angespannt, gleichmäßig atmen. Simpel. Brutal.', easier: 'Knien-Plank', harder: 'Plank + Leg Raise', difficulty: 2 },
  { id: 'side_plank', name: 'Side Plank', phase: 'core', equipment: [], restrictions: ['schulter', 'handgelenke'], reps: null, duration: 30, description: 'Auf der Seite stützen, Hüfte oben halten – pro Seite wiederholen.', easier: 'Knien-Side Plank', harder: 'Side Plank + Hip Dip', difficulty: 3 },
  { id: 'mountain_climbers', name: 'Mountain Climbers', phase: 'core', equipment: [], restrictions: ['handgelenke', 'schulter', 'rücken'], reps: null, duration: 40, description: 'In der Plank-Position Knie schnell wechselnd zur Brust ziehen.', easier: 'Slow Climbers', harder: 'Cross-body Climbers', difficulty: 3 },
  { id: 'dead_bug', name: 'Dead Bug', phase: 'core', equipment: ['matte'], restrictions: ['rücken'], reps: 12, duration: null, description: 'Rücken flach am Boden, Arme und Beine abwechselnd ausstrecken – Rücken bleibt unten!', easier: 'Nur Beinarbeit', harder: 'Mit Gewicht', difficulty: 2 },
  { id: 'hollow_hold', name: 'Hollow Hold', phase: 'core', equipment: ['matte'], restrictions: ['rücken'], reps: null, duration: 30, description: 'Rücken flach, Arme und Beine leicht vom Boden halten. Weniger ist hier mehr.', easier: 'Dead Bug', harder: 'Hollow Rock', difficulty: 3 },
  { id: 'sit_ups', name: 'Sit-ups', phase: 'core', equipment: ['matte'], restrictions: ['rücken'], reps: 18, duration: null, description: 'Hände hinter Kopf (nicht ziehen!), kontrolliert hoch und runter.', easier: 'Crunches', harder: 'V-ups', difficulty: 2 },
  { id: 'bird_dog', name: 'Bird Dog', phase: 'core', equipment: ['matte'], restrictions: ['handgelenke', 'knie'], reps: 12, duration: null, description: 'Arm und gegenüberliegendes Bein gleichzeitig ausstrecken – Stabilität zuerst.', easier: 'Nur Arm ausstrecken', harder: 'Bird Dog + Elbow-to-Knee', difficulty: 2 },
  { id: 'superman', name: 'Superman', phase: 'core', equipment: ['matte'], restrictions: ['rücken'], reps: 15, duration: null, description: 'Bauchlage: Arme und Beine gleichzeitig heben. Du weißt schon, wen das inspiriert hat.', easier: 'Nur Arme heben', harder: 'Superman + 2s Hold', difficulty: 2 },
  { id: 'shoulder_taps', name: 'Shoulder Taps', phase: 'core', equipment: [], restrictions: ['handgelenke', 'schulter'], reps: 20, duration: null, description: 'In der Plank, abwechselnd je Schulter antippen – Hüfte bleibt ruhig.', easier: 'Breiterer Stand', harder: 'Shoulder Taps + Push-up', difficulty: 3 },
  // COOLDOWN
  { id: 'hip_opener', name: 'Hip Opener', phase: 'cooldown', equipment: ['matte'], restrictions: ['knie'], reps: null, duration: 40, description: 'In der tiefen Hocke die Hüfte öffnen und mit dem Atem entspannen.', easier: 'Sitzende Variante', harder: 'Lizard Pose', difficulty: 1 },
  { id: 'mobility_flow', name: 'Mobility Flow', phase: 'cooldown', equipment: ['matte'], restrictions: [], reps: null, duration: 60, description: "Langsam durch Hip Opener, Cat-Cow und Child's Pose. Gönn dir das.", easier: 'Kürzerer Flow', harder: 'Längerer Flow', difficulty: 1 },
  { id: 'good_mornings_c', name: 'Good Mornings', phase: 'cooldown', equipment: [], restrictions: ['rücken'], reps: 12, duration: null, description: 'Hände am Hinterkopf, langsam nach vorne beugen – wohlige Dehnung.', easier: 'Kleiner Bereich', harder: 'Mit Gewicht', difficulty: 1 },
];

export const GOAL_OPTIONS: { id: Goal; label: string; desc: string }[] = [
  { id: 'kraft', label: 'Kraft', desc: 'Muskeln aufbauen & stärker werden' },
  { id: 'fettabbau', label: 'Fettabbau', desc: 'Körper straffen & Energie verbrennen' },
  { id: 'beweglichkeit', label: 'Beweglichkeit', desc: 'Flexibel & schmerzfrei bleiben' },
  { id: 'ausdauer', label: 'Ausdauer', desc: 'Herz & Lunge stärken' },
  { id: 'allgemein', label: 'Allgemeine Fitness', desc: 'Alles ein bisschen — bester Plan' },
];

export const LEVEL_OPTIONS: { id: Level; label: string; desc: string }[] = [
  { id: 'anfaenger', label: 'Anfänger', desc: 'Ich fange neu an' },
  { id: 'wiedereinstieg', label: 'Wiedereinstieg', desc: 'War schon mal aktiv dabei' },
  { id: 'fortgeschritten', label: 'Fortgeschritten', desc: 'Ich kenne mich aus' },
];

export const EQUIPMENT_OPTIONS: { id: Equipment; label: string; desc: string }[] = [
  { id: 'keins', label: 'Kein Equipment', desc: 'Nur Körpergewicht' },
  { id: 'matte', label: 'Matte', desc: 'Für Bodenübungen' },
  { id: 'kurzhanteln', label: 'Kurzhanteln', desc: 'Mehr Widerstand' },
  { id: 'widerstandsband', label: 'Widerstandsband', desc: 'Flexibel & leise' },
  { id: 'klimmzugstange', label: 'Klimmzugstange', desc: 'Oberkörper-Kraft' },
];

export const RESTRICTION_OPTIONS: { id: Restriction; label: string; desc: string }[] = [
  { id: 'keine', label: 'Keine Einschränkungen', desc: 'Alles okay' },
  { id: 'rücken', label: 'Rücken', desc: 'Rückenbereich schonen' },
  { id: 'knie', label: 'Knie', desc: 'Knie entlasten' },
  { id: 'schulter', label: 'Schulter', desc: 'Schulter schonen' },
  { id: 'handgelenke', label: 'Handgelenke', desc: 'Stütz-Übungen reduzieren' },
];

export const COACH_OPTIONS: { id: CoachStyle; label: string; desc: string }[] = [
  { id: 'freundlich', label: 'Freundlich', desc: 'Sanft & ermutigend' },
  { id: 'direkt', label: 'Direkt', desc: 'Klar & ohne Umschweife' },
  { id: 'humorvoll', label: 'Humorvoll', desc: 'Mit Augenzwinkern' },
  { id: 'streng', label: 'Streng', desc: 'Kein Weichkram' },
];

export const TIME_OPTIONS = [10, 15, 20, 30, 45] as const;
export const FREQUENCY_OPTIONS = [2, 3, 4, 5] as const;

export const DIFFICULTY_LABELS = [
  '',
  'Minimal',
  'Sehr leicht',
  'Leicht',
  'Machbar',
  'Genau richtig',
  'Etwas fordernd',
  'Anstrengend',
  'Hart',
  'Sehr hart',
  'Maximum',
];

export const MOOD_OPTIONS: { value: 'schlecht' | 'neutral' | 'gut' | 'super'; label: string }[] = [
  { value: 'schlecht', label: 'Mies' },
  { value: 'neutral', label: 'Okay' },
  { value: 'gut', label: 'Gut' },
  { value: 'super', label: 'Mega' },
];
