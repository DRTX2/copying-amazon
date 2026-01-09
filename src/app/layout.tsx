import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import DataPrefetcher from "@/components/DataPrefetcher";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Amazon Clone | Compra Electrónica, Libros, Ropa y más",
    template: "%s | Amazon Clone"
  },
  description: "Una plataforma de e-commerce moderna construida con Next.js, con productos, carrito y funcionalidades de pago seguras.",
  keywords: ["ecommerce", "amazon", "compras", "tienda online", "descuentos", "Next.js"],
  authors: [{ name: "David" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Amazon Clone | Compra Electrónica, Libros, Ropa y más",
    description: "Encuentra las mejores ofertas y productos en nuestro clon de Amazon.",
    url: "/",
    siteName: "Amazon Clone",
    locale: "es_EC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon Clone",
    description: "Tu tienda online de confianza.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {/* Pre-carga datos esenciales al iniciar la app */}
          <DataPrefetcher />
          {children}
        </Providers>
      </body>
    </html>
  );
}

