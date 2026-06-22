import prisma from "@/prisma/client";

export async function getAllProjectIds(): Promise<string[]> {
  try {
    const rows = await prisma.project.findMany({ select: { id: true } });
    return rows.map((r) => r.id);
  } catch {
    return [];
  }
}
