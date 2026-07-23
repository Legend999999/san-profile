import { NextResponse } from "next/server";
import { getSupabaseConfig } from "@/lib/config";
import { requireAdminToken, SupabaseConfigError } from "@/lib/supabase-rest";

const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const maxImageBytes = 5 * 1024 * 1024;

function safeFileName(slug: string, file: File) {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase() || "project";
  const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").toLowerCase() || "png";
  return `${safeSlug}-${Date.now()}.${extension}`;
}

export async function POST(request: Request) {
  try {
    const token = await requireAdminToken();
    const config = getSupabaseConfig();
    if (!config) {
      throw new SupabaseConfigError("Supabase ڕێک نەخراوە.");
    }

    const formData = await request.formData();
    const file = formData.get("image");
    const slug = String(formData.get("slug") ?? "project");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "وێنەیەک بۆ بارکردن هەڵبژێرە." }, { status: 400 });
    }
    if (!allowedTypes.has(file.type)) {
      return NextResponse.json({ error: "تەنها وێنەی PNG, JPEG, WebP یان GIF بەکاربهێنە." }, { status: 400 });
    }
    if (file.size > maxImageBytes) {
      return NextResponse.json({ error: "قەبارەی وێنە دەبێت 5 MB یان کەمتر بێت." }, { status: 400 });
    }

    const fileName = safeFileName(slug, file);
    const upload = await fetch(`${config.url}/storage/v1/object/project-images/${fileName}`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${token}`,
        "Content-Type": file.type,
        "x-upsert": "true",
      },
      body: await file.arrayBuffer(),
    });

    if (!upload.ok) {
      const message = await upload.text();
      return NextResponse.json({ error: message || "بارکردنی وێنە سەرکەوتوو نەبوو." }, { status: 400 });
    }

    return NextResponse.json({
      imageUrl: `${config.url}/storage/v1/object/public/project-images/${fileName}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "بارکردنی وێنە سەرکەوتوو نەبوو." },
      { status: 400 },
    );
  }
}
