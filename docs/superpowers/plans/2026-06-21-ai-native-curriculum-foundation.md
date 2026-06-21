# AI-native Curriculum Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the foundation for an AI-native multimodal curriculum platform: static learning site, structured curriculum source files, asset registry, generated machine-readable artifacts, validation, and GitHub Pages deployment.

**Architecture:** Use Docusaurus and MDX for the public static site, YAML/MDX files as the human-authored curriculum source, and TypeScript scripts to generate `course-manifest.json`, `asset-index.json`, `rag-chunks.jsonl`, `learning-graph.json`, and `assessment-bank.json`. This plan intentionally excludes live Agent backends, learner accounts, CMS workflows, and adaptive runtime services; those should be separate implementation plans after the foundation is stable.

**Tech Stack:** Node.js, TypeScript, Docusaurus, MDX, YAML, Zod, Vitest, GitHub Actions, GitHub Pages.

---

## Scope Boundary

This plan implements Phase 1 and the first slice of Phase 2 from the design document:

- Static Docusaurus site.
- Structured course/unit/asset source files.
- One complete sample module slice for LLM, RAG, and Agent foundations.
- Generated course, asset, RAG, learning graph, and assessment artifacts.
- Build validation and CI.
- GitHub Pages deployment workflow.

This plan does not implement:

- Tutor Agent runtime.
- Teacher Copilot runtime.
- Assessment Agent runtime.
- Learner profiles or adaptive personalization.
- CMS editing.
- External object storage migration.

## File Structure

Create or modify these files:

- `package.json`: project scripts and dependencies.
- `tsconfig.json`: TypeScript settings for scripts and tests.
- `vitest.config.ts`: test configuration.
- `.gitignore`: local build and dependency exclusions.
- `openspec/project.md`: project context after OpenSpec initialization.
- `openspec/changes/ai-native-curriculum-foundation/proposal.md`: change proposal.
- `openspec/changes/ai-native-curriculum-foundation/tasks.md`: OpenSpec task checklist.
- `site/docusaurus.config.ts`: Docusaurus configuration.
- `site/sidebars.ts`: documentation sidebar.
- `site/src/css/custom.css`: visual theme baseline.
- `site/src/components/TeacherNote.tsx`: MDX teacher callout component.
- `site/src/components/Checkpoint.tsx`: MDX checkpoint component.
- `site/src/pages/index.tsx`: platform homepage.
- `curriculum/ai-engineering/course.yaml`: course metadata.
- `curriculum/ai-engineering/modules/01-llm-foundations/*`: first module content.
- `curriculum/ai-engineering/modules/02-rag/*`: RAG starter content.
- `curriculum/ai-engineering/modules/03-agents/*`: Agent starter content.
- `assets/diagrams/rag-retrieval-pipeline.mmd`: editable diagram source.
- `schemas/curriculum.ts`: Zod schemas and shared types.
- `scripts/lib/read-yaml.ts`: YAML reader helper.
- `scripts/lib/paths.ts`: repository path helper.
- `scripts/build-course-manifest.ts`: course manifest generator.
- `scripts/build-asset-index.ts`: asset index generator.
- `scripts/build-rag-chunks.ts`: RAG chunk generator.
- `scripts/build-learning-graph.ts`: learning graph generator.
- `scripts/build-assessment-bank.ts`: assessment bank generator.
- `scripts/validate-content.ts`: content validation entrypoint.
- `tests/schemas.test.ts`: schema tests.
- `tests/generators.test.ts`: generator tests.
- `.github/workflows/pages.yml`: CI and GitHub Pages deployment.

---

### Task 1: Initialize Project And OpenSpec

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `openspec/project.md`
- Create: `openspec/changes/ai-native-curriculum-foundation/proposal.md`
- Create: `openspec/changes/ai-native-curriculum-foundation/tasks.md`

- [ ] **Step 1: Initialize OpenSpec if missing**

Run:

```bash
openspec init --tools codex .
```

Expected: an `openspec/` directory exists. If the command says OpenSpec is already initialized, continue.

- [ ] **Step 2: Create project package metadata**

Create `package.json`:

```json
{
  "name": "aidigitaltextbook",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "docusaurus start site",
    "build": "docusaurus build site",
    "serve": "docusaurus serve site",
    "generate": "tsx scripts/build-course-manifest.ts && tsx scripts/build-asset-index.ts && tsx scripts/build-rag-chunks.ts && tsx scripts/build-learning-graph.ts && tsx scripts/build-assessment-bank.ts",
    "validate": "tsx scripts/validate-content.ts",
    "test": "vitest run",
    "check": "npm run generate && npm run validate && npm run test && npm run build"
  },
  "dependencies": {
    "@docusaurus/core": "^3.5.2",
    "@docusaurus/preset-classic": "^3.5.2",
    "@mdx-js/react": "^3.0.1",
    "clsx": "^2.1.1",
    "gray-matter": "^4.0.3",
    "js-yaml": "^4.1.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@docusaurus/module-type-aliases": "^3.5.2",
    "@docusaurus/tsconfig": "^3.5.2",
    "@docusaurus/types": "^3.5.2",
    "@types/js-yaml": "^4.0.9",
    "@types/node": "^22.7.4",
    "tsx": "^4.19.1",
    "typescript": "^5.6.2",
    "vitest": "^2.1.1"
  }
}
```

