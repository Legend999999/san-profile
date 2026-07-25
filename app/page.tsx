import Link from "next/link";
import { getPublishedProjects, getWebsiteSettings } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteHeader } from "@/components/SiteHeader";

export const dynamic = "force-dynamic";

const trustLabels = ["کافێ و ڕێستۆرانت", "کۆمپانیاکان", "فرۆشگاکان", "پڕۆژەی کەسی", "خزمەتگوزارییەکان"];

const services = [
  {
    number: "01",
    icon: "▣",
    title: "وێبسایتی پیشەیی و بازرگانی",
    description: "وێبسایتێکی خێرا و سەردەمیی بۆ ناساندن و گەشەپێدان و کۆدنووسینی ناوبانگی بڕاندەکەت.",
    features: ["دیزاینی تایبەت (Custom Design)", "گونجاو بۆ تەواوی ئامێرەکان", "خێرایی بەرز و گونجاو بۆ SEO", "سیستەمی پەیوەندی و داواکاری"],
  },
  {
    number: "02",
    icon: "✦",
    title: "بۆتی تێلەگرام",
    description: "بۆتی ئۆتۆماتیکی بۆ وەڵامدانەوەی خێرا، بەڕێوەبردن و پێشکەشکردنی خزمەتگوزارییەکان.",
    features: ["ئۆتۆماتیککردنی کارەکان", "بەڕێوەبردنی گرووپ و کەناڵ", "سیستەمی وەڵامدانەوەی ئۆتۆماتیکی", "تایبەتمەندیی تایبەت"],
  },
  {
    number: "03",
    icon: "◈",
    title: "سیستەمی دیجیتاڵی دیار",
    description: "چارەسەری دیجیتاڵی بۆ بەڕێوەبردن، ئۆتۆماتیککردنی کارەکان و ئاسانکاریی کارەکانت.",
    features: ["داشبۆردی بەڕێوەبردن", "بەڕێوەبردنی داتابەیس", "سیستەمی بەکارهێنەران و ئەندامان", "ئۆتۆماتیککردنی کارەکان"],
  },
];

const processSteps = [
  {
    title: "ڕاوێژ و گفتوگۆ",
    description: "لە ئامانج و پێداویستییەکانی کاروبارەکەت دەکۆڵینەوە.",
  },
  {
    title: "پلاندانان و دیزاین",
    description: "پێکهاتە و دیزاینی بینراوی وێبسایتەکە دروست دەکەین.",
  },
  {
    title: "گەشەپێدان و کۆدنووسین",
    description: "وێبسایتەکە بەرنامەڕێژی دەکەین و بۆ تەواوی ئامێرەکان گونجاوی دەکەین.",
  },
  {
    title: "بڵاوکردنەوە و خستنەکار",
    description: "تاقی دەکەینەوە، دەیخەینە کار و بۆ سەردانکەری ڕاستەقینە ئامادەی دەکەین.",
  },
];

const benefits = [
  {
    title: "دیزاینی مۆدێرن",
    description: "هەر وێبسایتێک بەپێی پێداویستییە تایبەتییەکانی کاروبارەکەت دیزاین دەکرێت.",
  },
  {
    title: "گونجاو بۆ تەواوی ئامێرەکان",
    description: "وێبسایتەکەت لەسەر مۆبایل، تابلێت و کۆمپیوتەر بە شێوەیەکی بێخەوش کار دەکات.",
  },
  {
    title: "خێرایی و کارایی بەرز",
    description: "بەکارهێنانی کۆدی خاوێن و بەرزکردنەوەی خێرایی باربوونی پەڕەکان.",
  },
  {
    title: "پشتیوانی و پەیوەندیی بەردەوام",
    description: "لە تەواوی قۆناغەکانی پڕۆژەکەدا پەیوەندیی ڕوون و ڕاستەوخۆمان لەگەڵ دەبێت.",
  },
];

function contactHref(settings: Awaited<ReturnType<typeof getWebsiteSettings>>) {
  return settings.telegram_url || (settings.email ? `mailto:${settings.email}` : "");
}

