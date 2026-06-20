import { Result, TestimonialRecord } from "@/types/testimonial.types";
import { requireAdmin } from "../../utils/dashboard.utils";
import prisma from "@/prisma/client";

export async function listTestimonials(): Promise<Result<TestimonialRecord[]>> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Not authorized." };
  }
  try {
    const rows = await prisma.testimonial.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        title: true,
        company: true,
        quote: true,
        order: true,
        isVisible: true,
      },
    });
    return { success: true, data: rows };
  } catch {
    return { success: false, error: "Could not load testimonials." };
  }
}
