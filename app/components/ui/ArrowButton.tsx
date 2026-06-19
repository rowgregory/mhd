import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CSSProperties } from "react";

type Variant = "camel" | "taupe" | "brass" | "ink";
type Size = "sm" | "md" | "lg";

type ArrowButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
  style?: CSSProperties;
};

// Hover always lands on a tone that contrasts with the page surface
// (never bone-on-bone, which vanishes into a light-mode background).
const VARIANTS: Record<Variant, string> = {
  camel:
    "bg-camel-light text-bone hover:bg-espresso dark:hover:bg-accent dark:hover:text-accent-fg",
  taupe: "bg-taupe-raw text-bone hover:bg-bone hover:text-espresso-raw",
  brass: "bg-accent text-accent-fg hover:bg-brass-light",
  ink: "bg-espresso text-bone hover:bg-accent hover:text-accent-fg",
};

// Padding + text size presets. arrow/line scale to match each size.
const SIZES: Record<
  Size,
  { box: string; text: string; icon: number; line: string }
> = {
  sm: {
    box: "px-4 py-2.5 sm:px-5",
    text: "text-sm",
    icon: 15,
    line: "group-hover:w-3.5",
  },
  md: {
    box: "px-6 py-3.5 sm:px-8",
    text: "text-lg",
    icon: 18,
    line: "group-hover:w-5",
  },
  lg: {
    box: "px-8 py-4 sm:px-10",
    text: "text-xl",
    icon: 20,
    line: "group-hover:w-6",
  },
};

export default function ArrowButton({
  href,
  children,
  variant = "camel",
  size = "md",
  className = "",
  ariaLabel,
  style,
}: ArrowButtonProps) {
  const s = SIZES[size];

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      style={style}
      className={`group inline-flex items-center font-display uppercase tracking-[0.06em] transition-colors duration-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent ${s.box} ${s.text} ${VARIANTS[variant]} ${className}`}
    >
      {children}
      {/* Arrow leads on hover: a thin line draws out from the label and the
          arrowhead slides forward along it — tracing a path toward the action. */}
      <span aria-hidden="true" className="ml-3 inline-flex items-center">
        <span
          className={`block h-px w-0 origin-left bg-current opacity-60 transition-all duration-300 ease-out ${s.line}`}
        />
        <ArrowRight
          size={s.icon}
          strokeWidth={1.5}
          className="-ml-1 transition-transform duration-300 ease-out group-hover:translate-x-2"
        />
      </span>
    </Link>
  );
}
