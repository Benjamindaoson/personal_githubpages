# Product UX Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the AI curriculum site from a document shell into a navigable learning product with a homepage, roadmap, task bank, and reusable lesson template.

**Architecture:** Keep Docusaurus as the static publishing layer. Put product-facing roadmap/task data in a typed source module, extend unit YAML metadata for template-driven course pages, then render shared React components from that structured data.

**Tech Stack:** Docusaurus 3, React/MDX, TypeScript, Zod, Vitest, GitHub Pages.

---

### Task 1: Product UX Contract Tests

**Files:**
- Create: `tests/product-ux.test.ts`
- Modify: `tests/schemas.test.ts`

- [x] **Step 1: Write failing product UX data tests**

```ts
import { describe, expect, it } from "vitest";
import { learningPaths, productStats, taskBank } from "../site/src/data/productUx";

describe("product UX data", () => {
  it("defines a complete AI engineering learning path", () => {
    expect(learningPaths.map((path) => path.id)).toEqual(["llm", "rag", "agent"]);
    for (const path of learningPaths) {
      expect(path.title).toBeTruthy();
      expect(path.outcome).toBeTruthy();
      expect(path.units.length).toBeGreaterThanOrEqual(1);
      expect(path.href).toMatch(/^\/courses\/ai-engineering\//);
    }
  });

  it("defines a reusable task bank across labs, projects, and assessments", () => {
    expect(taskBank.length).toBeGreaterThanOrEqual(6);
    expect(new Set(taskBank.map((task) => task.type))).toEqual(
      new Set(["lab", "project", "assessment", "teaching"])
    );
  });

  it("surfaces product stats for the homepage", () => {
    expect(productStats.every((stat) => stat.label && stat.value)).toBe(true);
  });
});
```

Run: `npm run test -- tests/product-ux.test.ts`
Expected: FAIL because `site/src/data/productUx` does not exist.

- [x] **Step 2: Write failing unit template metadata test**

Add this case to `tests/schemas.test.ts`:

```ts
it("accepts unit product template metadata", () => {
  const parsed = UnitSchema.parse({
    id: "llm-foundations",
    title: "Large Model Foundations",
    module: "01-llm-foundations",
    audience: ["developer-student", "teacher"],
    level: "beginner",
    status: "ready",
    estimated_time: "3-4 hours",
    updated: "2026-06-22",
    product: {
      stage: "foundation",
      formats: ["lesson", "python-lab", "js-lab", "project", "teacher-guide"],
      primary_cta: "/courses/ai-engineering/modules/llm-foundations/lesson",
      secondary_cta: "/tasks"
    },
    prerequisites: ["Python basics"],
    learning_objectives: ["Explain context windows"],
    assets: [],
    agent_use: { retrievable: true, chunk_strategy: "concept" }
  });

  expect(parsed.product.formats).toContain("python-lab");
});
```

Run: `npm run test -- tests/schemas.test.ts`
Expected: FAIL because the metadata fields are not in `UnitSchema`.

### Task 2: Metadata and Data Implementation

**Files:**
- Create: `site/src/data/productUx.ts`
- Modify: `schemas/curriculum.ts`
- Modify: `curriculum/ai-engineering/modules/*/unit.yaml`

- [x] **Step 1: Extend `UnitSchema`**

Add optional-to-required product-facing fields:

```ts
status: z.enum(["draft", "ready", "updating"]),
estimated_time: z.string().min(1),
updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
product: z.object({
  stage: z.enum(["foundation", "builder", "capstone"]),
  formats: z.array(z.enum(["lesson", "python-lab", "js-lab", "project", "teacher-guide", "quiz", "rubric", "visual"])).min(1),
  primary_cta: z.string().min(1),
  secondary_cta: z.string().min(1)
})
```

- [x] **Step 2: Add product metadata to each `unit.yaml`**

Each unit gets `status`, `estimated_time`, `updated`, and `product`. LLM includes lesson, labs, project, and teacher guide; RAG and Agent start with lesson/project-ready metadata.

- [x] **Step 3: Add `site/src/data/productUx.ts`**

Export `learningPaths`, `taskBank`, `productStats`, and `lessonFormats` with TypeScript literal types. Link every entry to an existing route or planned first-class page.

- [x] **Step 4: Run tests**

Run: `npm run test -- tests/product-ux.test.ts tests/schemas.test.ts`
Expected: PASS.

### Task 3: Product Pages and Shared Components

**Files:**
- Create: `site/src/components/LearningProduct.tsx`
- Create: `site/src/pages/roadmap.tsx`
- Create: `site/src/pages/tasks.tsx`
- Modify: `site/src/pages/index.tsx`
- Modify: `site/src/css/custom.css`

- [x] **Step 1: Build shared components**

Create `ProductStatGrid`, `LearningPathGrid`, `TaskBankPreview`, `FormatRail`, and `ProductSection`.

- [x] **Step 2: Replace homepage**

Render a product homepage with immediate links to `/roadmap`, `/tasks`, `/courses/ai-engineering/intro`, and `/admin`.

- [x] **Step 3: Add roadmap page**

Render the three learning paths with outcomes, unit links, required assets, and next actions.

- [x] **Step 4: Add task bank page**

Render task filters as sections for labs, projects, assessments, and teaching reuse.

- [x] **Step 5: Build CSS**

Add responsive grids, readable hero treatment, route/task cards, badges, dense metadata rows, and mobile-safe typography.

### Task 4: Navigation and Verification

**Files:**
- Modify: `site/docusaurus.config.ts`
- Modify: `site/sidebars.ts`
- Modify: `curriculum/ai-engineering/intro.md`

- [x] **Step 1: Upgrade navigation**

Add navbar links for 首页, 路线图, 任务库, 课程, 上传后台.

- [x] **Step 2: Add docs sidebar product entries**

Expose roadmap/task bank through doc links or prominent intro links.

- [x] **Step 3: Run full checks**

Run: `npm run check`
Expected: validation, tests, and Docusaurus build pass.

- [x] **Step 4: Browser smoke check**

Serve the built site and verify `/`, `/roadmap`, `/tasks`, and `/courses/ai-engineering/intro` render without console/build errors.
