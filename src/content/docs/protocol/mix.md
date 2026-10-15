---
title: "Mixed HTTP/SOCKS listener"
description: "inbound: current Yuhaiin support and configuration."
---

The **Mixed** protocol accepts both HTTP proxy and SOCKS5 clients on a single listening port. On a clean backend installation, the already-enabled `mixed` listener binds `127.0.0.1:1080`. The React editor also offers separate **new Local** and **new LAN** presets with their own initial addresses.

## Where it fits

**Support:** inbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed inbound example

```json
{
  "id": "local-example",
  "name": "Local",
  "enabled": true,
  "network": {
    "type": "tcp_udp",
    "tcp_udp": {
      "host": "127.0.0.1:1080",
      "udp": "enabled"
    }
  },
  "transports": [],
  "protocol": {
    "type": "mixed",
    "mixed": {
      "username": "",
      "password": ""
    }
  }
}
```

This example represents the **backend first-start listener**, not the React editor's new preset. A newly created Local preset starts with `127.0.0.1:9002`, and a new LAN preset with `0.0.0.0:9002`; always use the actual persisted listener address. The Mixed listener is already enabled on a clean backend installation.

## Fields and requirements

1. `network.tcp_udp.host`: address and port applications connect to.
2. `protocol.type: mixed` and a matching `mixed` variant.
3. `username` and `password`: optional inbound credentials; these are **not** remote outbound credentials.

## Important limits and troubleshooting

- The backend first-run Mixed listener and React's new Local preset bind to loopback. A new LAN preset binds to all IPv4 interfaces and needs firewall/authentication.
- An outbound does not have a `mixed` protocol variant. Configure a specific remote HTTP or SOCKS5 outbound instead.
- The application must actually be configured to use this listener.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go) rather than examples from old releases.
