---
title: Plain-language glossary
description: The minimum network vocabulary needed to use Yuhaiin.
---

Networking vocabulary is full of short words that hide long explanations. These are the terms you actually need to use Yuhaiin.

| Term | Meaning |
| --- | --- |
| **Backend** | The Yuhaiin program that listens for traffic and makes connections. |
| **Web UI** | The page in your browser that changes the backend's settings. |
| **Node / outbound** | The destination used to send traffic onward. It can be a remote proxy or Direct. |
| **Inbound** | An entry point where applications send their connections to Yuhaiin. |
| **Direct** | A connection made using the device's normal internet connection. |
| **Proxy** | An intermediary that makes a connection on your behalf. |
| **HTTP proxy** | An application-level proxy that handles web requests and TCP CONNECT. |
| **SOCKS5** | An application proxy protocol that can handle TCP and, when supported, UDP. |
| **TUN** | A virtual network interface that accepts IP packets from the operating system. |
| **DNS / resolver** | The system that turns names such as `example.com` into IP addresses. |
| **DoH / DoT / DoQ** | DNS over HTTPS, TLS or QUIC, respectively. |
| **FakeIP** | A temporary synthetic IP address mapped back to a domain name by Yuhaiin. |
| **Route rule** | A matching condition and action for a connection. |
| **Rule list** | Reusable sets of hostnames, domains or other match data. |
| **Selector** | A named choice of node that multiple route rules can share. |
| **Subscription** | A URL from which the app can import/update a collection of nodes. |
| **Registry** | A source listing rule datasets such as domain lists or GeoIP files. |
| **TCP** | Reliable ordered transport used by most websites. |
| **UDP** | Datagram transport used by DNS, calls, games and many VPNs. |
| **IPv4 / IPv6** | Two versions of internet addresses; supporting one does not guarantee the other. |
| **Port** | The number identifying a listening service on an IP address. |
| **127.0.0.1** | Loopback address: this computer only. |
| **0.0.0.0** | In a server listen setting, means all IPv4 interfaces. It is not the address to type into a client. |
| **TLS / certificate** | Encryption and identity verification used with HTTPS and many proxy transports. |
| **MTU** | Maximum packet size before fragmentation or other handling is needed. |

For hands-on examples, return to [Your first connection](/documents/guides/first-connection/).
