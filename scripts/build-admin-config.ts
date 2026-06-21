import fs from "node:fs";
import path from "node:path";
import { buildAdminConfig } from "./lib/admin-config";
import { repoRoot } from "./lib/paths";

const repository = process.env.ADMIN_REPOSITORY ?? process.env.GITHUB_REPOSITORY ?? "local/aidigitaltextbook";
const branch = process.env.ADMIN_BRANCH ?? process.env.GITHUB_REF_NAME ?? "master";
const projectName = process.env.ADMIN_PROJECT_NAME ?? repository.split("/")[1] ?? "aidigitaltextbook";
const baseUrl = process.env.ADMIN_AUTH_BASE_URL;
const authEndpoint = process.env.ADMIN_AUTH_ENDPOINT;

const adminDir = path.join(repoRoot, "site", "static", "admin");
fs.mkdirSync(adminDir, { recursive: true });
fs.writeFileSync(
  path.join(adminDir, "config.yml"),
  buildAdminConfig({ authEndpoint, baseUrl, branch, projectName, repository })
);
