import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectPreview } from "@/components/ProjectPreview";
import { getProjectBySlug } from "@/lib/data";
import { getProjectDetail } from "@/lib/project-details";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: "پڕۆژە نەدۆزرایەوە" };
  }

  return {
    title: `${project.title} - پڕۆژەی ${siteConfig.englishName}`,
    description: project.short_description,
    alternates: { canonical: absoluteUrl(`/projects/${project.slug}`) },
    openGraph: {
      title: `${project.title} - ${siteConfig.englishName}`,
      description: project.short_description,
      url: absoluteUrl(`/projects/${project.slug}`),
      images: project.screenshot_url ? [{ url: project.screenshot_url }] : [],
    },
    twitter: {
      card: project.screenshot_url ? "summary_large_image" : "summary",
      title: `${project.title} - ${siteConfig.englishName}`,
      description: project.short_description,
      images: project.screenshot_url ? [project.screenshot_url] : [],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return notFound();
  }
  const detail = getProjectDetail(project);
  const hasLiveUrl = detail.live && Boolean(project.website_url);

  return (
    <>
      <header className="nav">
        <div className="site-shell nav-inner">
          <Link className="brand" href="/">
            <span className="brand-mark">ک</span>
            <span>کورد وێبسایت</span>
          </Link>
          <nav className="nav-links" aria-label="منوی پڕۆژە">
            <Link href="/#projects">گەڕانەوە بۆ پڕۆژەکان</Link>
            {hasLiveUrl ? (
              <a href={project.website_url} target="_blank" rel="noreferrer">سەردانی وێبسایتی ڕاستەقینە</a>
            ) : null}
          </nav>
        </div>
      </header>
      <main className="site-shell project-detail-page">
        <section className="project-hero-detail">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
            <p className="lead">{project.full_description || project.short_description}</p>
            <div className="tag-row">
              {project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}
            </div>
            <div className="hero-actions">
              <Link className="button" href="/#projects">گەڕانەوە بۆ پڕۆژەکان</Link>
              {hasLiveUrl ? (
                <a className="button primary" href={project.website_url} target="_blank" rel="noreferrer">سەردانی وێبسایتی ڕاستەقینە</a>
              ) : null}
            </div>
          </div>
          <div className="project-hero-visual" aria-label={`پێشبینینی بینراوی پڕۆژەی ${project.title}`}>
            {project.screenshot_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.screenshot_url} alt={`وێنەی پڕۆژەی ${project.title}`} />
            ) : (
              <ProjectPreview project={project} />
            )}
          </div>
        </section>

        <section className="project-case-grid" aria-label="وردەکاری پڕۆژە">
          <article>
            <span>Project overview</span>
            <h2>پوختەی پڕۆژە</h2>
            <p>{detail.overview}</p>
          </article>
          <article>
            <span>Problem or purpose</span>
            <h2>ئامانج</h2>
            <p>{detail.purpose}</p>
          </article>
          <article>
            <span>What was built</span>
            <h2>چی دروست کرا؟</h2>
            <p>{detail.built}</p>
          </article>
          <article>
            <span>Technology used</span>
            <h2>تەکنەلۆژیا</h2>
            <p>{project.technologies.join("، ")}</p>
          </article>
        </section>

        <section className="section project-features">
          <div className="section-head">
            <span className="badge">Main features</span>
            <h2>تایبەتمەندییە سەرەکییەکان</h2>
          </div>
          <div className="feature-list">
            {detail.features.map((feature) => (
              <div key={feature}>{feature}</div>
            ))}
          </div>
        </section>

        <section className="section detail-cta">
          <div className="contact-card">
            <div>
              <span className="badge">پڕۆژەی نوێ</span>
              <h2>دەتەوێت پڕۆژەیەکی وەک ئەمە بۆ کاروبارەکەت هەبێت؟</h2>
              <p>بیرۆکەکەت بنێرە و لە گفتوگۆیەکی سەرەتایی بەبێ فشاری فرۆشتن باس دەکەین چی پێویستە.</p>
            </div>
            <div className="contact-actions">
              <Link className="button primary" href="/#contact">دەستپێکردنی گفتوگۆ</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
