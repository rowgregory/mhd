"use server";

import { Result } from "@/types/testimonial.types";
import { requireAdmin } from "../../utils/dashboard.utils";
import prisma from "@/prisma/client";
import { createLog } from "../../utils/log.server.utils";
import { LogCategory, LogLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function toggleTestimonialVisibility(
  id: string,
  isVisible: boolean,
): Promise<Result> {
  const actor = await requireAdmin();
  if (!actor) {
    return { success: false, error: "Not authorized." };
  }
  try {
    const row = await prisma.testimonial.update({
      where: { id },
      data: { isVisible },
      select: { name: true },
    });
    await createLog(
      LogLevel.INFO,
      `${actor.name ?? actor.email} ${
        isVisible ? "showed" : "hid"
      } the testimonial for ${row.name}`,
      {
        category: LogCategory.TESTIMONIAL,
        metadata: { testimonialId: id, isVisible },
      },
    );
    revalidatePath("/dashboard/testimonials");
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Could not update visibility." };
  }
}
