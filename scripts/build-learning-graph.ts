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
