import type { Metadata } from "next";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import WhatsAppFab from "@/src/components/WhatsAppFab";

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
        className="font-sans antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
      </body>
    </html>
  );
}
