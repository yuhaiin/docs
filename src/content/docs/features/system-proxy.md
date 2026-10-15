---
title: System proxy versus TUN
description: Choose which applications are affected by Yuhaiin.
---

A **system proxy** tells participating applications to send traffic through an HTTP or SOCKS proxy. A **TUN** interface captures IP packets via a virtual network adapter. Both begin with an inbound; neither is the same as picking an outbound node.

## Which should I use?

| Feature | System proxy | TUN |
| --- | --- | --- |
| Requires a local application proxy | Yes | No |
| Works with every application | No; app must honor proxy settings | Can capture more traffic, subject to routes and OS rules |
| Usually needs admin/VPN permissions | Not for a simple application proxy; system integration varies | Often yes |
| Changes OS network routes | Normally no | Typically yes |
| First-time setup complexity | Lower | Higher |
| Good first test | Yes | After local proxy works |

## Enable system proxy integration

1. Find and verify the existing enabled Mixed inbound under **Traffic entry → Inbounds**. Create another only when necessary.
2. Choose a default destination and test a browser with explicit proxy settings.
3. Open **Settings → Configuration → System proxy integration** and select **HTTP**, **SOCKS5** or both as appropriate.
4. Save. Check whether applications that use OS proxy settings can connect, and confirm entries appear in **Monitoring → Connections**.

The backend's system proxy integration depends on the OS and desktop environment. A CLI application, background service or app with its own networking stack may ignore it.

## Turn it off safely

Disable the integration setting before stopping the backend. If the backend crashes and a stale OS proxy remains, internet access may appear broken. Use [Recovery](/documents/guides/recover-network/) to remove the old proxy setting.

For broader traffic capture, read [System-wide TUN](/documents/guides/tun/).

## Use the existing listener before creating another

On a clean backend installation, an enabled **Mixed** HTTP/SOCKS listener already exists at `127.0.0.1:1080`. Check that inbound under **Traffic entry → Inbounds**, including its runtime status. You normally do **not** need to create a second Local preset.

The **new Local preset** in the React editor initially uses `127.0.0.1:9002`, but that is a new resource, not the backend's first-run configuration. The proxy address the OS needs is whichever listener is **actually running**.

First configure just one browser or command-line tool, then enable automatic system-proxy integration after the explicit test works.

## Advanced: capture scope and failure modes

A system proxy setting advertises a destination to applications that support it. It does not change raw IP routing; it can be ignored by programs using direct sockets, custom DNS stacks or separate proxy configuration.

A TUN route acts at a different layer. Its capture scope is determined by the OS routing table, exclusions and the virtual interface. Some applications may still escape TUN depending on platform policy, another VPN or network extension.

| Symptom | First boundary to inspect |
| --- | --- |
| Browser works through explicit proxy but not OS integration | Whether the OS setting was applied and browser uses it |
| Terminal works with `--proxy` but not by default | Environment-specific proxy variables or app settings |
| Some background services bypass the system proxy | Service-specific network behavior |
| Network breaks after Yuhaiin is stopped | A stale OS proxy address; disable it before troubleshooting DNS |
| TUN enabled but upstream VPN cannot reconnect | Kernel route exclusions and possible capture loops |

On a shared or managed machine, do not assume you can change global proxy settings. Use a local, loopback-only listener and one participating application until you know the scope.
