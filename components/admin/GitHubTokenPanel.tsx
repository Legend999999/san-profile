"use client";

import { useEffect, useState } from "react";

const storageKey = "san-admin-github-token";

export function getGitHubTokenHeaders() {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem(storageKey)?.trim();
  return token ? { "X-GitHub-Token": token } : {};
}

export function GitHubTokenPanel() {
  const [token, setToken] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = window.localStorage.getItem(storageKey) ?? "";
    setToken(existing);
    setSaved(Boolean(existing));
  }, []);

  function saveToken() {
    const cleanToken = token.trim();
    if (cleanToken) {
      window.localStorage.setItem(storageKey, cleanToken);
      setSaved(true);
      return;
    }
    window.localStorage.removeItem(storageKey);
    setSaved(false);
  }

  function clearToken() {
    window.localStorage.removeItem(storageKey);
    setToken("");
    setSaved(false);
  }

  return (
    <section className="token-panel" aria-label="GitHub token">
      <div>
        <span className="token-kicker">GitHub saving</span>
        <strong>{saved ? "Token saved" : "Paste token once"}</strong>
      </div>
      <input
        aria-label="GitHub token"
        className="input token-input"
        onChange={(event) => setToken(event.target.value)}
        placeholder="github_pat_..."
        type="password"
        value={token}
      />
      <div className="token-actions">
        <button className="button primary" onClick={saveToken} type="button">
          Save
        </button>
        <button className="button" onClick={clearToken} type="button">
          Clear
        </button>
      </div>
    </section>
  );
}
