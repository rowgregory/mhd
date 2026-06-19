{
  /* Wood-grain texture — pure CSS, no image. Two layers of low-contrast 
     repeating gradients (fine grain + occasional darker "ring" lines)
     over the camel band. Decorative, so aria-hidden. Flips with the
     token in dark mode automatically since it sits on bg-camel. 
  */
}

export function WoodGrainTexture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0 2px, rgba(28,26,23,0.6) 2px 3px, transparent 3px 7px), repeating-linear-gradient(90deg, transparent 0 23px, rgba(28,26,23,0.9) 23px 24px, transparent 24px 60px)",
      }}
    />
  );
}
