"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Project } from "@/lib/types";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ProjectForm({ project }: { project?: Project | null }) {
  const router = useRouter();
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(project?.website_url ?? "");
  const [screenshotUrl, setScreenshotUrl] = useState(project?.screenshot_url ?? "");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [generating, setGenerating] = useState(false);

  async function submit(formData: FormData) {
    setBusy(true);
    setMessage("");
    const payload = {
      title,
      slug: slug || slugify(title),
      short_description: String(formData.get("short_description") ?? ""),
      full_description: String(formData.get("full_description") ?? ""),
      website_url: websiteUrl,
      screenshot_url: screenshotUrl,
      technologies: String(formData.get("technologies") ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      category: String(formData.get("category") ?? "Websites"),
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
      display_order: Number(formData.get("display_order") ?? 0),
    };

    const response = await fetch(project ? `/admin/api/projects/${project.id}` : "/admin/api/projects", {
      method: project ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    if (!response.ok) {
      setMessage(await response.text());
      return;
    }
    setMessage(project ? "Project updated." : "Project created.");
    router.refresh();
    if (!project) {
      const saved = await response.json();
      router.push(`/admin/projects/${saved.id}`);
    }
  }

  async function generateShot() {
    setGenerating(true);
    setMessage("Generating screenshot...");
    const response = await fetch("/admin/api/screenshots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: websiteUrl, slug: slug || slugify(title) || "project" }),
    });
    const result = await response.json();
    setGenerating(false);
    if (!response.ok) {
      setMessage(result.error ?? "Screenshot generation failed.");
      return;
    }
    setScreenshotUrl(result.screenshotUrl);
    setMessage("Screenshot generated.");
  }

  return (
    <form action={submit} className="form-panel">
      {message ? <p className="notice">{message}</p> : null}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input className="input" id="title" value={title} onChange={(event) => {
            setTitle(event.target.value);
            if (!project) setSlug(slugify(event.target.value));
          }} required />
        </div>
        <div className="field">
          <label htmlFor="slug">Slug</label>
          <input className="input" id="slug" value={slug} onChange={(event) => setSlug(slugify(event.target.value))} required />
        </div>
        <div className="field">
          <label htmlFor="website_url">Website URL</label>
          <input className="input" id="website_url" value={websiteUrl} onChange={(event) => setWebsiteUrl(event.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <select className="select" id="category" name="category" defaultValue={project?.category ?? "Websites"}>
            <option>Websites</option>
            <option>Bots</option>
            <option>Tools</option>
            <option>Designs</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="short_description">Short description</label>
          <textarea className="textarea" id="short_description" name="short_description" defaultValue={project?.short_description ?? ""} required />
        </div>
        <div className="field">
          <label htmlFor="full_description">Full description</label>
          <textarea className="textarea" id="full_description" name="full_description" defaultValue={project?.full_description ?? ""} />
        </div>
        <div className="field">
          <label htmlFor="technologies">Technologies</label>
          <input className="input" id="technologies" name="technologies" defaultValue={project?.technologies.join(", ") ?? ""} placeholder="Next.js, TypeScript, Tailwind CSS" />
        </div>
        <div className="field">
          <label htmlFor="display_order">Display order</label>
          <input className="input" id="display_order" name="display_order" type="number" defaultValue={project?.display_order ?? 0} />
        </div>
      </div>
      <div className="field" style={{ marginTop: 16 }}>
        <label htmlFor="screenshot_url">Screenshot URL</label>
        <input className="input" id="screenshot_url" value={screenshotUrl} onChange={(event) => setScreenshotUrl(event.target.value)} />
      </div>
      <div className="hero-actions">
        <button className="button" disabled={generating || !websiteUrl} onClick={generateShot} type="button">
          {generating ? "Generating screenshot..." : project?.screenshot_url ? "Regenerate Screenshot" : "Generate Screenshot"}
        </button>
      </div>
      <div className="switch-row" style={{ marginTop: 16 }}>
        <label className="checkbox"><input name="published" type="checkbox" defaultChecked={project?.published ?? false} /> Published</label>
        <label className="checkbox"><input name="featured" type="checkbox" defaultChecked={project?.featured ?? false} /> Featured</label>
      </div>
      <div className="hero-actions">
        <button className="button primary" disabled={busy} type="submit">{busy ? "Saving..." : "Save Project"}</button>
      </div>
    </form>
  );
}
