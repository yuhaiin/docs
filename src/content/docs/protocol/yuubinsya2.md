---
title: "Yuubinsya2 (legacy reference)"
description: "historical topic: current Yuhaiin support and configuration."
---

This historical page named a separate generation of Yuubinsya. The current typed backend protocol union exposes `yuubinsya` but does not contain `yuubinsya2`.

## Where it fits

**Support:** historical topic. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Fields and requirements

1. For current client/server setup use the Yuubinsya page.
2. Check exact protocol versions at both ends rather than inferring backward compatibility.

## Important limits and troubleshooting

- Retained for existing bookmarks; no `yuubinsya2` JSON example is provided because that variant is not part of the current contracts.
- Do not use an undocumented second-generation protocol name in API requests.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
