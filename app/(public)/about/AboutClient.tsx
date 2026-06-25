import AboutFooterBanner from "@/app/components/AboutFooterBanner";
import Feature from "@/app/components/blocks/FeatureBlock";
import OfferingsShowcase from "@/app/components/blocks/OfferingsShowcase";
import RecentProjects from "@/app/components/blocks/RecentProjects";
import DreamCta from "@/app/components/DreamCta";
import PageHero from "@/app/components/PageHero";
import StatsCounter from "@/app/components/StatsCounter";
import { PortfolioProject } from "@/types/project.types";

export function AboutClient({
  projects,
  description,
}: {
  projects: PortfolioProject[];
  description: string;
}) {
  return (
    <>
      <PageHero
        title="About"
        src="/images/about.jpg"
        eyebrow="Craftsmanship in every detail"
        height="md"
      />
      <Feature />
      <StatsCounter />
      <RecentProjects projects={projects} description={description} />
      <DreamCta />
      <OfferingsShowcase />
      <AboutFooterBanner />
    </>
  );
}
