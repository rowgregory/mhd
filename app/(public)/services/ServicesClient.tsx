import PageHero from "@/app/components/PageHero";
import ServicesFeatures from "@/app/components/ServicesFeatures";
import WhatWeDo from "./WhatWeDo";
import VideoBanner from "./VideoBanner";
import Materials from "./Materials";

export function ServicesClient() {
  return (
    <>
      <PageHero
        title="Services"
        src="/images/services.jpg"
        eyebrow="What we do, done right"
        height="md"
      />
      <ServicesFeatures />
      <WhatWeDo />
      <VideoBanner
        src="/images/video-banner.jpg"
        videoUrl="https://www.youtube.com/embed/YOUR_ID?autoplay=1&rel=0"
        height="md"
      />
      <Materials />
    </>
  );
}
