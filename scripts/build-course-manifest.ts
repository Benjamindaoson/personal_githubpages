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
