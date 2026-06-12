// client/vendor/ 번들 생성기 (v0.4.0)
//
// 배경: 클라이언트가 marked/hljs/DOMPurify/KaTeX를 esm.sh·jsdelivr에서 직접
// import했음 — CDN 장애 = 채팅 UI 부팅 불가. 데스크톱 앱이므로 로컬 동봉이 맞다.
//
// 사용: pnpm vendor  (출력은 git에 커밋 — CI/패키징에서 재빌드 불필요)
// 버전 변경: package.json devDependencies에서 올린 뒤 다시 실행.
//
// 주의: highlight.js는 전체 빌드(~1MB) 대신 lib/common(주요 ~37개 언어)을
// 동봉. 미지원 언어는 app.js에서 plaintext로 fallback되므로 안전.

import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "client", "vendor");

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "fonts"), { recursive: true });

// 각 entry는 라이브러리를 재노출하는 가상 모듈 — app.js의 import 형태와 1:1
const ENTRIES = {
  "marked.js": `export * from "marked";`,
  "marked-highlight.js": `export * from "marked-highlight";`,
  "marked-katex-extension.js": `export { default } from "marked-katex-extension";`,
  "highlight.js": `export { default } from "highlight.js/lib/common";`,
  "dompurify.js": `export { default } from "dompurify";`,
};

for (const [outfile, contents] of Object.entries(ENTRIES)) {
  await esbuild.build({
    stdin: { contents, resolveDir: ROOT, sourcefile: `vendor-entry-${outfile}` },
    bundle: true,
    format: "esm",
    minify: true,
    target: "es2022",
    outfile: path.join(OUT, outfile),
    logLevel: "warning",
  });
  const kb = Math.round(fs.statSync(path.join(OUT, outfile)).size / 1024);
  console.log(`✓ vendor/${outfile} (${kb} KB)`);
}

// KaTeX CSS + 폰트 (woff2만 — 모던 Chromium은 첫 지원 포맷만 fetch)
const katexDist = path.join(ROOT, "node_modules", "katex", "dist");
fs.copyFileSync(
  path.join(katexDist, "katex.min.css"),
  path.join(OUT, "katex.min.css"),
);
let fontCount = 0;
for (const f of fs.readdirSync(path.join(katexDist, "fonts"))) {
  if (!f.endsWith(".woff2")) continue;
  fs.copyFileSync(path.join(katexDist, "fonts", f), path.join(OUT, "fonts", f));
  fontCount++;
}
console.log(`✓ vendor/katex.min.css + fonts/*.woff2 (${fontCount}개)`);

// highlight.js 테마 CSS
fs.copyFileSync(
  path.join(ROOT, "node_modules", "highlight.js", "styles", "github-dark.min.css"),
  path.join(OUT, "github-dark.min.css"),
);
console.log("✓ vendor/github-dark.min.css");