- [ ] **Step 3: Create TypeScript config**

Create `tsconfig.json`:

```json
{
  "extends": "@docusaurus/tsconfig",
  "compilerOptions": {
    "baseUrl": ".",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "resolveJsonModule": true,
    "types": ["node", "vitest/globals"]
  },
  "include": ["site", "scripts", "schemas", "tests"]
}
```

- [ ] **Step 4: Create Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts"]
  }
});
```

- [ ] **Step 5: Create ignore rules**

Create `.gitignore`:

```gitignore
node_modules/
.docusaurus/
build/
.env
.env.*
.superpowers/
site/.docusaurus/
site/build/
```

- [ ] **Step 6: Add OpenSpec project context**

Create or update `openspec/project.md`:

```md
# Project Context

This repository hosts an AI-native multimodal curriculum platform for teaching large language models, RAG, agents, evaluation, and deployment.

The first implementation phase builds a Docusaurus static site, structured curriculum source files, multimodal asset metadata, generated machine-readable artifacts, validation scripts, and GitHub Pages deployment.
```

- [ ] **Step 7: Add OpenSpec proposal**

Create `openspec/changes/ai-native-curriculum-foundation/proposal.md`:

```md
# AI-native Curriculum Foundation

## Why

The project needs a foundation that can publish a polished static learning site while preserving structured content for future RAG, Agent, and adaptive learning systems.

## What Changes

- Add Docusaurus and MDX static site.
- Add structured course, unit, asset, quiz, and rubric source files.
- Add TypeScript generators for course manifest, asset index, RAG chunks, learning graph, and assessment bank.
- Add validation scripts and tests.
- Add GitHub Pages deployment workflow.

## Out Of Scope

- Live Agent backends.
- Learner accounts.
- CMS authoring.
- Adaptive personalization runtime.
```

- [ ] **Step 8: Add OpenSpec tasks**

Create `openspec/changes/ai-native-curriculum-foundation/tasks.md`:

```md
# Tasks

- [ ] Project package and tooling
- [ ] Docusaurus static site
- [ ] Curriculum source skeleton
- [ ] Multimodal asset registry
- [ ] Manifest and index generators
- [ ] Content validation
- [ ] Tests
- [ ] GitHub Pages workflow
```

- [ ] **Step 9: Verify project files**

Run:

```bash
npm install
npm run test
```

Expected: dependencies install and Vitest reports no tests or passing tests, depending on whether tests already exist.

- [ ] **Step 10: Commit**

```bash
git add package.json tsconfig.json vitest.config.ts .gitignore openspec
git commit -m "chore: initialize curriculum platform foundation"
```

---

### Task 2: Create Docusaurus Static Site

**Files:**
- Create: `site/docusaurus.config.ts`
- Create: `site/sidebars.ts`
- Create: `site/src/css/custom.css`
- Create: `site/src/components/TeacherNote.tsx`
- Create: `site/src/components/Checkpoint.tsx`
- Create: `site/src/pages/index.tsx`

- [ ] **Step 1: Create Docusaurus config**

Create `site/docusaurus.config.ts`:

```ts
import type { Config } from "@docusaurus/types";
import type { Options as PresetOptions } from "@docusaurus/preset-classic";

const repository = process.env.GITHUB_REPOSITORY ?? "local/aidigitaltextbook";
const [owner, repo] = repository.split("/");
const projectName = repo ?? "aidigitaltextbook";
const siteUrl = process.env.PAGES_BASE_URL ?? `https://${owner}.github.io`;

