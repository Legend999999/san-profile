import { NextResponse } from "next/server";
import { requireAdminToken } from "@/lib/supabase-rest";
import { generateScreenshot } from "@/lib/screenshot-service";

export async function POST(request: Request) {
  try {
    const token = await requireAdminToken();
    const { url, slug } = (await request.json()) as { url?: string; slug?: string };
    if (!url || !slug) {
      return NextResponse.json({ error: "URL ـی وێبسایت و slug پێویستن." }, { status: 400 });
    }
    const result = await generateScreenshot(url, slug, token);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "دروستکردنی screenshot سەرکەوتوو نەبوو." },
      { status: 400 },
    );
  }
}
