import prisma from "@/prisma/client";
import { ProjectRecord, Result } from "@/types/project.types";
import { projectSelect } from "../../selects/projects.selects";

export async function listProjects(): Promise<Result<ProjectRecord[]>> {
  try {
    const rows = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      select: projectSelect,
    });
    return { success: true, data: rows };
  } catch {
    return { success: false, error: "Could not load projects." };
  }
}
