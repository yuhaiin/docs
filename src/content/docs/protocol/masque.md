---
title: Cloudflare WARP / MASQUE
description: outbound: current Yuhaiin support and configuration.
---

This is Yuhaiin's dedicated Cloudflare WARP MASQUE outbound. Its configuration uses WARP account and edge parameters, not generic proxy hostname/password fields.

## Where it fits

**Support:** outbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "Cloudflare WARP / MASQUE example",
  "origin": "manual",
  "enabled": true,
  "chain": [
    {
      "type": "cloudflare_warp_masque",
      "cloudflare_warp_masque": {
        "private_key": "REPLACE_PRIVATE_KEY",
        "endpoint": "engage.cloudflareclient.com:2408",
        "endpoint_public_key": "REPLACE_EDGE_PUBLIC_KEY",
        "local_addresses": [
          "172.16.0.2/32"
        ]
      }
    }
  ]
}
```

## Fields and requirements

1. `private_key`: private account material.
2. `endpoint`: Cloudflare edge endpoint.
3. `endpoint_public_key`: public key expected for that endpoint.
4. `local_addresses`: assigned internal tunnel prefixes, not a public proxy IP.

## Important limits and troubleshooting

- WARP MASQUE and ordinary WireGuard/WARP WireGuard are different transports.
- Credentials and address assignments must come from a working WARP account/setup.
- The node does not grant access to arbitrary Cloudflare Zero Trust organizations without authorization.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
