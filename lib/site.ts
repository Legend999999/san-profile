export const siteConfig = {
  name: "کورد وێبسایت",
  englishName: "Kurd Website",
  founderName: "San",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://san-profile.vercel.app",
  description:
    "وێبسایت، بۆتی تێلەگرام و سیستەمی دیجیتاڵی بۆ کاروبارە کوردییەکان.",
  telegramMessage:
    "سڵاو San، دەمەوێت دەربارەی وێبسایت/بۆتی تێلەگرام/سیستەمی دیجیتاڵی بۆ کاروبارەکەم گفتوگۆ بکەم.",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

