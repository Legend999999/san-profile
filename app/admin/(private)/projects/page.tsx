import Link from "next/link";
import { getAllProjects } from "@/lib/data";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

export default async function AdminProjects() {
  const projects = await getAllProjects();

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow">Manage work</p>
          <h1>Projects</h1>
          <p className="muted">Create, publish, sort, preview, and remove portfolio entries.</p>
        </div>
        <Link className="button primary" href="/admin/projects/new">Add Project</Link>
      </div>
      {projects.length === 0 ? (
        <div className="empty-state admin-empty">
          <h3>No projects yet.</h3>
          <p>The public portfolio will stay clean until real projects are published.</p>
          <Link className="button primary" href="/admin/projects/new">Add Project</Link>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Project</th><th>URL</th><th>Status</th><th>Order</th><th>Actions</th></tr></thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td><strong>{project.title}</strong><br /><span className="muted">{project.category}</span></td>
                  <td><a className="muted table-url" href={project.website_url}>{project.website_url}</a></td>
                  <td>
                    <div className="badge-stack">
                      <span className={`status-badge ${project.published ? "published" : "draft"}`}>{project.published ? "Published" : "Draft"}</span>
                      {project.featured ? <span className="status-badge featured">Featured</span> : null}
                    </div>
                  </td>
                  <td>{project.display_order}</td>
                  <td>
                    <div className="table-actions">
                      <Link className="button" href={`/admin/projects/${project.id}`}>Edit</Link>
                      <Link className="button" href={`/projects/${project.slug}`}>Preview</Link>
                      <DeleteProjectButton id={project.id} title={project.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
