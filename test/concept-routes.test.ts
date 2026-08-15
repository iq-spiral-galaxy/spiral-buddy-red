import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { Hono } from "hono";

import type { Config } from "../src/config.js";
import { registerConceptRoutes } from "../src/concept-routes.js";

let tmpRoot: string;
let vaultPath: string;
let roadmapRoot: string;

function config(overrides: Partial<Config> = {}): Config {
  return {
    apiKey: "test-key",
    model: "test-model",
    maxTokens: 4096,
    llmProvider: "anthropic",
    llmBaseUrl: null,
    roadmapRoot,
    pinnedRoadmapPath: null,
    curatedOrg: null,
    githubToken: null,
    vaultPath,
    vaultName: "TestVault",
    obsidianVaultRoot: null,
    ...overrides,
  };
}

function createConceptApi(overrides: Partial<Config> = {}): Hono {
  const app = new Hono();
  registerConceptRoutes(app, config(overrides));
  return app;
}

async function jsonRequest(
  app: Hono,
  method: string,
  url: string,
  body?: unknown,
): Promise<Response> {
  return app.request(url, {
    method,
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

beforeEach(async () => {
  tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), "spiral-concept-routes-"));
  vaultPath = path.join(tmpRoot, "vault");
  roadmapRoot = path.join(tmpRoot, "roadmaps");
  await Promise.all([
    fs.mkdir(vaultPath, { recursive: true }),
    fs.mkdir(roadmapRoot, { recursive: true }),
  ]);
});

afterEach(async () => {
  await fs.rm(tmpRoot, { recursive: true, force: true });
});

describe("concept CRUD routes", () => {
  test("create, upsert, list, patch, and delete preserve one concept", async () => {
    const app = createConceptApi();
    const createdRes = await jsonRequest(app, "POST", "/concepts", {
      term: "Copy-on-Write (COW)",
      aliases: ["쓰기 시 복사"],
      content: "원본을 공유하다가 수정할 때 복제한다.",
      userQuestion: "언제 실제 복사가 일어날까?",
      summary: "지연 복제 방식",
      depth: 1,
    });
    assert.equal(createdRes.status, 201);
    const created = await createdRes.json();
    assert.equal(created.created, true);
    assert.equal(created.concept.term, "Copy-on-Write");
    assert.deepEqual(created.concept.aliases, ["COW", "쓰기 시 복사"]);
    const id = created.concept.id as string;

    const updatedRes = await jsonRequest(app, "POST", "/concepts", {
      term: "copy-on-write",
      aliases: ["copy on write"],
      content: "갱신된 설명",
    });
    assert.equal(updatedRes.status, 200);
    const updated = await updatedRes.json();
    assert.equal(updated.created, false);
    assert.equal(updated.concept.id, id);

    const listRes = await app.request("/concepts");
    assert.equal(listRes.status, 200);
    const listed = await listRes.json();
    assert.equal(listed.mode, "local");
    assert.equal(listed.total, 1);
    assert.equal(listed.concepts[0].id, id);
    assert.equal("content" in listed.concepts[0], false);
    assert.equal("userQuestion" in listed.concepts[0], false);

    const countRes = await app.request("/concepts/count");
    assert.equal(countRes.status, 200);
    assert.deepEqual(await countRes.json(), { total: 1 });

    const detailRes = await app.request("/concepts/" + id);
    assert.equal(detailRes.status, 200);
    const detail = await detailRes.json();
    assert.equal(detail.concept.content, "갱신된 설명");
    assert.equal(detail.concept.userQuestion, "언제 실제 복사가 일어날까?");

    const patchRes = await jsonRequest(app, "PATCH", `/concepts/${id}`, {
      term: "Copy on Write",
      aliases: ["COW", "지연 복제"],
    });
    assert.equal(patchRes.status, 200);
    assert.equal((await patchRes.json()).concept.term, "Copy on Write");

    const deleteRes = await jsonRequest(app, "DELETE", `/concepts/${id}`);
    assert.equal(deleteRes.status, 200);
    assert.deepEqual(await deleteRes.json(), { deleted: true });
    assert.equal((await (await app.request("/concepts")).json()).total, 0);
  });

  test("validates missing vault, malformed input, and concept ids", async () => {
    const noVault = createConceptApi({ vaultPath: null });
    assert.equal((await noVault.request("/concepts")).status, 400);

    const app = createConceptApi();
    assert.equal((await jsonRequest(app, "POST", "/concepts", {})).status, 400);
    assert.equal(
      (await jsonRequest(app, "POST", "/concepts/search", { query: "" })).status,
      400,
    );
    assert.equal(
      (
        await jsonRequest(app, "POST", "/concepts/search", {
          query: "가".repeat(601),
        })
      ).status,
      413,
    );
    assert.equal(
      (await jsonRequest(app, "PATCH", "/concepts/not-a-uuid", { term: "x" }))
        .status,
      400,
    );
    assert.equal(
      (await jsonRequest(app, "DELETE", "/concepts/not-a-uuid")).status,
      400,
    );
    assert.equal((await app.request("/concepts/not-a-uuid")).status, 400);
  });
});

describe("POST /concepts/search", () => {
  test("searches names, aliases, and remembered descriptions locally", async () => {
    const app = createConceptApi();
    await jsonRequest(app, "POST", "/concepts", {
      term: "Copy-on-Write",
      aliases: ["COW", "쓰기 시 복사"],
      summary: "원본을 공유하고 수정 시점에 복제하는 방식",
      content: "원본 페이지는 쓰기 전까지 공유한다.",
    });
    await jsonRequest(app, "POST", "/concepts", {
      term: "OverlayFS",
      aliases: ["overlay file system"],
      summary: "여러 파일 시스템 레이어를 하나처럼 합성한다.",
      content: "컨테이너 이미지의 레이어를 합쳐 보인다.",
    });

    const aliasRes = await jsonRequest(app, "POST", "/concepts/search", {
      query: "COW",
    });
    assert.equal(aliasRes.status, 200);
    const aliasBody = await aliasRes.json();
    assert.equal(aliasBody.mode, "local");
    assert.equal(aliasBody.concepts[0].term, "Copy-on-Write");
    assert.equal("content" in aliasBody.concepts[0], false);

    const descriptionRes = await jsonRequest(app, "POST", "/concepts/search", {
      query: "파일 시스템 레이어를 합성",
    });
    assert.equal(descriptionRes.status, 200);
    const descriptionBody = await descriptionRes.json();
    assert.equal(descriptionBody.mode, "local");
    assert.equal(descriptionBody.concepts[0].term, "OverlayFS");
    assert.equal("content" in descriptionBody.concepts[0], false);
  });
});
