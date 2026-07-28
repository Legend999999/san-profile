import { fallbackProjects, fallbackSettings } from "./config";
import { supabaseRequest, SupabaseConfigError, getSessionToken } from "./supabase-rest";
import type { Project, WebsiteSettings } from "./types";

function withFallbackProjects(projects: Project[]) {
  const existingUrls = new Set(projects.map((project) => project.website_url));
  const existingSlugs = new Set(projects.map((project) => project.slug));
  const missingFallbacks = fallbackProjects.filter(
    (project) => !existingUrls.has(project.website_url) && !existingSlugs.has(project.slug),
  );
  return [...missingFallbacks, ...projects];
}

export async function getPublishedProjects() {
  try {
    const projects = await supabaseRequest<Project[]>(
      "/rest/v1/projects?select=*&published=eq.true&order=featured.desc,display_order.asc,created_at.desc",
    );
    return withFallbackProjects(projects);
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      return fallbackProjects;
    }
    return fallbackProjects;
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
    return rows[0] ?? fallbackProjects.find((project) => project.slug === slug) ?? null;
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      return fallbackProjects.find((project) => project.slug === slug) ?? null;
    }
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
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
