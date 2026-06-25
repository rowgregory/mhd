/**
 * Transactional email templates for Resend.
 *
 * Email HTML is its own world: table-based layout, inline styles, no flexbox/
 * grid, no external CSS, no web fonts you can rely on. These return full HTML
 * strings (with DOCTYPE) ready to pass to Resend's `html` field.
 *
 * Light theme only — email clients have inconsistent dark-mode handling, so we
 * lock to MHD's light palette. Colors are inlined as hex (no CSS vars in email).
 */

// MHD light palette (inlined — email can't read CSS tokens)
const C = {
  bg: "#f0edde", // bone page background
  surface: "#ffffff", // card
  ink: "#1c1a17", // charcoal text
  muted: "#534339", // brown secondary text
  subtle: "#716a60", // warm gray captions
  accent: "#b08d57", // brass
  line: "#e2dcca", // hairline
  footer: "#35302a",
};

// Font stacks: brand font first (renders in Apple Mail / iOS and other clients
// that allow web fonts), then email-safe system fallbacks (what Gmail, Outlook,
// and most clients actually show — they strip web fonts). The fallback is
// chosen to echo the brand font's character: a condensed sans for the Bebas
// display role, a clean humanist sans for Roboto body.
const F = {
  // Bebas is a tall condensed display face — "Oswald"/"Impact"/condensed
  // Arial approximate it where Bebas can't load.
  display:
    "'Bebas Neue', 'Oswald', 'Arial Narrow', Impact, Haettenschweiler, sans-serif",
  sans: "'Roboto', Arial, Helvetica, system-ui, sans-serif",
  mono: "'Geist Mono', 'SFMono-Regular', Menlo, Consolas, monospace",
};

type ContactPayload = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message: string;
};

// Shared helpers ----------------------------------------------------------

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Wraps body content in the outer table shell (centered card on bone bg).
function shell(title: string, inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0; padding:0; background-color:${C.bg}; -webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.bg};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; width:100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:8px 0 24px 0;">
              <span style="font-family:${F.display}; font-size:22px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:${C.ink};">MHD&nbsp;Custom</span>
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background-color:${C.surface}; border:1px solid ${C.line}; padding:36px 32px;">
              ${inner}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 16px 8px 16px;">
              <p style="margin:0; font-family:${F.sans}; font-size:12px; line-height:18px; color:${C.subtle};">
                MHD Custom &middot; Custom cabinetry &amp; fine woodwork &middot; North Shore, MA
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// 1) Auto-reply to the person who submitted the form ----------------------

export function contactAutoReplyEmail(payload: ContactPayload): string {
  const firstName = escapeHtml(payload.name.trim().split(/\s+/)[0] || "there");

  const inner = `
    <h1 style="margin:0 0 16px 0; font-family:${F.display}; font-size:24px; line-height:1.25; font-weight:bold; color:${C.ink};">
      Thanks for reaching out, ${firstName}
    </h1>
    <p style="margin:0 0 16px 0; font-family:${F.sans}; font-size:15px; line-height:24px; color:${C.muted};">
      We got your message and we&rsquo;ll get back to you soon &mdash; usually within a day or two. Every project starts with a conversation, so we&rsquo;ll be in touch to talk through what you have in mind.
    </p>
    <p style="margin:0 0 24px 0; font-family:${F.sans}; font-size:15px; line-height:24px; color:${C.muted};">
      In the meantime, here&rsquo;s a copy of what you sent:
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.line}; background-color:${C.bg};">
      <tr>
        <td style="padding:16px 18px; font-family:${F.sans}; font-size:14px; line-height:22px; color:${C.ink};">
          ${escapeHtml(payload.message).replace(/\n/g, "<br />")}
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0 0; font-family:${F.sans}; font-size:15px; line-height:24px; color:${C.muted};">
      Talk soon,<br />
      <strong style="color:${C.ink};">Jackson &amp; the MHD Custom team</strong>
    </p>
  `;

  return shell("Thanks for reaching out", inner);
}

// 2) Notification to Jackson (the inquiry details) ------------------------

export function contactNotifyEmail(payload: ContactPayload): string {
  // a single row in the details table
  const row = (label: string, value: string, isLink?: "email" | "tel") => {
    let v = escapeHtml(value);
    if (isLink === "email")
      v = `<a href="mailto:${v}" style="color:${C.accent}; text-decoration:none;">${v}</a>`;
    if (isLink === "tel")
      v = `<a href="tel:${v.replace(/[^\d+]/g, "")}" style="color:${C.accent}; text-decoration:none;">${v}</a>`;
    return `
      <tr>
        <td style="padding:10px 0; border-bottom:1px solid ${C.line}; font-family:${F.sans}; font-size:12px; line-height:18px; letter-spacing:1px; text-transform:uppercase; color:${C.subtle}; width:120px; vertical-align:top;">
          ${escapeHtml(label)}
        </td>
        <td style="padding:10px 0; border-bottom:1px solid ${C.line}; font-family:${F.sans}; font-size:15px; line-height:22px; color:${C.ink}; vertical-align:top;">
          ${v}
        </td>
      </tr>`;
  };

  const inner = `
    <p style="margin:0 0 4px 0; font-family:${F.sans}; font-size:12px; line-height:18px; letter-spacing:2px; text-transform:uppercase; color:${C.accent};">
      New inquiry
    </p>
    <h1 style="margin:0 0 24px 0; font-family:${F.display}; font-size:24px; line-height:1.25; font-weight:bold; color:${C.ink};">
      ${escapeHtml(payload.name)} sent a message
    </h1>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${row("Name", payload.name)}
      ${row("Email", payload.email, "email")}
      ${payload.phone ? row("Phone", payload.phone, "tel") : ""}
      ${payload.company ? row("Company", payload.company) : ""}
    </table>

    <p style="margin:24px 0 8px 0; font-family:${F.sans}; font-size:12px; line-height:18px; letter-spacing:1px; text-transform:uppercase; color:${C.subtle};">
      Message
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.line}; background-color:${C.bg};">
      <tr>
        <td style="padding:16px 18px; font-family:${F.sans}; font-size:15px; line-height:24px; color:${C.ink};">
          ${escapeHtml(payload.message).replace(/\n/g, "<br />")}
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
      <tr>
        <td align="center" style="background-color:${C.accent};">
          <a href="mailto:${escapeHtml(payload.email)}" style="display:inline-block; padding:14px 28px; font-family:${F.sans}; font-size:13px; font-weight:bold; letter-spacing:1px; text-transform:uppercase; color:${C.ink}; text-decoration:none;">
            Reply to ${escapeHtml(payload.name.trim().split(/\s+/)[0] || "them")}
          </a>
        </td>
      </tr>
    </table>
  `;

  return shell(`New inquiry from ${payload.name}`, inner);
}
