import type { ReactNode } from 'react';

interface ExerciseIllustrationProps {
  exerciseId: string;
  size?: number;
  color?: string;
  className?: string;
}

const GOOD_MORNINGS: ReactNode = (
  <>
    <circle cx="30" cy="30" r="7" fill="currentColor" />
    <path d="M60 55 L35 35" />
    <path d="M33 27 L41 22" />
    <path d="M33 33 L41 38" />
    <path d="M60 55 L58 92" />
    <path d="M60 55 L70 92" />
  </>
);

const ILLUSTRATIONS: Record<string, ReactNode> = {
  jumping_jacks: (
    <>
      <circle cx="50" cy="14" r="7" fill="currentColor" />
      <path d="M50 21 L50 55" />
      <path d="M50 26 L28 8" />
      <path d="M50 26 L72 8" />
      <path d="M50 55 L28 92" />
      <path d="M50 55 L72 92" />
    </>
  ),
  high_knees: (
    <>
      <circle cx="45" cy="13" r="7" fill="currentColor" />
      <path d="M47 20 L53 52" />
      <path d="M53 52 L58 92" />
      <path d="M53 52 L33 42 L45 65" />
      <path d="M49 25 L68 38" />
      <path d="M49 25 L32 12" />
    </>
  ),
  cat_cow: (
    <>
      <circle cx="12" cy="32" r="6" fill="currentColor" />
      <path d="M15 34 Q50 24 85 40" />
      <path d="M18 37 L18 75" />
      <path d="M82 40 L82 75" />
    </>
  ),
  good_mornings_w: GOOD_MORNINGS,
  good_mornings_c: GOOD_MORNINGS,
  squats: (
    <>
      <circle cx="50" cy="14" r="7" fill="currentColor" />
      <path d="M50 21 L50 52" />
      <path d="M50 28 L78 22" />
      <path d="M50 52 L30 68 L28 92" />
      <path d="M50 52 L70 68 L72 92" />
    </>
  ),
  pushups: (
    <>
      <circle cx="12" cy="50" r="7" fill="currentColor" />
      <path d="M19 52 L85 58" />
      <path d="M35 55 L35 85" />
      <path d="M85 58 L95 80" />
    </>
  ),
  incline_pushups: (
    <>
      <circle cx="15" cy="40" r="7" fill="currentColor" />
      <path d="M22 45 L85 70" />
      <path d="M30 48 L30 75" />
      <path d="M20 75 L20 87 L45 87 L45 75 Z" />
      <path d="M85 70 L95 88" />
    </>
  ),
  lunges: (
    <>
      <circle cx="35" cy="13" r="7" fill="currentColor" />
      <path d="M37 20 L42 50" />
      <path d="M42 50 L58 65 L52 90" />
      <path d="M42 50 L30 68 L48 88" />
      <path d="M40 25 L38 45" />
    </>
  ),
  glute_bridges: (
    <>
      <circle cx="15" cy="82" r="7" fill="currentColor" />
      <path d="M22 82 L45 82 L62 64 L78 82" />
    </>
  ),
  wall_sit: (
    <>
      <path d="M82 5 L82 95" />
      <circle cx="78" cy="12" r="7" fill="currentColor" />
      <path d="M80 20 L80 55" />
      <path d="M80 55 L50 55" />
      <path d="M50 55 L50 92" />
      <path d="M78 28 L72 48" />
    </>
  ),
  step_ups: (
    <>
      <path d="M55 90 L55 72 L90 72 L90 90 Z" />
      <circle cx="40" cy="15" r="7" fill="currentColor" />
      <path d="M42 20 L55 55" />
      <path d="M55 55 L70 72" />
      <path d="M55 55 L40 75 L35 92" />
      <path d="M53 28 L62 40" />
    </>
  ),
  calf_raises: (
    <>
      <circle cx="50" cy="12" r="7" fill="currentColor" />
      <path d="M50 19 L50 80" />
      <path d="M50 80 L45 90 L48 94" />
      <path d="M50 80 L55 90 L58 94" />
      <path d="M47 30 L43 55" />
      <path d="M53 30 L57 55" />
    </>
  ),
  bear_crawl: (
    <>
      <circle cx="12" cy="38" r="6" fill="currentColor" />
      <path d="M15 40 L82 45" />
      <path d="M20 42 L15 65 L25 78" />
      <path d="M78 45 L85 68 L75 80" />
    </>
  ),
  burpees: (
    <>
      <circle cx="50" cy="12" r="7" fill="currentColor" />
      <path d="M50 19 L50 50" />
      <path d="M50 24 L30 5" />
      <path d="M50 24 L70 5" />
      <path d="M50 50 L30 90" />
      <path d="M50 50 L70 90" />
      <path d="M22 95 L34 95" />
      <path d="M66 95 L78 95" />
    </>
  ),
  rows_band: (
    <>
      <circle cx="75" cy="20" r="7" fill="currentColor" />
      <path d="M73 27 L60 55" />
      <path d="M60 55 L20 60" />
      <path d="M70 32 L50 38" />
      <path d="M50 38 L22 60" strokeDasharray="4 5" />
    </>
  ),
  bicep_curl: (
    <>
      <circle cx="50" cy="12" r="7" fill="currentColor" />
      <path d="M50 19 L50 60" />
      <path d="M50 60 L46 92" />
      <path d="M50 60 L54 92" />
      <path d="M44 25 L40 48 L48 28" />
      <circle cx="48" cy="26" r="5" />
      <path d="M56 25 L58 50" />
    </>
  ),
  overhead_press: (
    <>
      <circle cx="50" cy="16" r="7" fill="currentColor" />
      <path d="M50 23 L50 60" />
      <path d="M50 60 L46 92" />
      <path d="M50 60 L54 92" />
      <path d="M47 20 L35 3" />
      <path d="M53 20 L65 3" />
      <circle cx="35" cy="3" r="5" />
      <circle cx="65" cy="3" r="5" />
    </>
  ),
  rdl: (
    <>
      <circle cx="40" cy="15" r="7" fill="currentColor" />
      <path d="M42 22 L55 50" />
      <path d="M55 50 L58 90" />
      <path d="M61 50 L64 90" />
      <path d="M48 28 L45 65" />
      <circle cx="45" cy="69" r="5" />
    </>
  ),
  farmer_carry: (
    <>
      <circle cx="50" cy="13" r="7" fill="currentColor" />
      <path d="M50 20 L50 58" />
      <path d="M44 24 L40 55" />
      <circle cx="40" cy="60" r="5" />
      <path d="M56 24 L60 55" />
      <circle cx="60" cy="60" r="5" />
      <path d="M50 58 L40 92" />
      <path d="M50 58 L62 85" />
    </>
  ),
  plank: (
    <>
      <circle cx="12" cy="48" r="7" fill="currentColor" />
      <path d="M19 50 L85 56" />
      <path d="M35 52 L35 68 L45 85" />
      <path d="M85 56 L95 82" />
    </>
  ),
  side_plank: (
    <>
      <circle cx="15" cy="35" r="7" fill="currentColor" />
      <path d="M20 40 L75 75" />
      <path d="M30 45 L30 80" />
      <path d="M35 38 L20 15" />
      <path d="M75 75 L90 85" />
    </>
  ),
  mountain_climbers: (
    <>
      <circle cx="12" cy="48" r="7" fill="currentColor" />
      <path d="M19 50 L85 56" />
      <path d="M35 52 L35 85" />
      <path d="M85 56 L95 82" />
      <path d="M85 56 L65 75 L50 58" />
    </>
  ),
  dead_bug: (
    <>
      <circle cx="15" cy="50" r="7" fill="currentColor" />
      <path d="M22 52 L55 52" />
      <path d="M55 52 L80 35" />
      <path d="M55 52 L60 70 L50 75" />
      <path d="M30 50 L15 30" />
      <path d="M35 50 L40 40" />
    </>
  ),
  hollow_hold: (
    <>
      <circle cx="12" cy="45" r="7" fill="currentColor" />
      <path d="M19 48 Q50 65 85 48" />
      <path d="M19 48 L8 40" />
      <path d="M85 48 L96 41" />
    </>
  ),
  sit_ups: (
    <>
      <circle cx="30" cy="50" r="7" fill="currentColor" />
      <path d="M35 55 L55 82" />
      <path d="M55 82 L75 70 L90 82" />
      <path d="M28 55 L36 60" />
    </>
  ),
  bird_dog: (
    <>
      <circle cx="20" cy="38" r="6" fill="currentColor" />
      <path d="M25 40 L75 45" />
      <path d="M30 42 L30 75" />
      <path d="M70 45 L70 75" />
      <path d="M25 40 L8 35" />
      <path d="M75 45 L92 50" />
    </>
  ),
  superman: (
    <>
      <circle cx="18" cy="50" r="7" fill="currentColor" />
      <path d="M25 55 L70 55" />
      <path d="M25 53 L8 42" />
      <path d="M70 55 L90 45" />
    </>
  ),
  shoulder_taps: (
    <>
      <circle cx="12" cy="48" r="7" fill="currentColor" />
      <path d="M19 50 L85 56" />
      <path d="M40 52 L40 85" />
      <path d="M35 50 L22 42" />
      <path d="M85 56 L95 82" />
    </>
  ),
  hip_opener: (
    <>
      <circle cx="50" cy="30" r="7" fill="currentColor" />
      <path d="M50 37 L55 58" />
      <path d="M55 58 L35 75 L38 90" />
      <path d="M55 58 L75 72 L78 90" />
      <path d="M52 42 L40 75" />
    </>
  ),
  mobility_flow: (
    <>
      <circle cx="12" cy="76" r="6" fill="currentColor" />
      <path d="M18 78 L35 75 L70 80" />
      <path d="M70 80 L75 90" />
      <path d="M35 75 L15 78" />
    </>
  ),
};

const FALLBACK: ReactNode = (
  <>
    <circle cx="50" cy="14" r="7" fill="currentColor" />
    <path d="M50 21 L50 60" />
    <path d="M50 60 L35 92" />
    <path d="M50 60 L65 92" />
    <path d="M50 28 L32 40" />
    <path d="M50 28 L68 40" />
  </>
);

export default function ExerciseIllustration({ exerciseId, size = 120, color = 'currentColor', className }: ExerciseIllustrationProps) {
  const content = ILLUSTRATIONS[exerciseId] ?? FALLBACK;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {content}
    </svg>
  );
}
