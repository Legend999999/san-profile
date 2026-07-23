import Link from "next/link";
import { getAllProjects } from "@/lib/data";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

export default async function AdminProjects() {
  const projects = await getAllProjects();

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow">بەڕێوەبردنی کارەکان</p>
          <h1>پڕۆژەکان</h1>
          <p className="muted">پڕۆژە دروست بکە، بڵاوی بکەرەوە، ڕیزبەندی بکە، پێشبینی بکە و بسڕەوە.</p>
        </div>
        <Link className="button primary" href="/admin/projects/new">زیادکردنی پڕۆژە</Link>
      </div>
      {projects.length === 0 ? (
        <div className="empty-state admin-empty">
          <h3>هیچ پڕۆژەیەک نییە.</h3>
          <p>پۆرتفۆلیۆی گشتی پاک دەمێنێتەوە تا پڕۆژەی ڕاستەقینە Published دەکەیت.</p>
          <Link className="button primary" href="/admin/projects/new">زیادکردنی پڕۆژە</Link>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>پڕۆژە</th><th>URL</th><th>دۆخ</th><th>ڕیز</th><th>کردارەکان</th></tr></thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td><strong>{project.title}</strong><br /><span className="muted">{project.category}</span></td>
                  <td><a className="muted table-url" href={project.website_url}>{project.website_url}</a></td>
                  <td>
                    <div className="badge-stack">
                      <span className={`status-badge ${project.published ? "published" : "draft"}`}>{project.published ? "بڵاوکراوە" : "Draft"}</span>
                      {project.featured ? <span className="status-badge featured">تایبەت</span> : null}
                    </div>
                  </td>
                  <td>{project.display_order}</td>
                  <td>
                    <div className="table-actions">
                      <Link className="button" href={`/admin/projects/${project.id}`}>دەستکاری</Link>
                      <Link className="button" href={`/projects/${project.slug}`}>بینینی پێشەکی</Link>
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
