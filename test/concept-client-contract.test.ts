import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../client/index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../client/app.js", import.meta.url), "utf8");
const css = await readFile(new URL("../client/styles.css", import.meta.url), "utf8");
const routes = await readFile(new URL("../src/concept-routes.ts", import.meta.url), "utf8");
const store = await readFile(new URL("../src/concept-store.ts", import.meta.url), "utf8");
const vaultFeature = app.slice(
  app.indexOf("// 개념 보관함 —"),
  app.indexOf("async function runChapterContext"),
);

describe("local concept vault client contract", () => {
  test("exposes an accessible vault and a stream-complete save action", () => {
    assert.match(html, /id="concept-vault-open"/);
    assert.match(html, /id="concept-vault-count"/);
    assert.match(html, /id="concept-vault-modal"[^>]*aria-hidden="true"/);
    assert.match(html, /role="dialog"[^>]*aria-modal="true"/);
    assert.match(html, /id="concept-vault-search"[^>]*aria-controls="concept-vault-results"/);
    assert.match(html, /id="concept-vault-status"[^>]*aria-live="polite"/);

    assert.match(app, /lookup-card-save[^>]*disabled/);
    assert.match(app, /const rawSource = await streamMarkdownInto/);
    assert.match(app, /rawSource = renderer\.finish\(\)/);
    assert.match(app, /if \(rawSource\?\.trim\(\) && saveButton\)/);
    assert.match(
      app,
      /const conceptTerm = inferConceptTerm\(query, rawSource\);[\s\S]*?_lookupConceptDrafts\.set\(card, \{[\s\S]*?term: conceptTerm[\s\S]*?content: rawSource/,
    );
    assert.match(app, /requestConceptApi\("\/api\/concepts", \{\s*method: "POST"/);
    assert.match(app, /data\?\.created === false/);
    assert.match(app, /최신 답변으로 업데이트했어요/);
    assert.match(app, /Number\.isInteger\(state\.session\?\.depth\)/);
  });

  test("keeps live search local, stale-safe, keyboard accessible, and detail-lazy", () => {
    assert.match(app, /new AbortController\(\)/);
    assert.match(app, /requestSeq/);
    assert.match(app, /seq !== _conceptVaultState\.requestSeq/);
    assert.match(app, /setTimeout\(\(\) => \{\s*void loadConceptVault/);
    assert.match(app, /}, 280\)/);
    assert.doesNotMatch(vaultFeature, /\bsemantic\b|model:\s*state\.selectedModel/);
    assert.match(app, /requestConceptApi\("\/api\/concepts\/count"\)/);
    assert.match(app, /\/api\/concepts\/\$\{encodeURIComponent\(key\)\}/);
    assert.match(app, /details: new Map\(\)/);
    assert.match(app, /detailInflight: new Map\(\)/);
    assert.match(app, /ensureConceptDetail\(id/);
    assert.match(app, /safeMarkedInto\(target, detail\.content/);
    assert.match(app, /concept-detail-state--error/);
    assert.match(app, /data-concept-action="retry-detail"/);
    assert.match(app, /event\.key === "Escape"/);
    assert.match(
      app,
      /const target = _conceptVaultState\.lastFocus;[\s\S]{0,120}target\.focus/,
    );
    assert.match(app, /element\.inert = true/);
    assert.match(app, /element\.inert = previous\.inert/);
    assert.match(app, /data-concept-action="edit"/);
    assert.match(app, /data-concept-action="delete"/);
    assert.match(app, /querySelectorAll\("\.concept-item\.expanded"\)/);

    assert.match(routes, /searchConcepts\(vault, query/);
    assert.match(routes, /app\.get\("\/concepts\/count"/);
    assert.match(routes, /app\.get\("\/concepts\/:id"/);
    assert.match(routes, /concepts: concepts\.map\(compactConcept\)/);
    assert.match(routes, /"local"/);
    assert.doesNotMatch(
      routes,
      /completeOnce|ClaudeClient|safeJsonParse|\bsemantic\b|listConceptSearchCandidates/,
    );
    assert.doesNotMatch(store, /includeZeroScore|listConceptSearchCandidates|semantic/i);
  });

  test("uses brand tokens instead of hard-coded concept colors", () => {
    assert.match(css, /\.lookup-vault-btn/);
    assert.match(css, /\.concept-vault-modal/);
    assert.match(css, /\.concept-item/);
    assert.match(css, /\.concept-detail-state/);
    const conceptCss = css.slice(
      css.indexOf(".lookup-vault-btn"),
      css.indexOf(".lookup-card-body"),
    );
    assert.match(conceptCss, /var\(--accent\)/);
    assert.doesNotMatch(conceptCss, /#[0-9a-fA-F]{3,8}\b/);
  });
});
