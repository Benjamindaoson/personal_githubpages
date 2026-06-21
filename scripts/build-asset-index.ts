import fs from "node:fs";
import path from "node:path";
import { AssetsFileSchema } from "../schemas/curriculum";
import { curriculumRoot, generatedRoot } from "./lib/paths";
import { readYamlFile } from "./lib/read-yaml";

const modulesRoot = path.join(curriculumRoot, "modules");
const assets = fs
  .readdirSync(modulesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((entry) => {
    const assetsPath = path.join(modulesRoot, entry.name, "assets.yaml");
    if (!fs.existsSync(assetsPath)) return [];
    return AssetsFileSchema.parse(readYamlFile(assetsPath)).assets.map((asset) => ({
      ...asset,
      module: entry.name
    }));
  });

fs.mkdirSync(generatedRoot, { recursive: true });
fs.writeFileSync(path.join(generatedRoot, "asset-index.json"), JSON.stringify({ assets }, null, 2));
