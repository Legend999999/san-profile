import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://san.com";
  const projects = await getPublishedProjects();

  return [
    {
      url: base,
      lastModified: new Date(),
    },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: new Date(project.updated_at),
    })),
  ];
}
