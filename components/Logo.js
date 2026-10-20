// Relay wordmark: a baton passing between two hands, drawn as two offset bars,
// then the name. Drawn in currentColor; the baton uses the accent.
export default function Logo({ className = "", label }) {
  return (
    <svg className={className} viewBox="0 0 290 64" role="img" aria-label={label}>
      <path d="M6 44L30 14h14L20 44z" fill="currentColor" />
      <path d="M26 50L50 20h14L40 50z" fill="var(--green)" />
      <text x="76" y="44" fill="currentColor" className="logo-word">
        relay
      </text>
      <text x="192" y="44" fill="currentColor" className="logo-sub">
        PARTNERS
      </text>
    </svg>
  );
}
