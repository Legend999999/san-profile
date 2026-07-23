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
          <p className="eyebrow">داشبۆردی تایبەت</p>
          <h1>CMS ـی کورد وێب</h1>
          <p className="muted">پڕۆژە Published ـەکان، Draft ـەکان، وێنەکان و ناوەڕۆکی ماڵپەڕ لە Supabase بەڕێوەببە.</p>
        </div>
        <Link className="button primary" href="/admin/projects/new">
          زیادکردنی خێرای پڕۆژە
        </Link>
      </div>
      <section className="stat-grid">
        <div className="admin-card stat-card"><span className="muted">کۆی پڕۆژەکان</span><div className="stat-value">{projects.length}</div><small>هەموو ڕیزەکانی Supabase</small></div>
        <div className="admin-card stat-card"><span className="muted">بڵاوکراوە</span><div className="stat-value">{published.length}</div><small>بۆ سەردانیکەران دیارە</small></div>
        <div className="admin-card stat-card"><span className="muted">Draft</span><div className="stat-value">{drafts.length}</div><small>لە ماڵپەڕ شاراوەیە</small></div>
        <div className="admin-card stat-card"><span className="muted">تایبەت</span><div className="stat-value">{featured.length}</div><small>پێشاندانی لەپێش</small></div>
      </section>
      <section className="section admin-section">
        <div className="section-header">
          <h2 className="section-title">دواین پڕۆژەکان</h2>
          <Link className="pill-link" href="/admin/projects">بەڕێوەبردنی هەموو</Link>
        </div>
        {projects.length === 0 ? (
          <div className="empty-state admin-empty">
            <h3>هیچ پڕۆژەیەک نییە.</h3>
            <p>یەکەم پڕۆژەی ڕاستەقینە زیاد بکە، وێنە بار بکە و کاتێک ئامادە بوو Published ـی بکە.</p>
            <Link className="button primary" href="/admin/projects/new">دروستکردنی پڕۆژە</Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ناونیشان</th><th>دۆخ</th><th>تایبەت</th><th>زیادکراو</th></tr></thead>
              <tbody>
                {projects.slice(0, 6).map((project) => (
                  <tr key={project.id}>
                    <td>{project.title}</td>
                    <td><span className={`status-badge ${project.published ? "published" : "draft"}`}>{project.published ? "بڵاوکراوە" : "Draft"}</span></td>
                    <td><span className={`status-badge ${project.featured ? "featured" : ""}`}>{project.featured ? "تایبەت" : "ئاسایی"}</span></td>
                    <td>{new Date(project.created_at).toLocaleDateString("ckb-IQ")}</td>
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
