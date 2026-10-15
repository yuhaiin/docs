---
title: Mixed HTTP/SOCKS listener
description: inbound: current Yuhaiin support and configuration.
---

The **Mixed** protocol accepts both HTTP proxy and SOCKS5 clients on a single listening port. This is the default beginner-friendly Local and LAN preset.

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
      "host": "127.0.0.1:9002",
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

The example is explanatory. Adjust listen addresses, credentials and interface permissions before enabling it.

## Fields and requirements

1. `network.tcp_udp.host`: address and port applications connect to.
2. `protocol.type: mixed` and a matching `mixed` variant.
3. `username` and `password`: optional inbound credentials; these are **not** remote outbound credentials.

## Important limits and troubleshooting

- The default Local preset binds only loopback; LAN binds all interfaces and needs firewall/authentication.
- An outbound does not have a `mixed` protocol variant. Configure a specific remote HTTP or SOCKS5 outbound instead.
- The application must actually be configured to use this listener.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go) rather than examples from old releases.
