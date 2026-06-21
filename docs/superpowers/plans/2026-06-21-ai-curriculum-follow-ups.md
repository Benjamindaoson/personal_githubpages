# AI Curriculum Platform Follow-up Plans

Date: 2026-06-21

The foundation implementation deliberately stops at a static site, structured content source, generated machine-readable artifacts, validation, tests, and GitHub Pages deployment. The next work should be split into separate plans.

## 1. Agent Runtime Prototype

Build a read-only Tutor Agent and Teacher Copilot that consume `generated/rag-chunks.jsonl`, `generated/course-manifest.json`, `generated/asset-index.json`, and `generated/learning-graph.json` through explicit tools.

Success criteria:

- The Tutor Agent answers with source citations.
- The Teacher Copilot can generate a lesson plan from a unit ID.
- Agent tools do not scan arbitrary repository folders.

## 2. Adaptive Learner State

Design learner profiles, progress events, diagnostic results, and recommendation logic that can consume `learning-graph.json` and `assessment-bank.json`.

Success criteria:

- A learner can have current level, completed units, weak objectives, and recommended next unit.
- Recommendations are explainable through prerequisites and assessment results.

## 3. External Media Storage

Define where large videos, audio, slide exports, and downloadable datasets should live outside the Git repository.

Success criteria:

- `asset-index.json` supports external URLs and local assets.
- Validation distinguishes local required files from external media references.
- Large media does not bloat Git history.

## 4. CMS Authoring

Evaluate whether a CMS should become an authoring layer after the content contracts stabilize.

Success criteria:

- CMS output can still produce the same YAML, MDX, and generated JSON contracts.
- Git remains the source of versioned release truth.

## 5. Design Polish Pass

Upgrade the visual design from a clean Docusaurus baseline to a distinctive AI curriculum product interface.

Success criteria:

- Homepage, lesson pages, teacher guides, labs, and asset library have a consistent design system.
- Mobile and desktop layouts are screenshot-tested.
- Components remain usable inside MDX.

