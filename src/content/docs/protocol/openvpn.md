---
title: OpenVPN
description: A native OpenVPN client supporting UDP and TCP modes.
---

A native OpenVPN client supporting UDP and TCP modes.

## Support and purpose

**Current contract:** outbound. This capability is represented in the current backend; availability in a particular app depends on its version and server compatibility.

## What to configure

The frontend node editor accepts inline CA/client certificate data, user/password and optional tls-auth/tls-crypt. It does not import .ovpn profile files. Pushed server routes and DNS are informational and must be applied separately.

For a supported outbound, open **Destinations → Nodes**, choose a suitable template or custom chain, configure the endpoint and credentials, and save. For a supported inbound, open **Traffic entry → Inbounds** and verify that its network, transports and protocol are compatible.

An outbound node uses a typed `chain` array. An inbound uses distinct `network`, `transports` and `protocol` objects. Older examples using `protocols` or a top-level `tcpudp` and protocol object will not represent the current API.

Test with [Connections and diagnostics](/documents/features/diagnostics/) before enabling complicated rules. If the server rejects authentication or TLS negotiation, validate its credentials and version first.

## Further information

- [Current backend implementation or contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/openvpn/README.md)
- [Node and subscription guide](/documents/features/nodes/)
- [Supported VPN outbounds](/documents/reference/vpn-protocols/)
