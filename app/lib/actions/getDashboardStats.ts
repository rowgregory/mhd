"use server";

import prisma from "@/prisma/client";
import { getActor } from "./getActor";
import { Result } from "@/types/admin.types";

export async function getDashboardStats(): Promise<Result> {
  const actor = await getActor();
  if (!actor || (actor.role !== "ADMIN" && actor.role !== "SUPER_USER")) {
    return { success: false, error: "Not authorized." };
  }

  try {
    const [
      inquiriesTotal,
      inquiriesNew,
      latestInquiry,
      projectsTotal,
      latestProject,
      testimonialsTotal,
      testimonialsVisible,
      adminsTotal,
      recentInquiries,
    ] = await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
      prisma.inquiry.findFirst({
        orderBy: { createdAt: "desc" },
        select: { name: true, message: true },
      }),
      prisma.project.count(),
      prisma.project.findFirst({
        orderBy: { createdAt: "desc" },
        select: { title: true },
      }),
      prisma.testimonial.count(),
      prisma.testimonial.count({ where: { isVisible: true } }),
      prisma.user.count({
        where: { role: { in: ["ADMIN", "SUPER_USER"] } },
      }),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          message: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      success: true,
      data: {
        inquiries: {
          total: inquiriesTotal,
          new: inquiriesNew,
          latest: latestInquiry?.name ?? null,
        },
        projects: {
          total: projectsTotal,
          latest: latestProject?.title ?? null,
        },
        testimonials: {
          total: testimonialsTotal,
          visible: testimonialsVisible,
          hidden: testimonialsTotal - testimonialsVisible,
        },
        admins: { total: adminsTotal },
        recentInquiries,
      },
    };
  } catch {
    return { success: false, error: "Could not load dashboard stats." };
  }
}
