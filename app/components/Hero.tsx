import Picture from "./ui/Picture";
import ArrowButton from "./ui/ArrowButton";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-svh w-full overflow-hidden bg-ink"
    >
      {/* Background image — decorative, so empty alt. Real meaning is in the text.
          hero-zoom: slow 10s push on load (clipped by section overflow-hidden). */}
      <Picture
        priority
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        fill
        className="hero-zoom absolute inset-0 h-full w-full object-cover"
      />

      {/* Scrim: darkens the photo so bone text always clears WCAG contrast.
          Heavier at the vertical center where the headline sits. */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-ink/70 via-ink/30 to-ink/70"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-4 pb-20 pt-40 text-center sm:px-6 sm:pt-44">
        <h1
          id="hero-heading"
          className="font-display text-[clamp(3rem,14vw,8rem)] uppercase leading-[0.92] tracking-[0.02em] text-bone"
        >
          <span className="hero-line-mask block">
            <span
              className="hero-line whitespace-nowrap"
              style={{ animationDelay: "0.15s" }}
            >
              Built to last
            </span>
          </span>
        </h1>

        <p
          className="hero-rise-item mt-4 text-[clamp(15px,3.4vw,32px)] uppercase tracking-[0.12em] text-bone/85"
          style={{ animationDelay: "0.65s" }}
        >
          Custom cabinetry &amp; fine woodwork
        </p>

        <ArrowButton
          href="/projects"
          variant="camel"
          ariaLabel="View our work"
          className="hero-rise-item mt-8"
          style={{ animationDelay: "0.85s" }}
        >
          View our work
        </ArrowButton>
      </div>

      {/* Scroll cue (decorative) */}
      <div
        aria-hidden="true"
        className="hero-rise-item absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3"
        style={{ animationDelay: "1.05s" }}
      >
        <span className="uppercase text-[17px] tracking-[1px] text-bone/80">
          Scroll
        </span>
        <span className="h-10 w-px bg-bone/80" />
      </div>
    </section>
  );
}
