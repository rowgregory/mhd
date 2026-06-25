import { listTestimonials } from "@/app/lib/actions/testimonial/listTestimonials";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const result = await listTestimonials();
  const testimonials = result.success ? result.data : [];
  return <HomeClient testimonials={testimonials} />;
}
