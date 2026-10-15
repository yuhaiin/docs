---
title: "Yamux and multiplexing"
description: "historical term: current Yuhaiin support and configuration."
---

Yamux is an underlying multiplexing implementation concept. The current typed configuration exposes `mux` instead of a JSON type named `yamux`.

## Where it fits

**Support:** historical term. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "Yamux and multiplexing example",
  "origin": "manual",
  "enabled": true,
  "chain": [
    {
      "type": "mux",
      "mux": {
        "concurrency": 4
      }
    }
  ]
}
```

## Fields and requirements

1. `mux` is an outbound variant with optional concurrency.
2. `mux` also exists as an inbound transport type.

## Important limits and troubleshooting

- Both ends must agree on multiplexing support.
- Multiplexing does not automatically improve performance on every network.
- Do not use `yamux` as a protocol type in current node JSON.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
