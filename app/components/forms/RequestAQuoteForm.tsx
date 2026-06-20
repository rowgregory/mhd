"use client";

import { useState, useTransition } from "react";
import { Send, CheckCircle } from "lucide-react";
import { submitContactForm } from "@/app/lib/actions/inquiry/submitContactForm";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
  _trap: "", // honeypot — hidden from users, bots fill it automatically
};

export default function RequestAQuoteForm() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const set = (field: keyof typeof EMPTY, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const submit = () => {
    setError(null);
    if (!form.consent) {
      setError("Please agree that your data may be collected and stored.");
      return;
    }
    startTransition(async () => {
      const res = await submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        _trap: form._trap,
      });
      if (!res.success) {
        setError(res.error);
        return;
      }
      setSubmitted(true);
    });
  };

  if (submitted) {
    return (
      <div className="flex h-full min-h-80 flex-col items-center justify-center gap-4 text-center">
        <CheckCircle
          size={40}
          strokeWidth={1.25}
          className="text-accent"
          aria-hidden="true"
        />
        <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-fg">
          Message sent
        </h3>
        <p className="max-w-xs font-sans text-sm text-fg-muted">
          Thanks, {form.name.split(" ")[0]}. We&rsquo;ll be in touch within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" required>
          <Input
            id="contact-name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(v) => set("name", v)}
            autoComplete="name"
          />
        </Field>
        <Field label="Email Address" required>
          <Input
            id="contact-email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(v) => set("email", v)}
            autoComplete="email"
          />
        </Field>
      </div>

      {/* Phone + Subject */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone">
          <Input
            id="contact-phone"
            type="tel"
            placeholder="(617) 555-0100"
            value={form.phone}
            onChange={(v) => set("phone", v)}
            autoComplete="tel"
          />
        </Field>
        <Field label="Subject">
          <Input
            id="contact-subject"
            type="text"
            placeholder="Kitchen remodel"
            value={form.subject}
            onChange={(v) => set("subject", v)}
          />
        </Field>
      </div>

      {/* Message */}
      <Field label="Message" required>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="How can we help you? Feel free to get in touch!"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${inputCls} resize-none`}
        />
      </Field>

      {/* Error */}
      {error && (
        <p role="alert" className="font-sans text-sm text-danger">
          {error}
        </p>
      )}

      {/* Honeypot — hidden from real users via CSS, bots fill it automatically.
          Never use display:none or visibility:hidden (bots detect those);
          position it off-screen instead. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="contact-trap">Leave this empty</label>
        <input
          id="contact-trap"
          type="text"
          name="contact-trap"
          tabIndex={-1}
          autoComplete="off"
          value={form._trap}
          onChange={(e) => set("_trap", e.target.value)}
        />
      </div>

      {/* Submit row */}
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="button"
          onClick={submit}
          disabled={pending}
          aria-busy={pending}
          className="inline-flex items-center gap-2.5 bg-accent px-7 py-3.5 font-display text-base uppercase tracking-[0.06em] text-accent-fg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
        >
          <Send size={16} strokeWidth={1.5} aria-hidden="true" />
          {pending ? "Sending…" : "Get in touch"}
        </button>

        {/* Consent */}
        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-accent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <span className="font-sans text-xs leading-relaxed text-fg-muted">
            I agree that my data is collected and stored.
          </span>
        </label>
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={(children as React.ReactElement<{ id?: string }>)?.props?.id}
        className="mb-1.5 block font-sans text-xs uppercase tracking-[0.12em] text-fg-muted"
      >
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({
  id,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete={autoComplete}
      className={inputCls}
    />
  );
}

const inputCls = [
  "w-full border-0 border-b border-line/40 bg-transparent pb-2 pt-1",
  "font-sans text-sm text-fg placeholder:text-fg-muted/50",
  "outline-none transition-colors duration-200",
  "focus:border-accent focus:placeholder:text-fg-muted/30",
  "dark:border-line/30",
].join(" ");
