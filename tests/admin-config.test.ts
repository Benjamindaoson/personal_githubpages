import { describe, expect, it } from "vitest";
import { buildAdminConfig } from "../scripts/lib/admin-config";

describe("admin config generator", () => {
  it("builds a Decap CMS config for GitHub Pages content intake", () => {
    const config = buildAdminConfig({
      branch: "main",
      projectName: "aidigitaltextbook",
      repository: "owner/aidigitaltextbook"
    });

    expect(config).toContain("name: github");
    expect(config).toContain("repo: owner/aidigitaltextbook");
    expect(config).toContain("branch: main");
    expect(config).toContain("media_folder: site/static/uploads");
    expect(config).toContain("public_folder: /aidigitaltextbook/uploads");
    expect(config).toContain("name: inbox_notes");
    expect(config).toContain("folder: content-inbox/notes");
  });

  it("includes optional GitHub OAuth settings when provided", () => {
    const config = buildAdminConfig({
      authEndpoint: "auth",
      baseUrl: "https://cms-auth.example.com",
      branch: "main",
      projectName: "aidigitaltextbook",
      repository: "owner/aidigitaltextbook"
    });

    expect(config).toContain("base_url: https://cms-auth.example.com");
    expect(config).toContain("auth_endpoint: auth");
  });
});
