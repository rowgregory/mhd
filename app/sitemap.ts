// app/sitemap.ts — Next generates /sitemap.xml from this.

import type { MetadataRoute } from "next";

const SITE_URL = "https://www.mhdcustom.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/portfolio", "/contact"];
  const now = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
