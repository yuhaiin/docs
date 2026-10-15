---
title: Simple dialer
description: outbound chain step: current Yuhaiin support and configuration.
---

The `simple` step chooses where a connection is dialed. It does not itself provide a proxy protocol, encryption or VPN identity.

## Where it fits

**Support:** outbound chain step. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "Simple dialer example",
  "origin": "manual",
  "enabled": true,
  "chain": [
    {
      "type": "simple",
      "simple": {
        "host": "proxy.example.com",
        "port": 443
      }
    }
  ]
}
```

## Fields and requirements

1. `host`: hostname or IP to connect to.
2. `port`: integer port.
3. `alternate_host` and `network_interface`: optional advanced endpoint selection.

## Important limits and troubleshooting

- Follow the socket dialer with a matching proxy or TLS step, if required.
- A node with only a dialer is not an encrypted intermediary.
- This is the first step in the frontend SOCKS5, HTTP, Shadowsocks and Trojan templates.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
