---
title: AEAD layer
description: outbound step and inbound transport: current Yuhaiin support and configuration.
---

AEAD stands for authenticated encryption with associated data. In Yuhaiin it is an optional authenticated encryption layer layered over an existing connection.

## Where it fits

**Support:** outbound step and inbound transport. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "AEAD layer example",
  "origin": "manual",
  "enabled": true,
  "chain": [
    {
      "type": "aead",
      "aead": {
        "password": "REPLACE_ME",
        "crypto_method": "aes-256-gcm"
      }
    }
  ]
}
```

## Fields and requirements

1. `password`: agreed secret.
2. `crypto_method`: encryption method supported by both endpoints.

## Important limits and troubleshooting

- AEAD cannot independently select the remote server endpoint.
- A different password/method on each end results in an authentication or decryption error.
- Do not mistake generic AEAD layering for Shadowsocks cipher settings; they are separate contract variants.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
