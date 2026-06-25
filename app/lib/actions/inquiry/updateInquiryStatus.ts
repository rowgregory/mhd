"use server";

import { InquiryStatus } from "@prisma/client";
import { requireAdmin } from "../../utils/dashboard.utils";
import { VALID_STATUSES } from "../../constants/inquiry.constants";
import prisma from "@/prisma/client";
import { createLog } from "../../utils/log.server.utils";
import { revalidatePath } from "next/cache";

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  const actor = await requireAdmin();
  if (!actor) return { success: false as const, error: "Unauthorized" };

  if (!VALID_STATUSES.includes(status)) {
    return { success: false as const, error: "Invalid status" };
  }

  const updated = await prisma.inquiry
    .update({
      where: { id },
      data: { status },
      select: { id: true, status: true },
    })
    .catch(() => null);

  if (!updated) {
    return { success: false as const, error: "Could not update inquiry" };
  }

  await createLog("INFO", `Inquiry status changed to ${status}`, {
    category: "INQUIRY",
    metadata: { inquiryId: id, status, by: actor.email },
  });

  revalidatePath("/dashboard/inquiries");
  return { success: true as const, data: updated };
}
