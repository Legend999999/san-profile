import Link from "next/link";
import { getPublishedProjects, getWebsiteSettings } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteHeader } from "@/components/SiteHeader";

export const dynamic = "force-dynamic";

const trustLabels = ["کافێ و ڕێستورانت", "کۆمپانیا", "فرۆشگا", "کەسی", "خزمەتگوزاری"];

const services = [
  {
    number: "01",
    icon: "▣",
    title: "وێبسایتی پیشەیی و بازرگانی",
    description: "وێبسایتێکی خێرا، جوان و متمانەپێکراو بۆ ناساندن و گەشەپێدانی کاروبارەکەت.",
    features: ["دیزاینی تایبەت", "گونجاو بۆ هەموو ئامێرەکان", "SEO و خێرایی باش", "پەیوەندی و داواکاری"],
  },
  {
    number: "02",
    icon: "✦",
    title: "بۆتی تێلەگرام",
    description: "بۆتی زیرەک بۆ وەڵامدانەوە، بەڕێوەبردن، ئۆتۆماتیککردن و خزمەتکردنی بەکارهێنەران.",
    features: ["ئۆتۆماتیککردنی کارەکان", "بەڕێوەبردنی گرووپ", "سیستەمی وەڵامدانەوە", "تایبەتمەندی تایبەت"],
  },
  {
    number: "03",
    icon: "◈",
    title: "سیستەمی دیجیتاڵی تایبەت",
    description: "چارەسەرێکی تایبەت بۆ ڕێکخستن، بەڕێوەبردن و ئاسانکردنی کارەکانی کاروبارەکەت.",
    features: ["داشبۆردی بەڕێوەبەرایەتی", "داتابەیس", "سیستەمی ئەندامان", "ئۆتۆماتیککردن"],
  },
];

const processSteps = [
  {
    title: "گفتوگۆ",
    description: "کاروبار، ئامانج و تایبەتمەندییە پێویستەکان دەزانین.",
  },
  {
    title: "پلان و دیزاین",
    description: "پێکهاتە و ئاراستەی بینراوی ماڵپەڕەکە ئامادە دەکەین.",
  },
  {
    title: "گەشەپێدان",
    description: "ماڵپەڕەکە دروست دەکەین و بۆ ئامێرە جیاوازەکان ڕێکی دەخەین.",
  },
  {
    title: "بڵاوکردنەوە",
    description: "تاقی دەکەینەوە، دەیخەینە کار و بۆ سەردانکەری ڕاستەقینە ئامادەی دەکەین.",
  },
];

const benefits = [
  {
    title: "دیزاینی مۆدێرن",
    description: "هەر ماڵپەڕێک دەبێت تایبەت بێت و لەگەڵ شێوازی کاروبارەکە بگونجێت.",
  },
  {
    title: "گونجاو بۆ هەموو ئامێرەکان",
    description: "ماڵپەڕەکە لەسەر مۆبایل، تابلێت و کۆمپیوتەر بە باشی کار دەکات.",
  },
  {
    title: "خێرایی و کارایی",
    description: "کۆد، وێنە و باربوونی پەڕەکان بە شێوەیەکی پاک ڕێک دەخرێن.",
  },
  {
    title: "پەیوەندیی ڕاستەوخۆ",
    description: "لە کاتی پڕۆژەدا پەیوەندی ڕوون و ڕاستەوخۆ لەگەڵمان دەبێت.",
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
                وێبسایتێک دروست دەکەین کە سەردانکەران دەکاتە{" "}
                <span>کڕیار</span>
              </h1>
              <p>
                وێبسایتی خێرا، جوان و متمانەپێکراو بۆ گەشەی کاروبارەکەت دروست دەکەین.
              </p>
              <div className="hero-buttons">
                <a className="button primary" href="#contact">
                  دەست بە پڕۆژەکەت بکە
                </a>
                <a className="button ghost" href="#projects">
                  کارەکانمان ببینە
                </a>
              </div>
              <div className="trust-chips" aria-label="تایبەتمەندییەکان">
                <span>دیزاینی مۆدێرن</span>
                <span>گونجاو بۆ مۆبایل</span>
                <span>خێرا و متمانەپێکراو</span>
              </div>
            </div>

            <div className="hero-visual fade-up" aria-label="پێشبینی وێبسایتی مۆدێرن">
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

        <section className="trust-strip" aria-label="جۆری کاروبارەکان">
          <div className="container trust-strip-inner">
            <strong>دروستکراو بۆ کاروباری مۆدێرن</strong>
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
              <h2>هەموو ئەوەی کاروبارەکەت بۆ گەشەکردن پێویستی پێیە</h2>
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
                <h2>کارەکانمان باشتر لە وشە قسە دەکەن</h2>
              </div>
              <p>هەندێک لە وێبسایت و چارەسەرە دیجیتاڵییەکانمان ببینە.</p>
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
                <p>پڕۆژە نوێیەکانمان بەم زووانە لێرە بڵاودەکەینەوە.</p>
                <a className="button primary" href="#contact">
                  دەست بە پڕۆژەی خۆت بکە
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="section" id="process">
          <div className="container">
            <div className="section-head">
              <span className="badge">چۆنیەتی کارکردن</span>
              <h2>لە بیرۆکەوە تا وێبسایتێکی ئامادە</h2>
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
              <span className="badge">بۆچی ئێمە؟</span>
              <h2>تەنها وێبسایت دروست ناکەین؛ ئامرازێک بۆ گەشە دروست دەکەین</h2>
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
              کورد وێبسایت خزمەتگوزاریی دیزاین و گەشەپێدانی وێبسایت پێشکەش دەکات.
              ئامانجمان دروستکردنی وێبسایتێکی جوان، خێرا و بەسوودە کە یارمەتی کاروبارەکان بدات باشتر بناسرێن و گەشە بکەن.
            </p>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-card">
            <div>
              <span className="badge">پەیوەندی</span>
              <h2>ئامادەیت کاروبارەکەت ئۆنلاین بگەشێنیت؟</h2>
              <p>بیرۆکەت بۆمان بنێرە؛ ئێمە یارمەتیت دەدەین ببێتە وێبسایتێکی پیشەیی.</p>
            </div>
            <div className="contact-actions">
              {settings.telegram_url ? (
                <a className="button primary" href={settings.telegram_url} rel="noreferrer" target="_blank">
                  لە تێلەگرام پەیوەندیمان پێوە بکە
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
        <a className="floating-contact" href={primaryContact} rel="noreferrer" target={primaryContact.startsWith("http") ? "_blank" : undefined} aria-label="پەیوەندی خێرا">
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
            <p>وێبسایت، بۆتی تێلەگرام و سیستەمی دیجیتاڵی بۆ کاروبار و کەسایەتییەکان.</p>
          </div>
          <nav aria-label="لینکەکانی پەڕە">
            <strong>ڕێنوێنی</strong>
            <a href="#services">خزمەتگوزارییەکان</a>
            <a href="#projects">پڕۆژەکان</a>
            <a href="#process">چۆنیەتی کارکردن</a>
            <a href="#contact">پەیوەندی</a>
          </nav>
          <nav aria-label="خزمەتگوزارییەکان">
            <strong>خزمەتگوزاری</strong>
            <a href="#services">وێبسایت</a>
            <a href="#services">بۆتی تێلەگرام</a>
            <a href="#services">سیستەمی تایبەت</a>
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
