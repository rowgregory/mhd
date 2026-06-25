import prisma from "@/prisma/client";
import { ProjectRecord, Result } from "@/types/project.types";
import { requireAdmin } from "../../utils/dashboard.utils";
import { projectSelect } from "../../selects/projects.selects";

export async function getProject(id: string): Promise<Result<ProjectRecord>> {
  const actor = await requireAdmin();
  if (!actor) return { success: false, error: "Not authorized." };

  try {
    const row = await prisma.project.findUnique({
      where: { id },
      select: projectSelect,
    });
    if (!row) return { success: false, error: "Project not found." };
    return { success: true, data: row };
  } catch {
    return { success: false, error: "Could not load project." };
  }
}
