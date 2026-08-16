import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
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
