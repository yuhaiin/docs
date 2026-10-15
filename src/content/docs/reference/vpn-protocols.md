---
title: VPN protocol support
description: Current enterprise and consumer VPN outbound limitations.
---

Yuhaiin contains several native outbound VPN implementations. These are **outbound nodes** in the Go backend, not a promise that every feature of the corresponding vendor's official client works.

| Outbound | What to know before setup |
| --- | --- |
| WireGuard | Peer public key, client secret key, endpoint and allowed IP ranges. |
| AmneziaWG | WireGuard-compatible VPN with extra obfuscation parameters that must match the server. |
| Hysteria 2 | QUIC-based client and server support; authentication and TLS settings must match. |
| OpenVPN | Native UDP or TCP client; frontend form does **not** import `.ovpn` files. |
| GlobalProtect | Direct gateway with username/password; portal discovery, SAML/SSO and HIP are not implemented. Optional ESP/UDP. |
| IKEv2 | IPsec with PSK or EAP-MSCHAPv2 support, depending on gateway configuration. |
| AnyConnect | TLS CSTP with optional DTLS transport; not every Cisco SSO deployment is compatible. |
| SSTP | TLS transport with PPP authentication. |
| Fortinet SSL VPN | TLS transport with optional DTLS data channel. |
| SoftEther | **Native SoftEther SSL-VPN**, distinct from SoftEther's SSTP/OpenVPN compatibility modes; some features are experimental. |
| L2TP | Userspace PPP over L2TP; the node alone does **not** add IPsec. |
| L2TPv3 | Ethernet pseudowire; requires compatible settings at both ends. |
| Tailscale | Client behavior uses Tailscale's network/control-plane concepts, not a generic proxy hostname/password. |
| Cloudflare WARP / MASQUE | Specialized outbound to Cloudflare infrastructure; not equivalent to generic WireGuard configuration. |

### Do pushed routes and DNS settings take effect?

Not necessarily. For OpenVPN and GlobalProtect, server-advertised DNS and routes may be available as **connection information**, but they are not automatically applied to the host's network configuration by those outbound nodes. Configure Yuhaiin routing and DNS explicitly.

### How do I choose?

Use the VPN type provided by your server operator. There is no generic server address/password pair that works across these protocols. Server-side certificate and authentication policies matter. Do not disable TLS verification just to force a connection.

For exact compatibility notes, consult the implementation READMEs and interop tests under [pkg/net/proxy](https://github.com/yuhaiin/yuhaiin/tree/main/pkg/net/proxy), and use the [Node editor](/documents/features/nodes/) for supported fields.
