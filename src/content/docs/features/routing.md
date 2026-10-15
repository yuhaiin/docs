---
title: Routing rules
description: Decide which traffic to proxy, connect directly or block.
---

Routing decides where a connection goes *after* an inbound receives it. Open **Routing → Route rules**.

## The default action

On the routing page, select a **default mode** for traffic that matches no rule:

- **Proxy**: send it to the chosen default target, an individual node or a selector.
- **Direct**: connect without using a remote proxy node.
- **Block**: reject the connection.

Begin with a default and a single test rule. You can add conditions such as hostname, port, network type, process, inbound, GeoIP, and reusable lists.

## Example: keep local services direct

If your home network hosts a printer or NAS, you may add a higher-priority rule for its local IP range and set **Direct**. Check the ordering relative to broad catch-all rules.

## Example: block an unwanted domain

Create a domain or host match and choose **Block**. Use the **Blocked** connection history to verify whether it was hit. A hostname-based rule does not necessarily match an IP-only connection whose name is unavailable.

## Conditions and ordering

Rules use expressions including **all** (every condition), **any** (one condition), **not**, host list, process list, inbound, network, port and GeoIP. Order matters when more than one rule might match. The Web UI allows priority changes.

**Saving does not necessarily mean a newly edited routing configuration is already running.** Look for the **Apply** operation and activation status; inspect apply errors if the saved and applied revisions differ.

## Test before relying on a rule

Open **Routing → Test route** and enter a test host. Review the chosen mode/target, matched lists and rule decisions. The test cannot reproduce every app-specific process or inbound attribute. Compare it with **Monitoring → Connections** for live behavior.

See [Rule lists and registries](/documents/features/lists/) for reusable matching data.
