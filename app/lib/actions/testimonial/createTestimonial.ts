"use server";

import {
  Result,
  TestimonialInput,
  TestimonialRecord,
} from "@/types/testimonial.types";
import { requireAdmin } from "../../utils/dashboard.utils";
import prisma from "@/prisma/client";
import { createLog } from "../../utils/log.server.utils";
import { LogCategory, LogLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createTestimonial(
  input: TestimonialInput,
): Promise<Result<TestimonialRecord>> {
  const actor = await requireAdmin();
  if (!actor) return { success: false, error: "Not authorized." };

  const name = input.name?.trim();
  const quote = input.quote?.trim();

  if (!name || !quote) {
    return { success: false, error: "Name and quote are required." };
  }

  try {
    const row = await prisma.testimonial.create({
      data: {
        name,
        title: input.title?.trim() || null,
        company: input.company?.trim() || null,
        quote,
        order: input.order ?? 0,
        isVisible: input.isVisible ?? true,
      },
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
    await createLog(
      LogLevel.INFO,
      `${actor.name ?? actor.email} created a testimonial for ${row.name}`,
      {
        category: LogCategory.TESTIMONIAL,
        metadata: { testimonialId: row.id },
      },
    );
    revalidatePath("/dashboard/testimonials");
    return { success: true, data: row };
  } catch {
    return { success: false, error: "Could not create testimonial." };
  }
}
