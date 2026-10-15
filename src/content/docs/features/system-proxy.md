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

1. Create and enable a local Mixed inbound under **Traffic entry → Inbounds**.
2. Choose a default destination and test a browser with explicit proxy settings.
3. Open **Settings → Configuration → System proxy integration** and select **HTTP**, **SOCKS5** or both as appropriate.
4. Save. Check whether applications that use OS proxy settings can connect, and confirm entries appear in **Monitoring → Connections**.

The backend's system proxy integration depends on the OS and desktop environment. A CLI application, background service or app with its own networking stack may ignore it.

## Turn it off safely

Disable the integration setting before stopping the backend. If the backend crashes and a stale OS proxy remains, internet access may appear broken. Use [Recovery](/documents/guides/recover-network/) to remove the old proxy setting.

For broader traffic capture, read [System-wide TUN](/documents/guides/tun/).
