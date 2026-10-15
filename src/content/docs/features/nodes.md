---
title: Nodes, selectors and subscriptions
description: Manage outbound nodes and subscriptions using the current Web UI.
---

A **node** defines how Yuhaiin makes an outgoing connection. The frontend's **Destinations → Nodes** page manages them; **Selectors** are named choices shared by routing rules; **Subscriptions** periodically or manually import provider-supplied nodes.

## Add a manual node

1. Open **Destinations → Nodes**.
2. Add a node. Choose a **Direct**, **HTTP**, **SOCKS5**, **Shadowsocks** or **Trojan** template for a simple start.
3. Enter the server address and port exactly as provided by its operator, along with required authentication.
4. Save and select it as the default on the Home setup card, or reference it in a routing rule.
5. Use TCP Ping / IP Check or the [network diagnostics](/documents/features/diagnostics/) page when appropriate.

Many node types use a **chain**: for example, `simple` (server socket) → `tls` (encryption) → `trojan` (protocol). Layer order matters. See [Protocol reference](/documents/protocol/).

## Selectors

Open **Destinations → Selectors** to create a reusable name for a chosen node. Refer to the selector from several rules, and change the selected node in one place. A selector is not itself another network protocol.

## Subscriptions

1. Open **Destinations → Subscriptions**.
2. Add a name and a URL issued by your provider.
3. Choose **Auto-detect** first, unless you know the subscription format.
4. Save, then select **Update** to import/refresh nodes.

The frontend also exposes explicit Shadowsocks, ShadowsocksR, VMess and Trojan subscription types. A subscription URL often contains a reusable access token: keep it secret. Only import from trusted sources.

## Advanced VPN outbounds

The backend also includes WireGuard, AmneziaWG, Hysteria 2, OpenVPN, GlobalProtect, IKEv2, AnyConnect, SSTP, Fortinet, SoftEther and L2TP variants. Support is implementation-specific; for example GlobalProtect does not support SAML/SSO or portal discovery, and OpenVPN does not import `.ovpn` files from the node editor. See [VPN protocols](/documents/reference/vpn-protocols/).

## Publish profiles and manage active sessions

**Destinations → Publish** lets you share selected nodes through a published subscription configuration. Because profiles can contain credentials, read [Publishing and security](/documents/features/publishing/) before exposing it.

**Destinations → Active nodes** lists currently running outbound sessions, not all saved profiles. You can terminate a stuck instance without deleting its configuration. See [Active outbound nodes](/documents/features/active-nodes/).

For initial setup from a subscription URL, follow [Import a provider subscription](/documents/guides/subscription/).

## From a saved node to real traffic

A saved node has no effect until something **selects it**. Two common selection paths are:

1. The default TCP/UDP selection from the Home setup area, used only when the effective routing decision targets that selection.
2. A routing rule whose target refers directly to a node or to a selector.

If a remote node appears in the list but all websites still use your direct IP address, check **Routing → Route rules → Unmatched traffic** before repeatedly changing credentials. A default routing mode of **Direct** will not send unmatched traffic to the proxy merely because you selected it on Home.

### A safe verification sequence

1. Add the node using the correct protocol template and required credentials.
2. Keep a known-working **Direct** destination available as a fallback.
3. Select the intended TCP node, then verify the default routing mode is **Proxy** and the target is correct.
4. Send a request through your existing **Mixed** inbound. On a clean backend the listener is normally `127.0.0.1:1080`; always confirm its current address.
5. Check **Monitoring → Connections** and the resulting outbound/route. Compare a Direct run with the remote proxy run.
6. If the request fails, check **Failed history** and the node's latency or IP checks. Do not interpret a low latency number as a successful authenticated application connection.

## Advanced: why protocol chains are ordered

Outbound nodes use a typed, ordered `chain`. Each step changes the connection available to later steps. A typical authenticated TLS proxy might involve an endpoint connection, then TLS, then the proxy protocol. Reordering the steps can produce a TLS handshake failure, a protocol parse error or a connection to the wrong address.

Unlike an inbound Mixed listener, a node's outbound HTTP/SOCKS credentials use the field `user`, **not** `username`, in the current [Go node contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go). Inbound authentication fields are defined in a different [inbound contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go).

For complex transports, compare the editor's [templates](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/docs/node/templates.ts) with the backend contract and [protocol reference](/documents/protocol/). The saved chain defines the configuration; the runtime still needs a reachable endpoint, compatible server and valid credentials.

## Saved nodes, selected nodes and active nodes

These are three different views:

| View | Meaning |
| --- | --- |
| **Nodes** | Profiles stored in the configuration, including currently unused ones |
| **Selected TCP/UDP nodes** | Default selections used when routing refers to them |
| **Active nodes** | Runtime outbound instances held open for current or recent traffic |

The frontend [node API](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/nodes.ts) reflects this with `listNodes()`, `selectedNodes()` and `activeNodes()`. Terminating an active node closes a runtime instance but does not remove its saved configuration or default selection.
