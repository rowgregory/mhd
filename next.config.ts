import type { NextConfig } from "next";

/**
 * Security headers for MHD Custom (Next.js / Vercel / Firebase Storage / Resend).
 *
 * Merge the `headers()` function and `securityHeaders` array into your existing
 * next.config.js (or .ts). If you already have a `headers()`, just add these
 * entries to its return array.
 *
 * The Content-Security-Policy is the fiddly one — it controls what the browser
 * is allowed to load. The values below are scoped to what MHD actually uses:
 *   - self (your own domain)
 *   - Firebase Storage (project images): firebasestorage.googleapis.com
 *   - Google Fonts: fonts.googleapis.com (CSS) + fonts.gstatic.com (font files)
 *   - Vercel Analytics/Insights (if used): *.vercel-insights.com / vercel-scripts.com
 * If something stops loading after you add this, the browser console will tell
 * you exactly which directive blocked it — add that origin to the right line.
 */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https://firebasestorage.googleapis.com https://*.googleapis.com;
  connect-src 'self' https://firebasestorage.googleapis.com https://*.googleapis.com https://vitals.vercel-insights.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  // Controls what resources the page can load — blocks XSS, injection, framing.
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  // Forces HTTPS for 2 years, including subdomains. Only enable once you're
  // confident the site is HTTPS-only (Vercel is, so this is safe).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Stops the site being embedded in an iframe elsewhere (clickjacking).
  // Redundant with CSP frame-ancestors but covers older browsers.
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Stops browsers from MIME-sniffing a response away from its declared type.
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Limits how much referrer info is sent to other sites.
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disables browser features the site doesn't use.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Isolates the browsing context a bit more (Spectre-class protections).
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  allowedDevOrigins: ["10.0.0.89"],
  async headers() {
    return [
      {
        // Apply to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
