---
title: Simple socket dialer
description: Establishes a connection to a host and port before higher protocol layers authenticate it.
---

Establishes a connection to a host and port before higher protocol layers authenticate it.

## Support and purpose

**Current contract:** outbound step. This capability is represented in the current backend; availability in a particular app depends on its version and server compatibility.

## What to configure

The current Node contract uses a simple object with host and port. A simple dialer alone is not an encrypted VPN; combine it with the appropriate proxy or TLS steps.

For a supported outbound, open **Destinations → Nodes**, choose a suitable template or custom chain, configure the endpoint and credentials, and save. For a supported inbound, open **Traffic entry → Inbounds** and verify that its network, transports and protocol are compatible.

An outbound node uses a typed `chain` array. An inbound uses distinct `network`, `transports` and `protocol` objects. Older examples using `protocols` or a top-level `tcpudp` and protocol object will not represent the current API.

Test with [Connections and diagnostics](/documents/features/diagnostics/) before enabling complicated rules. If the server rejects authentication or TLS negotiation, validate its credentials and version first.

## Further information

- [Current backend implementation or contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/fixed)
- [Node and subscription guide](/documents/features/nodes/)
- [Supported VPN outbounds](/documents/reference/vpn-protocols/)
