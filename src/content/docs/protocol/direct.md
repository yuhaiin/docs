---
title: "Direct"
description: "outbound: current Yuhaiin support and configuration."
---

A Direct node lets Yuhaiin open network connections using the host's ordinary internet access. It is the easiest destination to test before configuring a remote proxy.

## Where it fits

**Support:** outbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "Direct example",
  "origin": "manual",
  "enabled": true,
  "chain": [
    {
      "type": "direct",
      "direct": {}
    }
  ]
}
```

## Fields and requirements

1. No server password or remote gateway is required.
2. An optional network interface selector exists in the backend type.

## Important limits and troubleshooting

- Direct is not anonymous: websites see the public address of the normal internet path.
- A Direct node still requires an inbound if you want apps to route through the local backend.
- Routing rules can also choose Direct without selecting a remote node.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
