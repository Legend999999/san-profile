import { NextResponse } from "next/server";
import { requireAdminToken, supabaseRequest, SupabaseConfigError } from "@/lib/supabase-rest";
import { createContentProject } from "@/lib/content-store";
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

export async function POST(request: Request) {
  const input = (await request.json()) as ProjectInput;
  const projectInput = normalizeProject(input);
  try {
    const token = await requireAdminToken();
    const rows = await supabaseRequest<Project[]>("/rest/v1/projects", {
      method: "POST",
      token,
      body: projectInput,
      prefer: "return=representation",
    });
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      try {
        const project = await createContentProject(projectInput);
        return NextResponse.json(project, { status: 201 });
      } catch (contentError) {
        return new NextResponse(
          contentError instanceof Error ? contentError.message : "Project creation failed.",
          { status: 400 },
        );
      }
    }
    return new NextResponse(error instanceof Error ? error.message : "Project creation failed.", { status: 400 });
  }
}
