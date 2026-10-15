---
title: Inbounds and traffic entry
description: Pick a local, LAN or TUN entry and understand advanced inbounds.
---

An inbound accepts traffic before Yuhaiin applies routing decisions. Open **Traffic entry → Inbounds** to manage them.

## Simple presets

| Preset | Default behavior | Use it for |
| --- | --- | --- |
| **Local** | Mixed HTTP/SOCKS proxy on `127.0.0.1:9002` | One computer; safe first step |
| **LAN** | Mixed HTTP/SOCKS proxy on `0.0.0.0:9002` | Other trusted devices; restrict access |
| **TUN** | Virtual interface and IP routes | Apps that do not support proxy settings |

The preset is editable: read the actual address and port after saving, rather than assuming your system has the default.

## Advanced inbound model

The backend represents an inbound with four main parts:

- `network`: socket or transport listener, such as `tcp_udp`, `quic` or `empty`.
- `transports`: zero or more optional layers, such as TLS, Reality, WebSocket or HTTP/2.
- `protocol`: the application protocol, such as `mixed`, `http`, `socks5`, `yuubinsya`, `hysteria2`, `tun`, `redir` or `tproxy`.
- `enabled`: whether it should run.

These are separate components, so a protocol may have network and transport requirements. For example, a TUN inbound uses `network.type: "empty"`.

**Do not expose an unauthenticated inbound to the public internet.** Review [Security](/documents/guides/security/) and the [configuration model](/documents/reference/configuration/).
