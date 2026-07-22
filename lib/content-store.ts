import initialData from "@/content/site-data.json";
import { fallbackSettings } from "./config";
import type { Project, ProjectInput, WebsiteSettings } from "./types";

type SiteData = {
  settings: WebsiteSettings;
  projects: Project[];
};

type GitHubFile = {
  content: string;
  sha: string;
};

type GitHubSaveOptions = {
  token?: string | null;
};

const contentPath = process.env.CONTENT_FILE_PATH ?? "content/site-data.json";
const repo = process.env.GITHUB_REPO ?? "Legend999999/san-profile";
const branch = process.env.GITHUB_BRANCH ?? "main";

function getGitHubToken(tokenOverride?: string | null) {
  return (
    tokenOverride ||
    process.env.GITHUB_TOKEN ||
    process.env.github_token ||
    process.env.GITHUB_PAT ||
    process.env.GH_TOKEN ||
    ""
  ).trim();
}

function normalizeData(data: Partial<SiteData>): SiteData {
  return {
    settings: {
      ...fallbackSettings,
      ...data.settings,
      id: data.settings?.id ?? "site-settings",
    },
    projects: Array.isArray(data.projects) ? data.projects : [],
  };
}

function decodeBase64(value: string) {
  return Buffer.from(value.replace(/\n/g, ""), "base64").toString("utf8");
}

function encodeBase64(value: string) {
  return Buffer.from(value, "utf8").toString("base64");
}

async function getGitHubFile(tokenOverride?: string | null): Promise<{ data: SiteData; sha: string | null }> {
  const token = getGitHubToken(tokenOverride);
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const response = await fetch(
    `https://api.github.com/repos/${repo}/contents/${contentPath}?ref=${branch}`,
    { headers, cache: "no-store" },
  );

  if (!response.ok) {
    return { data: normalizeData(initialData), sha: null };
  }

  const file = (await response.json()) as GitHubFile;
  return {
    data: normalizeData(JSON.parse(decodeBase64(file.content)) as SiteData),
    sha: file.sha,
  };
}

async function saveGitHubFile(data: SiteData, sha: string | null, message: string, options?: GitHubSaveOptions) {
  const token = getGitHubToken(options?.token);
  if (!token) {
    throw new Error(
      "GitHub saving needs a token. Add one in the admin GitHub token panel, or set GITHUB_TOKEN in Vercel Production.",
    );
  }

  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${contentPath}`, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      branch,
      message,
      content: encodeBase64(`${JSON.stringify(data, null, 2)}\n`),
      ...(sha ? { sha } : {}),
    }),
  });

  if (!response.ok) {
    let error = "Could not save content to GitHub.";
    try {
      const details = (await response.json()) as { message?: string };
      error = details.message ? `GitHub rejected the token: ${details.message}` : error;
    } catch {
      error = await response.text();
    }
    throw new Error(error);
  }
}

function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.display_order !== b.display_order) return a.display_order - b.display_order;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

export async function getContentData() {
  const { data } = await getGitHubFile();
  return data;
}

export async function getContentSettings() {
  const data = await getContentData();
  return data.settings;
}

export async function getContentPublishedProjects() {
  const data = await getContentData();
  return sortProjects(data.projects.filter((project) => project.published));
}

export async function getContentAllProjects() {
  const data = await getContentData();
  return sortProjects(data.projects);
}

export async function getContentProjectBySlug(slug: string) {
  const data = await getContentData();
  return data.projects.find((project) => project.slug === slug && project.published) ?? null;
}

export async function getContentProjectById(id: string) {
  const data = await getContentData();
  return data.projects.find((project) => project.id === id) ?? null;
}

export async function createContentProject(input: ProjectInput, options?: GitHubSaveOptions) {
  const { data, sha } = await getGitHubFile(options?.token);
  const now = new Date().toISOString();
  const project: Project = {
    ...input,
    id: crypto.randomUUID(),
    screenshot_url: input.screenshot_url || null,
    created_at: now,
    updated_at: now,
  };
  data.projects = sortProjects([project, ...data.projects]);
  await saveGitHubFile(data, sha, `Add project: ${project.title}`, options);
  return project;
}

export async function updateContentProject(id: string, input: ProjectInput, options?: GitHubSaveOptions) {
  const { data, sha } = await getGitHubFile(options?.token);
  const index = data.projects.findIndex((project) => project.id === id);
  if (index < 0) {
    throw new Error("Project not found.");
  }
  const updated: Project = {
    ...data.projects[index],
    ...input,
    screenshot_url: input.screenshot_url || null,
    updated_at: new Date().toISOString(),
  };
  data.projects[index] = updated;
  data.projects = sortProjects(data.projects);
  await saveGitHubFile(data, sha, `Update project: ${updated.title}`, options);
  return updated;
}

export async function deleteContentProject(id: string, options?: GitHubSaveOptions) {
  const { data, sha } = await getGitHubFile(options?.token);
  const project = data.projects.find((item) => item.id === id);
  data.projects = data.projects.filter((item) => item.id !== id);
  await saveGitHubFile(data, sha, `Delete project: ${project?.title ?? id}`, options);
}

export async function updateContentSettings(input: Partial<WebsiteSettings>, options?: GitHubSaveOptions) {
  const { data, sha } = await getGitHubFile(options?.token);
  data.settings = {
    ...data.settings,
    site_title: input.site_title ?? data.settings.site_title,
    owner_name: input.owner_name ?? data.settings.owner_name,
    introduction: input.introduction ?? data.settings.introduction,
    about_text: input.about_text ?? data.settings.about_text,
    github_url: input.github_url || null,
    telegram_url: input.telegram_url || null,
    email: input.email || null,
    footer_text: input.footer_text ?? data.settings.footer_text,
    updated_at: new Date().toISOString(),
  };
  await saveGitHubFile(data, sha, "Update website settings", options);
  return data.settings;
}
