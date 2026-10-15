---
title: Network diagnostics
description: What the diagnostics report tests and what it cannot prove.
---

**Diagnostics → Network diagnostics** tests individual parts of the backend's network setup. Unlike a generic speed test, it can distinguish DNS, routes, selected nodes and TUN registration.

## Run a check

1. Open **Diagnostics → Network diagnostics**.
2. Enter an ordinary hostname such as `www.cloudflare.com`. Do not include `https://`, a path, or a port.
3. Select **Run**. Read each check's status and its evidence.
4. Use **Copy** or **Download** if you need the report for troubleshooting.

The backend normally finishes within a short bounded deadline. Only one diagnosis can run on an instance at a time, and cancelling the frontend request does not change your configuration.

## What the checks mean

- **TUN**: listener registration, settings, MTU and ingress counters. It does not prove your OS routes are correct.
- **DNS A / AAAA**: real address resolution through configured resolvers; AAAA missing is not always a failure.
- **Direct IPv4 / IPv6**: connectivity to specific test endpoints using the direct dialer.
- **Route**: decision for the target with limited metadata; actual applications may have additional process/inbound information.
- **Routed HTTPS**: a TLS-verified HTTP request through the current routing path, not through a TUN inbound.
- **Selected TCP node HTTPS**: an independent test of the chosen TCP node, not UDP forwarding.

A successful diagnosis cannot guarantee that all applications or all servers will work. Combine it with the **Connections**, **Failed history**, **Blocked history** and **Logs** views.

The text report intentionally omits credentials but can include addresses, hostnames, routes and device information. Remove personal details before sharing it.

Read the [Troubleshooting guide](/documents/guides/troubleshooting/) or the backend [diagnostics contract notes](https://github.com/yuhaiin/yuhaiin/blob/main/docs/network-diagnostics.md) for technical details.
