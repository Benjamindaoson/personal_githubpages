import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { UnitSchema } from "../schemas/curriculum";
import { curriculumRoot, generatedRoot } from "./lib/paths";
import { readYamlFile } from "./lib/read-yaml";

const modulesRoot = path.join(curriculumRoot, "modules");
const chunks: Array<Record<string, unknown>> = [];

for (const moduleEntry of fs.readdirSync(modulesRoot, { withFileTypes: true })) {
  if (!moduleEntry.isDirectory()) continue;
  const modulePath = path.join(modulesRoot, moduleEntry.name);
  const unitPath = path.join(modulePath, "unit.yaml");
  const unit = fs.existsSync(unitPath) ? UnitSchema.parse(readYamlFile(unitPath)) : undefined;

  for (const fileName of fs.readdirSync(modulePath)) {
    if (!fileName.endsWith(".md") && !fileName.endsWith(".mdx")) continue;
    const sourcePath = path.join(modulePath, fileName);
    const parsed = matter(fs.readFileSync(sourcePath, "utf8"));
    const text = parsed.content
      .replace(/^import\s+.*$/gm, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!text) continue;

    const sourceId = path.relative(curriculumRoot, sourcePath).replaceAll("\\", "/");
    const id = String(parsed.data.id ?? sourceId.replace(/\.(md|mdx)$/, ""));
    chunks.push({
      chunk_id: `${id}:body`,
      source_id: sourceId,
      unit_id: unit?.id ?? moduleEntry.name,
      audience: unit?.audience ?? ["developer-student", "teacher"],
      difficulty: unit?.level ?? "beginner",
      content_type: fileName.includes("teaching") ? "teaching-guide" : "lesson",
      text,
      citations: [{ label: String(parsed.data.title ?? id), path: `/courses/ai-engineering/${id}` }]
    });
  }
}

fs.mkdirSync(generatedRoot, { recursive: true });
fs.writeFileSync(path.join(generatedRoot, "rag-chunks.jsonl"), chunks.map((chunk) => JSON.stringify(chunk)).join("\n"));
