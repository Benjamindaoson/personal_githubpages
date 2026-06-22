import fs from "node:fs";
import path from "node:path";
import { AssetsFileSchema, CourseSchema, UnitSchema } from "../schemas/curriculum";
import { curriculumRoot, repoRoot } from "./lib/paths";
import { readYamlFile } from "./lib/read-yaml";

const errors: string[] = [];

function requireFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing required file: ${path.relative(repoRoot, filePath)}`);
  }
}

function isExternalSource(source: string) {
  return /^https?:\/\//.test(source);
}

const coursePath = path.join(curriculumRoot, "course.yaml");
requireFile(coursePath);
if (fs.existsSync(coursePath)) {
  const parsed = CourseSchema.safeParse(readYamlFile(coursePath));
  if (!parsed.success) errors.push(`Invalid course.yaml: ${parsed.error.message}`);
}

const modulesRoot = path.join(curriculumRoot, "modules");
requireFile(modulesRoot);

if (fs.existsSync(modulesRoot)) {
  for (const moduleEntry of fs.readdirSync(modulesRoot, { withFileTypes: true })) {
    if (!moduleEntry.isDirectory()) continue;

    const modulePath = path.join(modulesRoot, moduleEntry.name);
    const unitPath = path.join(modulePath, "unit.yaml");
    requireFile(unitPath);
    requireFile(path.join(modulePath, "lesson.mdx"));

    if (fs.existsSync(unitPath)) {
      const parsed = UnitSchema.safeParse(readYamlFile(unitPath));
      if (!parsed.success) errors.push(`Invalid unit.yaml in ${moduleEntry.name}: ${parsed.error.message}`);
    }

    const assetsPath = path.join(modulePath, "assets.yaml");
    if (fs.existsSync(assetsPath)) {
      const parsedAssets = AssetsFileSchema.safeParse(readYamlFile(assetsPath));
      if (!parsedAssets.success) {
        errors.push(`Invalid assets.yaml in ${moduleEntry.name}: ${parsedAssets.error.message}`);
      } else {
        for (const asset of parsedAssets.data.assets) {
          if (!isExternalSource(asset.source)) {
            requireFile(path.join(repoRoot, asset.source));
          }
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Content validation passed");
