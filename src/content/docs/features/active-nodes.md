---
title: Active outbound nodes
description: Understand persistent outbound instances and reconnect behavior.
---

**Destinations → Active nodes** shows outbound instances currently held by the backend. These are runtime sessions, not the saved list of all nodes.

## Inspect or close a session

1. Open **Destinations → Active nodes**.
2. Search by node name, group or identifier.
3. Select a node to see its read-only configuration and current protocol chain.
4. Use the **Terminate** action to close the runtime instance, then confirm.

Closing an active instance **does not delete its saved node**. If a route still needs it, Yuhaiin may establish a new connection. A fresh session can also mean previously established TCP connections have to reconnect.

## When terminating helps

Use it after correcting a node's credentials or when the active transport appears stuck. Then send a new test request and inspect the fresh active instance plus **Monitoring → Connections**.

Do not repeatedly close sessions simply because they use memory. Protocols such as VPNs and multiplexed transports may keep sessions open to avoid expensive handshakes.

## What a runtime instance does not prove

An active node may be authenticated to its server but unable to reach a particular website. Use [Network diagnostics](/documents/features/diagnostics/) and a real request from an application before concluding routing is working.
