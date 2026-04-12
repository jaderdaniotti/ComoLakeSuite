import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import WhatsAppFab from "@/src/components/WhatsAppFab";
import {
  SITE_NAME,
  SITE_URL,
  buildPageMetadata,
  lodgingBusinessJsonLd,
  websiteJsonLd,
} from "@/src/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  ...buildPageMetadata({
    title: "Como Lake Suites - Luxury Suites sul Lago di Como",
    description:
      "Alloggi di charme a Como e dintorni. Suite Volta, Cavour, Cernobbio, Como Sole, Dante, Vista Duomo. Servizi di qualità e vista lago.",
    pathname: "/",
  }),
  verification: {
    google: "gBkj67c3ywB85rS99KPChZFk_5TtWJmv2pYvqLnYQpE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className="font-sans antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
          <Script
            id="structured-data-site"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([websiteJsonLd, lodgingBusinessJsonLd]),
            }}
          />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
      </body>
    </html>
  );
}
