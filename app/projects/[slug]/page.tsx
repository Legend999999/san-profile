import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data";
import { isProbablyEmbeddable } from "@/lib/url-security";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.short_description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.short_description,
      images: project.screenshot_url ? [{ url: project.screenshot_url }] : undefined,
    },
  };
}

export default async function ProjectPreview({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const canTryIframe = isProbablyEmbeddable(project.website_url);

  return (
    <>
      <header className="nav">
        <div className="site-shell nav-inner">
          <Link className="brand" href="/">
            <span className="brand-mark">S</span>
            <span>San</span>
          </Link>
          <nav className="nav-links" aria-label="Project navigation">
            <Link href="/#projects">Back to Projects</Link>
            <a href={project.website_url} target="_blank" rel="noreferrer">Open Original Website</a>
          </nav>
        </div>
      </header>
      <main className="site-shell preview-page">
        <section className="section">
          <p className="eyebrow">{project.category}</p>
          <h1 className="section-title">{project.title}</h1>
          <p className="lead">{project.full_description || project.short_description}</p>
          <div className="tag-row">
            {project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}
          </div>
          <div className="hero-actions">
            <Link className="button" href="/#projects">Back to Projects</Link>
            <a className="button primary" href={project.website_url} target="_blank" rel="noreferrer">Open Website in New Tab</a>
          </div>
        </section>
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <h2 className="section-title">Live Preview</h2>
          </div>
          {canTryIframe ? (
            <>
              <iframe src={project.website_url} title={`${project.title} live preview`} loading="lazy" />
              <p className="muted">If the preview does not load, this website does not allow embedded previews.</p>
            </>
          ) : (
            <div className="empty-state">
              This website does not allow embedded previews.
              <div className="hero-actions">
                <a className="button primary" href={project.website_url} target="_blank" rel="noreferrer">Open Website in New Tab</a>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
