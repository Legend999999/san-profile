import { getProjectDetail } from "@/lib/project-details";
import type { Project } from "@/lib/types";

export function ProjectPreview({ project, compact = false }: { project: Project; compact?: boolean }) {
  const detail = getProjectDetail(project);

  return (
    <div className={`preview-art ${detail.preview} ${compact ? "compact" : ""}`} aria-hidden="true">
      <div className="preview-nav">
        <span />
        <span />
        <span />
      </div>
      <div className="preview-hero">
        <div>
          <small>{project.category}</small>
          <strong>{project.title}</strong>
          <p>{project.short_description}</p>
        </div>
        <aside>
          <span />
          <span />
        </aside>
      </div>
      <div className="preview-blocks">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

