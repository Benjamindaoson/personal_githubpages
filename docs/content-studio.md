# Content Studio Inbox

The first editing surface is a lightweight Decap CMS admin page at `/admin`.

## Purpose

Use the admin page for intake:

- Upload quick notes.
- Upload images or other small teaching assets.
- Save draft material into `content-inbox/notes`.

Do not treat inbox notes as published curriculum. A note becomes part of the formal curriculum only after it is promoted into `curriculum/ai-engineering/modules/...` with `unit.yaml`, lesson content, assets metadata, and validation.

## GitHub Pages Flow

```text
/admin Decap CMS
-> commits notes and uploaded media to GitHub
-> GitHub Actions runs generate / validate / test / build
-> GitHub Pages publishes the updated static site
```

## Generated Config

The Decap config is generated at build time:

```text
site/static/admin/config.yml
```

Environment variables:

- `ADMIN_REPOSITORY`: overrides the GitHub repository, such as `owner/aidigitaltextbook`.
- `ADMIN_BRANCH`: overrides the target branch.
- `ADMIN_PROJECT_NAME`: overrides the GitHub Pages project name used in public upload paths.
- `ADMIN_AUTH_BASE_URL`: optional Decap CMS GitHub OAuth service base URL.
- `ADMIN_AUTH_ENDPOINT`: optional Decap CMS GitHub OAuth endpoint path.

If these are not set, the generator uses `GITHUB_REPOSITORY`, `GITHUB_REF_NAME`, and the repository name.

For a public GitHub Pages deployment, the Decap GitHub backend needs an OAuth service before browser edits can write back to GitHub. Keep the admin page deployed, then configure the two auth variables once the OAuth service is chosen.

## Upload Paths

Uploaded media goes to:

```text
site/static/uploads
```

Published URLs use:

```text
/<project-name>/uploads
```

For this repository, that is normally:

```text
/aidigitaltextbook/uploads
```
