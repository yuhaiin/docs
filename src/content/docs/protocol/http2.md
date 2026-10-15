---
title: "HTTP/2 transport"
description: "outbound step and inbound transport: current Yuhaiin support and configuration."
---

HTTP/2 framing and multiplexing are optional transport layers, not the same as an ordinary HTTP CONNECT proxy.

## Where it fits

**Support:** outbound step and inbound transport. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "HTTP/2 transport example",
  "origin": "manual",
  "enabled": true,
  "chain": [
    {
      "type": "http2",
      "http2": {
        "concurrency": 4
      }
    }
  ]
}
```

## Fields and requirements

1. `concurrency`: optional outbound concurrency tuning.
2. The server must support the same HTTP/2 framing arrangement.

## Important limits and troubleshooting

- A server supporting HTTPS/2 for websites is not automatically a compatible Yuhaiin proxy endpoint.
- The inbound HTTP/2 transport is a separate type in the inbound contract.
- Check TLS and layer compatibility before increasing concurrency.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
