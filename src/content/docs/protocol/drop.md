---
title: "Drop"
description: "outbound step: current Yuhaiin support and configuration."
---

Drop is a terminal behavior for traffic. For ordinary domain blocking, the UI's Block routing action is easier to review and audit.

## Where it fits

**Support:** outbound step. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "Drop example",
  "origin": "manual",
  "enabled": true,
  "chain": [
    {
      "type": "drop",
      "drop": {}
    }
  ]
}
```

## Fields and requirements

1. This variant takes no user-facing credentials.
2. Prefer rule conditions and Blocked history for observable policy decisions.

## Important limits and troubleshooting

- Dropping packets can look like timeouts, while other block/reject semantics may differ.
- A generic terminal step is not an HTTP block page.
- Confirm route priority before concluding a host is blocked.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
