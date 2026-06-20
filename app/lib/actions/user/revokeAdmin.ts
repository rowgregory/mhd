"use server";

import { Result } from "@/types/user.types";
import { requireAdmin } from "../../utils/dashboard.utils";
import prisma from "@/prisma/client";
import { createLog } from "../../utils/log.server.utils";
import { LogCategory, LogLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function revokeAdmin(userId: string): Promise<Result> {
  const actor = await requireAdmin();
  if (!actor) return { success: false, error: "Not authorized." };

  if (actor.role !== "SUPER_USER") {
    return { success: false, error: "Only a super user can remove admins." };
  }
  // Don't let someone revoke themselves (avoids locking yourself out).
  if (actor.id === userId) {
    return { success: false, error: "You can't revoke your own access." };
  }

  try {
    const row = await prisma.user.update({
      where: { id: userId },
      data: { role: "CLIENT" },
      select: { email: true },
    });
    await createLog(
      LogLevel.WARN,
      `${actor.name ?? actor.email} revoked admin access from ${row.email}`,
      { category: LogCategory.USER, metadata: { userId } },
    );
    revalidatePath("/dashboard/users");
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Could not revoke access." };
  }
}
