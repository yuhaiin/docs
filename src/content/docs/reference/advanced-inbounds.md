---
title: Advanced inbound types
description: Networks, transports and protocols for custom Yuhaiin listeners.
---

The current backend [inbound contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go) separates a listener into a **network**, zero or more **transports**, and a **protocol**. They solve different problems.

## Network choices

| Type | Meaning | Typical use |
| --- | --- | --- |
| `tcp_udp` | Bind a TCP/UDP socket with a host and UDP mode | HTTP, SOCKS5, Mixed, Yuubinsya |
| `quic` | QUIC endpoint with TLS details | Hysteria 2 and compatible protocols |
| `empty` | No ordinary TCP/UDP listening socket | TUN and other internally managed sources |

For `tcp_udp`, valid `udp` values include `enabled`, `tcp_only`, `udp_only`, and `disabled`. An inbound protocol cannot always use all network types or modes.

## Protocol choices

The current contract names `http`, `socks5`, `socks4a`, `mixed`, `hysteria2`, `yuubinsya`, `tun`, `tproxy`, `redir`, `reverse_http`, `reverse_tcp`, `krunlet`, and `none`. Some are platform-specific or developer-oriented.

The **Local**, **LAN**, and **TUN** presets are safer than assembling every layer manually. Use a custom inbound only when the remote client and protocol are understood.

## Transport choices

Transport layers include `normal`, `tls`, `tls_auto`, `http2`, `websocket`, `mux`, `reality`, `http_mock`, `aead` and `proxy`. A transport may require certificates, keys, an HTTP path or a compatible remote peer.

A TLS transport does not turn a SOCKS proxy into a generic HTTPS proxy. Both endpoints must agree on transport framing and application protocol.

## Example: local Mixed listener

```json
{
  "id": "local-mixed",
  "name": "Local",
  "enabled": true,
  "network": { "type": "tcp_udp", "tcp_udp": { "host": "127.0.0.1:1080", "udp": "enabled" } },
  "transports": [],
  "protocol": { "type": "mixed", "mixed": { "username": "", "password": "" } }
}
```

The example shows the resource shape; let the Web UI or API choose unique resource IDs when creating an inbound.

## Security

Transparent redirection and TUN may require system routes, firewall rules or elevated permissions. LAN-facing listeners should be firewall-restricted and authenticated when supported. Review [Security](/documents/guides/security/) and [Network recovery](/documents/guides/recover-network/).

## Default, template and runtime are three different things

The JSON above matches the **backend's initial `mixed` listener** (`127.0.0.1:1080`). A newly created **Local** preset in the React UI uses `127.0.0.1:9002`. Neither is a universal port: users can edit and persist the bind address, or fail to bind the requested port.

When debugging startup, trace [`DefaultSetting`](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/legacy/schema/config/default.go) → [`SqliteDB` import/migration](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/legacy/chore/sqlite_db.go) → [`InboundStore`](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/store/inbound.go) → [`ContractStore.Sync()`](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/inbound/contract_store.go). A successful schema validation does not prove a socket was bound; inspect the runtime events and listener status.
