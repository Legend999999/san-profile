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
            <Link href="/admin/login">داشبۆرد</Link>
          </nav>
        </div>
      </header>

      <main className="public-main">
        <section className="hero">
          <div className="site-shell hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Kurd Web / کورد وێب</span>
              <h1>
                بیرۆکەت دەکەینە ئەزموونێکی دیجیتاڵی بەهێز
              </h1>
              <p className="lead">{settings.introduction}</p>
              <div className="hero-proof" aria-label="تواناکانی کورد وێب">
                <span>وێبسایتی Responsive</span>
                <span>ڕووکارە خێراکان</span>
                <span>سیستەمی دیجیتاڵی پاک</span>
              </div>
              <div className="hero-actions">
                <a className="button primary" href="#projects">
                  پڕۆژەکانمان ببینە
                </a>
                <a className="button" href="#contact">
                  دەست بە پڕۆژەکەت بکە
                </a>
              </div>
            </div>
            <div className="hero-panel premium-panel" aria-hidden="true">
              <div className="portfolio-device">
                <div className="device-toolbar">
                  <span />
                  <span />
                  <span />
                  <strong>kurd-web</strong>
                </div>
                <div className="device-hero">
                  <div>
                    <small>پڕۆژەی دیاریکراو</small>
                    <strong>وێبسایتی مۆدێرن</strong>
                  </div>
                  <div className="device-badge">Live</div>
                </div>
                <div className="device-grid">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="device-footer">
                  <span>دیزاین</span>
                  <span>کۆد</span>
                  <span>Deploy</span>
                </div>
              </div>
              <div className="hero-orbit">
                <div>
                  <span>CMS</span>
                  <strong>بە Supabase بەڕێوەدەبرێت</strong>
                </div>
                <div>
                  <span>دۆخ</span>
                  <strong>ئامادەی Production</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section intro-band" aria-label="خزمەتگوزارییەکان">
          <div className="site-shell intro-grid">
            <div>
              <p className="eyebrow">خزمەتگوزارییەکان</p>
              <h2 className="section-title">چوارچێوەی کاری کورد وێب بۆ پڕۆژەی دیجیتاڵی بەهێز.</h2>
            </div>
            <div className="focus-list">
              <div>
                <span>01</span>
                <strong>وێبسایتی پیشەیی و بازرگانی</strong>
                <p>دروستکردنی وێبسایتی خێرا و مۆدێرن بۆ براند و کۆمپانیاکان.</p>
              </div>
              <div>
                <span>02</span>
                <strong>بۆتی تێلەگرام و ژیری دەستکرد</strong>
                <p>بۆتی زیرەک، ئامرازەکانی ژیری دەستکرد و ئۆتۆماتیککردنی کارەکان بۆ ڕێکخستنی کارە ڕۆژانەکان.</p>
              </div>
              <div>
                <span>03</span>
                <strong>سیستەمی دیجیتاڵی تایبەت</strong>
                <p>بنیاتنانی سیستەمی گونجاو بەپێی پێداویستییە تایبەتەکانی پڕۆژەکەت.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="site-shell">
            <div className="section-header">
              <div>
                <p className="eyebrow">دواین پڕۆژەکانمان</p>
                <h2 className="section-title">پڕۆژەکان</h2>
              </div>
              <p className="muted">پڕۆژە Published ـەکان لە Supabase دوای پاشەکەوتکردن دەستبەجێ لێرە دەردەکەون.</p>
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
                  <p className="eyebrow">پڕۆژەی بڵاوکراوە نییە</p>
                  <h3>هیچ پڕۆژەیەک نەدۆزرایەوە.</h3>
                  <p>
                    کاتێک پڕۆژەیەکی ڕاستەقینە لە داشبۆرد زیاد دەکەیت،
                    وێنەیەکی پیشەیی بار دەکەیت و Published دەکەیت،
                    لێرە دەردەکەوێت بێ Deploy ـی نوێ.
                  </p>
                  <div className="hero-actions">
                    <Link className="button primary" href="/admin/login">
                      کردنەوەی داشبۆرد
                    </Link>
                    <a className="button" href="#contact">
                      پەیوەندی بکە
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
