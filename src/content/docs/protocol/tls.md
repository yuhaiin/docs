---
title: TLS
description: Encrypts and authenticates a connection, as used by HTTPS.
---

Encrypts and authenticates a connection, as used by HTTPS.

## Support and purpose

**Current contract:** outbound step and inbound transport. This capability is represented in the current backend; availability in a particular app depends on its version and server compatibility.

## What to configure

Use the actual server name and a valid certificate or trusted custom CA. The unsafe skip-verification option should not be enabled just to hide a certificate error.

For a supported outbound, open **Destinations → Nodes**, choose a suitable template or custom chain, configure the endpoint and credentials, and save. For a supported inbound, open **Traffic entry → Inbounds** and verify that its network, transports and protocol are compatible.

An outbound node uses a typed `chain` array. An inbound uses distinct `network`, `transports` and `protocol` objects. Older examples using `protocols` or a top-level `tcpudp` and protocol object will not represent the current API.

Test with [Connections and diagnostics](/documents/features/diagnostics/) before enabling complicated rules. If the server rejects authentication or TLS negotiation, validate its credentials and version first.

## Further information

- [Current backend implementation or contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go)
- [Node and subscription guide](/documents/features/nodes/)
- [Supported VPN outbounds](/documents/reference/vpn-protocols/)
