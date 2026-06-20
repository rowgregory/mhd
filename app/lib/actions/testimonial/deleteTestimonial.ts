"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { LogLevel, LogCategory } from "@prisma/client";
import { requireAdmin } from "../../utils/dashboard.utils";
import { createLog } from "../../utils/log.server.utils";
import { Result } from "@/types/testimonial.types";

export async function deleteTestimonial(id: string): Promise<Result> {
  const actor = await requireAdmin();
  if (!actor) {
    return { success: false, error: "Not authorized." };
  }
  try {
    const row = await prisma.testimonial.delete({
      where: { id },
      select: { name: true },
    });
    await createLog(
      LogLevel.WARN,
      `${actor.name ?? actor.email} deleted the testimonial for ${row.name}`,
      { category: LogCategory.TESTIMONIAL, metadata: { testimonialId: id } },
    );
    revalidatePath("/dashboard/testimonials");
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Could not delete testimonial." };
  }
}
