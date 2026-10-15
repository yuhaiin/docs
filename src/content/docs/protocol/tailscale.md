---
title: Tailscale outbound
description: outbound: current Yuhaiin support and configuration.
---

Tailscale combines WireGuard-based networking with a tailnet control plane. Yuhaiin's Tailscale outbound uses its own authentication and network settings.

## Where it fits

**Support:** outbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "Tailscale outbound example",
  "origin": "manual",
  "enabled": true,
  "chain": [
    {
      "type": "tailscale",
      "tailscale": {
        "auth_key": "REPLACE_AUTH_KEY",
        "hostname": "yuhaiin-device",
        "control_url": ""
      }
    }
  ]
}
```

## Fields and requirements

1. `auth_key`: tailnet auth key.
2. `hostname`: name registered for this node.
3. `control_url`: optional custom control server address.

## Important limits and troubleshooting

- A Tailscale auth key is not a normal proxy server password.
- A control URL is not automatically a public proxy gateway.
- Respect the authentication and access policy of the tailnet operator.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
