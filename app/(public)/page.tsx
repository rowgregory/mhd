import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main>
      {/* Header + Hero share one stacking context so the header scrolls away
          with the hero (it's absolutely positioned inside, not fixed). */}
      <div className="relative">
        <Header />
        <Hero />
      </div>

      {/* Next section (e.g. the camel "about" band) goes here */}
    </main>
  );
}
