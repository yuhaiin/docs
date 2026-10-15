# Yuhaiin documentation

English documentation for the [Yuhaiin](https://github.com/yuhaiin/yuhaiin) backend, its [React Web UI](https://github.com/yuhaiin/yuhaiin-react), and common desktop/Android workflows.

Published at **https://yuhaiin.github.io/documents/**.

## Why Astro + Starlight?

This is a documentation-focused static website. Starlight provides accessible navigation, page headings, content search and Markdown/MDX rendering without maintaining a second React application. Styling lives in `src/styles/yuhaiin.css` and follows the visual direction of the Yuhaiin Web UI.

## Local development

Use Node.js **24** and npm:

```sh
npm install
npm run dev
npm run build
```

The site is built for a `/documents/` base path. Source pages live under `src/content/docs/`. Avoid copying old backend config examples: confirm fields against `pkg/contract/` in the current Go repository and navigation against `src/docs/nav/navigation.ts` in the frontend.

## Writing and reviewing

- Write plain, precise **English** for the intended audience. Explain unfamiliar terms when introduced.
- Prefer one task per guide: prerequisites, numbered actions, expected result, and what to check if it fails.
- Verify menu names against the actual Web UI and technical fields against backend contracts.
- Do not turn inferred support into guarantees; identify platform and protocol limitations.
- Prefer meaningful links to canonical source code over copying potentially unstable configuration fields.
- Never publish live credentials or unredacted private addresses.
- Preserve page URLs when revising existing topics.
- Link to the related user-facing troubleshooting guide when a configuration change may interrupt connectivity.

## Deployment

GitHub Actions builds static files and publishes `dist` into `yuhaiin/yuhaiin.github.io` under `documents/`. Do not switch the base path without updating the deploy destination and backend's Documents link.