export default async function Home() {
  const [settings, projects] = await Promise.all([
    getWebsiteSettings(),
    getPublishedProjects(),
  ]);
  const primaryContact = contactHref(settings);
  const year = new Date().getFullYear();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Kurd Website",
    alternateName: "کورد وێبسایت",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kurdwebsite.com",
    areaServed: "Kurdistan",
    serviceType: ["Website design", "Telegram bots", "Custom digital systems"],
    sameAs: settings.telegram_url ? [settings.telegram_url] : undefined,
    email: settings.email ?? undefined,
  };

  return (
    <>
      <SiteHeader />
      <main className="agency-main" id="home">
        <section className="hero-section">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-content fade-up">
              <span className="badge">دیزاین و گەشەپێدانی وێبسایت</span>
              <h1>
                وێبسایتێک بۆ ڕاکێشانی زۆرترین{" "}
                <span>کڕیار</span>
              </h1>
              <p>
                دروستکردنی وێبسایتی خێرا، مۆدێرن و باوەڕپێکراو بۆ گەشەپێدان و کۆدنووسینی بڕاندەکەت.
              </p>
              <div className="hero-buttons">
                <a className="button primary" href="#contact">
                  دەستپێکردنی پڕۆژە
                </a>
                <a className="button ghost" href="#projects">
                  بینینی کارەکانمان
                </a>
              </div>
              <div className="trust-chips" aria-label="تایبەتمەندییەکان">
                <span>دیزاینی مۆدێرن</span>
                <span>گونجاو بۆ مۆبایل</span>
                <span>خێرا و باوەڕپێکراو</span>
              </div>
            </div>

            <div className="hero-visual fade-up" aria-label="پێشاندانی وێبسایتی مۆدێرن">
              <div className="browser-mockup">
                <div className="browser-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="mockup-body">
                  <div className="mockup-nav" />
                  <div className="mockup-hero">
                    <div>
                      <span />
                      <strong />
                      <p />
                    </div>
                    <aside />
                  </div>
                  <div className="mockup-grid">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
              <div className="floating-card responsive-card">مۆبایل</div>
              <div className="floating-card fast-card">خێرا</div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="جۆری بوارەکان">
          <div className="container trust-strip-inner">
            <strong>دیار بە کاروبارە مۆدێرنەکان</strong>
            <div>
              {trustLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section-head">
              <span className="badge">خزمەتگوزارییەکان</span>
              <h2>سەرجەم پێداویستییەکانی گەشەی دیجیتاڵیی کاروبارەکەت</h2>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="card-topline">
                    <span className="service-icon">{service.icon}</span>
                    <span>{service.number}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects-band" id="projects">
          <div className="container">
            <div className="section-head split">
              <div>
                <span className="badge">پڕۆژەکان</span>
                <h2>نمونەی کارەکانمان</h2>
              </div>
              <p>هەندێک لە دوایین وێبسایتەکان و پڕۆژە دیجیتاڵییەکانمان ببینە.</p>
            </div>
            {projects.length > 0 ? (
              <div className="project-grid">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="empty-projects">
                <div className="empty-icon" aria-hidden="true">▣</div>
                <p>بەم زووانە پڕۆژەی نوێ زیاتر لێرە بڵاودەکەینەوە.</p>
                <a className="button primary" href="#contact">
                  دەستپێکردنی پڕۆژەی نوێ
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="section" id="process">
          <div className="container">
            <div className="section-head">
              <span className="badge">چۆنیەتی کارکردن</span>
              <h2>لە بیرۆکەوە تا پڕۆژەی تەواوکراو</h2>
            </div>
            <div className="process-line">
              {processSteps.map((step, index) => (
                <article className="process-step" key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section benefits-section">
          <div className="container benefit-layout">
            <div className="benefit-copy">
              <span className="badge">بۆچی کورد وێبسایت؟</span>
              <h2>ئێمە تەنها وێبسایتەکان دروست ناکەین، بەڵکو ئامرازێک بۆ گەشەی بڕاندەکەت دەسازێنین</h2>
            </div>
            <div className="benefit-grid">
              {benefits.map((benefit) => (
                <article className="benefit-card" key={benefit.title}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container about-card">
            <span className="badge">دەربارە</span>
            <h2>دەربارەی کورد وێبسایت</h2>
            <p>
              کورد وێبسایت ستۆدیۆیەکی تایبەتمەندە لە دیزاین و گەشەپێدانی وێبسایت و سیستەمە دیجیتاڵییەکان.
              ئامانجمان دروستکردنی چارەسەری دیجیتاڵیی خێرا و مۆدێرنە کە یارمەتی گەشەکردنی بەردەوامی بڕاندەکەت بدات.
            </p>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-card">
            <div>
              <span className="badge">پەیوەندی</span>
              <h2>ئامادەیت بۆ دەستپێکردنی پڕۆژەکەت؟</h2>
              <p>بیرۆکەکەت لەگەڵمان بەشدار بکە، ئێمە دەیکەینە واقعێکی دیجیتاڵیی پیشەیی.</p>
            </div>
            <div className="contact-actions">
              {settings.telegram_url ? (
                <a className="button primary" href={settings.telegram_url} rel="noreferrer" target="_blank">
                  پەیوەندیکردن لە ڕێگەی تێلەگرام
                </a>
              ) : null}
              {settings.email ? (
                <a className="button ghost" href={`mailto:${settings.email}`}>
                  Email
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      {primaryContact ? (
        <a className="floating-contact" href={primaryContact} rel="noreferrer" target={primaryContact.startsWith("http") ? "_blank" : undefined} aria-label="پەیوەندیی خێرا">
          پەیوەندی
        </a>
      ) : null}

      <footer className="agency-footer">
        <div className="container footer-grid">
          <div>
            <Link className="agency-brand" href="#home">
              <span className="brand-symbol" aria-hidden="true">KW</span>
              <span>کورد وێبسایت</span>
            </Link>
            <p>دروستکردنی وێبسایتەکان، بۆتی تێلەگرام و سیستەمی دیجیتاڵی بۆ کاروبارەکان.</p>
          </div>
          <nav aria-label="بەشەکانی وێبسایت">
            <strong>بەشە سەرەکییەکان</strong>
            <a href="#services">خزمەتگوزارییەکان</a>
            <a href="#projects">پڕۆژەکان</a>
            <a href="#process">چۆنیەتی کارکردن</a>
            <a href="#contact">پەیوەندی</a>
          </nav>
          <nav aria-label="خزمەتگوزارییەکان">
            <strong>خزمەتگوزارییەکان</strong>
            <a href="#services">وێبسایتەکان</a>
            <a href="#services">بۆتی تێلەگرام</a>
            <a href="#services">سیستەمی دیجیتاڵی</a>
          </nav>
          <div>
            <strong>پەیوەندی</strong>
            {settings.telegram_url ? <a href={settings.telegram_url} rel="noreferrer" target="_blank">Telegram</a> : null}
            {settings.email ? <a href={`mailto:${settings.email}`}>Email</a> : null}
          </div>
        </div>
        <div className="container footer-bottom">
          © {year} Kurd Website — کورد وێبسایت
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
