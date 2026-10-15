---
title: VMess
description: outbound: current Yuhaiin support and configuration.
---

VMess authenticates an outgoing connection with a UUID and protocol-specific security settings. The server's transport (raw socket, TLS, WebSocket or other layer) is configured as part of the chain.

## Where it fits

**Support:** outbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "VMess example",
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
      "type": "vmess",
      "vmess": {
        "id": "00000000-0000-0000-0000-000000000000",
        "aid": "0",
        "security": "auto"
      }
    }
  ]
}
```

## Fields and requirements

1. `id`: UUID supplied by the server (the example all-zero UUID is only a placeholder).
2. `aid`: alter ID serialized as a string in the current node contract.
3. `security`: the VMess security mode configured on the server.

## Important limits and troubleshooting

- The endpoint, TLS name and encryption settings must all match the server.
- Some deployments use WebSocket; add its chain step only when the server requires it.
- This is not a server-side inbound protocol in the current typed inbound contract.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
