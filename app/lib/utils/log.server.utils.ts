"use server";

import { headers } from "next/headers";
import prisma from "@/prisma/client";
import { LogLevel, LogCategory, Prisma } from "@prisma/client";
import { getActor } from "../actions/getActor";

// Severity ordering for gating. Anything below MIN_LEVEL is dropped before it
// hits the DB — keeps the table from bloating with DEBUG noise in prod.
const LEVEL_RANK: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};
const MIN_LEVEL: LogLevel =
  process.env.NODE_ENV === "production" ? LogLevel.INFO : LogLevel.DEBUG;

type CreateLogOptions = {
  category?: LogCategory;
  metadata?: Prisma.InputJsonValue;
  // pass false to skip the actor/IP capture (e.g. high-volume system logs)
  captureContext?: boolean;
};

export async function createLog(
  level: LogLevel,
  message: string,
  options: CreateLogOptions = {},
) {
  // Gate: drop anything below the threshold without touching the DB.
  if (LEVEL_RANK[level] < LEVEL_RANK[MIN_LEVEL]) return;

  const {
    category = LogCategory.GENERAL,
    metadata,
    captureContext = true,
  } = options;

  try {
    let actorId: string | null = null;
    let actorName: string | null = null;
    let ip: string | null = null;

    if (captureContext) {
      const [actor, ctx] = await Promise.all([getActor(), getRequestContext()]);
      actorId = actor?.id ?? null;
      actorName = actor?.name ?? null;
      ip = ctx.ip;
    }

    await prisma.log.create({
      data: {
        level,
        category,
        message,
        actorId,
        actorName,
        ip,
        // Json column: pass the value directly — Prisma serializes it.
        // Do NOT JSON.stringify (that double-encodes into a string).
        metadata: metadata ?? Prisma.JsonNull,
      },
    });
  } catch {
    // DB unreachable / logging must never throw — drop silently.
  }
}

export interface RequestContext {
  ip: string | null;
  userAgent: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  referer: string | null;
  origin: string | null;
  language: string | null;
}

function parseUserAgent(ua: string | null): {
  device: string;
  browser: string;
  os: string;
} {
  if (!ua) return { device: "Unknown", browser: "Unknown", os: "Unknown" };

  const device = /mobile|android|iphone|ipad|tablet/i.test(ua)
    ? /tablet|ipad/i.test(ua)
      ? "Tablet"
      : "Mobile"
    : "Desktop";

  const browser = /edg\//i.test(ua)
    ? "Edge"
    : /opr\//i.test(ua)
      ? "Opera"
      : /chrome/i.test(ua)
        ? "Chrome"
        : /firefox/i.test(ua)
          ? "Firefox"
          : /safari/i.test(ua)
            ? "Safari"
            : /msie|trident/i.test(ua)
              ? "Internet Explorer"
              : "Unknown";

  const os = /windows nt/i.test(ua)
    ? "Windows"
    : /mac os x/i.test(ua)
      ? "macOS"
      : /android/i.test(ua)
        ? "Android"
        : /iphone|ipad|ipod/i.test(ua)
          ? "iOS"
          : /linux/i.test(ua)
            ? "Linux"
            : "Unknown";

  return { device, browser, os };
}

export async function getRequestContext(): Promise<RequestContext> {
  const headersList = await headers();

  const userAgent = headersList.get("user-agent");
  const { device, browser, os } = parseUserAgent(userAgent);

  return {
    ip:
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headersList.get("x-real-ip") ??
      null,
    userAgent,
    device,
    browser,
    os,
    referer: headersList.get("referer") ?? null,
    origin: headersList.get("origin") ?? null,
    language: headersList.get("accept-language")?.split(",")[0] ?? null,
  };
}
