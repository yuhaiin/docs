---
title: Build from source
description: Source builds for backend, React frontend and docs.
---

Most users should [download a release](/documents/guides/install/). Building is intended for developers or people who need to inspect or customize the code.

The backend is Go; its current module declares **Go 1.27.1**. The separately developed Web UI is built with React, TypeScript and Vite and is embedded in normal backend distributions.

## Build the backend

```sh frame="none"
git clone https://github.com/yuhaiin/yuhaiin.git
cd yuhaiin
go version
make yuhaiin
```

The Makefile's `yuhaiin` target builds the desktop command, using generated tags and release metadata. Building platform-specific artifacts may require C compilers, platform SDKs and cross-toolchain installation. See the [backend CI build documentation](https://github.com/yuhaiin/yuhaiin/blob/main/docs/ci-builds.md) for current targets and constraints.

For the frontend source:

```sh frame="none"
git clone https://github.com/yuhaiin/yuhaiin-react.git
cd yuhaiin-react
npm install
npm run build
```

For development, `npm run dev` starts the Vite server, but this does not replace a running backend.

## Build the documentation site

This separate repository uses Astro + Starlight:

```sh frame="none"
git clone https://github.com/yuhaiin/docs.git
cd docs
npm install
npm run dev
npm run build
```

The published site lives at `/documents/`. Do not use old release commands targeting only `amd64v3` unless that CPU target is deliberate.
