---
title: QUIC transport
description: outbound step and inbound network: current Yuhaiin support and configuration.
---

QUIC provides an encrypted UDP-based transport with multiplexed streams. Yuhaiin exposes QUIC separately from its Hysteria 2 proxy protocol.

## Where it fits

**Support:** outbound step and inbound network. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "QUIC transport example",
  "origin": "manual",
  "enabled": true,
  "chain": [
    {
      "type": "quic",
      "quic": {
        "host": "proxy.example.com:443",
        "tls": {
          "enable": true,
          "servernames": [
            "proxy.example.com"
          ]
        }
      }
    }
  ]
}
```

## Fields and requirements

1. `host`: remote QUIC endpoint.
2. `tls`: QUIC's authentication settings for the outbound variant.

## Important limits and troubleshooting

- QUIC needs a working UDP path. A TCP-only upstream proxy will not automatically carry it.
- A QUIC step alone is not an authenticated Hysteria 2 account.
- For a QUIC listener, the inbound network has its own `quic` variant and server TLS settings.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
