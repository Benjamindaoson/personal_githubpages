# Content Studio Inbox

## Why

The project needs a low-friction browser-based way to upload notes and media without bypassing the structured curriculum pipeline.

## What Changes

- Add a Decap CMS admin entry at `/admin`.
- Generate Decap CMS config from repository environment values.
- Add `content-inbox/notes` as the first intake collection.
- Add `site/static/uploads` as the first media upload target so GitHub Pages can serve uploaded assets.

## Out Of Scope

- Full custom content studio.
- AI-powered promotion from drafts to curriculum units.
- GitHub OAuth app setup automation.
- Live MCP server implementation.
