import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import NavDrawer from "./components/NavDrawer";
import JsonLd from "./Jsonld";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas",
});

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// ── SEO category ────────────────────────────────────────────────────────────
// Lighthouse SEO checks: title, meta description, canonical, robots-indexable,
// valid hreflang/lang, crawlable links, and a viewport that allows zoom.
// metadataBase makes all relative OG/canonical URLs absolute (required for
// valid Open Graph + canonical resolution).

const SITE_URL = "https://www.mhdcustom.com"; // ← set to the real production domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MHD Custom — Custom Cabinetry & Fine Woodwork",
    template: "%s · MHD Custom",
  },
  description:
    "Bespoke cabinetry and fine woodwork built to the millimeter for homes and commercial spaces across the North Shore.",
  applicationName: "MHD Custom",
  keywords: [
    "custom cabinetry",
    "fine woodwork",
    "kitchen cabinets",
    "built-ins",
    "North Shore",
    "Lynn MA",
    "millwork",
  ],
  authors: [{ name: "MHD Custom" }],
  creator: "MHD Custom",
  publisher: "MHD Custom",
  alternates: {
    canonical: "/",
  },
  // Indexable; lets Lighthouse SEO pass "page isn't blocked from indexing".
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Open Graph + Twitter — not scored directly, but required for a complete
  // "shareable, valid metadata" pass and good link previews.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "MHD Custom",
    title: "MHD Custom — Custom Cabinetry & Fine Woodwork",
    description:
      "Bespoke cabinetry and fine woodwork built to the millimeter for homes and commercial spaces across the North Shore.",
    images: [
      {
        url: "/og-image.jpg", // 1200×630 — add to /public
        width: 1200,
        height: 630,
        alt: "MHD Custom cabinetry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MHD Custom — Custom Cabinetry & Fine Woodwork",
    description:
      "Bespoke cabinetry and fine woodwork built to the millimeter for homes and commercial spaces across the North Shore.",
    images: ["/og-image.jpg"],
  },
  manifest: "/site.webmanifest",
  // Icons — if you used app/icon.svg + app/favicon.ico reserved files, Next
  // wires these automatically and you can DROP this block. Listed explicitly
  // here in case your icons live in /public instead.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  // PWA / address-bar theming. Best Practices likes a defined theme color.
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MHD Custom",
  },
  formatDetection: { telephone: true, address: false, email: false },
};

// ── Performance + Accessibility category ─────────────────────────────────────
// viewport must allow user scaling (a11y: "[user-scalable=no] not used" /
// "maximum-scale" must permit zoom). themeColor flips with light/dark so the
// browser chrome matches the page in both modes (Best Practices).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Do NOT set maximumScale or userScalable:false — that fails the a11y audit.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F1EA" },
    { media: "(prefers-color-scheme: dark)", color: "#1C1A17" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${geistMono.variable} ${roboto.variable}  h-full antialiased`}
    >
      <body>
        <JsonLd />
        {children} <NavDrawer />
      </body>
    </html>
  );
}
