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
            <span className="brand-mark">ک</span>
            <span>{settings.owner_name}</span>
          </Link>
          <nav className="nav-links" aria-label="ڕێنوێنی سەرەکی">
            <a href="#projects">پڕۆژەکان</a>
            <a href="#contact">پەیوەندی</a>
          </nav>
        </div>
      </header>

      <main className="public-main">
        <section className="hero">
          <div className="site-shell hero-grid hero-grid-simple">
            <div className="hero-copy">
              <span className="eyebrow">Kurd Web / کورد وێب</span>
              <h1>
                بیرۆکەت دەکەینە ئەزموونێکی دیجیتاڵی بەهێز
              </h1>
              <p className="lead">وێبسایت و چارەسەری دیجیتاڵی پیشەیی بۆ کاروبارەکەت دروست دەکەین.</p>
              <div className="hero-actions">
                <a className="button primary" href="#projects">
                  پڕۆژەکانمان ببینە
                </a>
                <a className="button" href="#contact">
                  دەست بە پڕۆژەکەت بکە
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section intro-band" aria-label="خزمەتگوزارییەکان">
          <div className="site-shell intro-grid">
            <div>
              <p className="eyebrow">خزمەتگوزارییەکان</p>
              <h2 className="section-title">خزمەتگوزارییەکی ڕوون بۆ گەشەی کاروبارەکەت</h2>
            </div>
            <div className="focus-list">
              <div>
                <span>01</span>
                <strong>وێبسایتی پیشەیی و بازرگانی</strong>
                <p>ماڵپەڕێکی جوان، ڕوون و متمانەپێکراو بۆ ناساندنی کاروبارەکەت.</p>
              </div>
              <div>
                <span>02</span>
                <strong>بۆتی تێلەگرام</strong>
                <p>بۆتی بەسوود بۆ وەڵامدانەوە، ڕێکخستن و ئاسانکردنی پەیوەندییەکان.</p>
              </div>
              <div>
                <span>03</span>
                <strong>سیستەمی دیجیتاڵی تایبەت</strong>
                <p>چارەسەری تایبەت بۆ ئەو کارانەی پێویستیان بە ڕێکخستن و گەشەی زیاترە.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="site-shell">
            <div className="section-header">
              <div>
                <p className="eyebrow">کارەکانمان</p>
                <h2 className="section-title">پڕۆژەکان</h2>
              </div>
              <p className="muted">هەندێک لە پڕۆژە و کارەکانمان</p>
            </div>
            {projects.length > 0 ? (
              <div className="project-grid">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="empty-state portfolio-empty portfolio-empty-simple">
                <p>بەم زووانە پڕۆژە نوێیەکانمان لێرە بڵاودەکەینەوە.</p>
              </div>
            )}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="site-shell contact-band">
            <div>
              <p className="eyebrow">پەیوەندی</p>
              <h2 className="section-title">با پێکەوە دەست بە پڕۆژەکەت بکەین</h2>
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
