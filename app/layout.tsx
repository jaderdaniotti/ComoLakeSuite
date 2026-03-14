import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import SmoothScroll from "@/src/components/SmoothScroll";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Como Lake Suites - Luxury Suites sul Lago di Como",
  description:
    "Alloggi di charme a Como e dintorni. Suite Volta, Cavour, Cernobbio, Como Sole, Dante, Vista Duomo. Servizi di qualità e vista lago.",
  icons: {
    icon: "/icon.webp",
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
        className={`${montserrat.variable} font-sans antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
