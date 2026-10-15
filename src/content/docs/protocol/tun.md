---
title: "TUN interface"
description: "inbound: current Yuhaiin support and configuration."
---

A TUN inbound reads IP packets from an operating-system virtual interface. Applications need not support application proxy settings when their traffic is routed through that interface.

## Where it fits

**Support:** inbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Fields and requirements

1. `name`, `mtu`, `portal` and `portalV6`: interface and addressing information.
2. `routes` and `excludes`: which prefixes to capture or bypass.
3. `autoFakeIpRoute`: dynamically manages the currently active FakeIP ranges where supported.
4. `skipMulticast` and `driver`: platform-specific behavior.

## Important limits and troubleshooting

- The frontend TUN preset is only a starting configuration; an OS may require permissions and name adjustments.
- Avoid capturing the remote proxy server endpoint through TUN or you can cause a loop.
- If internet access stops, disable TUN and remove stale routes. Read the recovery guide.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go) rather than examples from old releases.
