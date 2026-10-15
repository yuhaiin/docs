---
title: Hysteria 2
description: A QUIC-based proxy carrying TCP and UDP; authentication and TLS must match the server.
---

A QUIC-based proxy carrying TCP and UDP; authentication and TLS must match the server.

## Support and purpose

**Current contract:** outbound and inbound. This capability is represented in the current backend; availability in a particular app depends on its version and server compatibility.

## What to configure

The backend supports Hysteria 2 client and server configurations. Hopping may switch among UDP ports or relay addresses. Server-side TLS is part of its QUIC handshake, not a generic TCP wrapper.

For a supported outbound, open **Destinations → Nodes**, choose a suitable template or custom chain, configure the endpoint and credentials, and save. For a supported inbound, open **Traffic entry → Inbounds** and verify that its network, transports and protocol are compatible.

An outbound node uses a typed `chain` array. An inbound uses distinct `network`, `transports` and `protocol` objects. Older examples using `protocols` or a top-level `tcpudp` and protocol object will not represent the current API.

Test with [Connections and diagnostics](/documents/features/diagnostics/) before enabling complicated rules. If the server rejects authentication or TLS negotiation, validate its credentials and version first.

## Further information

- [Current backend implementation or contract](https://github.com/yuhaiin/yuhaiin/blob/main/docs/hysteria2.md)
- [Node and subscription guide](/documents/features/nodes/)
- [Supported VPN outbounds](/documents/reference/vpn-protocols/)
