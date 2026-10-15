---
title: Contributing to the documentation
description: Keep English guidance verifiable and current with the code.
---

Documentation changes should begin with the user action they enable. Prefer a complete, reproducible guide over a feature list.

## Sources of truth

- [Backend node contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go): outgoing nodes, fields and chain steps.
- [Backend inbound contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go): listener networks, transports and protocols.
- [Backend route contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/route/types.go): matching rules and apply status.
- [Frontend navigation](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/docs/nav/navigation.ts): user-facing pages and paths.
- Frontend UI code for labels, preset defaults, required form fields and actions.

## Writing checklist

Every hands-on guide should state the intended reader, prerequisites, a small set of numbered actions, an expected observable result and recovery steps. Introduce jargon when first used, and explain which UI menu contains a setting. Do not claim that a backend feature is automatically available on Android.

Avoid absolute claims about security, UDP performance or compatibility based on a single mock test. Explain unsupported features near the setup instructions.

Use plain English and evidence-based statements rather than marketing language or filler. The [technical-writing reference](https://github.com/luoling8192/technical-writing/blob/main/SKILL.md) emphasizes evidence-first explanation; its original scope is internal writing, so adapt those principles for public help documentation.

## Verify changes

```sh
npm ci
npm run check:links
npm run build
```

The site uses Astro + Starlight with a `/documents/` base. A static build and link check should pass before merging. For changed workflows, also manually confirm page names and screenshots against the current Web UI.

Keep old page routes as short migration guides or redirects when moving topics so old GitHub issue and wiki links do not break.
