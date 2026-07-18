import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://san.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "San | Modern Website Portfolio",
    template: "%s | San",
  },
  description:
    "San builds modern websites, useful tools, and polished digital experiences.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "San | Modern Website Portfolio",
    description:
      "A premium dark portfolio for modern websites and digital experiences.",
    url: siteUrl,
    siteName: "San Portfolio",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "San portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "San | Modern Website Portfolio",
    description:
      "A premium dark portfolio for modern websites and digital experiences.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
