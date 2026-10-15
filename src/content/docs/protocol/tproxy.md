---
title: "TPROXY"
description: "inbound: current Yuhaiin support and configuration."
---

Linux transparent proxying (TPROXY) can intercept packets while retaining original destination metadata. It requires policy routing and firewall rules in addition to Yuhaiin.

## Where it fits

**Support:** inbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Fields and requirements

1. The inbound protocol contract has host, DNS hijacking and Force FakeIP options.
2. Use the matching OS listen/network options and firewall rules for your deployment.

## Important limits and troubleshooting

- TPROXY is not a Windows/macOS one-click proxy feature.
- Missing routing marks or policy tables often mean the inbound never sees traffic.
- Never flush unrelated firewall rules during troubleshooting; use a reversible setup.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go) rather than examples from old releases.
