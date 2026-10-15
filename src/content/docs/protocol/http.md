---
title: HTTP proxy
description: HTTP CONNECT allows an application to ask a proxy server to establish a TCP connection.
---

HTTP CONNECT allows an application to ask a proxy server to establish a TCP connection.

## Support and purpose

**Current contract:** outbound and inbound. This capability is represented in the current backend; availability in a particular app depends on its version and server compatibility.

## What to configure

In a current outbound chain the HTTP step follows a dialer such as simple. HTTP outbound uses user/password; inbound HTTP uses username/password and a listening network. HTTP CONNECT by itself is not a generic UDP tunnel.

For a supported outbound, open **Destinations → Nodes**, choose a suitable template or custom chain, configure the endpoint and credentials, and save. For a supported inbound, open **Traffic entry → Inbounds** and verify that its network, transports and protocol are compatible.

An outbound node uses a typed `chain` array. An inbound uses distinct `network`, `transports` and `protocol` objects. Older examples using `protocols` or a top-level `tcpudp` and protocol object will not represent the current API.

Test with [Connections and diagnostics](/documents/features/diagnostics/) before enabling complicated rules. If the server rejects authentication or TLS negotiation, validate its credentials and version first.

## Further information

- [Current backend implementation or contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/http)
- [Node and subscription guide](/documents/features/nodes/)
- [Supported VPN outbounds](/documents/reference/vpn-protocols/)
