/** Original mark inspired by the 8-point star + M of the Cairo Metro identity. */
export default function Logo({ className = 'text-white' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g fill="currentColor">
        <rect x="8" y="8" width="24" height="24" rx="3" />
        <rect x="8" y="8" width="24" height="24" rx="3" transform="rotate(45 20 20)" />
      </g>
      <text x="20" y="26" textAnchor="middle" fontSize="17" fontWeight="800" className="fill-navy font-display">M</text>
    </svg>
  );
}
