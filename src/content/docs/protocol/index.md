---
title: Protocol reference
description: Supported outbound, inbound and transport layer overview.
---

The tables below describe the protocols currently named in the Go backend's typed contracts. This section is for people configuring custom nodes and listeners. For everyday setup, use [Your first connection](/documents/guides/first-connection/) instead.

## Outbound building blocks

An outbound node has an ordered `chain`. Frequent steps are `simple` (connect to server), `tls` (encrypt and authenticate transport), `websocket` (WebSocket framing), `socks5`, `http`, `shadowsocks`, `trojan`, `vmess`, `vless` and `yuubinsya`. The frontend provides templates for some combinations.

Other named variants include `reality`, `http2`, `quic`, `aead`, `mux`, `set`, `tailscale`, `wireguard`, `amneziawg` and dedicated VPN outbounds. A named variant does not necessarily support both TCP and UDP, or provide a server implementation.

See [VPN protocol support](/documents/reference/vpn-protocols/) for native VPN types.

## Inbounds

The inbound protocol contract currently includes `http`, `socks5`, `socks4a`, `mixed`, `yuubinsya`, `hysteria2`, `tun`, `redir`, `tproxy`, reverse TCP/HTTP and krunlet. A protocol may need a particular listen network or transport.

## Transport layers

The inbound transport contract includes `normal`, `tls`, `tls_auto`, `websocket`, `http2`, `mux`, `reality`, `aead`, `http_mock` and `proxy`. These are not all interchangeable.

## Source of truth

[Node protocol types](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) · [Inbound network, protocol and transport types](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go).

Older pages used a `protocols` array and sometimes combined inbound `tcpudp` and `socks5` at the top level. Those formats are obsolete. Modern outbound nodes use `chain`, and modern inbounds use `network`, `transports` and `protocol`.
