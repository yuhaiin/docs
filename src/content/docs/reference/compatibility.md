---
title: Supported features and limitations
description: Distinguish backend support, frontend support and server interoperability.
---

A protocol's presence in the Go contract does not mean it works with every commercial server or that its corresponding official application can be replaced.

## Three levels of support

1. **Backend contract:** Yuhaiin recognizes a configuration type.
2. **Frontend:** the current Web UI exposes a template or editable form for that type.
3. **Interoperability:** the implementation has been tested with a real compatible server, including the relevant authentication and data transport.

Check all three when choosing an outbound. A mock-server or unit test proves only its own test conditions.

## Important examples

| Type | Boundary to understand |
| --- | --- |
| OpenVPN | Native outbound does not import `.ovpn` profiles or automatically apply pushed DNS/routes; compression and some legacy configurations are unsupported |
| GlobalProtect | Gateway URL and password login; no portal discovery, interactive SAML/SSO or HIP |
| SoftEther native | Native SSL-VPN only, not SSTP/OpenVPN compatibility mode; experimental interop and limited automatic IPv6 |
| IKEv2 | Node supports PSK with optional EAP-MSCHAPv2; lower-level options are not all exposed |
| L2TP/L2TPv3 | UDP tunnels do **not** add IPsec or encryption to data |
| Fortinet | Gateway compatibility depends on FortiOS SSL VPN mode; not every MFA flow works |
| HTTP proxy | TCP CONNECT support does not mean general UDP tunneling |
| System proxy | Apps can ignore OS proxy settings |
| TUN | Operating-system routes, permissions and DNS still determine actual capture |

## When two settings sound similar

- **Node endpoint:** remote gateway; **inbound listening address:** local address that accepts apps.
- **Local tunnel address:** address assigned inside a VPN; **peer endpoint:** public address of the server.
- **DNS server:** answers names; **FakeIP:** substitutes synthetic addresses and needs routing.
- **Save:** persists settings; **Apply:** activates pending routing changes.

For supported fields use [Configuration model](/documents/reference/configuration/). For real compatibility claims, follow the protocol README and integration tests linked in [VPN protocols](/documents/reference/vpn-protocols/).
