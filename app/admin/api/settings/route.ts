import { NextResponse } from "next/server";
import { requireAdminToken, supabaseRequest } from "@/lib/supabase-rest";
import type { WebsiteSettings } from "@/lib/types";

export async function PATCH(request: Request) {
  const body = (await request.json()) as Partial<WebsiteSettings>;
  try {
    const token = await requireAdminToken();
    const rows = await supabaseRequest<WebsiteSettings[]>(
      "/rest/v1/website_settings?id=not.is.null",
      {
        method: "PATCH",
        token,
        body: {
          site_title: body.site_title,
          owner_name: body.owner_name,
          introduction: body.introduction,
          about_text: body.about_text,
          github_url: body.github_url || null,
          telegram_url: body.telegram_url || null,
          email: body.email || null,
          footer_text: body.footer_text,
          updated_at: new Date().toISOString(),
        },
        prefer: "return=representation",
      },
    );
    if (!rows[0]) {
      return new NextResponse("هیچ ڕیزی ڕێکخستنەکان نوێ نەکرایەوە. RLS و admin_users لە Supabase بپشکنە.", { status: 403 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "نوێکردنەوەی ڕێکخستنەکان سەرکەوتوو نەبوو.", { status: 400 });
  }
}
