import Link from "next/link";
import { getPublishedProjects, getWebsiteSettings } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";

export default async function Home() {
  const [settings, projects] = await Promise.all([
    getWebsiteSettings(),
    getPublishedProjects(),
  ]);

  return (
    <>
      <header className="nav">
        <div className="site-shell nav-inner">
          <Link className="brand" href="/">
            <span className="brand-mark">S</span>
            <span>{settings.owner_name}</span>
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <Link href="/admin/login">Admin</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="site-shell hero-grid">
            <div>
              <span className="eyebrow">Premium websites by {settings.owner_name}</span>
              <h1>
                {settings.owner_name}
                <br />
                <span className="gradient-text">builds digital work.</span>
              </h1>
              <p className="lead">{settings.introduction}</p>
              <div className="hero-actions">
                <a className="button primary" href="#projects">
                  View Projects
                </a>
                <a className="button" href="#contact">
                  Contact Sam
                </a>
              </div>
            </div>
            <div className="hero-panel" aria-hidden="true">
              <div className="browser-frame">
                <div className="browser-top">
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                </div>
                <div className="browser-preview">
                  <span className="preview-line" />
                  <span className="preview-line" />
                  <span className="preview-line" style={{ width: "72%" }} />
                  <div className="preview-blocks">
                    <span className="preview-block" />
                    <span className="preview-block" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="site-shell">
            <div className="section-header">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="section-title">Projects</h2>
              </div>
              <p className="muted">Newest and featured websites appear first.</p>
            </div>
            {projects.length > 0 ? (
              <div className="project-grid">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="empty-state">New projects are coming soon.</div>
            )}
          </div>
        </section>

        <section className="section" id="contact">
          <div className="site-shell contact-band">
            <div>
              <p className="eyebrow">Available for modern web work</p>
              <h2 className="section-title">Contact</h2>
              <p className="muted">{settings.about_text}</p>
            </div>
            <div className="hero-actions">
              {settings.github_url ? <a className="button" href={settings.github_url}>GitHub</a> : null}
              {settings.telegram_url ? <a className="button" href={settings.telegram_url}>Telegram</a> : null}
              {settings.email ? <a className="button primary" href={`mailto:${settings.email}`}>Email</a> : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="site-shell">{settings.footer_text}</div>
      </footer>
    </>
  );
}
