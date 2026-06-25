"use server";

import { InquiryStatus } from "@prisma/client";
import { requireAdmin } from "../../utils/dashboard.utils";
import prisma from "@/prisma/client";

/** List inquiries, optionally filtered by status, newest first. */
export async function listInquiries(status?: InquiryStatus | "ALL") {
  const actor = await requireAdmin();
  if (!actor) return { success: false as const, error: "Unauthorized" };

  const where = status && status !== "ALL" ? { status } : {};

  const inquiries = await prisma.inquiry
    .findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        message: true,
        status: true,
        createdAt: true,
      },
    })
    .catch(() => null);

  if (!inquiries) {
    return { success: false as const, error: "Could not load inquiries" };
  }

  // Serialize Date → string before the client boundary.
  const data = inquiries.map((i) => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
  }));

  return { success: true as const, data };
}
