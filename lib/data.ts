import { fallbackProjects, fallbackSettings } from "./config";
import { normalizeProjectSlug } from "./project-details";
import { supabaseRequest, SupabaseConfigError, getSessionToken } from "./supabase-rest";
import type { Project, WebsiteSettings } from "./types";

function normalizeProject(project: Project): Project {
  const normalizedSlug = normalizeProjectSlug(project.slug);
  if (
    normalizedSlug !== "rozhi-la-daikbun" &&
    project.title.toLowerCase() !== "venos" &&
    project.title.toLowerCase() !== "vinos"
  ) {
    return project;
  }

  return {
    ...project,
    id: project.id || "rozhi-la-daikbun",
    title: "ڕۆژی لە دایکبوون",
    slug: "rozhi-la-daikbun",
    short_description:
      "ماڵپەڕێکی تایبەت بۆ پێشکەشکردنی پیرۆزبایی و ناوەڕۆکی ڕۆژی لە دایکبوون.",
    full_description:
      "ماڵپەڕێکی ڕێکخراو بۆ ڕۆژی لە دایکبوون، دروستکراو بۆ پیشاندانی ناوەڕۆک و پیرۆزبایی بە شێوەیەکی جوان و گونجاو بۆ مۆبایل.",
  };
}

function withFallbackProjects(projects: Project[]) {
  const normalizedProjects = projects.map(normalizeProject);
  const existingUrls = new Set(normalizedProjects.map((project) => project.website_url));
  const existingSlugs = new Set(normalizedProjects.map((project) => normalizeProjectSlug(project.slug)));
  const missingFallbacks = fallbackProjects.filter(
    (project) => !existingUrls.has(project.website_url) && !existingSlugs.has(project.slug),
  );
  return [...missingFallbacks, ...normalizedProjects];
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
  const normalizedSlug = normalizeProjectSlug(slug);
  try {
    const rows = await supabaseRequest<Project[]>(
      `/rest/v1/projects?select=*&slug=eq.${encodeURIComponent(normalizedSlug)}&published=eq.true&limit=1`,
    );
    return rows[0] ? normalizeProject(rows[0]) : fallbackProjects.find((project) => project.slug === normalizedSlug) ?? null;
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      return fallbackProjects.find((project) => project.slug === normalizedSlug) ?? null;
    }
    return fallbackProjects.find((project) => project.slug === normalizedSlug) ?? null;
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
