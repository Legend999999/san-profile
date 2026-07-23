import { NextResponse } from "next/server";
import { requireAdminToken, supabaseRequest } from "@/lib/supabase-rest";
import { validatePublicWebsiteUrl } from "@/lib/url-security";
import type { Project, ProjectInput } from "@/lib/types";

function normalizeProject(input: ProjectInput) {
  return {
    ...input,
    title: input.title.trim(),
    slug: input.slug.trim().toLowerCase(),
    short_description: input.short_description.trim(),
    full_description: input.full_description.trim(),
    website_url: validatePublicWebsiteUrl(input.website_url),
    screenshot_url: input.screenshot_url?.trim() || "",
    category: input.category || "Websites",
    display_order: Number.isFinite(input.display_order) ? input.display_order : 0,
  };
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const input = (await request.json()) as ProjectInput;
  const projectInput = normalizeProject(input);
  try {
    const token = await requireAdminToken();
    const rows = await supabaseRequest<Project[]>(
      `/rest/v1/projects?id=eq.${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        token,
        body: projectInput,
        prefer: "return=representation",
      },
    );
    if (!rows[0]) {
      return new NextResponse("هیچ ڕیزی پڕۆژە نوێ نەکرایەوە. RLS و admin_users لە Supabase بپشکنە.", { status: 403 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "نوێکردنەوەی پڕۆژە سەرکەوتوو نەبوو.", { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const token = await requireAdminToken();
    await supabaseRequest(`/rest/v1/projects?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      token,
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "سڕینەوەی پڕۆژە سەرکەوتوو نەبوو.", { status: 400 });
  }
}
