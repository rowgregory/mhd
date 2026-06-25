import { InquiryStatus } from "@prisma/client";

export type ContactInput = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  /** Honeypot — must be empty. Bots fill hidden fields; humans don't see it. */
  _trap?: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  status: InquiryStatus;
  createdAt: string; // ISO
};

export type Counts = Record<string, number>;
