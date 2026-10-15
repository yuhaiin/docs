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
