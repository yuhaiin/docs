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

## Separate four different address spaces

A TUN setup involves several addresses that should not be mixed up:

| Address | Purpose |
| --- | --- |
| TUN interface address, for example `172.19.0.1/30` in the React preset | Local virtual network interface |
| TUN route, for example `0.0.0.0/0` | Which destinations the OS sends to the interface |
| FakeIP pool, such as `198.18.0.0/16` | Synthetic DNS results, mapped to hostnames inside Yuhaiin |
| Remote proxy or VPN server address | Real upstream endpoint that **must remain reachable** |

The [React new TUN preset](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/docs/inbound/presets.ts) currently proposes MTU `1500`, portal `172.19.0.1/30`, IPv6 portal `fdfe:dcba:9876::1/126` and a default IPv4 route. These are **editor template values**, not promises about your existing persisted TUN or platform-specific route installation.

## Advanced: avoid capture loops

If the operating system sends the traffic used to connect to your upstream proxy **back through the same TUN**, the connection may loop. Inspect existing routes and exclusions before enabling a catch-all route. A proxy's outer socket, local management UI, LAN traffic and DNS bootstrap may require different handling.

A TUN interface and a system proxy solve different problems. TUN processes IP packets from the OS route path; a system proxy only affects clients respecting the proxy configuration. **Do not enable both blindly**, particularly if another VPN or network-filtering program is active.

## Advanced: settings and runtime behavior

The [TUN protocol contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go) includes `name`, `mtu`, `portal`, `portalV6`, `routes`, `excludes`, `autoFakeIpRoute`, `forceFakeIp` and optional `postUp`/`postDown` commands. Their actual effect depends on the host platform and whether Yuhaiin or another app owns the underlying TUN device.

The frontend initializes `autoFakeIpRoute` for **new** TUN presets but does not force it on for existing saved settings. During debugging, inspect the persisted inbound and its runtime events; do not infer effective routes from UI defaults alone.

### Debugging in order

1. Confirm the TUN inbound is running and that your OS created the virtual interface.
2. Check that OS routes actually point the intended traffic into the interface.
3. Verify that the remote server's outer connection is not captured in a loop.
4. Check DNS and FakeIP mapping independently.
5. Compare **TUN**, **Route** and **Routed HTTPS** diagnostics with a real app request. A registered TUN does not prove that every OS route is installed correctly.
6. Disable the inbound before removing or reverting routes during recovery.
