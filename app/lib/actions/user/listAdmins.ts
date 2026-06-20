import { Result, UserRecord } from "@/types/user.types";
import { requireAdmin } from "../../utils/dashboard.utils";
import prisma from "@/prisma/client";
import { userSelect } from "../../selects/user.selects";

export async function listAdmins(): Promise<Result<UserRecord[]>> {
  if (!(await requireAdmin())) {
    return { success: false, error: "Not authorized." };
  }
  try {
    const rows = await prisma.user.findMany({
      where: { role: { in: ["ADMIN", "SUPER_USER"] } },
      orderBy: [{ role: "asc" }, { createdAt: "asc" }],
      select: userSelect,
    });
    return { success: true, data: rows };
  } catch {
    return { success: false, error: "Could not load admins." };
  }
}
