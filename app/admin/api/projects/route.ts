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
    return new NextResponse(error instanceof Error ? error.message : "دروستکردنی پڕۆژە سەرکەوتوو نەبوو.", { status: 400 });
  }
}
