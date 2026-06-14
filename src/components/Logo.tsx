interface LogoProps {
  size?: number;
  rounded?: number;
}

export default function Logo({ size = 64, rounded = 18 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect width="64" height="64" rx={rounded} fill="#d93b2f" />
      <polygon points="32,14 38,32 32,37 26,32" fill="white" />
      <polygon points="32,50 38,32 32,37 26,32" fill="rgba(255,255,255,0.28)" />
      <circle cx="32" cy="32" r="3" fill="#d93b2f" />
    </svg>
  );
}
