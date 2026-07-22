import { NextResponse } from "next/server";
import { requireAdminToken, supabaseRequest, SupabaseConfigError } from "@/lib/supabase-rest";
import { deleteContentProject, updateContentProject } from "@/lib/content-store";
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
  const githubToken = request.headers.get("x-github-token");
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
    return NextResponse.json(rows[0]);
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      try {
        return NextResponse.json(await updateContentProject(id, projectInput, { token: githubToken }));
      } catch (contentError) {
        return new NextResponse(
          contentError instanceof Error ? contentError.message : "Project update failed.",
          { status: 400 },
        );
      }
    }
    return new NextResponse(error instanceof Error ? error.message : "Project update failed.", { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const githubToken = request.headers.get("x-github-token");
  try {
    const token = await requireAdminToken();
    await supabaseRequest(`/rest/v1/projects?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      token,
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      try {
        await deleteContentProject(id, { token: githubToken });
        return new NextResponse(null, { status: 204 });
      } catch (contentError) {
        return new NextResponse(
          contentError instanceof Error ? contentError.message : "Project deletion failed.",
          { status: 400 },
        );
      }
    }
    return new NextResponse(error instanceof Error ? error.message : "Project deletion failed.", { status: 400 });
  }
}
