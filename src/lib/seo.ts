import type { Metadata } from "next";

export const SITE_URL = "https://www.comolakesuites.com";
export const SITE_NAME = "Como Lake Suites";
export const DEFAULT_OG_IMAGE = "/opengraph-image.png";
export const DEFAULT_SEO_KEYWORDS = [
  "Como Lake Suites",
  "suite Lago di Como",
  "suite Como",
  "appartamenti Como",
  "alloggi Lago di Como",
  "vacanze Como",
];

type BuildPageMetadataParams = {
  title: string;
  description: string;
  pathname: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  pathname,
  keywords = [],
  noIndex = false,
}: BuildPageMetadataParams): Metadata {
  const mergedKeywords = Array.from(
    new Set([...DEFAULT_SEO_KEYWORDS, ...keywords]),
  );

  const robots = noIndex
    ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      };

  return {
    title,
    description,
    keywords: mergedKeywords,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      address: true,
      email: true,
      telephone: true,
    },
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title,
      description,
      url: pathname,
      siteName: SITE_NAME,
      locale: "it_IT",
      localeAlternate: ["en_US"],
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots,
  };
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "it-IT",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/le-suites`,
    "query-input": "required name=search_term_string",
  },
};

export const lodgingBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  email: "info@comolakesuites.com",
  telephone: "+39 340 9409123",
  priceRange: "EUR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Piazza Cavour ang. Via Albertolli 22",
    postalCode: "22100",
    addressLocality: "Como",
    addressCountry: "IT",
  },
  sameAs: [
    "https://www.booking.com/hotel/it/como-lake-suites.it.html",
    "https://www.airbnb.it/manage-your-space/33795851/details",
    "https://www.expedia.it/Como-Hotel-Como-Lake-Suites.h38392015.Informazioni-Hotel",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+39 340 9409123",
      contactType: "customer service",
      areaServed: "IT",
      availableLanguage: ["it", "en"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+39 333 1745544",
      contactType: "customer service",
      areaServed: "IT",
      availableLanguage: ["it", "en"],
    },
  ],
};
