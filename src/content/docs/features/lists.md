---
title: Rule lists and registries
description: Manage matching lists, external registries and GeoIP datasets.
---

**Rule lists** hold matching data shared by route rules. **Registries** are optional catalogs from which you can discover third-party matching datasets.

## Create or reuse a list

Open **Routing → Rule lists**. Create a list locally or add a remote source. Supported list types and input formats are shown in the editor. Reuse the same list in more than one rule instead of copying hundreds of domains.

Keep remote lists under review: an upstream change can change which sites your rules match. Inspect refresh errors and the preview/count in the UI.

## Browse a registry

The **Registry Catalog** allows searching, filtering by registry, category and kind, paging results and adding available datasets. It includes a built-in registry for [Yuhaiin Kitte](https://github.com/yuhaiin/kitte) and supports additional registries.

You may also choose a compatible **GeoIP database** from catalog entries. That database is separate from ordinary hostname lists.

## Verify matches

After saving, check whether changes have been applied, then use **Routing → Test route**. If a desired domain is not affected, check the dataset content and the rule's match conditions before editing your DNS settings.

A third-party registry is not an extension execution environment: it supplies data. Treat remote data and download URLs as untrusted until you verify the publisher.

## A domain list is not the same thing as a DNS resolver

Lists are **routing match data**. DNS resolvers answer address queries. A remote hostname list may alter which outbound is chosen, but it does not on its own change the upstream DNS server or install a firewall rule.

To verify a list-based routing rule:

1. Confirm the dataset exists, its category/type matches the rule expression and the most recent refresh is not reporting an error.
2. Check the list preview or item count.
3. Save the rule that references that list and **Apply** the routing change.
4. Open **Routing → Test route** and try a hostname you know the list contains, followed by one that it does not.
5. Make a real request through a working inbound and inspect Monitoring. A rule using a **process** list may need runtime process metadata not present in a hostname-only test.

## Advanced: registry, download and activation are separate stages

The [route contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/route/types.go) defines registry catalogs and file metadata independently from concrete route lists. Discovering a file in the catalog is not equivalent to saving a list, refreshing its content or applying a route rule. Each stage can fail separately.

A registry file can describe `category`, `kind`, `usage`, `format`, `url`, `sha256` and whether it is `selectable`. Remote list sources and registries should be trusted according to their **publisher**, not merely because a manifest is parseable. The [frontend route API](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/route.ts) distinguishes catalog retrieval, registry updates, list refresh, and routing Apply.

Avoid applying large, unfamiliar third-party datasets directly to a live installation. First test the matching behavior on a small, controlled rule with a known default.
