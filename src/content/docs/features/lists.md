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
