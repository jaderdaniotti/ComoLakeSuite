import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.comolakesuites.com", pathname: "/**" },
      { protocol: "https", hostname: "www.comolakesuites.eu", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/en/homepage",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/services",
        destination: "/i-nostri-servizi",
        permanent: true,
      },
      {
        source: "/en/contacts",
        destination: "/contatti",
        permanent: true,
      },
      {
        source: "/en/the-suites",
        destination: "/le-suites",
        permanent: true,
      },
      {
        source: "/en/the-suites/:slug",
        destination: "/le-suites/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
