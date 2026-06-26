"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Pencil,
  Eye,
  EyeOff,
  Trash2,
  Quote,
  ArrowLeft,
} from "lucide-react";
import { Props, TestimonialRecord } from "@/types/testimonial.types";
import { updateTestimonial } from "@/app/lib/actions/testimonial/updateTestimonial";
import { createTestimonial } from "@/app/lib/actions/testimonial/createTestimonial";
import { toggleTestimonialVisibility } from "@/app/lib/actions/testimonial/toggleTestimonialVisibility";
import { deleteTestimonial } from "@/app/lib/actions/testimonial/deleteTestimonial";
import AdminDrawer from "@/app/components/drawers/AdminDrawer";
import { TestimonialForm } from "@/app/components/forms/TestimonialForm";
import Link from "next/link";

const EMPTY = {
  name: "",
  title: "",
  company: "",
  quote: "",
  order: 0,
  isVisible: true,
};

export default function TestimonialsClient({ initial }: Props) {
  const [rows, setRows] = useState<TestimonialRecord[]>(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TestimonialRecord | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY);
    setError(null);
    setOpen(true);
  };

  const openEdit = (t: TestimonialRecord) => {
    setEditing(t);
    setForm({
      name: t.name,
      title: t.title ?? "",
      company: t.company ?? "",
      quote: t.quote,
      order: Number(t.order),
      isVisible: !!t.isVisible,
    });
    setError(null);
    setOpen(true);
  };

  const save = () => {
    setError(null);
    startTransition(async () => {
      const res = editing
        ? await updateTestimonial(editing.id, form)
        : await createTestimonial(form);
      if (!res.success) {
        setError(res.error);
        return;
      }
      setRows((prev) =>
        editing
          ? prev.map((r) => (r.id === res.data.id ? res.data : r))
          : [...prev, res.data],
      );
      setOpen(false);
    });
  };

  const toggle = (t: TestimonialRecord) => {
    // optimistic
    setRows((prev) =>
      prev.map((r) => (r.id === t.id ? { ...r, isVisible: !r.isVisible } : r)),
    );
    startTransition(async () => {
      const res = await toggleTestimonialVisibility(t.id, !t.isVisible);
      if (!res.success) {
        // revert on failure
        setRows((prev) =>
          prev.map((r) =>
            r.id === t.id ? { ...r, isVisible: t.isVisible } : r,
          ),
        );
      }
    });
  };

  const remove = (t: TestimonialRecord) => {
    if (!confirm(`Delete the testimonial from ${t.name}?`)) return;
    const prev = rows;
    setRows((p) => p.filter((r) => r.id !== t.id));
    startTransition(async () => {
      const res = await deleteTestimonial(t.id);
      if (!res.success) setRows(prev); // revert
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
              Testimonials
            </h1>
            <p className="mt-1 font-sans text-sm text-admin-fg-muted">
              {rows.length} total · {rows.filter((r) => r.isVisible).length}{" "}
              visible
            </p>
          </div>
          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center gap-2 border border-admin-line bg-admin-accent/10 px-3 py-1.5 font-sans text-sm text-admin-fg transition-colors hover:border-admin-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
          >
            <Plus size={16} strokeWidth={1.5} aria-hidden="true" />
            Add
          </button>
        </div>

        {rows.length === 0 ? (
          <p className="mt-8 border border-admin-line bg-admin-surface px-4 py-10 text-center font-sans text-sm text-admin-fg-subtle">
            No testimonials yet. Add the first one.
          </p>
        ) : (
          <ul className="mt-8 space-y-2">
            {rows.map((t) => (
              <li
                key={t.id}
                className="flex items-start justify-between gap-4 border border-admin-line bg-admin-surface px-4 py-3.5"
              >
                <div className="flex min-w-0 gap-3">
                  <Quote
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-admin-fg-subtle"
                  />
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-medium text-admin-fg">
                      {t.name}
                      {(t.title || t.company) && (
                        <span className="font-normal text-admin-fg-subtle">
                          {" — "}
                          {[t.title, t.company].filter(Boolean).join(", ")}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 truncate font-sans text-sm text-admin-fg-muted">
                      {t.quote}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  {!t.isVisible && (
                    <span className="mr-1 font-sans text-[11px] uppercase tracking-wide text-admin-fg-subtle">
                      Hidden
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => toggle(t)}
                    disabled={pending}
                    aria-label={t.isVisible ? "Hide" : "Show"}
                    className="inline-flex h-8 w-8 items-center justify-center text-admin-fg-muted transition-colors hover:text-admin-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
                  >
                    {t.isVisible ? (
                      <Eye size={16} strokeWidth={1.5} aria-hidden="true" />
                    ) : (
                      <EyeOff size={16} strokeWidth={1.5} aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(t)}
                    aria-label="Edit"
                    className="inline-flex h-8 w-8 items-center justify-center text-admin-fg-muted transition-colors hover:text-admin-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
                  >
                    <Pencil size={16} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(t)}
                    disabled={pending}
                    aria-label="Delete"
                    className="inline-flex h-8 w-8 items-center justify-center text-admin-fg-muted transition-colors hover:text-danger focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
                  >
                    <Trash2 size={16} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add / edit drawer */}
      <AdminDrawer
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit testimonial" : "Add testimonial"}
      >
        <TestimonialForm
          editing={editing}
          error={error}
          form={form}
          pending={pending}
          save={save}
          setForm={setForm}
          setOpen={setOpen}
        />
      </AdminDrawer>
    </main>
  );
}
