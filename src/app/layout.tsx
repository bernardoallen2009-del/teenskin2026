import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://teensskin.example"),
  title: {
    default: "TeensSkin - Skincare para adolescentes",
    template: "%s | TeensSkin"
  },
  description:
    "Website profissional de cuidados de pele para adolescentes, com produtos suaves, quiz de pele e rotinas simples.",
  openGraph: {
    title: "TeensSkin",
    description: "Rotinas simples, estética pastel e skincare acessível para adolescentes.",
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "/images/og-teensskin.png",
        width: 1200,
        height: 630,
        alt: "Produtos TeensSkin em fundo pastel"
      }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: "#F7F0F5",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body>
        <a className="skip-link" href="#conteudo">
          Saltar para o conteúdo
        </a>
        <ClientProviders>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <CookieConsent />
        </ClientProviders>
      </body>
    </html>
  );
}
