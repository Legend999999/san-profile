import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

test("Kurd Website source uses Kurdish RTL agency copy", async () => {
  const [page, layout, config, projectCard] = await Promise.all([
    readFile(new URL("app/page.tsx", templateRoot), "utf8"),
    readFile(new URL("app/layout.tsx", templateRoot), "utf8"),
    readFile(new URL("lib/config.ts", templateRoot), "utf8"),
    readFile(new URL("components/ProjectCard.tsx", templateRoot), "utf8"),
  ]);

  const source = `${page}\n${layout}\n${config}\n${projectCard}`;
  assert.match(source, /کورد وێبسایت/);
  assert.match(source, /پڕۆژەکان/);
  assert.match(source, /پەیوەندی/);
  assert.match(layout, /dir="rtl"/);
  assert.match(layout, /Vazirmatn/);
  assert.doesNotMatch(source, /Aurora Studio|Screenshot will appear after generation/);
});

test("starter preview code has been removed", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("app/page.tsx", templateRoot), "utf8"),
    readFile(new URL("app/layout.tsx", templateRoot), "utf8"),
    readFile(new URL("package.json", templateRoot), "utf8"),
  ]);

  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
