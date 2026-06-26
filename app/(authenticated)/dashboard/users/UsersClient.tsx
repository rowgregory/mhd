"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, ShieldCheck, Shield, UserMinus } from "lucide-react";
import { UserRecord } from "@/types/user.types";
import { grantAdmin, revokeAdmin } from "@/app/lib/actions/user";
import AdminDrawer from "@/app/components/drawers/AdminDrawer";
import ConfirmModal from "@/app/components/modals/ConfirmModal";

type Role = "ADMIN" | "SUPER_USER";

export default function UsersClient({
  initial,
  currentUserId,
  isSuperUser,
}: {
  initial: UserRecord[];
  currentUserId: string;
  isSuperUser: boolean;
}) {
  const [rows, setRows] = useState(initial);
  const [open, setOpen] = useState(false);
  const [revoking, setRevoking] = useState<UserRecord | null>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("ADMIN");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const add = () => {
    setError(null);
    startTransition(async () => {
      const res = await grantAdmin(email, role);
      if (!res.success) {
        setError(res.error);
        return;
      }
      // upsert: replace if the email already existed in the list, else prepend
      setRows((prev) => {
        const exists = prev.some((r) => r.id === res.data.id);
        return exists
          ? prev.map((r) => (r.id === res.data.id ? res.data : r))
          : [...prev, res.data];
      });
      setEmail("");
      setRole("ADMIN");
      setOpen(false);
    });
  };

  const confirmRevoke = () => {
    if (!revoking) return;
    const prev = rows;
    setRows((p) => p.filter((r) => r.id !== revoking.id));
    startTransition(async () => {
      const res = await revokeAdmin(revoking.id);
      if (!res.success) {
        setRows(prev);
        setError(res.error);
      }
      setRevoking(null);
    });
  };

  return (
    <main className="min-h-svh bg-admin-bg">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-1.5 font-sans text-sm text-admin-fg-muted transition-colors hover:text-admin-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
        >
          <ArrowLeft size={15} strokeWidth={1.5} aria-hidden="true" />
          Dashboard
        </Link>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-sans text-xl font-medium text-admin-fg">
              Admins
            </h1>
            <p className="mt-1 font-sans text-sm text-admin-fg-muted">
              {rows.length} with access
            </p>
          </div>
          {isSuperUser && (
            <button
              type="button"
              onClick={() => {
                setEmail("");
                setRole("ADMIN");
                setError(null);
                setOpen(true);
              }}
              className="inline-flex items-center gap-2 border border-admin-line bg-admin-accent/10 px-3 py-1.5 font-sans text-sm text-admin-fg transition-colors hover:border-admin-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
            >
              <Plus size={16} strokeWidth={1.5} aria-hidden="true" />
              Add admin
            </button>
          )}
        </div>

        <ul className="mt-8 space-y-2">
          {rows.map((u) => {
            const isSuper = u.role === "SUPER_USER";
            const isSelf = u.id === currentUserId;
            return (
              <li
                key={u.id}
                className="flex items-center justify-between gap-4 border border-admin-line bg-admin-surface px-4 py-3.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {isSuper ? (
                    <ShieldCheck
                      size={18}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="shrink-0 text-admin-accent"
                    />
                  ) : (
                    <Shield
                      size={18}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="shrink-0 text-admin-fg-subtle"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-sans text-sm font-medium text-admin-fg">
                      {u.name ?? u.email}
                      {isSelf && (
                        <span className="ml-2 font-normal text-admin-fg-subtle">
                          (you)
                        </span>
                      )}
                    </p>
                    {u.name && (
                      <p className="truncate font-sans text-xs text-admin-fg-muted">
                        {u.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-label text-admin-fg-subtle">
                    {isSuper ? "Super user" : "Admin"}
                  </span>
                  {isSuperUser && !isSelf && (
                    <button
                      type="button"
                      onClick={() => setRevoking(u)}
                      disabled={pending}
                      aria-label={`Revoke access from ${u.email}`}
                      className="inline-flex h-8 w-8 items-center justify-center text-admin-fg-muted transition-colors hover:text-danger focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
                    >
                      <UserMinus
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Add-admin drawer */}
      <AdminDrawer open={open} onClose={() => setOpen(false)} title="Add admin">
        <div className="space-y-4">
          <p className="font-sans text-sm text-admin-fg-muted">
            Enter the Google account email. They&rsquo;ll have access the next
            time they sign in.
          </p>

          <label className="block">
            <span className="mb-1 block font-sans text-xs font-medium text-admin-fg-muted">
              Email <span className="text-admin-accent">*</span>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={inputCls}
            />
          </label>

          <label className="block">
            <span className="mb-1 block font-sans text-xs font-medium text-admin-fg-muted">
              Role
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className={inputCls}
            >
              <option value="ADMIN">Admin</option>
            </select>
            <span className="mt-1 block font-sans text-xs text-admin-fg-subtle">
              Super users can add and remove other admins.
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="border border-danger/30 bg-danger-surface px-3 py-2 font-sans text-xs text-danger"
            >
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border border-admin-line px-4 py-2 font-sans text-sm text-admin-fg-muted transition-colors hover:text-admin-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={add}
              disabled={pending}
              className="bg-admin-fg px-4 py-2 font-sans text-sm text-admin-bg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent disabled:opacity-60"
            >
              {pending ? "Adding…" : "Add admin"}
            </button>
          </div>
        </div>
      </AdminDrawer>

      <ConfirmModal
        open={!!revoking}
        title="Revoke admin access"
        message={
          revoking
            ? `Remove admin access from ${revoking.name ?? revoking.email}? They'll be signed out and lose access immediately.`
            : ""
        }
        confirmLabel="Revoke access"
        dangerous
        pending={pending}
        onConfirm={confirmRevoke}
        onCancel={() => setRevoking(null)}
      />
    </main>
  );
}

const inputCls =
  "w-full border border-admin-line bg-admin-bg px-3 py-2 font-sans text-sm text-admin-fg outline-none transition-colors focus:border-admin-accent";
