---
title: Import a provider subscription
description: From subscription URL to a selected and verified outgoing node.
---

A subscription is a URL that a proxy provider gives you to distribute server profiles. It is not the same as the address of one proxy server.

## Import

1. Obtain a subscription URL from a provider you trust. It often includes a secret access token.
2. Open **Destinations → Subscriptions**, then create an entry with a name and paste the URL.
3. Leave the type set to **Auto-detect** unless the provider states a specific format. The current Web UI also offers explicit VMess, Trojan, Shadowsocks and ShadowsocksR formats.
4. Save and select **Update** to fetch the subscription.
5. Return to **Destinations → Nodes**. Locate imported nodes and select one for your default TCP/UDP destination.

Adding a subscription entry is not proof that it downloaded usable nodes. Check the node list and any update error before continuing.

## Choose a working node

Try a TCP Ping or IP Check action where supported. A fast Ping result is useful, but it does not prove that web browsing will work. Make sure an **inbound** is enabled; then send one browser request through it and check **Monitoring → Connections**.

If the imported profiles use TLS or REALITY, avoid changing server name, public key or authentication fields without provider instructions.

## When renewal fails

A subscription request may fail because the URL expired, the provider requires authentication, the format is unsupported, or network access is blocked. Compare the error with the subscription provider's instructions.

A failed refresh does not necessarily mean previously imported nodes are unusable. Do not delete all existing nodes before you know how to restore them.

## Credentials and updates

Treat subscription URLs as passwords. Never share an unredacted URL or put it in a public issue. If you suspect it leaked, request a new URL from your provider.

See [Nodes and selectors](/documents/features/nodes/) and [Local proxy](/documents/guides/local-proxy/) for the next steps.
