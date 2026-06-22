import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
export const repoRoot = path.resolve(path.dirname(currentFile), "../..");
export const curriculumRoot = path.join(repoRoot, "curriculum", "ai-engineering");
export const generatedRoot = path.join(repoRoot, "generated");
