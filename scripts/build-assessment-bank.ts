import fs from "node:fs";
import path from "node:path";
import { curriculumRoot, generatedRoot } from "./lib/paths";
import { readYamlFile } from "./lib/read-yaml";

const modulesRoot = path.join(curriculumRoot, "modules");
const assessments: Array<Record<string, unknown>> = [];

for (const moduleEntry of fs.readdirSync(modulesRoot, { withFileTypes: true })) {
  if (!moduleEntry.isDirectory()) continue;
  const modulePath = path.join(modulesRoot, moduleEntry.name);
  for (const fileName of ["quiz.yaml", "rubric.yaml"]) {
    const filePath = path.join(modulePath, fileName);
    if (!fs.existsSync(filePath)) continue;
    assessments.push({
      module: moduleEntry.name,
      type: fileName.replace(".yaml", ""),
      content: readYamlFile(filePath)
    });
  }
}

fs.mkdirSync(generatedRoot, { recursive: true });
fs.writeFileSync(path.join(generatedRoot, "assessment-bank.json"), JSON.stringify({ assessments }, null, 2));
