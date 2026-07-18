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
    screenshot_url: input.screenshot_url?.trim() || null,
    category: input.category || "Websites",
    display_order: Number.isFinite(input.display_order) ? input.display_order : 0,
  };
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await requireAdminToken();
    const { id } = await params;
    const input = (await request.json()) as ProjectInput;
    const rows = await supabaseRequest<Project[]>(
      `/rest/v1/projects?id=eq.${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        token,
        body: normalizeProject(input),
        prefer: "return=representation",
      },
    );
    return NextResponse.json(rows[0]);
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Project update failed.", { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await requireAdminToken();
    const { id } = await params;
    await supabaseRequest(`/rest/v1/projects?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      token,
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Project deletion failed.", { status: 400 });
  }
}
