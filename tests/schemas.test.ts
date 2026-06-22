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
