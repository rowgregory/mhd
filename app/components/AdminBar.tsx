import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { getActor } from "../lib/actions/user/getActor";

/**
 * Thin admin strip shown at the very top of every page — but ONLY when an
 * admin is logged in. Server component: reads the session via getActor() (no
 * client session needed). Renders nothing for signed-out visitors, so it adds
 * zero markup to the public-facing site.
 */
export default async function AdminBar() {
  const actor = await getActor();
  if (!actor) return null;

  const firstName = actor.name?.trim().split(/\s+/)[0] ?? "Admin";

  return (
    <div className="relative z-60 flex h-9 w-full items-center justify-between gap-4 bg-ink px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-bone sm:px-6">
      <span className="truncate text-bone/60">Signed in as {firstName}</span>

      <Link
        href="/dashboard"
        className="inline-flex shrink-0 items-center gap-1.5 text-bone transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <LayoutDashboard size={13} strokeWidth={1.75} aria-hidden="true" />
        Dashboard
      </Link>
    </div>
  );
}
