import AboutFooterBanner from "@/app/(public)/about/components/AboutFooterBanner";
import OfferingsShowcase from "@/app/(public)/about/components/OfferingsShowcase";
import RecentProjects from "@/app/(public)/about/components/RecentProjects";
import DreamCta from "@/app/(public)/about/components/DreamCta";
import PageHero from "@/app/components/PageHero";
import StatsCounter from "@/app/(public)/about/components/StatsCounter";
import { PortfolioProject } from "@/types/project.types";
import Feature from "../(home)/components/Feature";

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
