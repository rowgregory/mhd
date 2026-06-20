"use server";

import prisma from "@/prisma/client";
// import { Resend } from "resend";
import { LogLevel, LogCategory } from "@prisma/client";
import { createLog } from "../../utils/log.server.utils";
import { EMAIL_REGEX } from "../../constants/regex.constants";
import { ContactInput } from "@/types/inquiry.types";
import { headers } from "next/headers";
import { checkRateLimit } from "../../utils/dashboard.utils";

// const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Notify Jackson — fire and forget (don't fail the submission if email fails)
    // resend.emails.send({
    //   from: "MHD Custom <noreply@mhdcustom.com>",
    //   to: process.env.ADMIN_EMAIL ?? "",
    //   subject: `New inquiry from ${name}${input.subject ? ` — ${input.subject}` : ""}`,
    //   html: `
    //     <h2 style="margin:0 0 16px">New inquiry</h2>
    //     <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px">
    //       <tr><td style="padding:6px 0;color:#6b6b6b;width:100px">Name</td><td style="padding:6px 0">${name}</td></tr>
    //       <tr><td style="padding:6px 0;color:#6b6b6b">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
    //       ${input.phone ? `<tr><td style="padding:6px 0;color:#6b6b6b">Phone</td><td style="padding:6px 0">${input.phone}</td></tr>` : ""}
    //       ${input.company ? `<tr><td style="padding:6px 0;color:#6b6b6b">Company</td><td style="padding:6px 0">${input.company}</td></tr>` : ""}
    //       ${input.subject ? `<tr><td style="padding:6px 0;color:#6b6b6b">Subject</td><td style="padding:6px 0">${input.subject}</td></tr>` : ""}
    //     </table>
    //     <p style="margin:16px 0 4px;color:#6b6b6b;font-size:12px;font-family:sans-serif">Message</p>
    //     <p style="margin:0;font-family:sans-serif;font-size:14px;white-space:pre-wrap">${message}</p>
    //     <hr style="margin:24px 0;border:none;border-top:1px solid #e5e5e5"/>
    //     <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/inquiries/${inquiry.id}" style="font-family:sans-serif;font-size:13px;color:#B08D57">
    //       View in dashboard →
    //     </a>
    //   `,
    // }).catch(() => {/* email failure is non-fatal */});

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
