import About from "../../components/blocks/AboutBlock";
import Collections from "../../components/blocks/Collections";
import Feature from "../../components/blocks/FeatureBlock";
import Offerings from "../../components/blocks/OfferingsBlock";
import Work from "../../components/blocks/WorkBlock";
import Header from "../../components/Header";
import Hero from "../../components/Hero";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Header />
        <Hero />
        <About />
        <Feature />
        <Offerings />
        <Work />
        <Collections />
      </div>
    </main>
  );
}
