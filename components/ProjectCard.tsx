import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const date = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(project.created_at));

  return (
    <article className="card">
      <Link href={`/projects/${project.slug}`} aria-label={`Preview ${project.title}`}>
        <div className="project-image">
          {project.screenshot_url ? (
            <img src={project.screenshot_url} alt={`${project.title} screenshot`} />
          ) : (
            <div className="fallback-shot">
              <strong>{project.title}</strong>
              <span className="muted">Screenshot will appear after generation.</span>
            </div>
          )}
        </div>
      </Link>
      <div className="card-body">
        <div className="meta-row">
          <span>{project.category}</span>
          {project.featured ? <span>Featured</span> : null}
          <span>{date}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="muted">{project.short_description}</p>
        <div className="tag-row">
          {project.technologies.map((technology) => (
            <span className="tag" key={technology}>
              {technology}
            </span>
          ))}
        </div>
        <div className="hero-actions">
          <Link className="button primary" href={`/projects/${project.slug}`}>
            Preview
          </Link>
          <a className="button" href={project.website_url} target="_blank" rel="noreferrer">
            Visit
          </a>
        </div>
      </div>
    </article>
  );
}
