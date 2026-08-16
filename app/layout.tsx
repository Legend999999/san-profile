import type { Metadata } from "next";
import { Geist_Mono, Vazirmatn } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "کورد وێبسایت | وێبسایت و بۆتی تێلەگرام بۆ کاروبار",
    template: "%s | کورد وێبسایت",
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "کورد وێبسایت | Kurd Website",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Kurd Website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "کورد وێبسایت" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "کورد وێبسایت | Kurd Website",
    description: siteConfig.description,
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
    <html lang="ckb" dir="rtl">
      <body className={`${vazirmatn.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
