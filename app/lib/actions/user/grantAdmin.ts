"use server";

import { Result, UserRecord } from "@/types/user.types";
import { LogCategory, LogLevel, Role } from "@prisma/client";
import { requireAdmin } from "../../utils/dashboard.utils";
import prisma from "@/prisma/client";
import { userSelect } from "../../selects/user.selects";
import { createLog } from "../../utils/log.server.utils";
import { revalidatePath } from "next/cache";
import { EMAIL_REGEX } from "../../constants/regex.constants";

export async function grantAdmin(
  email: string,
  role: Extract<Role, "ADMIN" | "SUPER_USER">,
): Promise<Result<UserRecord>> {
  const actor = await requireAdmin();
  if (!actor) return { success: false, error: "Not authorized." };

  if (actor.role !== "SUPER_USER" && actor.role !== "ADMIN") {
    return { success: false, error: "Only a super user can add admins." };
  }

  const normalized = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalized)) {
    return { success: false, error: "Enter a valid email address." };
  }

  try {
    const row = await prisma.user.upsert({
      where: { email: normalized },
      update: { role },
      create: { email: normalized, role },
      select: userSelect,
    });
    await createLog(
      LogLevel.WARN,
      `${actor.name ?? actor.email} granted ${role} to ${normalized}`,
      { category: LogCategory.USER, metadata: { userId: row.id, role } },
    );
    revalidatePath("/dashboard/users");
    return { success: true, data: row };
  } catch {
    return { success: false, error: "Could not grant access." };
  }
}
