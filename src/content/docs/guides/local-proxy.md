---
title: Local and LAN proxy
description: Understand how local and LAN proxy listening addresses work.
---

An **inbound** is the address at which Yuhaiin accepts connections from applications. A local proxy is usually the easiest and safest way to begin.

## Local mode (recommended)

Go to **Traffic entry → Inbounds** and choose the **Local** preset. This creates a Mixed listener on `127.0.0.1:9002` by default. Mixed supports HTTP and SOCKS5 on the same listening port.

Configure each application to use the address and port shown on the inbound page. If it does not have proxy settings, use the operating system proxy or a [TUN inbound](/documents/guides/tun/) instead.

## LAN mode (advanced)

The **LAN** preset normally listens on `0.0.0.0:9002`, meaning other devices may reach it via this computer's LAN IP address. On the other device, enter the Yuhaiin computer's actual LAN address, **not** `0.0.0.0`.

**Security warning:** A listener bound to all interfaces may be accessible beyond your home network, depending on your firewall. Configure authentication and firewall restrictions before enabling it. Do not forward the port on your router or expose an unauthenticated proxy to the internet.

## Common mistakes

| Symptom | Check |
| --- | --- |
| App says connection refused | Is the inbound enabled? Is the port correct? |
| Browser works without proxy but fails with it | Was a default destination selected? Does the node work? |
| Other LAN device cannot connect | Local-only `127.0.0.1` address, OS firewall, or wrong LAN IP |
| Some apps bypass proxy | Not all apps honor system proxy settings; consider TUN |
| DNS names fail, IP addresses work | Check [DNS settings](/documents/features/dns/) |

**HTTP/SOCKS is an application proxy, not a full-device VPN.** Traffic from apps that do not use it can still go directly to the internet.
