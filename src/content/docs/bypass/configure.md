---
title: Route configuration (legacy URL)
description: Where to find the current route rules, lists and test tools.
---

This URL is kept for existing bookmarks. The Web UI now manages routing through separate resources instead of a single bypass file.

- [Routing rules](/documents/features/routing/) explains default modes, match expressions, priority, save and apply.
- [Rule lists and registries](/documents/features/lists/) covers local/remote matching data and Kitte catalogs.
- [DNS and resolvers](/documents/features/dns/) covers resolver roles and FakeIP.
- [Current route contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/route/types.go) describes the current API.

**Do not reuse** the old free-form bypass examples as current API configuration. Test the rule using **Routing → Test route** before relying on it.
