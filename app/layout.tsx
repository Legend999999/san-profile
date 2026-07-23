import type { Metadata } from "next";
import { Geist_Mono, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

const notoKufi = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://san-profile.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "کورد وێب | Kurd Web",
    template: "%s | کورد وێب",
  },
  description:
    "کورد وێب وێبسایت، بۆتی تێلەگرام و سیستەمی دیجیتاڵی خێرا و ئامادەی گەشە دروست دەکات.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "کورد وێب | Kurd Web",
    description:
      "وێبسایت، بۆتی تێلەگرام و سیستەمی دیجیتاڵی مۆدێرن بۆ کاروبارەکان.",
    url: siteUrl,
    siteName: "Kurd Web",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "کورد وێب" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "کورد وێب | Kurd Web",
    description:
      "وێبسایت، بۆتی تێلەگرام و سیستەمی دیجیتاڵی مۆدێرن بۆ کاروبارەکان.",
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
      <body className={`${notoKufi.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
