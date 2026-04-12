import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/lib/seo";

export const dynamic = "force-static";
export const revalidate = 60 * 60 * 24; // Rebuild sitemap daily.

type SitemapEntry = {
  pathname: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

// Only canonical, indexable pages. No redirects, no API routes, no noindex pages.
const routes: SitemapEntry[] = [
  { pathname: "/", changeFrequency: "weekly", priority: 1.0 },
  { pathname: "/le-suites", changeFrequency: "weekly", priority: 0.95 },
  { pathname: "/le-suites/suite-cavour", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/le-suites/suite-volta", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/le-suites/suite-cernobbio", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/le-suites/suite-como-sole", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/le-suites/suite-dante", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/le-suites/suite-vista-duomo", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/i-nostri-servizi", changeFrequency: "monthly", priority: 0.85 },
  { pathname: "/contatti", changeFrequency: "monthly", priority: 0.8 },
  { pathname: "/prenota", changeFrequency: "weekly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: new URL(route.pathname, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
