"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getGitHubTokenHeaders } from "@/components/admin/GitHubTokenPanel";

export function DeleteProjectButton({ id, title }: { id: string; title: string }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function deleteProject() {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      return;
    }
    setBusy(true);
    const response = await fetch(`/admin/api/projects/${id}`, {
      method: "DELETE",
      headers: getGitHubTokenHeaders(),
    });
    setBusy(false);
    if (!response.ok) {
      alert("Project deletion failed.");
      return;
    }
    alert("Project deleted.");
    router.refresh();
  }

  return (
    <button className="button danger" disabled={busy} onClick={deleteProject} type="button">
      {busy ? "Deleting..." : "Delete"}
    </button>
  );
}
