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

## Troubleshoot import in the right order

A subscription moves through several stages. A failure at one stage does not imply every stage failed:

| Stage | What should happen | If it fails |
| --- | --- | --- |
| **Source** | The URL is reachable with the supplied credentials | Confirm the provider URL and expiry privately |
| **Decode** | Returned text matches a supported subscription format | Select the correct type or inspect import errors |
| **Save** | Imported profiles appear under Nodes | Check for invalid profiles and grouping |
| **Select** | A default TCP/UDP node or selector points to a usable profile | Check Home selections and routing default |
| **Connect** | A request passes through an inbound and the selected node | Use monitoring, failed history and diagnostics |

The UI's **Auto-detect** option corresponds to the value `reserve` in the current [subscription editor](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/docs/group/subscribe/page.tsx). Its explicit alternatives include `trojan`, `vmess`, `shadowsocks` and `shadowsocksr`. It is an import format choice, not the transport used to download the URL.

### After a successful update

Do not stop at the success notification. Inspect the imported node count, pick an actual node, verify its endpoint and credentials, and then make a connection through the existing inbound. Changing a subscription entry does not automatically prove the selected outbound or route is correct.

## Advanced: configuration versus refresh

The [subscription contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/subscription/types.go) stores a link's `name`, `url` and `type`. The frontend uses separate calls to **save subscription links** and to **update subscriptions by name**, as visible in [`src/api/subscriptions.ts`](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/subscriptions.ts).

An update may change imported nodes that other rules or selectors depend on. Before removing an old subscription, inspect which profiles are still referenced. Retain a known-working destination while troubleshooting a provider refresh.

A subscription URL often contains a bearer token, user information or another secret. The editor may show only a sanitized source summary, but copying the raw URL or publishing its full value still exposes access.
