import { STATUS_STYLES, STATUSES } from "@/app/lib/constants/inquiry.constants";
import { InquiryStatus } from "@prisma/client";

export function StatusBadge({ status }: { status: InquiryStatus }) {
  const label = STATUSES.find((s) => s.value === status)?.label ?? status;
  return (
    <span
      className={`shrink-0 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${STATUS_STYLES[status]}`}
    >
      {label}
    </span>
  );
}
