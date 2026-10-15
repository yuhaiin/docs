---
title: WebSocket
description: outbound step and inbound transport: current Yuhaiin support and configuration.
---

WebSocket wraps an application protocol in HTTP upgrade framing. It does not identify or authenticate a proxy on its own.

## Where it fits

**Support:** outbound step and inbound transport. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "WebSocket example",
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
      "type": "websocket",
      "websocket": {
        "host": "proxy.example.com",
        "path": "/proxy"
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

1. `host`: HTTP Host header expected by the WebSocket server.
2. `path`: request path used for the upgrade handshake.
3. TLS is a separate layer if the server expects WSS.

## Important limits and troubleshooting

- A 404/400 during upgrade can indicate the wrong Host or path, not a DNS failure.
- Check whether the endpoint is `ws` or `wss` and configure TLS accordingly.
- Do not add WebSocket to a remote protocol that expects bare TCP.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
