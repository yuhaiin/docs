---
title: "Yuubinsya"
description: "inbound and outbound: current Yuhaiin support and configuration."
---

Yuubinsya is a Yuhaiin-specific client/server proxy protocol. Use it only with a compatible endpoint; HTTP/SOCKS clients cannot speak Yuubinsya directly.

## Where it fits

**Support:** inbound and outbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "Yuubinsya example",
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
      "type": "yuubinsya",
      "yuubinsya": {
        "password": "REPLACE_ME",
        "udp_over_stream": false,
        "udp_coalesce": false
      }
    }
  ]
}
```

## Fields and requirements

1. The outbound uses `password`, optional `udp_over_stream`, and `udp_coalesce`.
2. The inbound uses a separately typed `yuubinsya` protocol object with password and UDP coalescing options.
3. Transport-layer TLS, QUIC, HTTP/2 or other wrappers must agree on both sides.

## Important limits and troubleshooting

- This is not automatically compatible with arbitrary V2Ray or HTTP proxy servers.
- A mismatch in UDP handling can affect datagram connections even when TCP succeeds.
- Do not confuse this named variant with the obsolete `yuubinsya2` topic.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
