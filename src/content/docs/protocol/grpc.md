---
title: gRPC (legacy topic)
description: The old gRPC page described a transport that could be configured independently.
---

The old gRPC page described a transport that could be configured independently.

## Support and purpose

**Current contract:** not a standalone typed protocol in the current contracts. This page is retained so existing links explain the change instead of showing obsolete instructions.

## What to configure

The current outbound protocol union and inbound transport union do not declare a gRPC variant. Do not paste old gRPC JSON; use only variants offered by your backend and frontend.

Do not copy old JSON examples from this topic. See the [current protocol catalog](/documents/protocol/) and [configuration model](/documents/reference/configuration/).

## Further information

- [Current backend implementation or contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go)
- [Node and subscription guide](/documents/features/nodes/)
- [Supported VPN outbounds](/documents/reference/vpn-protocols/)
