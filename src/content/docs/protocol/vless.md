---
title: VLESS
description: outbound: current Yuhaiin support and configuration.
---

VLESS is a light proxy protocol whose payload protection depends on its transport; a plain unencrypted chain should not be assumed private.

## Where it fits

**Support:** outbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "VLESS example",
  "origin": "manual",
  "enabled": true,
  "chain": [
    {
      "type": "simple",
      "simple": {
        "host": "proxy.example.com",
        "port": 443
      }
    },
    {
      "type": "tls",
      "tls": {
        "enable": true,
        "servernames": [
          "proxy.example.com"
        ]
      }
    },
    {
      "type": "vless",
      "vless": {
        "uuid": "00000000-0000-0000-0000-000000000000"
      }
    }
  ]
}
```

## Fields and requirements

1. `uuid`: the account ID issued by the server.
2. TLS/REALITY credentials belong to separate chain steps, not inside the VLESS object.

## Important limits and troubleshooting

- Use the transport actually deployed on the server. Ordinary TLS and REALITY are not interchangeable.
- A VLESS UUID is a secret credential; do not post it with a screenshot.
- The current backend contract exposes VLESS as an outbound protocol step.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
