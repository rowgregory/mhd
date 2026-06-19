// app/robots.ts — Next generates /robots.txt from this.
// SEO category checks the page isn't blocked and that robots is valid.

import type { MetadataRoute } from "next";

const SITE_URL = "https://www.mhdcustom.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
