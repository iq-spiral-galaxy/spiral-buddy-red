// Phase 2.1: meta 레포 제외 + 카테고리 그룹화
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { isMetaRepo, listCuratedRepos } from "../src/curated.js";
import {
  getOrgCategories,
  groupReposByCategory,
} from "../src/categories.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const META = path.join(__dirname, "..", ".cache", "curated-meta.json");

function assert(cond: unknown, msg: string) {
  if (!cond) {
    console.error("✗ FAIL:", msg);
    process.exit(1);
  }
  console.log("✓", msg);
}

// ─── 1. isMetaRepo
console.log("\n[1] isMetaRepo");
assert(isMetaRepo(".github"), ".github → meta");
assert(isMetaRepo(".github-private"), ".github-private → meta");
assert(isMetaRepo("iq-ai-lab.github.io"), "iq-ai-lab.github.io → meta");
assert(isMetaRepo("anything.github.io"), "*.github.io → meta");
assert(!isMetaRepo("redis-deep-dive"), "redis-deep-dive → 학습용");
assert(!isMetaRepo("spring-core-deep-dive"), "spring-core-deep-dive → 학습용");
assert(!isMetaRepo("github-actions"), "github-actions (이름에 github 들어가도) → 학습용");

// ─── 2. listCuratedRepos가 meta 자동 제외하는지 (가짜 캐시)
console.log("\n[2] listCuratedRepos → meta 제외");
await fs.mkdir(path.dirname(META), { recursive: true });
const fake = {
  "test-org": {
    org: "test-org",
    fetchedAt: Date.now(),
    repos: [
      {
        full_name: "test-org/.github",
        name: ".github",
        description: "org profile",
        language: null,
        stargazers_count: 0,
        pushed_at: "2026-04-19T00:00:00Z",
        archived: false,
        private: false,
        fork: false,
        size: 100,
      },
      {
        full_name: "test-org/test-org.github.io",
        name: "test-org.github.io",
        description: "GitHub Pages",
        language: "HTML",
        stargazers_count: 0,
        pushed_at: "2026-05-01T00:00:00Z",
        archived: false,
        private: false,
        fork: false,
        size: 5000,
      },
      {
        full_name: "test-org/redis-deep-dive",
        name: "redis-deep-dive",
        description: "Redis 깊이",
        language: "Markdown",
        stargazers_count: 12,
        pushed_at: "2026-05-10T00:00:00Z",
        archived: false,
        private: false,
        fork: false,
        size: 2048,
      },
    ],
  },
};
await fs.writeFile(META, JSON.stringify(fake, null, 2));

const repos = await listCuratedRepos({ org: "test-org" });
console.log(`반환된 레포: ${repos.map((r) => r.name).join(", ")}`);
assert(repos.length === 1, `meta 2개 제외, 학습용 1개만 남음 (실제: ${repos.length})`);
assert(repos[0]?.name === "redis-deep-dive", "redis-deep-dive만 남음");

await fs.rm(META, { force: true });

// ─── 3. iq-ai-lab 카테고리 매핑 로딩
console.log("\n[3] getOrgCategories('iq-ai-lab')");
const cats = await getOrgCategories("iq-ai-lab");
assert(cats !== null, "iq-ai-lab 카테고리 정의 존재");
assert(cats!.length === 11, `11개 카테고리 (실제: ${cats!.length})`);
const catNames = cats!.map((c) => c.name);
console.log("카테고리:", catNames);
assert(catNames.includes("Mathematics"), "Mathematics 포함");
assert(catNames.includes("Reinforcement Learning"), "Reinforcement Learning 포함");
assert(catNames.includes("Frontier LLM"), "Frontier LLM 포함");

// 전체 레포 수 = 48
const totalRepos = cats!.reduce((sum, c) => sum + c.repos.length, 0);
assert(totalRepos === 48, `매핑된 레포 총 48개 (실제: ${totalRepos})`);

// ─── 4. 매핑되지 않은 org → fallback
console.log("\n[4] 정의 안 된 org → fallback");
const otherOrg = await getOrgCategories("unknown-org");
assert(otherOrg === null, "정의 안 된 org → null");

// ─── 5. groupReposByCategory - iq-ai-lab
console.log("\n[5] groupReposByCategory");
const sampleRepos = [
  { name: "linear-algebra-deep-dive", stars: 1 },
  { name: "transformer-deep-dive", stars: 2 },
  { name: "rl-foundations-deep-dive", stars: 3 },
  { name: "diffusion-model-deep-dive", stars: 4 },
  { name: "llm-alignment-deep-dive", stars: 5 },
  { name: "pytorch-internals-deep-dive", stars: 6 },
  { name: "unknown-repo-xyz", stars: 7 }, // 매핑 없음 → Other
];

const groups = await groupReposByCategory("iq-ai-lab", sampleRepos);
console.log(
  "결과:",
  JSON.stringify(
    groups.map((g) => ({
      cat: g.category.name,
      emoji: g.category.emoji,
      repos: g.repos.map((r) => r.name),
    })),
    null,
    2,
  ),
);

const math = groups.find((g) => g.category.name === "Mathematics");
assert(math?.repos.length === 1, "Mathematics: linear-algebra");

const arch = groups.find((g) => g.category.name === "Architectures");
assert(arch?.repos.length === 1, "Architectures: transformer");

const rl = groups.find((g) => g.category.name === "Reinforcement Learning");
assert(rl?.repos.length === 1, "RL: rl-foundations");

const llm = groups.find((g) => g.category.name === "Large Language Models");
assert(llm?.repos.length === 1, "LLM: llm-alignment");

const other = groups.find((g) => g.category.name === "Other");
assert(other?.repos.length === 1, "Other: unknown-repo-xyz");
assert(other?.repos[0]?.name === "unknown-repo-xyz", "Other 정확");

// 카테고리 순서가 정의 순서 (README 순서) 그대로인지
const orderedNames = groups.map((g) => g.category.name);
const mathIdx = orderedNames.indexOf("Mathematics");
const archIdx = orderedNames.indexOf("Architectures");
const rlIdx = orderedNames.indexOf("Reinforcement Learning");
assert(
  mathIdx < archIdx && archIdx < rlIdx,
  "카테고리 순서 = Layer 정의 순서",
);
assert(
  orderedNames[orderedNames.length - 1] === "Other",
  "Other는 항상 마지막",
);

// ─── 6. unknown-org → 단일 그룹 fallback
console.log("\n[6] unknown-org → 단일 그룹");
const fbGroups = await groupReposByCategory("unknown-org", [
  { name: "foo", x: 1 },
  { name: "bar", x: 2 },
]);
assert(fbGroups.length === 1, "fallback: 단일 그룹");
assert(fbGroups[0]?.category.name === "All", "그룹 이름 'All'");
assert(fbGroups[0]?.repos.length === 2, "모든 레포 포함");

console.log("\n✅ Phase 2.1 모든 테스트 통과");
