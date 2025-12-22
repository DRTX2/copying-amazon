import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amazon Clone - E-commerce Platform",
  description: "A modern e-commerce platform built with Next.js, featuring products, cart, and checkout functionality",
  keywords: ["ecommerce", "amazon", "shopping", "online store"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Amazon Clone - E-commerce Platform",
    description: "A modern e-commerce platform built with Next.js",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
