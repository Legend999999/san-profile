"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { WebsiteSettings } from "@/lib/types";

export function SettingsForm({ settings }: { settings: WebsiteSettings }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(formData: FormData) {
    setBusy(true);
    setMessage("");
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/admin/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    if (!response.ok) {
      setMessage(await response.text());
      return;
    }
    setMessage("Website settings updated.");
    router.refresh();
  }

  return (
    <form action={submit} className="form-panel">
      {message ? <p className="notice">{message}</p> : null}
      <div className="form-grid">
        <div className="field"><label htmlFor="site_title">Website title</label><input className="input" id="site_title" name="site_title" defaultValue={settings.site_title} required /></div>
        <div className="field"><label htmlFor="owner_name">Displayed name</label><input className="input" id="owner_name" name="owner_name" defaultValue={settings.owner_name} required /></div>
        <div className="field"><label htmlFor="github_url">GitHub link</label><input className="input" id="github_url" name="github_url" defaultValue={settings.github_url ?? ""} /></div>
        <div className="field"><label htmlFor="telegram_url">Telegram link</label><input className="input" id="telegram_url" name="telegram_url" defaultValue={settings.telegram_url ?? ""} /></div>
        <div className="field"><label htmlFor="email">Email address</label><input className="input" id="email" name="email" type="email" defaultValue={settings.email ?? ""} /></div>
        <div className="field"><label htmlFor="footer_text">Footer text</label><input className="input" id="footer_text" name="footer_text" defaultValue={settings.footer_text} /></div>
      </div>
      <div className="field" style={{ marginTop: 16 }}>
        <label htmlFor="introduction">Homepage introduction</label>
        <textarea className="textarea" id="introduction" name="introduction" defaultValue={settings.introduction} required />
      </div>
      <div className="field" style={{ marginTop: 16 }}>
        <label htmlFor="about_text">About text</label>
        <textarea className="textarea" id="about_text" name="about_text" defaultValue={settings.about_text} required />
      </div>
      <div className="hero-actions">
        <button className="button primary" disabled={busy} type="submit">{busy ? "Saving..." : "Save Settings"}</button>
      </div>
    </form>
  );
}
