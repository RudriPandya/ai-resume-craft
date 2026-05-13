interface InkwellMarkProps {
  className?: string;
}

/**
 * Stroke-based inkwell icon mark — mirrors lucide-react's stroke style
 * so it inherits color via `currentColor` / Tailwind `text-*` classes.
 */
export function InkwellMark({ className = "" }: InkwellMarkProps) {
  return (
    <svg
      viewBox="0 0 14 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Vessel body: neck narrows then shoulders widen into body */}
      <path d="M4 4 L4 7 C2.2 7.8 1 9.8 1 12 L1 14 C1 15.9 3.7 17 7 17 C10.3 17 13 15.9 13 14 L13 12 C13 9.8 11.8 7.8 10 7 L10 4" />
      {/* Opening arc — the mouth of the inkwell */}
      <path d="M4 4 C4 2.4 10 2.4 10 4" />
      {/* Ink dot — filled accent circle visible inside the opening */}
      <circle cx="7" cy="4" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}
