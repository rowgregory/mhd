"use server";

import prisma from "@/prisma/client";
import { Resend } from "resend";
import { LogLevel, LogCategory } from "@prisma/client";
import { createLog } from "../../utils/log.server.utils";
import { EMAIL_REGEX } from "../../constants/regex.constants";
import { ContactInput } from "@/types/inquiry.types";
import { headers } from "next/headers";
import { checkRateLimit } from "../../utils/dashboard.utils";
import {
  contactAutoReplyEmail,
  contactNotifyEmail,
} from "../../email-templates/inquiryEmailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

type Result = { success: true } | { success: false; error: string };

export async function submitContactForm(input: ContactInput): Promise<Result> {
  // ── 1. Honeypot — if the hidden field has a value, it's a bot. ──────────
  // Return success so the bot thinks it worked (don't tip it off).
  if (input._trap) {
    return { success: true };
  }

  // ── 2. Rate limit by IP ──────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return {
      success: false,
      error: "Too many submissions. Please try again in an hour.",
    };
  }
  // Basic validation
  const name = input.name?.trim();
  const email = input.email?.trim().toLowerCase();
  const message = input.message?.trim();

  if (!name) return { success: false, error: "Name is required." };
  if (!email || !EMAIL_REGEX.test(email)) {
    return { success: false, error: "A valid email address is required." };
  }
  if (!message) return { success: false, error: "Message is required." };

  try {
    // Persist the inquiry
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: input.phone?.trim() || null,
        company: input.company?.trim() || null,
        message,
        status: "NEW",
      },
    });

    // notify Jackson
    await resend.emails.send({
      from: "MHD Custom <info@mhdcabinetry.com>",
      to: process.env.ADMIN_EMAIL!,
      replyTo: email, // so Jackson can reply straight to them
      subject: `New inquiry from ${name}`,
      html: contactNotifyEmail(input),
    });

    // auto-reply to the submitter
    await resend.emails.send({
      from: "MHD Custom <info@mhdcabinetry.com>",
      to: email,
      subject: "Thanks for reaching out — MHD Custom",
      html: contactAutoReplyEmail(input),
    });

    await createLog(
      LogLevel.INFO,
      `New inquiry submitted by ${name} (${email})`,
      {
        category: LogCategory.INQUIRY,
        metadata: { inquiryId: inquiry.id },
        captureContext: false,
      },
    );

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again or email us directly.",
    };
  }
}
