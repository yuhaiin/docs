---
title: "REALITY"
description: "outbound step and inbound transport: current Yuhaiin support and configuration."
---

REALITY is an authentication and camouflage layer that works only with a compatible peer. It is often used in a chain alongside a proxy protocol such as VLESS.

## Where it fits

**Support:** outbound step and inbound transport. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "REALITY example",
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
      "type": "reality",
      "reality": {
        "server_name": "www.example.com",
        "public_key": "REPLACE_PUBLIC_KEY",
        "short_id": "01234567"
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

1. `server_name`: expected server name agreed with the peer.
2. `public_key`: the server's REALITY public key.
3. `short_id`: short client identifier when the server uses one.
4. `mldsa65_verify`: optional verification data where deployed.

## Important limits and troubleshooting

- Do not invent a plausible public key or use an unrelated SNI; obtain values from your server operator.
- The inbound REALITY transport has a different private-key and destination configuration.
- If REALITY negotiation fails, compare key, ID, SNI and transport order before changing DNS.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
