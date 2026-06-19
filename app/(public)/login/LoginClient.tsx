"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import MhdLogo from "@/app/components/MHDLogo";
import { SQYSH_URL } from "@/app/lib/constants/common.constants";

export default function LoginClient() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const denied = error === "AccessDenied";

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signIn("google", { redirectTo: "/dashboard" });
    } finally {
      // signIn redirects on success; reset only matters on failure.
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-svh place-items-center bg-surface px-4 py-12 sm:px-6">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="mb-10 flex flex-col items-center text-center">
          <Link
            href="/"
            aria-label="MHD Custom home"
            className="inline-flex text-fg transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <MhdLogo className="h-12 w-auto sm:h-14" aria-hidden="true" />
          </Link>
          <h1 className="mt-6 font-display text-[clamp(1.75rem,7vw,2.25rem)] uppercase tracking-[0.06em] text-fg">
            Admin sign in
          </h1>
          <p className="mt-2 font-sans text-sm text-fg-muted">
            MHD Custom internal dashboard.
          </p>
        </div>

        <div className="border border-line/15 bg-surface-alt p-6 sm:p-8">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            aria-busy={loading}
            className="inline-flex w-full items-center justify-center gap-3 border border-line/20 bg-surface px-5 py-3.5 font-sans text-sm font-medium text-fg transition-colors hover:bg-surface-alt focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Google aria-hidden="true" />
            {loading ? "Signing in…" : "Continue with Google"}
          </button>

          {denied && (
            <p
              role="alert"
              className="mt-5 border border-danger/30 bg-danger-surface px-4 py-3 text-center font-sans text-xs leading-relaxed text-danger"
            >
              That Google account doesn&rsquo;t have admin access. Ask an
              administrator to add it.
            </p>
          )}
        </div>
        {/* Quiet build credit */}
        <p className="absolute bottom-4 -translate-x-1/2 left-1/2 text-center font-sans text-xs text-fg-subtle">
          <a
            href={SQYSH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Sqysh
          </a>
        </p>
      </motion.div>
    </main>
  );
}

function Google({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}
