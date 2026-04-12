import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/lib/seo";

const routes: Array<{
  pathname: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { pathname: "/", changeFrequency: "weekly", priority: 1 },
  { pathname: "/le-suites", changeFrequency: "weekly", priority: 0.95 },
  { pathname: "/le-suites/suite-cavour", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/le-suites/suite-volta", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/le-suites/suite-cernobbio", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/le-suites/suite-como-sole", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/le-suites/suite-dante", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/le-suites/suite-vista-duomo", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/i-nostri-servizi", changeFrequency: "weekly", priority: 0.8 },
  { pathname: "/contatti", changeFrequency: "monthly", priority: 0.75 },
  { pathname: "/prenota", changeFrequency: "weekly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route.pathname}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
