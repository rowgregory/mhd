import prisma from "@/prisma/client";
import { requireAdmin } from "../../utils/dashboard.utils";

export async function getInquiryCounts() {
  const actor = await requireAdmin();
  if (!actor) return { success: false as const, error: "Unauthorized" };

  const grouped = await prisma.inquiry
    .groupBy({ by: ["status"], _count: { _all: true } })
    .catch(() => null);

  if (!grouped) {
    return { success: false as const, error: "Could not load counts" };
  }

  const counts: Record<string, number> = { ALL: 0 };
  for (const g of grouped) {
    counts[g.status] = g._count._all;
    counts.ALL += g._count._all;
  }

  return { success: true as const, data: counts };
}
