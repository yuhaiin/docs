---
title: "Reverse HTTP/TCP"
description: "inbound types: current Yuhaiin support and configuration."
---

Reverse HTTP and reverse TCP inbounds support specialized reverse connection topologies. They are separate variants rather than a generic automatic port forwarding switch.

## Where it fits

**Support:** inbound types. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Fields and requirements

1. `reverse_http` includes a URL and optional client TLS settings.
2. `reverse_tcp` includes a target address.

## Important limits and troubleshooting

- An inbound listener alone cannot bypass arbitrary NAT/firewall restrictions on a remote site.
- Deploy only to networks and services you operate or have permission to access.
- Use TLS and access controls where traffic crosses untrusted networks.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go) rather than examples from old releases.
