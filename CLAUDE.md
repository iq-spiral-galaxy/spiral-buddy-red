# Claude Code Context — spiral-buddy-red

🔴 **Spiral Buddy Red** — 나선형 학습 데스크톱 앱, **AI/수학 학습용 버디**.

## 갤럭시 패밀리

[iq-spiral-galaxy](https://github.com/iq-spiral-galaxy): 🔴 Red(AI/수학) · 🟢 Green(실천적 지혜) · 🔵 Blue(개발).
RGB 삼원색 — 세 버디가 모이면 백색광(완전한 지혜)이 된다는 메타포.

## 이 레포의 기원

[spiral-buddy-blue](https://github.com/iq-spiral-galaxy/spiral-buddy-blue) @ fcf6bf1 (v0.5.87+) 스냅샷에서 부트스트랩됨.
Blue는 실사용 중인 완성형 앱 — 이 레포는 그 인프라를 물려받아 **AI/수학** 도메인으로 특화한다.

## ✅ Phase 0 — 정체성 분기 (완료: v0.1.0, 2026-06-12)

아래 체크리스트는 모두 적용되어 v0.1.0으로 릴리즈됨. 다음 작업은 Phase 1 (콘텐츠 분기).
부트스트랩 함정 하나 추가 발견: **pnpm-workspace.yaml이 .gitignore에 있어서 스냅샷 커밋에서 누락**됐었음
— pnpm 11은 allowBuilds를 이 파일에서만 읽으므로 CI에서 ERR_PNPM_IGNORED_BUILDS로 install 실패.
지금은 force-add로 추적 중 (Green 부트스트랩 때도 동일하게 필요).

Blue와 같은 머신에 공존해야 하므로 아래를 안 바꾸면 **사용자 데이터가 Blue와 충돌**한다:

1. **electron-builder.yml**
   - `appId: com.iq-lab.spiral-buddy-red` (현재 com.iq-lab.spiral-buddy — 안 바꾸면 userData 충돌)
   - `productName: Spiral Buddy Red` (설치 경로/프로세스명/dmg 볼륨명이 여기서 파생)
   - `publish.repo: spiral-buddy-red` (owner는 iq-spiral-galaxy 그대로)
2. **electron/main.cjs**
   - `GH_REPO = "spiral-buddy-red"` (자동 업데이트 체크/다운로드 대상)
   - `PREFERRED_PORT = 4537` (Blue 4517 — 같으면 localStorage origin 충돌 + 동시 실행 불가)
   - macOS 업데이트 스크립트의 하드코딩 경로: "Spiral Buddy" → "Spiral Buddy Red" (osascript 앱명, /Applications 경로, dmg 볼륨명, asset 파일명 prefix)
   - Windows relaunch 후보 경로의 spiral-buddy → 새 productName 파생형
3. **src/vault.ts + src/chapter-preview-cache.ts** (SPIRAL_DIR 중복 정의 주의)
   - 기본 vault sub-dir: "spiral-buddy" → "spiral-buddy-red" (Blue 노트와 섞이면 안 됨)
4. **.github/workflows/release.yml**
   - 릴리즈 본문 설치 명령 URL + latest-alias asset 이름 (Spiral-Buddy-latest-* → 새 productName 파생)
5. **package.json**: name → spiral-buddy-red, version → 0.1.0부터 시작
6. **README.md**: 🔴 Red 정체성으로 재작성 (패밀리 한 줄은 유지)
7. **브랜드 컬러**: client/styles.css의 --accent 계열(시안/바이올렛)을 red 팔레트로. 로고 SVG gradient(client/index.html)도

Phase 0 끝나면 `pnpm i && pnpm build`로 검증하고 첫 태그(v0.1.0) 전에 빌드 워크플로 동작 확인.

## ✅ 콘텐츠 분기 (Phase 1 — 대부분 완료: v0.2.0)

- Curated org는 **`iq-ai-lab`** (AI/수학 deep-dive 48개 레포, Layer 0~6 구조, "Prove, don't memorize").
  config.ts/main.cjs/setup/클라이언트의 기본값 모두 iq-ai-lab으로 교체 완료.
- `data/curated-domains.json` — Layer 0(Mathematics)~6(Frontier LLM) 11개 도메인 + 트랙 프리셋 8종
  (수학/ML/DL/RL/LLM/비전·오디오/시스템/전체)으로 재작성 완료. 레포 이름은 라이브 org와 교차 검증함.
  프리셋 카드는 두 곳: 설정 모달(JSON 기반 자동) + **setup wizard(electron/setup.html 하드코딩 — JSON 바꾸면 여기도 같이!)**
- 브랜드: 액센트 red/주황 + **배경도 딥 마룬 틴트** (v0.2.0, 사용자 확정 — "느낌 있는 배경").
  녹색 배경은 Green 버디 몫.
- ✅ 수식 렌더링 + 프롬프트 (v0.3.0): 클라이언트에 KaTeX 도입(marked-katex-extension,
  **nonStandard: true 필수** — 한국어 조사가 `$...$` 뒤에 밀착하므로 표준 모드면 안 잡힘.
  output: "html"로 MathML 생략 — DOMPurify와의 상호작용 차단). `\( \)`/`\[ \]`는
  normalizeMathDelimiters가 $ 계열로 정규화(코드 펜스/인라인 코드 구간은 보존).
  SESSION_SYSTEM은 증명 중심(Prove, don't memorize)으로 재작성, 수식 표기 규칙은
  session-store.ts의 **MATH_RENDER_NOTE 공통 상수** — 세션/룩업/챕터맥락/note-writer에 주입됨.
  새 프롬프트에 수식 지시 추가할 땐 이 상수를 재사용할 것.
  v0.4.1: 수식 클릭 → LaTeX 복사 — extension renderer를 래핑해 data-tex로 원본 보존
  (app.js의 _katexExt 래핑 블록. DOMPurify는 data-* 기본 허용이라 통과).
  v0.4.3: 수식 입력 도우미 — #input 아래 기호 팔레트(12 카테고리/236개) + 자주쓰기 툴바
  + $ 게이트 라이브 프리뷰. 데이터는 **client/math-symbols.js**(ESM, 워크플로 택소노미 →
  KaTeX 검증). insertMathSnippet이 • 토큰을 탭스톱으로 쓰고 제거, $ 자동 wrap(isInsideMath),
  setRangeText로 네이티브 undo 보존. ⌘\ 토글. 삽입은 InputEvent 재발화로 기존 파이프라인
  재사용하되 _mathInserting 플래그로 refine 무효화/탭스톱 보정을 보호. 삭제 시 탭스톱 해제.

## 클라이언트 vendor (v0.4.0 — Red에서 추가)

marked/marked-highlight/marked-katex-extension/highlight.js/DOMPurify/KaTeX(CSS+woff2)를
esm.sh·jsdelivr 대신 **client/vendor/ 로컬 번들**로 동봉 — CDN 장애 시에도 앱이 뜬다.
- 재생성: `pnpm vendor` (scripts/build-vendor.mjs). 산출물은 git에 커밋 (CI 재빌드 없음).
- 버전 단일 소스: package.json devDependencies. 라이브러리 올릴 땐 devDep 변경 → `pnpm vendor` → 커밋.
- highlight.js는 lib/common(~37개 언어)만 — 미지원 언어는 plaintext fallback.
- Google Fonts만 CDN 잔존 (미로드 시 시스템 폰트 fallback이라 치명적이지 않음).

## 물려받은 인프라 (바꾸지 말 것 — Blue에서 검증된 핵심)

- **자동 업데이트**: in-app 다운로드(Node https, 진행률) + installer 직접 실행. PowerShell 스크립트 방식으로 되돌리지 말 것 (Blue에서 TLS/정책 문제로 폐기)
- **업데이트 실패 가시화**: pending-update marker → 다음 부팅 때 판정
- **세션 영속화**: turn마다 디스크 snapshot (userData/sessions/) — 재시작 후 resume
- **고정 포트**: localStorage origin 안정화 (테마/패널폭/일시정지 목록 유지)
- **서버 TTL 캐시**: notes 30s / roadmaps 60s / chapters 30s + 쓰기 시 invalidate
- **보안**: API 키 safeStorage 암호화, openExternal whitelist, DOMPurify(renderMarkdown)
- **SSE**: AbortController group + inactivity timeout + safeMarkedInto (marked 실패 fallback)

## 아키텍처 (Blue 기준)

```
src/        Hono API 서버 (config/roadmap/vault/session-store/claude/curated/routes/server/mcp)
client/     vanilla JS SPA (app.js 단일 파일 ~5600줄 + styles.css ~9300줄)
electron/   main.cjs (업데이트/워크스페이스/IPC) + preload + setup wizard
data/       curated 도메인 매핑
```

## 릴리즈 관례 (Blue와 동일)

feature 브랜치 → commit → tag(vX.Y.Z) → push → GitHub Actions 빌드 대기 → 성공 시 main FF → 임시 브랜치 삭제.
직접 main push는 docs 전용 변경만.

## Blue에서 배운 함정들 (반복 금지)

- CSS: flex 안에서 margin auto는 stretch를 무력화 (fit-content 추락) / grid 1fr은 minmax(0,1fr)로
- marked.parse는 반드시 try/catch (특정 마크다운에서 throw → UI 잠금 사고)
- 라이트 모드 gradient text는 -webkit-text-fill-color까지 리셋해야 보임
- inline style은 CSS 클래스 변수를 이기므로 클래스 토글 기능과 충돌 주의
- setup wizard 저장은 기존 config를 merge해야 함 (덮어쓰면 멀티 워크스페이스 소실)
