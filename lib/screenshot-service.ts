import { validatePublicWebsiteUrl } from "./url-security";
import { getSupabaseConfig } from "./config";

type ScreenshotResult = {
  screenshotUrl: string;
};

async function captureWithGenericProvider(targetUrl: string) {
  const endpoint = process.env.SCREENSHOT_API_ENDPOINT;
  const token = process.env.SCREENSHOT_API_KEY;
  if (!endpoint || !token) {
    return null;
  }

  const requestUrl = new URL(endpoint);
  requestUrl.searchParams.set("url", targetUrl);
  requestUrl.searchParams.set("viewport_width", "1440");
  requestUrl.searchParams.set("viewport_height", "1000");

  const response = await fetch(requestUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("The screenshot provider could not capture this website.");
  }

  return await response.arrayBuffer();
}

async function uploadScreenshot(bytes: ArrayBuffer, slug: string) {
  const config = getSupabaseConfig();
  if (!config?.serviceRoleKey) {
    throw new Error("Supabase storage service key is not configured.");
  }

  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const fileName = `${safeSlug}-${Date.now()}.png`;
  const upload = await fetch(`${config.url}/storage/v1/object/screenshots/${fileName}`, {
    method: "POST",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "image/png",
      "x-upsert": "true",
    },
    body: bytes,
  });

  if (!upload.ok) {
    throw new Error("Screenshot capture succeeded, but storage upload failed.");
  }

  return `${config.url}/storage/v1/object/public/screenshots/${fileName}`;
}

export async function generateScreenshot(url: string, slug: string): Promise<ScreenshotResult> {
  const safeUrl = validatePublicWebsiteUrl(url);
  const imageBytes = await captureWithGenericProvider(safeUrl);
  if (!imageBytes) {
    return {
      screenshotUrl: `https://s.wordpress.com/mshots/v1/${encodeURIComponent(safeUrl)}?w=1400`,
    };
  }
  const screenshotUrl = await uploadScreenshot(imageBytes, slug);
  return { screenshotUrl };
}
