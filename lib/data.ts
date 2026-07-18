import { fallbackSettings } from "./config";
import { supabaseRequest, SupabaseConfigError, getSessionToken } from "./supabase-rest";
import type { Project, WebsiteSettings } from "./types";

const sampleProjects: Project[] = [
  {
    id: "sample-1",
    title: "Aurora Studio",
    slug: "aurora-studio",
    short_description: "A polished website concept for a modern digital studio.",
    full_description:
      "A sample published project that shows how San's website cards and preview pages will look after Supabase is connected.",
    website_url: "https://example.com",
    screenshot_url: null,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Websites",
    featured: true,
    published: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getPublishedProjects() {
  try {
    return await supabaseRequest<Project[]>(
      "/rest/v1/projects?select=*&published=eq.true&order=featured.desc,display_order.asc,created_at.desc",
    );
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      return sampleProjects;
    }
    return [];
  }
}

export async function getAllProjects() {
  const token = await getSessionToken();
  if (!token) {
    return [];
  }
  try {
    return await supabaseRequest<Project[]>(
      "/rest/v1/projects?select=*&order=display_order.asc,created_at.desc",
      { token },
    );
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const rows = await supabaseRequest<Project[]>(
      `/rest/v1/projects?select=*&slug=eq.${encodeURIComponent(slug)}&published=eq.true&limit=1`,
    );
    return rows[0] ?? sampleProjects.find((project) => project.slug === slug) ?? null;
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      return sampleProjects.find((project) => project.slug === slug) ?? null;
    }
    return null;
  }
}

export async function getAdminProjectById(id: string) {
  const token = await getSessionToken();
  if (!token) {
    return null;
  }
  try {
    const rows = await supabaseRequest<Project[]>(
      `/rest/v1/projects?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
      { token },
    );
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  try {
    const rows = await supabaseRequest<WebsiteSettings[]>(
      "/rest/v1/website_settings?select=*&limit=1",
    );
    return rows[0] ?? fallbackSettings;
  } catch {
    return fallbackSettings;
  }
}
