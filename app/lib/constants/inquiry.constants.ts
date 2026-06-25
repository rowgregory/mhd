import { InquiryStatus } from "@prisma/client";

export const VALID_STATUSES: InquiryStatus[] = [
  "NEW",
  "CONTACTED",
  "IN_DISCUSSION",
  "WON",
  "CLOSED",
  "SCAM",
];

export const STATUSES: { value: InquiryStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "IN_DISCUSSION", label: "In discussion" },
  { value: "WON", label: "Won" },
  { value: "CLOSED", label: "Closed" },
  { value: "SCAM", label: "Scam" },
];

export const STATUS_STYLES: Record<InquiryStatus, string> = {
  NEW: "bg-accent/15 text-accent",
  CONTACTED: "bg-brand/15 text-brand",
  IN_DISCUSSION: "bg-taupe/20 text-fg",
  WON: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  CLOSED: "bg-fg/10 text-fg-muted",
  SCAM: "bg-danger/15 text-danger",
};
