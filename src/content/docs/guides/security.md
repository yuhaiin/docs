---
title: Security and privacy
description: Protect the control plane, proxy listeners, subscriptions and backups.
---

Yuhaiin routes connections, but your security depends on the chosen destination, listening addresses, DNS configuration and applications.

## Keep the management interface local

Run the backend with `-host 127.0.0.1:50051` unless you deliberately need remote access. The CLI's default binds all interfaces. If you expose the UI on a network, configure authentication, an appropriate firewall and a trusted HTTPS reverse proxy.

## Do not publish an open proxy

Choose a **Local** inbound instead of a **LAN** inbound for one computer. LAN access should be restricted to trusted devices, with suitable authentication and firewall rules. `0.0.0.0` on an inbound exposes it to every interface that the OS allows.

## Protect secrets

- Proxy passwords, private keys, client certificates and subscription URLs are credentials.
- Store backups in protected locations and protect the keys used for cloud backups.
- Never paste unredacted configuration files into public issues.
- Use TLS certificate verification. Only bypass it for a controlled diagnostic when you understand the risk.

## Understand privacy limits

Using **Direct** does not hide your public IP. Using an HTTP/SOCKS application proxy does not force all apps through it. DNS may follow separate resolver policies. A VPN or proxy provider can observe some connection metadata and must be trusted.

A successful Yuhaiin connection is not a guarantee of anonymity. For connection failures, use [Troubleshooting](/documents/guides/troubleshooting/) rather than disabling security checks at random.
