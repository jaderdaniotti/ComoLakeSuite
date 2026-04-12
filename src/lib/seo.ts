import type { Metadata } from "next";

export const SITE_URL = "https://www.comolakesuites.com";
export const SITE_NAME = "Como Lake Suites";
export const DEFAULT_OG_IMAGE = "/opengraph-image.png";

type BuildPageMetadataParams = {
  title: string;
  description: string;
  pathname: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  pathname,
  noIndex = false,
}: BuildPageMetadataParams): Metadata {
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
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title,
      description,
      url: pathname,
      siteName: SITE_NAME,
      locale: "it_IT",
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
};

export const lodgingBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  email: "info@comolakesuites.com",
  telephone: "+39 340 9409123",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Piazza Cavour ang. Via Albertolli 22",
    postalCode: "22100",
    addressLocality: "Como",
    addressCountry: "IT",
  },
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
