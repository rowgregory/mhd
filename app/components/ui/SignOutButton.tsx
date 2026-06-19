"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ redirectTo: "/login" })}
      className="inline-flex items-center gap-2 border border-admin-line px-3 py-1.5 font-sans text-sm text-admin-fg-muted transition-colors hover:border-admin-fg/40 hover:text-admin-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
    >
      <LogOut size={16} strokeWidth={1.5} aria-hidden="true" />
      Sign out
    </button>
  );
}
