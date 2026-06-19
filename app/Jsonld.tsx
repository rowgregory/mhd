// LocalBusiness structured data for a local cabinetry contractor.
// Render once in the root layout, inside <body>. Uses next/script strategy
// so it doesn't block rendering. Update the placeholder fields with real data.

import Script from "next/script";

const SITE_URL = "https://www.mhdcustom.com";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "MHD Custom",
  description:
    "Bespoke cabinetry and fine woodwork built to the millimeter for homes and commercial spaces across the North Shore.",
  url: SITE_URL,
  telephone: "+1-781-555-0142",
  email: "hello@mhdcustom.com",
  image: `${SITE_URL}/og-image.jpg`,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lynn",
    addressRegion: "MA",
    addressCountry: "US",
  },
  areaServed: { "@type": "Place", name: "North Shore, Massachusetts" },
  sameAs: [
    // Add real profiles when available:
    // "https://www.instagram.com/...",
  ],
};

export default function JsonLd() {
  return (
    <Script
      id="ld-localbusiness"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
