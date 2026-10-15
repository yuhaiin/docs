---
title: System-wide traffic with TUN
description: Safe TUN setup, FakeIP routes, IPv6 and recovery.
---

A **TUN** interface is a virtual network adapter. The operating system can send IP packets to it, allowing Yuhaiin to capture traffic from apps that do not support HTTP/SOCKS proxy settings.

**Start with [a local proxy](/documents/guides/first-connection/) first.** TUN also changes system routes, DNS behavior and required privileges. A mistake can temporarily disconnect your device.

## Enable TUN

1. Open **Traffic entry → Inbounds**.
2. Create a **TUN** preset. The current Web UI prepares a network-less inbound with the TUN protocol, a 1500 MTU, an IPv4 address and default IPv4 route.
3. Review its route and exclusion settings. Keep the connection to your proxy server reachable **outside** TUN to avoid a routing loop.
4. Save and enable it. Your operating system may ask for administrator or VPN permissions.
5. Check **Connections** and **Network diagnostics**. Confirm that the internet still works, then test an app without explicit proxy settings.

The default preset's TUN name differs by platform. The current frontend uses `tun://utun8` on macOS and `tun://yuhaiin` elsewhere; this is a starting value, not a guarantee the OS accepts the interface name.

## FakeIP and automatic routes

FakeIP DNS gives selected domain names addresses from a synthetic pool. Yuhaiin maps those addresses back to their original domains. With **Auto FakeIP Route**, the backend adds active FakeIP prefixes to a kernel-managed TUN's routes instead of requiring you to type them all manually.

New TUNs created in the Web UI enable this option. Existing settings migrated from old versions do **not** enable it automatically. Linux, macOS and Windows kernel-managed TUNs support the automatic route updates; Android and externally provided `fd://` devices use host-managed routes.

## IPv6

An IPv4-only TUN route does not automatically capture IPv6. Configure IPv6 deliberately if your device and chosen destination support it. Do not assume a failed AAAA lookup means your entire connection is broken.

## Restore connectivity

If enabling TUN makes the network stop working:

1. Disable that inbound in the Web UI.
2. Stop Yuhaiin if the interface or routes are stuck.
3. Check the operating system's network settings and routes.
4. Reopen Yuhaiin and use the local HTTP/SOCKS inbound first.
5. Compare **TUN**, **Route**, **DNS**, and **Routed HTTPS** checks in diagnostics.

See the backend's [TUN route design notes](https://github.com/yuhaiin/yuhaiin/blob/main/docs/tun-auto-fakeip-route.md) and [Troubleshooting](/documents/guides/troubleshooting/).
