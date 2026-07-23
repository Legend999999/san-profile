"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProjectButton({ id, title }: { id: string; title: string }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function deleteProject() {
    if (!window.confirm(`دڵنیایت لە سڕینەوەی "${title}"؟ ئەم کردارە ناگەڕێتەوە.`)) {
      return;
    }
    setBusy(true);
    const response = await fetch(`/admin/api/projects/${id}`, { method: "DELETE" });
    setBusy(false);
    if (!response.ok) {
      alert("سڕینەوەی پڕۆژە سەرکەوتوو نەبوو.");
      return;
    }
    alert("پڕۆژەکە سڕایەوە.");
    router.refresh();
  }

  return (
    <button className="button danger" disabled={busy} onClick={deleteProject} type="button">
      {busy ? "لە سڕینەوەدایە..." : "سڕینەوە"}
    </button>
  );
}
