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
        </div>
        <Link className="button primary" href="/admin/projects/new">Add Project</Link>
      </div>
      {projects.length === 0 ? (
        <div className="empty-state">No projects yet. Add your first project.</div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Project</th><th>URL</th><th>Status</th><th>Order</th><th>Actions</th></tr></thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td><a className="muted" href={project.website_url}>{project.website_url}</a></td>
                  <td>{project.published ? "Published" : "Draft"}{project.featured ? " · Featured" : ""}</td>
                  <td>{project.display_order}</td>
                  <td>
                    <div className="hero-actions" style={{ margin: 0 }}>
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
