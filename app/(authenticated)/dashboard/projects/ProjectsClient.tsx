"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Plus, ArrowLeft, ArrowRight, Image as ImageIcon } from "lucide-react";
import AdminDrawer from "@/app/components/drawers/AdminDrawer";
import { ProjectRecord } from "@/types/project.types";
import { createProject } from "@/app/lib/actions/project/createProject";
import Picture from "@/app/components/ui/Picture";

const EMPTY = { title: "", location: "", description: "" };

export default function ProjectsClient({
  initial,
}: {
  initial: ProjectRecord[];
}) {
  const [rows, setRows] = useState(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const save = () => {
    setError(null);
    startTransition(async () => {
      const res = await createProject(form);
      if (!res.success) {
        setError(res.error);
        return;
      }
      setRows((prev) => [res.data, ...prev]);
      setForm(EMPTY);
      setOpen(false);
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
              Projects
            </h1>
            <p className="mt-1 font-sans text-sm text-admin-fg-muted">
              {rows.length} total
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY);
              setError(null);
              setOpen(true);
            }}
            className="inline-flex items-center gap-2 border border-admin-line bg-admin-accent/10 px-3 py-1.5 font-sans text-sm text-admin-fg transition-colors hover:border-admin-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
          >
            <Plus size={16} strokeWidth={1.5} aria-hidden="true" />
            New project
          </button>
        </div>

        {rows.length === 0 ? (
          <p className="mt-8 border border-admin-line bg-admin-surface px-4 py-10 text-center font-sans text-sm text-admin-fg-subtle">
            No projects yet. Create the first one.
          </p>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {rows.map((p) => {
              const cover =
                p.photos.find((ph) => ph.featured) ?? p.photos[0] ?? null;
              return (
                <li key={p.id}>
                  <Link
                    href={`/dashboard/projects/${p.id}`}
                    className="group flex gap-4 border border-admin-line bg-admin-surface p-3 transition-colors hover:border-admin-fg/30 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
                  >
                    <span className="relative flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden border border-admin-line bg-admin-bg">
                      {cover ? (
                        <Picture
                          fill
                          src={cover.url}
                          alt={cover.alt ?? ""}
                          className="object-cover"
                          sizes="80px"
                          priority
                        />
                      ) : (
                        <ImageIcon
                          size={18}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="text-admin-fg-subtle"
                        />
                      )}
                    </span>
                    <span className="min-w-0 flex-1 py-1">
                      <span className="block truncate font-sans text-sm font-medium text-admin-fg">
                        {p.title}
                      </span>
                      <span className="mt-0.5 block truncate font-sans text-xs text-admin-fg-muted">
                        {p.location ?? "—"}
                      </span>
                      <span className="mt-1 block font-sans text-xs text-admin-fg-subtle">
                        {p.photos.length} photo
                        {p.photos.length === 1 ? "" : "s"}
                      </span>
                    </span>
                    <ArrowRight
                      size={15}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-admin-fg-subtle transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <AdminDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="New project"
      >
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1 block font-sans text-xs font-medium text-admin-fg-muted">
              Title <span className="text-admin-accent">*</span>
            </span>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-sans text-xs font-medium text-admin-fg-muted">
              Location
            </span>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Marblehead, MA"
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-sans text-xs font-medium text-admin-fg-muted">
              Description
            </span>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={4}
              className={`${inputCls} resize-y`}
            />
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
              onClick={save}
              disabled={pending}
              className="bg-admin-fg px-4 py-2 font-sans text-sm text-admin-bg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent disabled:opacity-60"
            >
              {pending ? "Creating…" : "Create & add photos"}
            </button>
          </div>
        </div>
      </AdminDrawer>
    </main>
  );
}

const inputCls =
  "w-full border border-admin-line bg-admin-bg px-3 py-2 font-sans text-sm text-admin-fg outline-none transition-colors focus:border-admin-accent";
