export type AdminConfigOptions = {
  authEndpoint?: string;
  baseUrl?: string;
  branch: string;
  projectName: string;
  repository: string;
};

export function buildAdminConfig({ authEndpoint, baseUrl, branch, projectName, repository }: AdminConfigOptions) {
  const authConfig = [
    baseUrl ? `  base_url: ${baseUrl}` : undefined,
    authEndpoint ? `  auth_endpoint: ${authEndpoint}` : undefined
  ]
    .filter(Boolean)
    .join("\n");

  return `backend:
  name: github
  repo: ${repository}
  branch: ${branch}
${authConfig ? `${authConfig}\n` : ""}

local_backend: true
publish_mode: editorial_workflow
media_folder: site/static/uploads
public_folder: /${projectName}/uploads

collections:
  - name: inbox_notes
    label: Inbox Notes
    folder: content-inbox/notes
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    extension: md
    format: frontmatter
    fields:
      - { label: Title, name: title, widget: string }
      - { label: Topic, name: topic, widget: string, required: false }
      - { label: Tags, name: tags, widget: list, required: false }
      - { label: Source, name: source, widget: string, required: false }
      - { label: Body, name: body, widget: markdown }
`;
}
