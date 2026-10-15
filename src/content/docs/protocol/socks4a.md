---
title: SOCKS4a
description: inbound: current Yuhaiin support and configuration.
---

SOCKS4a is a legacy TCP application proxy protocol capable of accepting hostnames from old clients.

## Where it fits

**Support:** inbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Fields and requirements

1. The current inbound protocol contract contains `socks4a`, with a username option.
2. Use an appropriate listening network and bind address.

## Important limits and troubleshooting

- SOCKS4a is not a replacement for SOCKS5 UDP associate.
- The current outbound typed protocol list has no independent SOCKS4a variant.
- Modern applications should generally use SOCKS5 or HTTP proxies instead.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go) rather than examples from old releases.
