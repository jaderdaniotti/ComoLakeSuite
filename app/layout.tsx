import type { Metadata } from "next";
import Script from "next/script";
import { cookies } from "next/headers";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import WhatsAppFab from "@/src/components/WhatsAppFab";
import LanguageProvider from "@/src/components/LanguageProvider";
import logoVerticale from "@/src/images/logo-verticale.webp";
import { Analytics } from "@vercel/analytics/next"
import {
  SITE_NAME,
  SITE_URL,
  buildPageMetadata,
  lodgingBusinessJsonLd,
  websiteJsonLd,
} from "@/src/lib/seo";
import { getServerLocale } from "@/src/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  ...buildPageMetadata({
    title: "Como Lake Suites - Luxury Suites sul Lago di Como",
    description:
      "Alloggi di charme a Como e dintorni. Suite Volta, Cavour, Cernobbio, Como Sole, Dante, Vista Duomo. Servizi di qualità e vista lago.",
    pathname: "/",
    keywords: [
      "luxury suites Lago di Como",
      "suite centro Como",
      "suite Cernobbio",
      "appartamenti vacanza Como",
      "dove dormire a Como",
    ],
  }),
  verification: {
    google: "gBkj67c3ywB85rS99KPChZFk_5TtWJmv2pYvqLnYQpE",
  },
  icons: {
    icon: logoVerticale.src,
    shortcut: logoVerticale.src,
    apple: logoVerticale.src,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = getServerLocale(cookieStore);

  return (
    <html lang={locale}>
      <body
        className="font-sans antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <LanguageProvider initialLocale={locale}>
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
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
