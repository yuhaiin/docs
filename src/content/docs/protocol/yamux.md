---
title: Yamux (multiplexing)
description: Multiplexing can carry several logical streams through a smaller number of connections.
---

Multiplexing can carry several logical streams through a smaller number of connections.

## Support and purpose

**Current contract:** multiplexing concept, not a named current node protocol. This page is retained so existing links explain the change instead of showing obsolete instructions.

## What to configure

The current outbound contract uses mux, and the inbound transport contract also uses mux. The old yamux label is not a JSON type to paste into these contracts.

Do not copy old JSON examples from this topic. See the [current protocol catalog](/documents/protocol/) and [configuration model](/documents/reference/configuration/).

## Further information

- [Current backend implementation or contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go)
- [Node and subscription guide](/documents/features/nodes/)
- [Supported VPN outbounds](/documents/reference/vpn-protocols/)
