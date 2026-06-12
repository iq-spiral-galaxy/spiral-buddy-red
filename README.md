# 🌀 Spiral Buddy — 🔴 Red

> AI 버디와 함께하는 **나선형 학습** 데스크톱 앱 — **AI/수학 학습용 버디**.
> [iq-spiral-galaxy](https://github.com/iq-spiral-galaxy) 패밀리: 🔴 Red(AI/수학) · 🟢 Green(실천적 지혜) · 🔵 Blue(개발)
> 로드맵 따라가며 학습 → 버디(AI)와 Socratic 대화 → **8섹션 구조 노트**로 노트 보관함에 자동 축적 → 다음 세션 진입 시 이전 노트가 컨텍스트로 자동 합류.

<p align="center">
  <a href="https://github.com/iq-spiral-galaxy/spiral-buddy-red/releases/latest"><img alt="latest release" src="https://img.shields.io/github/v/release/iq-spiral-galaxy/spiral-buddy-red?display_name=tag&style=flat-square"></a>
  <img alt="platforms" src="https://img.shields.io/badge/macOS%20%C2%B7%20Windows%20%C2%B7%20Linux-supported-red?style=flat-square">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green?style=flat-square">
</p>

> 🔵 **Blue와 공존** — Red는 [spiral-buddy-blue](https://github.com/iq-spiral-galaxy/spiral-buddy-blue)(개발 학습용)에서 부트스트랩된 별도 앱입니다.
> appId · 설치 경로 · 포트(4537) · vault 노트 폴더(`spiral-buddy-red/`)가 모두 분리되어 있어 같은 머신에서 Blue와 동시에 사용할 수 있습니다.

---

## ⚡ 30초 설치 (한 줄 명령)

> 💡 **API 호출 X — 어떤 버전인지 신경 X.** 아래 명령들은 GitHub Releases의 고정된 `latest` 별칭 URL을 사용해 다운로드합니다. 시간당 제한(rate-limit) 걸리지 않습니다.

### 🍎 macOS — Apple Silicon (M1/M2/M3/M4)
터미널에 그대로 붙여넣기 — 실행 중이면 자동 종료 → 최신 버전 받기 → 설치 → 재실행까지 한 번에:

```bash
osascript -e 'tell application "Spiral Buddy Red" to quit' 2>/dev/null; sleep 1; \
cd /tmp && \
curl -fL -o /tmp/spiral-red.dmg "https://github.com/iq-spiral-galaxy/spiral-buddy-red/releases/latest/download/Spiral-Buddy-Red-latest-arm64.dmg" && \
MOUNT=$(hdiutil attach -nobrowse /tmp/spiral-red.dmg | grep -o '/Volumes/.*' | head -1) && \
rm -rf '/Applications/Spiral Buddy Red.app' && \
cp -R "$MOUNT/Spiral Buddy Red.app" /Applications/ && \
hdiutil detach -quiet "$MOUNT" && \
xattr -cr '/Applications/Spiral Buddy Red.app' && \
rm -f /tmp/spiral-red.dmg && \
open '/Applications/Spiral Buddy Red.app'
```

### 🍎 macOS — Intel
터미널에 그대로 붙여넣기:

```bash
osascript -e 'tell application "Spiral Buddy Red" to quit' 2>/dev/null; sleep 1; \
cd /tmp && \
curl -fL -o /tmp/spiral-red.dmg "https://github.com/iq-spiral-galaxy/spiral-buddy-red/releases/latest/download/Spiral-Buddy-Red-latest.dmg" && \
MOUNT=$(hdiutil attach -nobrowse /tmp/spiral-red.dmg | grep -o '/Volumes/.*' | head -1) && \
rm -rf '/Applications/Spiral Buddy Red.app' && \
cp -R "$MOUNT/Spiral Buddy Red.app" /Applications/ && \
hdiutil detach -quiet "$MOUNT" && \
xattr -cr '/Applications/Spiral Buddy Red.app' && \
rm -f /tmp/spiral-red.dmg && \
open '/Applications/Spiral Buddy Red.app'
```

### 🪟 Windows (PowerShell)
**PowerShell**(시작 메뉴에서 "PowerShell" 검색) 열고 그대로 붙여넣기 — 실행 중이면 자동 종료 → silent install → 재실행:

```powershell
$ErrorActionPreference = "Stop"
Get-Process "Spiral Buddy Red" -EA SilentlyContinue | Stop-Process -Force
$exe = "$env:TEMP\spiral-buddy-red-setup.exe"
Invoke-WebRequest -Uri "https://github.com/iq-spiral-galaxy/spiral-buddy-red/releases/latest/download/Spiral-Buddy-Red-latest-Setup.exe" -OutFile $exe
Start-Process -FilePath $exe -ArgumentList "/S" -Wait
Remove-Item $exe -Force
$candidates = @(
  "$env:LOCALAPPDATA\Programs\spiral-buddy-red\Spiral Buddy Red.exe",
  "$env:LOCALAPPDATA\Programs\Spiral Buddy Red\Spiral Buddy Red.exe"
)
foreach ($app in $candidates) { if (Test-Path $app) { Start-Process $app; break } }
```

### 🐧 Linux
```bash
curl -fL -o ~/SpiralBuddyRed.AppImage "https://github.com/iq-spiral-galaxy/spiral-buddy-red/releases/latest/download/Spiral-Buddy-Red-latest.AppImage"
chmod +x ~/SpiralBuddyRed.AppImage
~/SpiralBuddyRed.AppImage
```

> ⚙️ 앱 안에서도 **설정 > 일반 > "새 버전 사용 가능"** 배너에서 한 번 클릭으로 업데이트 가능 (macOS / Windows).
>
> 첫 실행 시 macOS Gatekeeper 경고("'손상되었기 때문에 열 수 없습니다") — 위 명령의 `xattr -cr`이 해결. 노트·설정·워크스페이스는 vault 또는 `~/Library/Application Support/Spiral Buddy Red/`에 저장돼서 재설치해도 안 사라집니다.

---

## 🎯 무엇을 배우는 버디인가

Red는 **AI와 수학**에 집중합니다:

- 🤖 **AI / ML** — 선형대수에서 attention까지, 논문을 읽기 위한 기초 체력
- 📐 **수학** — 해석학 · 선형대수 · 확률/통계 · 최적화, 증명을 따라가는 훈련
- 🧠 **나선형 복습** — 같은 개념을 depth 1(첫 학습) → depth 2(복습) → depth 3(심화)로 반복하며 누적

콘텐츠 소스는 [**IQ AI Lab**](https://github.com/iq-ai-lab) — *"Prove, don't memorize"* 를 모토로 수학적 증명으로 AI의 본질을 파고드는 딥다이브 연구소입니다.

## 📚 iq-ai-lab 학습 자료 — Layer 0→6 / 48개 레포

설정 모달에서 한 번에 받기. 레이어(도메인)별 또는 트랙 프리셋으로 선택 가능 — **이미 받은 레포는 자동 skip (incremental)**.

| Layer | 도메인 | 주요 내용 / 레포 수 |
|---|---|---|
| 0 | 🧮 **Mathematics** | 선형대수 · 확률론 · 수리통계 · 볼록최적화 · 정보이론 · SDE · 함수해석 (10) |
| 1 | 📐 **ML Theory** | PAC Learning · VC 차원 · 커널 · 베이지안 ML · 그래피컬 모델 (5) |
| 2 | 🧠 **NN Theory** | 범용 근사 · 최적화 이론 · 일반화(NTK, Double Descent) · 정규화 (4) |
| 3 | 🏗️ **Architectures** | CNN · RNN/LSTM · Transformer · GNN · 생성모델 (5) |
| 4-A | 🤖 **RL** | 벨만 방정식 → Policy Gradient → TRPO/PPO/SAC → RL 이론 (6) |
| 4-B | 🗣️ **LLM** | Scaling Law · RLHF/DPO · LoRA/MoE · KV Cache/vLLM (4) |
| 4-C | 👁️ **CV & 3D** | ViT · Detection · Diffusion · NeRF/Gaussian Splatting (4) |
| 4-D | 📝 **NLP** | Word2Vec/GloVe/BPE · BERT/GPT 전이학습 (2) |
| 4-E | 🔊 **Audio** | STFT/Mel · CTC · Whisper · 신경 코덱 (1) |
| 5 | ⚙️ **Systems** | PyTorch Internals · 분산 학습 · Efficient ML · 실험통계/MLOps (4) |
| 6 | 🧭 **Frontier LLM** | Mechanistic Interpretability · Reasoning · RAG (3) |

**트랙 프리셋** (Setup wizard + 설정 모달):
- 🧮 **수학 코어** — Layer 0: 선형대수 · 확률 · 최적화 · 정보이론 (10 repos)
- 📐 **머신러닝 이론** — Layer 1: PAC · 커널 · 베이지안 · 그래피컬 (5 repos)
- 🧠 **딥러닝 트랙** — Layer 2~3: NN 이론 + CNN/RNN/Transformer/GNN (9 repos)
- 🤖 **강화학습 트랙** — Layer 4-A: 벨만 방정식부터 PPO/SAC까지 (6 repos)
- 🗣️ **LLM 트랙** — NLP → LLM → Frontier 언어 모델 한 줄기 (9 repos)
- 👁️ **비전 · 오디오** — Layer 4-C/E: ViT · Diffusion · NeRF + 음성 (5 repos)
- ⚙️ **AI 시스템** — Layer 5: PyTorch Internals · 분산 학습 · MLOps (4 repos)
- 🧭 **전체 딥다이브** — Layer 0→6 전부 (48 repos)

---

## ✨ 주요 기능

### 🗺️ 로드맵 + 챕터 학습 흐름
- **로컬 디렉토리** (사용자 폴더 트리) + **GitHub Curated** (`iq-ai-lab` 48개 deep-dive 레포) — 두 source 공존
- **Layer 0→6 hierarchy** — Mathematics부터 Frontier LLM까지 선행 지식 순서대로
- README 안의 마크다운 링크 등장 순서를 sub-roadmap 학습 순서로 사용 (번호 prefix 없어도 OK)
- 멀티 워크스페이스 — 여러 학습 컨텍스트를 한 vault의 별도 폴더로 분리 (이름·경로 중복 자동 차단)

### 💬 버디와의 Socratic 학습 세션
- **증명 중심** — "Prove, don't memorize": 정의 → 직관 → 정리 → 증명, 가정을 명시하고 유도는 한 단계씩 학습자가
- **수식 렌더링 (KaTeX)** — 채팅·Look-up·노트 미리보기에서 `$...$` / `$$...$$` LaTeX 수식이 그대로 렌더링. 노트는 Obsidian MathJax와 호환
- depth 1 (첫 학습) → depth 2 (복습) → depth 3 (심화) — 같은 챕터를 나선형으로 반복
- 이전 노트가 자동으로 새 세션 컨텍스트에 포함
- **스트리밍 응답** — 실시간 토큰 단위 표시
- **모델 선택** — Sonnet 4.6 (기본·추천) / Opus / Haiku 등
- **세션 Pause / Resume** — 일시정지 후 사이드바 PAUSED 섹션에서 멀티 세션 관리, 클릭으로 컨텍스트 유지하며 재개

### 🔍 Look-up 패널 (사이드 학습)
대화 흐름을 끊지 않고 사이드에서 모르는 표현·기호·정리를 즉시 확인:
- **드래그 + 깊이 선택**: 채팅에서 텍스트 드래그 → 간결 / 중간 / 깊이 / 질문 4가지 응답 옵션
- **질문 추가**: 키워드 + 추가 질문 함께 보내기 (예: `KL divergence` + "cross-entropy랑 어떻게 연결돼?")
- **중복 차단** — 같은 조합 재요청 시 새 API 호출 없이 기존 카드로 자동 scroll + flash 강조

### 📝 8섹션 구조 노트
세션 종료 후 버디가 대화 로그를 8섹션(한 줄 요약 → 핵심 개념 → 직관/비유 → 예제 → 헷갈렸던 지점 → 이전 학습과의 연결 → 다음에 볼 것 → 🔍 찾아본 표현)으로 정돈. Obsidian 위키링크/callout 호환.

### 🎯 깊이 있는 학습 도구
- **Quiz 단계별 난이도** — 누를수록 어려워짐 (개념 확인 → 적용 → 함정·엣지케이스 → 종합 시나리오)
- **✨ 프롬프트 다듬기** — 거친 질문을 명확한 학습 질문으로 자동 정돈 (`⌘J` / `⌘⇧↵`)
- **Cmd+K 통합 검색** — 로드맵·챕터·노트 한 번에

### 📊 학습 추적
- **활동 캘린더** — 1년치 contribution graph + 5단계 강도
- **Streak 표시** — 연속 학습 일수 + 7일/14일/30일 시각 효과
- **챕터별 진도** — 사이드바에 d1/d2/d3 배지 + 진행도 bar

### 🌗 라이트 / 다크 모드 · 🗑️ 안전한 노트 관리 · 🔁 자동 업데이트 · 🛡️ API 오류 자동 복구
- 삭제는 `.trash/`로 이동 (30일 후 자동 청소), 업데이트는 GitHub Releases 폴링 + 원클릭 설치, `overloaded_error` 자동 backoff 재시도.

---

## 🚀 시작하기

### 1. 다운로드 후 첫 실행

위 한 줄 설치 명령으로 받았다면 자동 실행됨. 그렇지 않으면 `Spiral Buddy Red.app`을 더블클릭.

### 2. 첫 실행 시 Setup Wizard

1. **AI API Key 입력** — 현재 Anthropic 모델 지원, [console.anthropic.com](https://console.anthropic.com/)에서 발급한 `sk-ant-...` 키
2. **노트 보관함 폴더 선택** — 노트가 저장될 폴더 (Obsidian vault 사용 시 자동 감지)

### 3. 학습 시작

*(선택)* 트랙 프리셋으로 iq-ai-lab 레포 한 번에 받기 → 좌측 사이드바에서 챕터 선택 → 버디와 대화 → `End & Save` 클릭 → 노트 보관함에 자동 생성.

---

## ⌨️ 단축키

| 단축키 | 동작 |
|-----|-----|
| `⌘B` | 좌측 사이드바 토글 |
| `⌘L` | 우측 Look-up 패널 토글 |
| `⌘K` | 통합 검색 모달 (노트 본문 fulltext) |
| `⌘F` | 사이드바 inline 검색 (로드맵/챕터 필터) |
| `⌘J` | 입력 다듬기 (보내지 않음) |
| `⌘⇧↵` | 입력 다듬어서 즉시 보내기 |
| `⌘Z` (입력란 포커스 시) | 다듬은 직후 원본 복원 |
| `Enter` (입력란) | 보내기 |
| `Shift+Enter` | 줄바꿈 |
| `Esc` (사이드바 검색) | 검색어 비우기 |
| `Esc` (Look-up 패널) | 패널 닫기 |

---

## 🏗️ 개발 / 빌드

```bash
# 의존성 (pnpm 권장)
pnpm install

# 개발 (브라우저 웹앱 모드 — 백엔드 서버 + 자동 브라우저 열기)
pnpm dev

# Electron dev (TypeScript 빌드 + Electron 실행)
pnpm electron:dev

# 패키징 (현재 OS용)
pnpm electron:build:mac    # macOS dmg
pnpm electron:build:win    # Windows exe
pnpm electron:build:linux  # Linux AppImage
```

`.env` 파일 (개발 모드용):
```
ANTHROPIC_API_KEY=sk-ant-...
SPIRAL_VAULT_PATH=/Users/you/Documents/MyNotes
SPIRAL_ROADMAP_ROOT=/path/to/your/roadmaps   # 선택
SPIRAL_CURATED_ORG=iq-ai-lab                 # 선택 (기본값)
SPIRAL_MODEL=claude-sonnet-4-6               # 선택
```

---

## 🧩 Claude Desktop MCP (옵션)

같은 노트 vault를 공유하는 9개 MCP 도구:

- `spiral_list_roadmaps` · `spiral_list_chapters` · `spiral_get_chapter_context`
- `spiral_save_note` · `spiral_read_note` · `spiral_list_notes` · `spiral_delete_notes`
- `spiral_search`
- `spiral_install_curated`

Claude Desktop 설정에 추가:
```json
{
  "mcpServers": {
    "spiral-buddy-red": {
      "command": "node",
      "args": ["/path/to/spiral-buddy-red/dist/mcp.js"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-...",
        "SPIRAL_VAULT_PATH": "/Users/you/Documents/MyNotes"
      }
    }
  }
}
```

---

## 📂 데이터 위치

- **노트**: `<vault>/spiral-buddy-red/` (워크스페이스마다 별도 sub-dir — Blue의 `spiral-buddy/`와도 섞이지 않음)
- **휴지통**: `<vault>/spiral-buddy-red/.trash/` (30일 후 자동 청소)
- **앱 설정**: `~/Library/Application Support/Spiral Buddy Red/spiral-buddy-config.json` (macOS)
- **로그**: `~/Library/Logs/Spiral Buddy Red/server.log` (macOS)
- **학습 자료**: 사용자가 지정한 폴더 (예: `~/Documents/spiral/iq-ai-lab/<repo>`, git 워크스페이스 기본: vault 옆 `iq-spiral-buddy-red-data/<id>/`)

재설치해도 위 데이터는 **모두 보존**됩니다.

---

## 🛠️ 디렉토리 구조

```
src/
  ├ config.ts          ─ 환경변수 + Config 인터페이스
  ├ roadmap.ts         ─ discoverRoadmaps · loadRoadmapChapters
  ├ vault.ts           ─ 노트 R/W, listSpiralNotes, trash 관리
  ├ note-writer.ts     ─ 8섹션 구조화 + Look-up callout 첨부
  ├ spiral.ts          ─ AI 기반 다음 챕터 추천
  ├ session-store.ts   ─ 세션 + lookups + pause state 인메모리 store
  ├ claude.ts          ─ Anthropic SDK wrapper (retry/backoff)
  ├ curated.ts         ─ GitHub 조직 레포 on-demand clone
  ├ categories.ts      ─ org → 도메인/카테고리 매핑 + findDomainForCategory
  ├ routes.ts          ─ Hono API routes
  ├ server.ts          ─ 웹앱 진입점
  └ mcp.ts             ─ MCP 서버 진입점

client/                ─ 브라우저 SPA (vanilla JS + ESM)
electron/              ─ Electron main · preload · setup wizard
docs/                  ─ phase별 spec (Blue에서 물려받음)
scripts/               ─ 통합 테스트, 일회성 도구
data/curated-domains.json     ─ iq-ai-lab Layer 0→6 hierarchy + 트랙 프리셋
```

---

## 🤝 Contributing

PR / 이슈 환영. 큰 변경 전엔 이슈로 먼저 논의해주세요.

## 📄 License

MIT
