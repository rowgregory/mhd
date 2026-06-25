// Custom line-illustration icons drawn for large display sizes (~64–72px).
// All use currentColor + consistent strokeWidth so they theme via text-accent
// and read crisply far better than UI-scale icons enlarged. viewBox 0 0 64 64.

type IconProps = { className?: string };

const base = () => ({
  width: "100%",
  height: "100%",
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

/** Installation — cabinet with three stacked drawers and bar pulls. */
export function InstallIcon({ className }: IconProps) {
  return (
    <svg {...base()} className={className}>
      <rect x="10" y="10" width="44" height="44" />
      {/* drawer divisions */}
      <path d="M10 24 H54 M10 38 H54" />
      {/* bar pulls, one per drawer */}
      <path d="M28 15 H36 M28 31 H36 M28 45 H36" />
    </svg>
  );
}

/** Delivery — side-view hand truck with three stacked boxes. */
export function DeliveryIcon({ className }: IconProps) {
  return (
    <svg {...base()} className={className}>
      {/* handle + rail */}
      <path d="M15 9 L25 49" />
      {/* toe plate */}
      <path d="M25 49 L41 49" />
      {/* handle nub */}
      <path d="M13 9 L19 9" />
      {/* wheel */}
      <circle cx="23" cy="52" r="4.5" />
      {/* three stacked boxes */}
      <rect x="23" y="12" width="23" height="11" />
      <rect x="25" y="23" width="23" height="11" />
      <rect x="27" y="34" width="23" height="11" />
    </svg>
  );
}

/** Precision — measured drawing with dimension arrows. */
export function PrecisionIcon({ className }: IconProps) {
  return (
    <svg {...base()} className={className}>
      <rect x="24" y="14" width="30" height="36" />
      <path d="M24 32h16M40 14v36" />
      {/* vertical dimension line + arrows */}
      <path d="M14 14v36M14 14l-3 4M14 14l3 4M14 50l-3-4M14 50l3-4" />
    </svg>
  );
}

/** Quality — award rosette / seal. */
export function QualityIcon({ className }: IconProps) {
  return (
    <svg {...base()} className={className}>
      <circle cx="32" cy="26" r="16" />
      <circle cx="32" cy="26" r="9" />
      <path d="M24 39 19 54l13-7 13 7-5-15" />
    </svg>
  );
}
