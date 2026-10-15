---
title: Yuubinsya2 (legacy topic)
description: The older documentation mentioned a second-generation Yuubinsya protocol.
---

The older documentation mentioned a second-generation Yuubinsya protocol.

## Support and purpose

**Current contract:** not a standalone current typed variant. This page is retained so existing links explain the change instead of showing obsolete instructions.

## What to configure

The current node/inbound protocol contract declares yuubinsya, not yuubinsya2. Do not invent a separate configuration block for it.

Do not copy old JSON examples from this topic. See the [current protocol catalog](/documents/protocol/) and [configuration model](/documents/reference/configuration/).

## Further information

- [Current backend implementation or contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go)
- [Node and subscription guide](/documents/features/nodes/)
- [Supported VPN outbounds](/documents/reference/vpn-protocols/)
