import { listTestimonials } from "@/app/lib/actions/testimonial/listTestimonials";
import HomeClient from "./HomeClient";
import { listProjects } from "@/app/lib/actions/project";

export default async function HomePage() {
  const testimonialsResult = await listTestimonials();
  const projectsResult = await listProjects();
  const testimonials = testimonialsResult.success
    ? testimonialsResult.data
    : [];
  const projects = projectsResult.success ? projectsResult.data : [];
  return <HomeClient testimonials={testimonials} projects={projects} />;
}
