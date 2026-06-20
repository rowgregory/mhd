import { RequestContext } from "./log.server.utils";

export function buildLogMessage(
  action: string,
  actor: string,
  context: RequestContext,
): string {
  const time = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${actor} ${action} on ${context.device} (${context.browser} · ${context.os}) at ${time}`;
}
