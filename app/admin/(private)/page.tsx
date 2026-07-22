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
          <h1>Portfolio CMS</h1>
          <p className="muted">Manage published work, drafts, images, and homepage content from Supabase.</p>
        </div>
        <Link className="button primary" href="/admin/projects/new">
          Quick Add Project
        </Link>
      </div>
      <section className="stat-grid">
        <div className="admin-card stat-card"><span className="muted">Total projects</span><div className="stat-value">{projects.length}</div><small>All Supabase rows</small></div>
        <div className="admin-card stat-card"><span className="muted">Published</span><div className="stat-value">{published.length}</div><small>Visible to visitors</small></div>
        <div className="admin-card stat-card"><span className="muted">Drafts</span><div className="stat-value">{drafts.length}</div><small>Hidden from public</small></div>
        <div className="admin-card stat-card"><span className="muted">Featured</span><div className="stat-value">{featured.length}</div><small>Priority display</small></div>
      </section>
      <section className="section admin-section">
        <div className="section-header">
          <h2 className="section-title">Recent projects</h2>
          <Link className="pill-link" href="/admin/projects">Manage all</Link>
        </div>
        {projects.length === 0 ? (
          <div className="empty-state admin-empty">
            <h3>No projects yet.</h3>
            <p>Add your first real project, upload an image, and publish it when it is ready for visitors.</p>
            <Link className="button primary" href="/admin/projects/new">Create Project</Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Title</th><th>Status</th><th>Featured</th><th>Added</th></tr></thead>
              <tbody>
                {projects.slice(0, 6).map((project) => (
                  <tr key={project.id}>
                    <td>{project.title}</td>
                    <td><span className={`status-badge ${project.published ? "published" : "draft"}`}>{project.published ? "Published" : "Draft"}</span></td>
                    <td><span className={`status-badge ${project.featured ? "featured" : ""}`}>{project.featured ? "Featured" : "Standard"}</span></td>
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
