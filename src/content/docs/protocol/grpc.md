---
title: gRPC (legacy reference)
description: historical topic: current Yuhaiin support and configuration.
---

Earlier documentation described gRPC as an independently selectable proxy transport. The current node/inbound typed protocol list does **not** expose a `grpc` variant.

## Where it fits

**Support:** historical topic. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Fields and requirements

1. Use a compatible transport currently exposed in the backend, such as HTTP/2, when your server specifically supports it.
2. Do not paste a legacy `grpc` field into current node JSON.

## Important limits and troubleshooting

- This page remains published to explain older links.
- A website's gRPC support does not imply it is compatible with Yuhaiin's HTTP/2 proxy transport.
- Refer to the current protocol contracts for supported variants.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
