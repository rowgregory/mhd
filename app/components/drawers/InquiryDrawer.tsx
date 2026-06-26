import { Inquiry } from "@/types/inquiry.types";
import { InquiryStatus } from "@prisma/client";
import { formatDate } from "../../lib/utils/date.utils";
import { Building2, Mail, Phone, X } from "lucide-react";
import { STATUSES } from "../../lib/constants/inquiry.constants";

export function InquiryDrawer({
  inquiry,
  pending,
  onChangeStatus,
  onClose,
}: {
  inquiry: Inquiry;
  pending: boolean;
  onChangeStatus: (id: string, status: InquiryStatus) => void;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Inquiry from ${inquiry.name}`}
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50"
      />

      {/* Panel */}
      <div className="relative ml-auto flex h-full w-full max-w-md flex-col overflow-y-auto bg-surface shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-line/15 px-6 py-5">
          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.04em] text-fg">
              {inquiry.name}
            </h2>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
              {formatDate(inquiry.createdAt)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 items-center justify-center text-fg-muted transition-colors hover:text-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        {/* Contact details */}
        <div className="space-y-3 border-b border-line/15 px-6 py-5">
          <a
            href={`mailto:${inquiry.email}`}
            className="flex items-center gap-3 font-sans text-sm text-fg transition-colors hover:text-accent"
          >
            <Mail
              size={16}
              strokeWidth={1.5}
              className="text-fg-subtle"
              aria-hidden="true"
            />
            {inquiry.email}
          </a>
          {inquiry.phone && (
            <a
              href={`tel:${inquiry.phone}`}
              className="flex items-center gap-3 font-sans text-sm text-fg transition-colors hover:text-accent"
            >
              <Phone
                size={16}
                strokeWidth={1.5}
                className="text-fg-subtle"
                aria-hidden="true"
              />
              {inquiry.phone}
            </a>
          )}
          {inquiry.company && (
            <p className="flex items-center gap-3 font-sans text-sm text-fg-muted">
              <Building2
                size={16}
                strokeWidth={1.5}
                className="text-fg-subtle"
                aria-hidden="true"
              />
              {inquiry.company}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="flex-1 border-b border-line/15 px-6 py-5">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-label text-fg-subtle">
            Message
          </p>
          <p className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-fg">
            {inquiry.message}
          </p>
        </div>

        {/* Status picker */}
        <div className="px-6 py-5">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-label text-fg-subtle">
            Status
          </p>
          <div className="flex flex-wrap gap-2">
            {STATUSES.filter((s) => s.value !== "ALL").map(
              ({ value, label }) => {
                const active = inquiry.status === value;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={pending || active}
                    onClick={() =>
                      onChangeStatus(inquiry.id, value as InquiryStatus)
                    }
                    aria-pressed={active}
                    className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-default ${
                      active
                        ? "bg-fg text-surface"
                        : "bg-surface-alt text-fg-muted hover:text-fg"
                    }`}
                  >
                    {label}
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
