/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ProjectPreview } from "@/components/ProjectPreview";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}`} aria-label={`بینینی پڕۆژە: ${project.title}`}>
        <div className="project-browser">
          <div className="project-browser-bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="project-image">
            {project.screenshot_url ? (
              <img src={project.screenshot_url} alt={`وێنەی پڕۆژەی ${project.title}`} loading="lazy" />
            ) : (
              <ProjectPreview project={project} compact />
            )}
          </div>
        </div>
      </Link>
      <div className="project-info">
        <div className="meta-row">
          <span>{project.category}</span>
          {project.featured ? <span>دیار</span> : null}
        </div>
        <h3>{project.title}</h3>
        <p>{project.short_description}</p>
        {project.technologies.length > 0 ? (
          <div className="tag-row">
            {project.technologies.map((technology) => (
              <span className="tag" key={technology}>
                {technology}
              </span>
            ))}
          </div>
        ) : null}
        <div className="project-actions">
          <Link className="button primary" href={`/projects/${project.slug}`}>
            وردەکاری پڕۆژە
          </Link>
        </div>
      </div>
    </article>
  );
}
