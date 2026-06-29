// iq-spiral-buddy client (Red) — 마크다운 렌더링 (marked 설정 + KaTeX + sanitize, 공유 모듈)
// marked는 vendor 번들 기준 싱글턴이라 여기서 1회 설정하면 모든 import 지점에 적용됨.

// v0.4.0 — CDN(esm.sh) 의존 제거. 로컬 vendor 번들 사용 (scripts/build-vendor.mjs,
// 버전은 package.json devDependencies가 단일 소스). CDN 장애 시에도 앱이 뜬다.
import { marked } from "./vendor/marked.js";
import { markedHighlight } from "./vendor/marked-highlight.js";
import markedKatex from "./vendor/marked-katex-extension.js";
import hljs from "./vendor/highlight.js";
import DOMPurify from "./vendor/dompurify.js";
import { escapeAttr } from "./util.js";

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language, ignoreIllegals: true }).value;
    },
  }),
);
// v0.3.0 (Red) — 수식 렌더링. marked 토크나이저 레벨에서 $...$/$$...$$를
// 집어가므로 수식 안 언더스코어($x_1$)가 <em>으로 깨지지 않고, 코드
// 스팬/펜스 안의 $는 건드리지 않는다.
// - nonStandard: 한국어는 조사가 $ 바로 뒤에 붙음("$\\mathbb{R}^3$의") —
//   표준 모드(공백 경계 요구)면 그런 수식이 통째로 안 잡힘. 필수.
// - output "html": MathML 출력 생략 — DOMPurify가 <annotation> 등을
//   걷어내는 것과의 상호작용을 원천 차단 (시각 출력은 동일).
// v0.4.1 — 수식 클릭 → LaTeX 원본 복사.
// output:"html"은 원본 TeX를 DOM에 남기지 않으므로, extension의 renderer를
// 래핑해 원본을 data-tex로 보존한다 (토크나이저는 그대로 — 파싱 회귀 없음.
// DOMPurify는 data-* 속성을 기본 허용하므로 sanitize를 통과한다).
const _katexExt = markedKatex({
  throwOnError: false,
  nonStandard: true,
  output: "html",
});
for (const ext of _katexExt.extensions ?? []) {
  const origRenderer = ext.renderer;
  if (typeof origRenderer !== "function") continue;
  ext.renderer = function (token) {
    const html = origRenderer.call(this, token);
    if (typeof html !== "string") return html;
    const display = !!token.displayMode;
    const cls = display ? "math-src math-src-display" : "math-src";
    const title = display ? ` title="클릭하면 LaTeX 복사"` : "";
    return `<span class="${cls}" data-tex="${escapeAttr(token.text ?? "")}"${title}>${html}</span>`;
  };
}
marked.use(_katexExt);
marked.setOptions({ breaks: true, gfm: true });

// 수식 클릭 → 마크다운/Obsidian에 바로 붙일 수 있게 구분자 포함해 복사.
// 텍스트 드래그 중(선택 존재)에는 가로채지 않는다.
document.addEventListener("click", (e) => {
  const el = e.target?.closest?.(".math-src");
  if (!el) return;
  const sel = window.getSelection?.();
  if (sel && !sel.isCollapsed) return;
  const tex = el.dataset.tex ?? "";
  if (!tex) return;
  const wrapped = el.classList.contains("math-src-display")
    ? `$$${tex}$$`
    : `$${tex}$`;
  navigator.clipboard?.writeText(wrapped).then(() => {
    el.classList.add("math-copied");
    setTimeout(() => el.classList.remove("math-copied"), 1000);
  });
});

// LLM이 가끔 \( \) / \[ \] 구분자로 수식을 내보냄 — KaTeX extension은
// $ 계열만 처리하므로 $ 계열로 정규화. 코드 펜스/인라인 코드 구간은
// 정규식 escape(\( 등)가 흔하므로 절대 건드리지 않는다.
function normalizeMathDelimiters(raw) {
  return String(raw)
    .split(/(```[\s\S]*?(?:```|$)|~~~[\s\S]*?(?:~~~|$)|`[^`\n]*`)/g)
    .map((seg, i) => {
      if (i % 2 === 1) return seg; // 코드 구간
      return seg
        .replace(/\\\[([\s\S]+?)\\\]/g, (_, body) => `\n$$${body}$$\n`)
        .replace(/\\\(([\s\S]+?)\\\)/g, (_, body) => `$${body}$`);
    })
    .join("");
}

// v0.5.77 — 모든 마크다운 → HTML 변환을 sanitize 통과시킴.
// LLM 출력은 챕터 본문(임의 마크다운 파일)의 영향을 받으므로
// <img onerror=...> 류가 본문을 타고 응답에 섞일 가능성을 차단.
// marked.parse를 직접 쓰지 말고 항상 이 함수를 거칠 것.
export function renderMarkdown(raw) {
  return DOMPurify.sanitize(marked.parse(normalizeMathDelimiters(raw)));
}

// v0.5.75 — marked.parse 안전 래퍼.
// 기존엔 streamInto의 최종 parse가 무방비라, 특정 마크다운(깨진 테이블,
// 비정상 중첩 등)에서 marked가 throw하면 startSession catch로 전파 →
// enableSessionUi(false) → "Buddy 메시지는 보이는데 입력이 영구 비활성"
// 증상 발생. 파싱 실패 시 plain text로 graceful 표시.
export function safeMarkedInto(el, raw) {
  try {
    el.innerHTML = renderMarkdown(raw);
  } catch {
    el.textContent = raw;
  }
}
