---
title: "TLS"
description: "outbound step and inbound transport: current Yuhaiin support and configuration."
---

TLS encrypts a connection and authenticates the remote endpoint using a certificate. It is frequently a middle step between a socket dialer and a proxy protocol.

## Where it fits

**Support:** outbound step and inbound transport. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "TLS example",
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
      "type": "trojan",
      "trojan": {
        "password": "REPLACE_ME",
        "peer": "proxy.example.com"
      }
    }
  ]
}
```

## Fields and requirements

1. `enable`: whether to enable the outbound TLS layer.
2. `servernames`: expected certificate name(s).
3. `ca_cert`: optional custom certificate authorities, encoded according to the backend contract.
4. `insecure_skip_verify`: bypasses certificate verification and should normally remain false.

## Important limits and troubleshooting

- TLS certificate verification must match the server name, including when dialing an IP address.
- A successful TLS handshake alone does not prove downstream proxy authentication.
- An inbound TLS transport uses a server certificate/private key, not the outbound client fields.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
