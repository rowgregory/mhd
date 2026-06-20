import { getActor } from "../actions/user/getActor";

export async function requireAdmin() {
  const actor = await getActor();
  if (!actor || (actor.role !== "ADMIN" && actor.role !== "SUPER_USER")) {
    return null;
  }
  return actor;
}

// Simple in-memory rate limiter — no Redis, no extra dependencies.
// Works fine for a low-traffic site on a single Vercel serverless instance.
// Tracks submission counts per IP in a Map; entries expire after the window.

const store = new Map<string, { count: number; resetAt: number }>();

const LIMIT = 3; // max submissions
const WINDOW_MS = 60 * 60 * 1000; // per hour

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    // first submission or window expired — fresh entry
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: LIMIT - 1 };
  }

  if (entry.count >= LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: LIMIT - entry.count };
}
