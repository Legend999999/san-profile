import { NextResponse } from "next/server";
import { requireAdminToken, supabaseRequest, SupabaseConfigError } from "@/lib/supabase-rest";
import { updateContentSettings } from "@/lib/content-store";
import type { WebsiteSettings } from "@/lib/types";

export async function PATCH(request: Request) {
  const body = (await request.json()) as Partial<WebsiteSettings>;
  const githubToken = request.headers.get("x-github-token");
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
    return NextResponse.json(rows[0]);
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      try {
        return NextResponse.json(await updateContentSettings(body, { token: githubToken }));
      } catch (contentError) {
        return new NextResponse(
          contentError instanceof Error ? contentError.message : "Settings update failed.",
          { status: 400 },
        );
      }
    }
    return new NextResponse(error instanceof Error ? error.message : "Settings update failed.", { status: 400 });
  }
}
