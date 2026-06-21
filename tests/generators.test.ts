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
