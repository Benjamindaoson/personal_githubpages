import fs from "node:fs";
import yaml from "js-yaml";

export function readYamlFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf8");
  return yaml.load(raw) as T;
}
