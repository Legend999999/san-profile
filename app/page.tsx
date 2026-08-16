import Link from "next/link";
import { getPublishedProjects, getWebsiteSettings } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

const trustLabels = ["کافێ و ڕێستۆرانت", "فرۆشگا", "خزمەتگوزاری", "براندی نوێ", "پڕۆژەی کەسی"];

const services = [
  {
    number: "01",
    title: "وێبسایتی پیشەیی و بازرگانی",
    description: "وێبسایتێک کە کاروبارەکەت بە ڕوونی پیشان بدات و پەیوەندی کڕیار ئاسان بکات.",
    features: ["دیزاینی تایبەت", "پەڕەکانی خزمەتگوزاری", "بانگەوازی پەیوەندی", "بنچینەی SEO"],
  },
  {
    number: "02",
    title: "بۆتی تێلەگرام",
    description: "بۆتێک بۆ وەڵامدانەوە، ڕێکخستنی داواکاری و کەمکردنەوەی کاری دووبارە.",
    features: ["وەڵامی ئۆتۆماتیک", "فۆڕمی داواکاری", "بەڕێوەبردنی گرووپ/کەناڵ", "تایبەتمەندی بەپێی پێویستی"],
  },
  {
    number: "03",
    title: "سیستەمی دیجیتاڵی",
    description: "داشبۆرد و سیستەم بۆ ڕێکخستنی داتا، داواکاری و کاری ناوخۆی کاروبار.",
    features: ["داشبۆردی بەڕێوەبردن", "داتابەیس", "سیستەمی بەکارهێنەران", "ڕاپۆرت و فلتەر"],
  },
];

const processSteps = [
  {
    title: "ڕاوێژ و گفتوگۆ",
    description: "ئامانج، بودجە، ناوەڕۆک و پێویستییەکان بە ڕوونی دەستنیشان دەکەین.",
  },
  {
    title: "پلاندانان و دیزاین",
    description: "پێکهاتە، پەڕەکان و شێوازی پیشاندانی براند ڕێک دەخەین.",
  },
  {
    title: "گەشەپێدان و کۆدنووسین",
    description: "پڕۆژەکە بە کۆدی پاک دروست دەکرێت و لەسەر مۆبایل تاقی دەکرێتەوە.",
  },
  {
    title: "تاقیکردنەوە و خستنەکار",
    description: "پێداچوونەوە، چاکسازی و خستنەکاری کۆتایی دەکرێت.",
  },
];

const benefits = [
  {
    title: "پەیوەندی ڕاستەوخۆ",
    description: "لەگەڵ خودی گەشەپێدەر گفتوگۆ دەکەیت، بۆیە بڕیار و گۆڕانکاری زوو ڕوون دەبێتەوە.",
  },
  {
    title: "دروستکردنی تایبەت",
    description: "پڕۆژەکە بەپێی پێویستی کاروبارەکەت دروست دەکرێت، نەک تەنها بە قالبێکی ئامادە.",
  },
  {
    title: "قۆناغە ڕوونەکان",
    description: "لە سەرەتاوە دەزانیت چی دەکرێت، چی پێویستە، و پڕۆژەکە لە کوێیە.",
  },
  {
    title: "پشتیوانی تەکنیکی",
    description: "دوای تەواوبوونیش ڕێنمایی و چارەسەری کێشە تەکنیکییەکان پێشکەش دەکرێت.",
  },
];

function contactHref(settings: Awaited<ReturnType<typeof getWebsiteSettings>>) {
  if (settings.telegram_url) {
    const joiner = settings.telegram_url.includes("?") ? "&" : "?";
    return `${settings.telegram_url}${joiner}text=${encodeURIComponent(siteConfig.telegramMessage)}`;
  }
  return settings.email ? `mailto:${settings.email}` : "";
}

export default async function Home() {
  const [settings, projects] = await Promise.all([
    getWebsiteSettings(),
    getPublishedProjects(),
  ]);
  const primaryContact = contactHref(settings);
  const telegramHref = settings.telegram_url ? contactHref(settings) : "";
  const year = new Date().getFullYear();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Kurd Website",
    alternateName: "کورد وێبسایت",
    url: siteConfig.url,
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
                کاروبارەکەت بەهێزتر{" "}
                <span>پیشان بدە</span>
              </h1>
              <p>
                کورد وێبسایت لەلایەن San بەڕێوە دەبرێت و وێبسایت، بۆتی تێلەگرام و سیستەمی دیجیتاڵی بۆ کاروبارە کوردییەکان دروست دەکات.
              </p>
              <div className="hero-buttons">
                <a className="button primary" href="#contact">
                  گفتوگۆی سەرەتایی
                </a>
                <a className="button ghost" href="#projects">
                  بینینی کارەکانمان
                </a>
              </div>
              <div className="trust-chips" aria-label="تایبەتمەندییەکان">
                <span>باوەڕی زیاتر</span>
                <span>پەیوەندیی ئاسانتر</span>
                <span>کات پاراستن</span>
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
            <strong>گونجاو بۆ کاروبارە ناوخۆییەکان</strong>
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
              <h2>ئەو شتانەی کاروبارەکەت پێویستی پێیەتی</h2>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="card-topline">
                    <span className={`service-icon service-icon-${service.number}`} aria-hidden="true" />
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
              <p>هەر کارتێک پەڕەی وردەکاری، پێشبینینی بینراو و زانیاری تەکنیکی خۆی هەیە.</p>
            </div>
            {projects.length > 0 ? (
              <div className="project-grid">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="empty-projects">
                <div className="empty-icon service-icon service-icon-01" aria-hidden="true" />
                <p>بەم زووانە پڕۆژەی نوێ زیاتر لێرە بڵاودەکەینەوە.</p>
                <a className="button primary" href="#contact">
                  گفتوگۆی سەرەتایی
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="section" id="process">
          <div className="container">
            <div className="section-head">
              <span className="badge">چۆنیەتی کارکردن</span>
              <h2>پرۆسەیەکی ڕوون، بێ ئاڵۆزی</h2>
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
              <span className="badge">بۆچی کارکردن لەگەڵ ئێمە؟</span>
              <h2>پڕۆژەکەت ڕاستەوخۆ لەگەڵ ئەو کەسە دەچێتە پێش کە کۆدەکە دەنووسێت</h2>
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
              کورد وێبسایت ستۆدیۆیەکی سەربەخۆیە و لەلایەن San بەڕێوە دەبرێت؛ گەشەپێدەرێک کە ڕاستەوخۆ لەگەڵ خاوەنی کاروبار کار دەکات.
              ئامانج ئەوەیە کاروبارەکەت بە شێوەیەکی باوەڕپێکراو پیشان بدرێت، پەیوەندی کڕیار ئاسانتر بێت و کارە دووبارەکان بە ئۆتۆماتیککردن کەم ببنەوە.
            </p>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-card">
            <div>
              <span className="badge">پەیوەندی</span>
              <h2>بیرۆکەکەت بۆ گفتوگۆیەکی سەرەتایی بنێرە</h2>
              <p>لە تێلەگرام پەیام بنێرە؛ پێداویستییەکان دەبینین و ڕێگەی گونجاو بۆ پڕۆژەکەت دەستنیشان دەکەین.</p>
            </div>
            <div className="contact-actions">
              {settings.telegram_url ? (
                <a className="button primary" href={telegramHref} rel="noreferrer" target="_blank">
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
            {settings.telegram_url ? <a href={telegramHref} rel="noreferrer" target="_blank">Telegram</a> : null}
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
