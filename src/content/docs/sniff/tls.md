---
title: TLS traffic inspection
description: TLS metadata and routing limitations.
---

Some TLS connections expose limited unencrypted handshake metadata, such as a server name in compatible handshakes. Encryption, ECH, application behavior and future protocol changes can make that information unavailable.

Yuhaiin's routing can match a hostname **when the backend knows it**. Do not assume that every encrypted connection reveals a hostname. A destination reached by raw IP may need a separate IP-based rule.

See [Routing rules](/documents/features/routing/), [DNS and FakeIP](/documents/features/dns/) and the [Troubleshooting guide](/documents/guides/troubleshooting/). Do not disable certificate verification to make a routing rule work.
