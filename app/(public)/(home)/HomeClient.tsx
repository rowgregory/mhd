import About from "./components/About";
import Collections from "./components/Collections";
import Feature from "./components/Feature";
import Offerings from "./components/Offerings";
import Work from "./components/Work";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { ProjectRecord } from "@/types/project.types";
import Testimonials from "./components/Testimonials";
import { TestimonialRecord } from "@/types/testimonial.types";

export default function HomeClient({
  testimonials,
  projects,
}: {
  testimonials: TestimonialRecord[] | undefined;
  projects: ProjectRecord[] | undefined;
}) {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Feature />
      <Offerings />
      <Work projects={projects} />
      <Collections />
      <Testimonials testimonials={testimonials} />
    </main>
  );
}