const config: Config = {
  title: "AI Digital Textbook",
  tagline: "大模型、RAG 与 Agent 的 AI 原生教材系统",
  favicon: "img/favicon.ico",
  url: siteUrl,
  baseUrl: `/${projectName}/`,
  organizationName: owner,
  projectName,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN"]
  },
  presets: [
    [
      "classic",
      {
        docs: {
          path: "../curriculum/ai-engineering",
          routeBasePath: "courses/ai-engineering",
          sidebarPath: "./sidebars.ts"
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css"
        }
      } satisfies PresetOptions
    ]
  ],
  themeConfig: {
    navbar: {
      title: "AI Digital Textbook",
      items: [
        { to: "/courses/ai-engineering/intro", label: "学习路径", position: "left" },
        { to: "/courses/ai-engineering/modules/01-llm-foundations/lesson", label: "课程单元", position: "left" },
        { to: "/courses/ai-engineering/modules/01-llm-foundations/teaching-guide", label: "教师资源", position: "left" }
      ]
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} AI Digital Textbook`
    }
  }
};

export default config;
```

- [ ] **Step 2: Create sidebar**

Create `site/sidebars.ts`:

```ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  aiEngineering: [
    "intro",
    {
      type: "category",
      label: "01 大模型基础",
      items: [
        "modules/01-llm-foundations/lesson",
        "modules/01-llm-foundations/teaching-guide",
        "modules/01-llm-foundations/lab-python",
        "modules/01-llm-foundations/lab-js",
        "modules/01-llm-foundations/project"
      ]
    },
    {
      type: "category",
      label: "02 RAG",
      items: ["modules/02-rag/lesson"]
    },
    {
      type: "category",
      label: "03 Agent",
      items: ["modules/03-agents/lesson"]
    }
  ]
};

export default sidebars;
```

- [ ] **Step 3: Create visual baseline**

Create `site/src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #0f766e;
  --ifm-color-primary-dark: #115e59;
  --ifm-color-primary-darker: #134e4a;
  --ifm-color-primary-light: #14b8a6;
  --ifm-code-font-size: 92%;
  --ifm-border-radius: 6px;
}

.hero {
  background: #101828;
  color: #ffffff;
}

.teacher-note,
.checkpoint {
  border: 1px solid #d0d5dd;
  border-radius: 6px;
  padding: 1rem;
  margin: 1rem 0;
  background: #ffffff;
}

.teacher-note strong,
.checkpoint strong {
  display: block;
  margin-bottom: 0.35rem;
}
```

- [ ] **Step 4: Create TeacherNote component**

Create `site/src/components/TeacherNote.tsx`:

```tsx
import type { ReactNode } from "react";

export default function TeacherNote({ children }: { children: ReactNode }) {
  return (
    <aside className="teacher-note">
      <strong>教师提示</strong>
      <div>{children}</div>
    </aside>
  );
}
```

- [ ] **Step 5: Create Checkpoint component**

Create `site/src/components/Checkpoint.tsx`:

```tsx
import type { ReactNode } from "react";

export default function Checkpoint({ children }: { children: ReactNode }) {
  return (
    <aside className="checkpoint">
      <strong>学习检查点</strong>
      <div>{children}</div>
    </aside>
  );
}
```

- [ ] **Step 6: Create homepage**

Create `site/src/pages/index.tsx`:

```tsx
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

export default function Home() {
  return (
    <Layout title="AI Digital Textbook" description="AI-native multimodal curriculum platform">
      <main>
        <section className="hero">
          <div className="container padding-vert--xl">
            <h1>AI Digital Textbook</h1>
            <p>面向开发者学生和教师的大模型、RAG、Agent 工程化教材系统。</p>
            <Link className="button button--primary" to="/courses/ai-engineering/intro">
              进入学习路径
            </Link>
          </div>
        </section>
        <section className="container padding-vert--lg">
          <div className="row">
            <div className="col col--4">
              <h2>大模型基础</h2>
              <p>理解 token、上下文、提示词、结构化输出和模型调用边界。</p>
            </div>
            <div className="col col--4">
              <h2>RAG</h2>
              <p>构建检索、重排、引用和评测完整链路。</p>
            </div>
            <div className="col col--4">
              <h2>Agent</h2>
              <p>设计工具调用、状态、计划、护栏和可观测性。</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
```

- [ ] **Step 7: Verify site build reaches missing content errors**

Run:

```bash
npm run build
```

Expected: Docusaurus may fail because curriculum files do not exist yet. If it fails only for missing docs referenced by sidebar, continue to Task 3.

- [ ] **Step 8: Commit**

```bash
git add site
git commit -m "feat: add Docusaurus learning site shell"
```

---

### Task 3: Add Curriculum Source Skeleton

**Files:**
- Create: `curriculum/ai-engineering/intro.md`
- Create: `curriculum/ai-engineering/course.yaml`
- Create: `curriculum/ai-engineering/modules/01-llm-foundations/unit.yaml`
- Create: `curriculum/ai-engineering/modules/01-llm-foundations/lesson.mdx`
- Create: `curriculum/ai-engineering/modules/01-llm-foundations/teaching-guide.mdx`
- Create: `curriculum/ai-engineering/modules/01-llm-foundations/lab-python.md`
- Create: `curriculum/ai-engineering/modules/01-llm-foundations/lab-js.md`
- Create: `curriculum/ai-engineering/modules/01-llm-foundations/project.md`
- Create: `curriculum/ai-engineering/modules/01-llm-foundations/quiz.yaml`
- Create: `curriculum/ai-engineering/modules/01-llm-foundations/rubric.yaml`
- Create: `curriculum/ai-engineering/modules/01-llm-foundations/assets.yaml`
- Create: `curriculum/ai-engineering/modules/02-rag/lesson.md`
- Create: `curriculum/ai-engineering/modules/03-agents/lesson.md`

- [ ] **Step 1: Create course intro**

Create `curriculum/ai-engineering/intro.md`:

```md
---
id: intro
title: AI 工程学习路径
---

# AI 工程学习路径

这门课程面向有编程基础的学习者和需要组织课堂的教师，覆盖大模型基础、RAG、Agent、评测与部署。

## 学习路径

1. 大模型基础：理解模型调用、提示词、上下文和结构化输出。
2. RAG：构建可引用、可评测的检索增强生成系统。
3. Agent：设计工具调用、任务状态、护栏和可观测性。
```

- [ ] **Step 2: Create course metadata**

Create `curriculum/ai-engineering/course.yaml`:

```yaml
id: ai-engineering
title: AI Engineering Curriculum
language: zh-CN
audiences:
  - developer-student
  - teacher
modules:
  - id: 01-llm-foundations
    title: 大模型基础
  - id: 02-rag
    title: RAG
  - id: 03-agents
    title: Agent
```

- [ ] **Step 3: Create first unit metadata**

Create `curriculum/ai-engineering/modules/01-llm-foundations/unit.yaml`:

```yaml
id: llm-foundations
title: 大模型工程基础
module: 01-llm-foundations
audience:
  - developer-student
  - teacher
level: beginner
prerequisites:
  - basic-programming
learning_objectives:
  - 解释 token、上下文窗口和模型输出之间的关系
  - 编写一个最小的大模型调用实验
  - 识别提示词实验中的常见失败模式
assets:
  - llm-context-window-diagram
assessments:
  quiz: quiz.yaml
  rubric: rubric.yaml
agent_use:
  retrievable: true
  chunk_strategy: concept-lab-rubric
```

- [ ] **Step 4: Create student lesson**

Create `curriculum/ai-engineering/modules/01-llm-foundations/lesson.mdx`:

```mdx
---
id: modules/01-llm-foundations/lesson
title: 大模型工程基础
---

import TeacherNote from '@site/src/components/TeacherNote';
import Checkpoint from '@site/src/components/Checkpoint';

# 大模型工程基础

大模型应用工程的核心不是“把问题丢给模型”，而是设计输入、约束输出、管理上下文，并持续评测结果质量。

## 核心概念

- Token：模型处理文本的基本单位。
- Context window：模型一次调用可以接收和参考的信息范围。
- Prompt：给模型的任务、约束、示例和输出格式。
- Structured output：让模型返回可被程序稳定解析的结构化结果。

<Checkpoint>
用自己的话解释：为什么上下文窗口不是“模型记忆”？
</Checkpoint>

<TeacherNote>
课堂上不要先讲复杂 Agent。先让学生看到同一个问题在不同提示词和上下文下会产生不同质量的输出。
</TeacherNote>
```

- [ ] **Step 5: Create teacher guide**

Create `curriculum/ai-engineering/modules/01-llm-foundations/teaching-guide.mdx`:

```mdx
---
id: modules/01-llm-foundations/teaching-guide
title: 教师指南：大模型工程基础
---

# 教师指南：大模型工程基础

## 课时目标

- 学生能解释 token、上下文和提示词的工程含义。
- 学生能运行最小模型调用实验。
- 学生能说出至少两个提示词失败模式。

## 课堂流程

1. 10 分钟：用生活类比解释 token 和上下文。
2. 20 分钟：演示同一问题在不同提示词下的差异。
3. 30 分钟：学生完成 Python 或 JavaScript 最小实验。
4. 20 分钟：小组讨论失败模式。
5. 10 分钟：完成检查点和反思。
```

- [ ] **Step 6: Create Python lab**

Create `curriculum/ai-engineering/modules/01-llm-foundations/lab-python.md`:

```md
---
id: modules/01-llm-foundations/lab-python
title: Python 实验：最小模型调用
---

# Python 实验：最小模型调用

```python
def build_prompt(topic: str) -> str:
    return f"用三句话解释 {topic}，并给出一个工程例子。"

print(build_prompt("上下文窗口"))
```

预期输出应包含明确任务、长度约束和主题。
```

- [ ] **Step 7: Create JavaScript lab**

Create `curriculum/ai-engineering/modules/01-llm-foundations/lab-js.md`:

```md
---
id: modules/01-llm-foundations/lab-js
title: JavaScript 实验：最小提示词构造
---

# JavaScript 实验：最小提示词构造

```js
function buildPrompt(topic) {
  return `用三句话解释 ${topic}，并给出一个工程例子。`;
}

console.log(buildPrompt("结构化输出"));
```

预期输出应包含明确任务、长度约束和主题。
```

- [ ] **Step 8: Create project brief**

Create `curriculum/ai-engineering/modules/01-llm-foundations/project.md`:

```md
---
id: modules/01-llm-foundations/project
title: 项目：提示词实验记录器
---

# 项目：提示词实验记录器

构建一个小工具，用表格记录同一任务在三种提示词下的输出差异。

提交物：

- 三个提示词版本。
- 每个版本的输出样例。
- 对准确性、稳定性、可解析性的比较。
```

- [ ] **Step 9: Create quiz**

Create `curriculum/ai-engineering/modules/01-llm-foundations/quiz.yaml`:

```yaml
id: llm-foundations-quiz
questions:
  - id: q1
    type: short-answer
    prompt: 为什么上下文窗口不等同于长期记忆？
    expected_points:
      - 上下文窗口只影响当前调用可见信息
      - 长期记忆需要外部存储或显式状态管理
```

- [ ] **Step 10: Create rubric**

Create `curriculum/ai-engineering/modules/01-llm-foundations/rubric.yaml`:

```yaml
id: llm-foundations-rubric
criteria:
  - id: prompt-clarity
    title: 提示词清晰度
    levels:
      excellent: 任务、约束、输出格式都清楚
      proficient: 任务清楚但约束不完整
      developing: 任务模糊或输出格式缺失
  - id: comparison-quality
    title: 对比分析质量
    levels:
      excellent: 能比较准确性、稳定性和可解析性
      proficient: 能比较两个质量维度
      developing: 只描述输出，没有分析
```

- [ ] **Step 11: Create assets metadata**

Create `curriculum/ai-engineering/modules/01-llm-foundations/assets.yaml`:

```yaml
assets:
  - id: llm-context-window-diagram
    type: diagram
    format: mermaid
    title: Context Window Mental Model
    source: assets/diagrams/llm-context-window.mmd
    pedagogical_role: mental-model
    license: original
    presentation:
      embed: true
      downloadable: true
    machine:
      rag_index:
        include: true
        extraction: alt_text_plus_caption
      alt_text: Shows a prompt, context examples, and model output inside a bounded context window.
```

- [ ] **Step 12: Create RAG starter lesson**

Create `curriculum/ai-engineering/modules/02-rag/lesson.md`:

```md
---
id: modules/02-rag/lesson
title: RAG 入门
---

# RAG 入门

RAG 把外部知识检索和模型生成组合起来，使回答可以引用课程内容、文档或数据源。
```

- [ ] **Step 13: Create Agent starter lesson**

Create `curriculum/ai-engineering/modules/03-agents/lesson.md`:

```md
---
id: modules/03-agents/lesson
title: Agent 入门
---

# Agent 入门

Agent 是带有目标、工具、上下文和执行边界的模型应用结构。好的 Agent 设计依赖清晰工具、状态管理和可观测性。
```

- [ ] **Step 14: Verify Docusaurus build**

Run:

```bash
npm run build
```

Expected: build succeeds and outputs `site/build`.

- [ ] **Step 15: Commit**

```bash
git add curriculum
git commit -m "feat: add structured AI engineering curriculum skeleton"
```

---

### Task 4: Add Schemas And Generator Tests

**Files:**
- Create: `schemas/curriculum.ts`
- Create: `tests/schemas.test.ts`

- [ ] **Step 1: Create schema module**

Create `schemas/curriculum.ts`:

```ts
import { z } from "zod";

export const AudienceSchema = z.enum(["developer-student", "teacher"]);

export const CourseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  language: z.string().min(1),
  audiences: z.array(AudienceSchema).min(1),
  modules: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1)
    })
  )
});

export const UnitSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  module: z.string().min(1),
  audience: z.array(AudienceSchema).min(1),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  prerequisites: z.array(z.string()),
  learning_objectives: z.array(z.string()).min(1),
  assets: z.array(z.string()).default([]),
  assessments: z
    .object({
      quiz: z.string().optional(),
      rubric: z.string().optional()
    })
    .optional(),
  agent_use: z.object({
    retrievable: z.boolean(),
    chunk_strategy: z.string().min(1)
  })
});

export const AssetSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["diagram", "image", "video", "audio", "slides", "notebook", "dataset", "code", "prompt", "interactive", "assessment"]),
  format: z.string().min(1),
  title: z.string().min(1),
  source: z.string().min(1),
  pedagogical_role: z.string().min(1),
  license: z.string().min(1),
  presentation: z.object({
    embed: z.boolean(),
    downloadable: z.boolean()
  }),
  machine: z.object({
    rag_index: z.object({
      include: z.boolean(),
      extraction: z.string().min(1)
    }),
    alt_text: z.string().min(1)
  })
});

export const AssetsFileSchema = z.object({
  assets: z.array(AssetSchema)
});

export type Course = z.infer<typeof CourseSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Asset = z.infer<typeof AssetSchema>;
```

- [ ] **Step 2: Add schema tests**

Create `tests/schemas.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { AssetSchema, CourseSchema, UnitSchema } from "../schemas/curriculum";

describe("curriculum schemas", () => {
  it("accepts valid course metadata", () => {
    const parsed = CourseSchema.parse({
      id: "ai-engineering",
      title: "AI Engineering Curriculum",
      language: "zh-CN",
      audiences: ["developer-student", "teacher"],
      modules: [{ id: "01-llm-foundations", title: "大模型基础" }]
    });

    expect(parsed.id).toBe("ai-engineering");
  });

  it("rejects a unit without learning objectives", () => {
    expect(() =>
      UnitSchema.parse({
        id: "broken",
        title: "Broken Unit",
        module: "01",
        audience: ["developer-student"],
        level: "beginner",
        prerequisites: [],
        learning_objectives: [],
        agent_use: { retrievable: true, chunk_strategy: "concept" }
      })
    ).toThrow();
  });

  it("requires asset alt text for machine use", () => {
    expect(() =>
      AssetSchema.parse({
        id: "diagram",
        type: "diagram",
        format: "svg",
        title: "Diagram",
        source: "assets/diagram.svg",
        pedagogical_role: "mental-model",
        license: "original",
        presentation: { embed: true, downloadable: true },
        machine: {
          rag_index: { include: true, extraction: "alt_text_plus_caption" },
          alt_text: ""
        }
      })
    ).toThrow();
  });
});
```

- [ ] **Step 3: Run schema tests**

Run:

```bash
npm run test -- tests/schemas.test.ts
```

Expected: three tests pass.

- [ ] **Step 4: Commit**

```bash
git add schemas tests/schemas.test.ts
git commit -m "feat: add curriculum schemas"
```

---

### Task 5: Add Manifest And Asset Generators

**Files:**
- Create: `scripts/lib/read-yaml.ts`
- Create: `scripts/lib/paths.ts`
- Create: `scripts/build-course-manifest.ts`
- Create: `scripts/build-asset-index.ts`
- Create: `scripts/build-rag-chunks.ts`
- Create: `scripts/build-learning-graph.ts`
- Create: `scripts/build-assessment-bank.ts`
- Create: `tests/generators.test.ts`

- [ ] **Step 1: Create path helper**

Create `scripts/lib/paths.ts`:

```ts
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
export const repoRoot = path.resolve(path.dirname(currentFile), "../..");
export const curriculumRoot = path.join(repoRoot, "curriculum", "ai-engineering");
export const generatedRoot = path.join(repoRoot, "generated");
```

- [ ] **Step 2: Create YAML reader**

Create `scripts/lib/read-yaml.ts`:

```ts
import fs from "node:fs";
import yaml from "js-yaml";

export function readYamlFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf8");
  return yaml.load(raw) as T;
}
```

- [ ] **Step 3: Create course manifest generator**

Create `scripts/build-course-manifest.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import { CourseSchema, UnitSchema } from "../schemas/curriculum";
import { curriculumRoot, generatedRoot } from "./lib/paths";
import { readYamlFile } from "./lib/read-yaml";

const course = CourseSchema.parse(readYamlFile(path.join(curriculumRoot, "course.yaml")));
const modulesRoot = path.join(curriculumRoot, "modules");

const units = fs
  .readdirSync(modulesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(modulesRoot, entry.name, "unit.yaml"))
  .filter((unitPath) => fs.existsSync(unitPath))
  .map((unitPath) => UnitSchema.parse(readYamlFile(unitPath)));

fs.mkdirSync(generatedRoot, { recursive: true });
fs.writeFileSync(
  path.join(generatedRoot, "course-manifest.json"),
  JSON.stringify({ ...course, units }, null, 2)
);
```

- [ ] **Step 4: Create asset index generator**

Create `scripts/build-asset-index.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import { AssetsFileSchema } from "../schemas/curriculum";
import { curriculumRoot, generatedRoot } from "./lib/paths";
import { readYamlFile } from "./lib/read-yaml";

const modulesRoot = path.join(curriculumRoot, "modules");
const assets = fs
  .readdirSync(modulesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((entry) => {
    const assetsPath = path.join(modulesRoot, entry.name, "assets.yaml");
    if (!fs.existsSync(assetsPath)) return [];
    return AssetsFileSchema.parse(readYamlFile(assetsPath)).assets.map((asset) => ({
      ...asset,
      module: entry.name
    }));
  });

fs.mkdirSync(generatedRoot, { recursive: true });
fs.writeFileSync(path.join(generatedRoot, "asset-index.json"), JSON.stringify({ assets }, null, 2));
```

- [ ] **Step 5: Create RAG chunk generator**

Create `scripts/build-rag-chunks.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { curriculumRoot, generatedRoot } from "./lib/paths";

const modulesRoot = path.join(curriculumRoot, "modules");
const chunks: Array<Record<string, unknown>> = [];

for (const moduleEntry of fs.readdirSync(modulesRoot, { withFileTypes: true })) {
  if (!moduleEntry.isDirectory()) continue;
  const modulePath = path.join(modulesRoot, moduleEntry.name);
  for (const fileName of fs.readdirSync(modulePath)) {
    if (!fileName.endsWith(".md") && !fileName.endsWith(".mdx")) continue;
    const sourcePath = path.join(modulePath, fileName);
    const parsed = matter(fs.readFileSync(sourcePath, "utf8"));
    const text = parsed.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!text) continue;
    const id = String(parsed.data.id ?? `${moduleEntry.name}/${fileName}`);
    chunks.push({
      chunk_id: `${id}:body`,
      source_id: path.relative(curriculumRoot, sourcePath).replaceAll("\\", "/"),
      unit_id: moduleEntry.name,
      audience: ["developer-student", "teacher"],
      content_type: fileName.includes("teaching") ? "teaching-guide" : "lesson",
      text,
      citations: [{ label: String(parsed.data.title ?? id), path: `/courses/ai-engineering/${id}` }]
    });
  }
}

fs.mkdirSync(generatedRoot, { recursive: true });
fs.writeFileSync(path.join(generatedRoot, "rag-chunks.jsonl"), chunks.map((chunk) => JSON.stringify(chunk)).join("\n"));
```

- [ ] **Step 6: Create learning graph generator**

Create `scripts/build-learning-graph.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import { UnitSchema } from "../schemas/curriculum";
import { curriculumRoot, generatedRoot } from "./lib/paths";
import { readYamlFile } from "./lib/read-yaml";

const modulesRoot = path.join(curriculumRoot, "modules");
const nodes = fs
  .readdirSync(modulesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(modulesRoot, entry.name, "unit.yaml"))
  .filter((unitPath) => fs.existsSync(unitPath))
  .map((unitPath) => UnitSchema.parse(readYamlFile(unitPath)))
  .map((unit) => ({
    id: unit.id,
    title: unit.title,
    prerequisites: unit.prerequisites,
    learning_objectives: unit.learning_objectives
  }));

fs.mkdirSync(generatedRoot, { recursive: true });
fs.writeFileSync(path.join(generatedRoot, "learning-graph.json"), JSON.stringify({ nodes }, null, 2));
```

- [ ] **Step 7: Create assessment bank generator**

Create `scripts/build-assessment-bank.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import { curriculumRoot, generatedRoot } from "./lib/paths";
import { readYamlFile } from "./lib/read-yaml";

const modulesRoot = path.join(curriculumRoot, "modules");
const assessments: Array<Record<string, unknown>> = [];

for (const moduleEntry of fs.readdirSync(modulesRoot, { withFileTypes: true })) {
  if (!moduleEntry.isDirectory()) continue;
  const modulePath = path.join(modulesRoot, moduleEntry.name);
  for (const fileName of ["quiz.yaml", "rubric.yaml"]) {
    const filePath = path.join(modulePath, fileName);
    if (!fs.existsSync(filePath)) continue;
    assessments.push({
      module: moduleEntry.name,
      type: fileName.replace(".yaml", ""),
      content: readYamlFile(filePath)
    });
  }
}

fs.mkdirSync(generatedRoot, { recursive: true });
fs.writeFileSync(path.join(generatedRoot, "assessment-bank.json"), JSON.stringify({ assessments }, null, 2));
```

- [ ] **Step 8: Add generator test**

Create `tests/generators.test.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { generatedRoot } from "../scripts/lib/paths";

describe("generated artifacts", () => {
  it("creates the core generated files", () => {
    const expected = [
      "course-manifest.json",
      "asset-index.json",
      "rag-chunks.jsonl",
      "learning-graph.json",
      "assessment-bank.json"
    ];

    for (const fileName of expected) {
      expect(fs.existsSync(path.join(generatedRoot, fileName))).toBe(true);
    }
  });
});
```

- [ ] **Step 9: Run generators**

Run:

```bash
npm run generate
```

Expected: `generated/` contains the five generated artifact files.

- [ ] **Step 10: Run generator tests**

Run:

```bash
npm run test -- tests/generators.test.ts
```

Expected: generator test passes.

- [ ] **Step 11: Commit**

```bash
git add scripts schemas tests generated
git commit -m "feat: generate curriculum knowledge artifacts"
```

---

### Task 6: Add Content Validation

**Files:**
- Create: `scripts/validate-content.ts`

- [ ] **Step 1: Create validation script**

Create `scripts/validate-content.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import { AssetsFileSchema, CourseSchema, UnitSchema } from "../schemas/curriculum";
import { curriculumRoot } from "./lib/paths";
import { readYamlFile } from "./lib/read-yaml";

const errors: string[] = [];

function requireFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing required file: ${path.relative(process.cwd(), filePath)}`);
  }
}

