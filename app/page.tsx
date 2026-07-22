import Link from "next/link";
import { getPublishedProjects, getWebsiteSettings } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

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

      <main className="public-main">
        <section className="hero">
          <div className="site-shell hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Independent web portfolio</span>
              <h1>
                {settings.owner_name} builds sharp web experiences with a polished edge.
              </h1>
              <p className="lead">{settings.introduction}</p>
              <div className="hero-proof" aria-label="Portfolio capabilities">
                <span>Responsive websites</span>
                <span>Fast interfaces</span>
                <span>Clean project systems</span>
              </div>
              <div className="hero-actions">
                <a className="button primary" href="#projects">
                  View Work
                </a>
                <a className="button" href="#contact">
                  Contact San
                </a>
              </div>
            </div>
            <div className="hero-panel premium-panel" aria-hidden="true">
              <div className="portfolio-device">
                <div className="device-toolbar">
                  <span />
                  <span />
                  <span />
                  <strong>san-profile</strong>
                </div>
                <div className="device-hero">
                  <div>
                    <small>Selected build</small>
                    <strong>Modern Website</strong>
                  </div>
                  <div className="device-badge">Live</div>
                </div>
                <div className="device-grid">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="device-footer">
                  <span>Design</span>
                  <span>Code</span>
                  <span>Deploy</span>
                </div>
              </div>
              <div className="hero-orbit">
                <div>
                  <span>CMS</span>
                  <strong>Supabase powered</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>Production ready</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section intro-band" aria-label="Portfolio focus">
          <div className="site-shell intro-grid">
            <div>
              <p className="eyebrow">What this portfolio shows</p>
              <h2 className="section-title">Built for work that needs to feel credible fast.</h2>
            </div>
            <div className="focus-list">
              <div>
                <span>01</span>
                <strong>Modern presentation</strong>
                <p>Dark, focused pages for sites, tools, bots, and client-ready builds.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Real project control</strong>
                <p>Projects, images, settings, and publishing are managed from the private CMS.</p>
              </div>
              <div>
                <span>03</span>
                <strong>Clean delivery</strong>
                <p>Hosted on Vercel, editable through Supabase, and ready for real portfolio content.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="site-shell">
            <div className="section-header">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="section-title">Projects</h2>
              </div>
              <p className="muted">Published Supabase projects will appear here instantly after you save them.</p>
            </div>
            {projects.length > 0 ? (
              <div className="project-grid">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="empty-state portfolio-empty">
                <div className="empty-visual" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div>
                  <p className="eyebrow">Portfolio awaiting real work</p>
                  <h3>No published projects yet.</h3>
                  <p>
                    Add your first project from the admin dashboard, upload a polished image,
                    mark it as published, and it will appear here without another deploy.
                  </p>
                  <div className="hero-actions">
                    <Link className="button primary" href="/admin/login">
                      Open Admin
                    </Link>
                    <a className="button" href="#contact">
                      Contact First
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="site-shell contact-band">
            <div>
              <p className="eyebrow">Available for modern web work</p>
              <h2 className="section-title">Let&apos;s make the next project feel premium from day one.</h2>
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
