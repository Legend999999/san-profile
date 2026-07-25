import type { Metadata } from "next";
import { Geist_Mono, Vazirmatn } from "next/font/google";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kurdwebsite.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "کورد وێبسایت | دروستکردنی وێبسایت و سیستەمی دیجیتاڵی",
    template: "%s | کورد وێبسایت",
  },
  description:
    "دیزاین و گەشەپێدانی وێبسایتی پیشەیی، بۆتی تێلەگرام و سیستەمی دیجیتاڵی لە کوردستان.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "کورد وێبسایت | Kurd Website",
    description:
      "دیزاین و گەشەپێدانی وێبسایت و سیستەمی دیجیتاڵی بۆ کاروبارەکان.",
    url: siteUrl,
    siteName: "Kurd Website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "کورد وێبسایت" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "کورد وێبسایت | Kurd Website",
    description:
      "دیزاین و گەشەپێدانی وێبسایت و سیستەمی دیجیتاڵی بۆ کاروبارەکان.",
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
