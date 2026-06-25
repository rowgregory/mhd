import prisma from "@/prisma/client";

export async function listTestimonials() {
  try {
    const rows = await prisma.testimonial.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        title: true,
        company: true,
        quote: true,
      },
    });
    return { success: true as const, data: rows };
  } catch {
    return { success: false as const, error: "Could not load testimonials." };
  }
}