const coursePath = path.join(curriculumRoot, "course.yaml");
requireFile(coursePath);
if (fs.existsSync(coursePath)) {
  CourseSchema.safeParse(readYamlFile(coursePath)).success || errors.push("Invalid course.yaml");
}

const modulesRoot = path.join(curriculumRoot, "modules");
for (const moduleEntry of fs.readdirSync(modulesRoot, { withFileTypes: true })) {
  if (!moduleEntry.isDirectory()) continue;
  const modulePath = path.join(modulesRoot, moduleEntry.name);
  const unitPath = path.join(modulePath, "unit.yaml");
  requireFile(unitPath);
  requireFile(path.join(modulePath, "lesson.mdx"));

  if (fs.existsSync(unitPath)) {
    const parsed = UnitSchema.safeParse(readYamlFile(unitPath));
    if (!parsed.success) errors.push(`Invalid unit.yaml: ${moduleEntry.name}`);
  }

  const assetsPath = path.join(modulePath, "assets.yaml");
  if (fs.existsSync(assetsPath)) {
    const parsedAssets = AssetsFileSchema.safeParse(readYamlFile(assetsPath));
    if (!parsedAssets.success) errors.push(`Invalid assets.yaml: ${moduleEntry.name}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Content validation passed");
```

- [ ] **Step 2: Run validation**

Run:

```bash
npm run validate
```

Expected: `Content validation passed`.

- [ ] **Step 3: Run full check**

Run:

```bash
npm run check
```

Expected: generation, validation, tests, and Docusaurus build all pass.

- [ ] **Step 4: Commit**

```bash
git add scripts/validate-content.ts package.json
git commit -m "feat: validate curriculum content"
```

---

### Task 7: Add GitHub Pages Workflow

**Files:**
- Create: `.github/workflows/pages.yml`

- [ ] **Step 1: Create GitHub Pages workflow**

Create `.github/workflows/pages.yml`:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches:
      - master
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Generate artifacts
        run: npm run generate

      - name: Validate content
        run: npm run validate

      - name: Test
        run: npm run test

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: site/build

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Run local full check**

Run:

```bash
npm run check
```

Expected: all local checks pass before relying on GitHub Actions.

- [ ] **Step 3: Keep the first deployment on the repository GitHub Pages URL**

Do not configure a custom domain in this foundation task. The site should first deploy as a normal project page using the repository-derived `baseUrl`. Add a separate deployment task after the real personal-domain URL is known.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/pages.yml
git commit -m "ci: deploy curriculum site to GitHub Pages"
```

---

### Task 8: Final Verification And Handoff

**Files:**
- Modify only if previous tasks exposed issues.

- [ ] **Step 1: Run final checks**

Run:

```bash
npm run check
git status --short
```

Expected:

```text
Content validation passed
```

Vitest passes, Docusaurus build succeeds, and `git status --short` is empty after commits.

- [ ] **Step 2: Smoke test local site**

Run:

```bash
npm run serve
```

Expected: Docusaurus serves the built site locally. Open the printed local URL and verify:

- Homepage loads.
- AI engineering intro loads.
- LLM foundations lesson loads.
- Teacher guide loads.
- Python and JavaScript labs load.

- [ ] **Step 3: Record remaining follow-up plans**

Create issues or future plan documents for:

- Agent runtime prototype.
- Adaptive learner state.
- External media storage.
- CMS authoring.
- Design polish pass.

- [ ] **Step 4: Commit any final documentation updates**

```bash
git add docs openspec
git commit -m "docs: record curriculum platform implementation follow-ups"
```

## Plan Self-review

- Spec coverage: This plan covers static site, structured content, multimodal asset metadata, generated artifacts, validation, and GitHub Pages deployment. It intentionally defers live Agent and adaptive runtime work to later plans.
- Completeness scan: No forbidden marker text or unfinished implementation steps remain.
- Type consistency: `CourseSchema`, `UnitSchema`, `AssetSchema`, generator outputs, and validation scripts use consistent names across tasks.
