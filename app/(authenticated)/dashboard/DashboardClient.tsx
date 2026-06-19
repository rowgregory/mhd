"use client";

import Link from "next/link";
import {
  Mail,
  Image as ImageIcon,
  Quote,
  Users,
  ArrowRight,
  ChartLine,
  ExternalLink,
} from "lucide-react";
import { ANALYTICS_URL } from "@/app/lib/constants/common.constants";
import { getGreeting, timeAgo } from "@/app/lib/utils/date.utils";
import { STATUS_LABEL } from "@/app/lib/constants/admin.constants";
import MhdLogo from "@/app/components/MHDLogo";
import { DashboardStats } from "@/types/admin.types";
import SignOutButton from "@/app/components/ui/SignOutButton";

export default function DashboardClient({
  stats,
  name,
}: {
  stats: DashboardStats;
  name: string | null;
}) {
  const greeting = getGreeting();
  const { inquiries, projects, testimonials, admins, recentInquiries } = stats;

  const cards = [
    {
      href: "/admin/inquiries",
      icon: Mail,
      value: inquiries.total,
      label: "Inquiries",
      badge: inquiries.new > 0 ? `${inquiries.new} new` : null,
      sub: inquiries.latest
        ? `Latest: ${inquiries.latest}`
        : "No inquiries yet",
    },
    {
      href: "/admin/projects",
      icon: ImageIcon,
      value: projects.total,
      label: "Projects",
      badge: null,
      sub: projects.latest ? `Latest: ${projects.latest}` : "No projects yet",
    },
    {
      href: "/admin/testimonials",
      icon: Quote,
      value: testimonials.total,
      label: "Testimonials",
      badge: null,
      sub: `${testimonials.visible} visible · ${testimonials.hidden} hidden`,
    },
    {
      href: "/admin/users",
      icon: Users,
      value: admins.total,
      label: "Admins",
      badge: null,
      sub: "Manage access",
    },
  ];

  return (
    <main className="min-h-svh bg-admin-bg">
      {/* Slim top bar */}
      <header className="border-b border-admin-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <Link
            href="/dashboard"
            aria-label="MHD Custom dashboard"
            className="flex items-center gap-2.5 text-admin-fg transition-colors hover:text-admin-accent focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-admin-accent"
          >
            <MhdLogo className="h-7 w-auto" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-label text-admin-fg-subtle">
              · admin
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={ANALYTICS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-admin-line px-3 py-1.5 font-sans text-sm text-admin-fg-muted transition-colors hover:border-admin-fg/40 hover:text-admin-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
            >
              <ChartLine size={16} strokeWidth={1.5} aria-hidden="true" />
              <span className="hidden sm:inline">Analytics</span>
              <ExternalLink size={13} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="font-sans text-xl font-medium text-admin-fg">
          {greeting}
          {name ? `, ${name}` : ""}
        </h1>
        <p className="mt-1 font-sans text-sm text-admin-fg-muted">
          Here&rsquo;s what&rsquo;s happening across the site.
        </p>

        {/* Stat cards */}
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ href, icon: Icon, value, label, badge, sub }) => (
            <li key={label}>
              <Link
                href={href}
                className="group flex h-full flex-col border border-admin-line bg-admin-surface p-5 transition-colors hover:border-admin-fg/30 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
              >
                <div className="mb-4 flex items-center justify-between">
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-admin-fg-muted"
                  />
                  <ArrowRight
                    size={15}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-admin-fg-subtle transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </div>
                <span className="font-sans text-2xl font-medium leading-none text-admin-fg">
                  {value}
                </span>
                <span className="mt-1.5 flex items-center gap-2 font-sans text-sm text-admin-fg-muted">
                  {label}
                  {badge && (
                    <span className="bg-admin-accent/15 px-2 py-0.5 font-sans text-[11px] text-admin-accent">
                      {badge}
                    </span>
                  )}
                </span>
                <span className="mt-3 border-t border-admin-line pt-2.5 font-sans text-xs text-admin-fg-subtle">
                  {sub}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Recent inquiries */}
        <h2 className="mt-10 font-sans text-sm font-medium text-admin-fg-muted">
          Recent inquiries
        </h2>
        {recentInquiries.length === 0 ? (
          <p className="mt-3 border border-admin-line bg-admin-surface px-4 py-6 text-center font-sans text-sm text-admin-fg-subtle">
            No inquiries yet.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {recentInquiries.map((q) => (
              <li key={q.id}>
                <Link
                  href={`/admin/inquiries/${q.id}`}
                  className="flex items-center justify-between gap-3 border border-admin-line bg-admin-surface px-4 py-3 transition-colors hover:border-admin-fg/30 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Mail
                      size={16}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="shrink-0 text-admin-fg-subtle"
                    />
                    <span className="min-w-0">
                      <span className="font-sans text-sm font-medium text-admin-fg">
                        {q.name}
                      </span>
                      <span className="ml-2 truncate font-sans text-sm text-admin-fg-subtle">
                        {q.message}
                      </span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    {q.status === "NEW" && (
                      <span className="bg-admin-accent/15 px-2 py-0.5 font-sans text-[11px] text-admin-accent">
                        {STATUS_LABEL[q.status]}
                      </span>
                    )}
                    <span className="font-sans text-xs text-admin-fg-subtle">
                      {timeAgo(q.createdAt)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
