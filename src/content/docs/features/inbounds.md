---
title: Inbounds and traffic entry
description: Pick a local, LAN or TUN entry and understand advanced inbounds.
---

An inbound accepts traffic before Yuhaiin applies routing decisions. Open **Traffic entry → Inbounds** to manage them.

## Simple presets

| Source | Initial address | Meaning |
| --- | --- | --- |
| **Backend first-run `mixed` inbound** | **`127.0.0.1:1080`**, enabled | The listener already present on a clean installation |
| **React New → Local preset** | `127.0.0.1:9002` | An **additional** Mixed listener you explicitly create |
| **React New → LAN preset** | `0.0.0.0:9002` | An additional Mixed listener exposed to the local network |
| **React New → TUN preset** | No HTTP/SOCKS listen port | Virtual interface and IP routes |

Do **not** create a second inbound just to follow a guide when the first-run `mixed` listener already works. The backend and React preset have different initial values by design in the current source; the saved inbound and its runtime state determine what actually listens.

The preset is editable: read the actual address and port after saving, rather than assuming your system has the default.

## Advanced inbound model

The backend represents an inbound with four main parts:

- `network`: socket or transport listener, such as `tcp_udp`, `quic` or `empty`.
- `transports`: zero or more optional layers, such as TLS, Reality, WebSocket or HTTP/2.
- `protocol`: the application protocol, such as `mixed`, `http`, `socks5`, `yuubinsya`, `hysteria2`, `tun`, `redir` or `tproxy`.
- `enabled`: whether it should run.

These are separate components, so a protocol may have network and transport requirements. For example, a TUN inbound uses `network.type: "empty"`.

**Do not expose an unauthenticated inbound to the public internet.** Review [Security](/documents/guides/security/) and the [configuration model](/documents/reference/configuration/).

## What does “enabled” actually mean?

`enabled: true` records the **desired state** of an inbound. It does not guarantee that the socket successfully bound. A conflicting port, missing permissions or invalid transport configuration can leave an enabled inbound unavailable. Check the listener's **runtime status** and error/event details, then retry only after correcting the cause.

The React client separates the saved model from runtime inspection: [`listInbounds()`](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/inbounds.ts) retrieves configuration, while `listInboundStatuses()`, `listInboundEvents(id)` and `retryInbound(id)` inspect or retry a running listener. The backend persists typed inbounds in the `inbounds_v2` table, and loads them during startup.

## Advanced: network, transport and protocol

The [`Inbound` contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go) separates `network` (where packets arrive), `transports` (optional wire framing), and `protocol` (how a client request is interpreted). For Mixed over TCP/UDP, `network.type` is `tcp_udp`, `network.tcp_udp.host` is the bind address, and `protocol.type` is `mixed`.

Binding to `127.0.0.1` confines access to the local host. Binding to `0.0.0.0` accepts connections on all IPv4 interfaces; without authentication and firewall restrictions, this can become an open proxy. See [Local vs LAN](/documents/guides/local-proxy/) and [Advanced inbounds](/documents/reference/advanced-inbounds/).
