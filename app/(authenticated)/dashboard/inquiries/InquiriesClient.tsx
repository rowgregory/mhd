"use client";

import { useState, useTransition } from "react";
import { ArrowLeft } from "lucide-react";
import type { InquiryStatus } from "@prisma/client";
import { Counts, Inquiry } from "@/types/inquiry.types";
import { listInquiries } from "@/app/lib/actions/inquiry/listInquiries";
import { updateInquiryStatus } from "@/app/lib/actions/inquiry/updateInquiryStatus";
import { STATUSES } from "@/app/lib/constants/inquiry.constants";
import { formatDate } from "@/app/lib/utils/date.utils";
import Link from "next/link";
import { InquiryDrawer } from "@/app/components/drawers/InquiryDrawer";
import { StatusBadge } from "@/app/components/ui/StatusBadge";

export default function InquiriesClient({
  initialInquiries,
  initialCounts,
}: {
  initialInquiries: Inquiry[];
  initialCounts: Counts;
}) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [counts] = useState(initialCounts);
  const [filter, setFilter] = useState<InquiryStatus | "ALL">("ALL");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Re-fetch the list when the filter changes.
  const applyFilter = (next: InquiryStatus | "ALL") => {
    setFilter(next);
    startTransition(async () => {
      const res = await listInquiries(next);
      if (res.success) setInquiries(res.data);
    });
  };

  // Change a status (optimistic, revert on failure).
  const changeStatus = (id: string, status: InquiryStatus) => {
    setError(null);
    const prev = inquiries;
    setInquiries((list) =>
      list.map((i) => (i.id === id ? { ...i, status } : i)),
    );
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));

    startTransition(async () => {
      const res = await updateInquiryStatus(id, status);
      if (!res.success) {
        setInquiries(prev); // revert
        setError(res.error ?? "Could not update status");
      }
    });
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowLeft size={13} strokeWidth={1.75} aria-hidden="true" />
          Back to dashboard
        </Link>
        <h1 className="font-display text-2xl uppercase tracking-[0.06em] text-fg sm:text-3xl">
          Inquiries
        </h1>
        <p className="mt-1 font-sans text-sm text-fg-muted">
          Messages from the contact form.
        </p>
      </header>

      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STATUSES.map(({ value, label }) => {
          const active = filter === value;
          const count = counts[value] ?? 0;
          return (
            <button
              key={value}
              type="button"
              onClick={() => applyFilter(value)}
              aria-pressed={active}
              className={`inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active
                  ? "bg-fg text-surface"
                  : "bg-surface-alt text-fg-muted hover:text-fg"
              }`}
            >
              {label}
              <span className={active ? "text-surface/70" : "text-fg-subtle"}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p
          role="alert"
          className="mb-4 bg-danger/10 px-4 py-2 font-sans text-sm text-danger"
        >
          {error}
        </p>
      )}

      {/* List */}
      {inquiries.length === 0 ? (
        <p className="py-16 text-center font-sans text-sm text-fg-muted">
          No inquiries{filter !== "ALL" ? " with this status" : ""} yet.
        </p>
      ) : (
        <ul className="divide-y divide-line/15 border border-line/15">
          {inquiries.map((inq) => (
            <li key={inq.id}>
              <button
                type="button"
                onClick={() => setSelected(inq)}
                className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-surface-alt focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-accent sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="truncate font-display text-base uppercase tracking-[0.04em] text-fg">
                      {inq.name}
                    </span>
                    <StatusBadge status={inq.status} />
                  </div>
                  <p className="mt-1 truncate font-sans text-sm text-fg-muted">
                    {inq.message}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                  {formatDate(inq.createdAt)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Detail / status drawer */}
      {selected && (
        <InquiryDrawer
          inquiry={selected}
          pending={isPending}
          onChangeStatus={changeStatus}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
