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

  it("defines a reusable task bank across labs, projects, assessments, and teaching assets", () => {
    expect(taskBank.length).toBeGreaterThanOrEqual(6);
    expect(new Set(taskBank.map((task) => task.type))).toEqual(
      new Set(["lab", "project", "assessment", "teaching"])
    );
  });

  it("surfaces product stats for the homepage", () => {
    expect(productStats.length).toBeGreaterThanOrEqual(3);
    expect(productStats.every((stat) => stat.label && stat.value)).toBe(true);
  });
});
