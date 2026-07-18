import Link from "next/link";
import { getAllProjects } from "@/lib/data";

export default async function AdminDashboard() {
  const projects = await getAllProjects();
  const published = projects.filter((project) => project.published);
  const drafts = projects.filter((project) => !project.published);
  const featured = projects.filter((project) => project.featured);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow">Private dashboard</p>
          <h1>Dashboard</h1>
        </div>
        <Link className="button primary" href="/admin/projects/new">
          Quick Add Project
        </Link>
      </div>
      <section className="stat-grid">
        <div className="admin-card"><span className="muted">Total projects</span><div className="stat-value">{projects.length}</div></div>
        <div className="admin-card"><span className="muted">Published</span><div className="stat-value">{published.length}</div></div>
        <div className="admin-card"><span className="muted">Drafts</span><div className="stat-value">{drafts.length}</div></div>
        <div className="admin-card"><span className="muted">Featured</span><div className="stat-value">{featured.length}</div></div>
      </section>
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Recent projects</h2>
          <Link className="pill-link" href="/admin/projects">Manage all</Link>
        </div>
        {projects.length === 0 ? (
          <div className="empty-state">No projects yet. Add your first project.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Title</th><th>Status</th><th>Featured</th><th>Added</th></tr></thead>
              <tbody>
                {projects.slice(0, 6).map((project) => (
                  <tr key={project.id}>
                    <td>{project.title}</td>
                    <td>{project.published ? "Published" : "Draft"}</td>
                    <td>{project.featured ? "Yes" : "No"}</td>
                    <td>{new Date(project.created_at).toLocaleDateString("en")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
