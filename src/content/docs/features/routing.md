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

## An end-to-end rule example

Suppose a browser is already using the local Mixed inbound. You want `example.com` to go directly, with unmatched traffic using the selected proxy node:

1. Verify that the **selected TCP node** works. Selecting a node is not itself a routing rule.
2. In **Routing → Route rules**, set **Unmatched traffic** to **Proxy** and use the selected destination as its target.
3. Add a rule named **Direct example.com** with a hostname/list condition matching `example.com`; choose **Direct** as its action.
4. Put the specific rule above broad rules that would also match.
5. **Save** the rule and **Apply** routing changes. If Apply fails, the saved rule may not yet be running.
6. Use **Routing → Test route** twice: once with `example.com), once with a different hostname. Compare each result's action, matched rules and target.
7. Send a real request through the inbound and inspect **Monitoring → Connections**. A route test evaluates a supplied hostname; it does not reproduce all information carried by an application connection.

A hostname rule may not match an application that connects to an IP address without usable hostname metadata. DNS/FakeIP or sniffing may change what Yuhaiin knows, so inspect actual connection metadata before modifying the rule.

## Understanding evaluation order

Rules can combine expressions using `all`, `any` and `not`. A specific allow or direct rule loses if an earlier, broader rule matches first. For a difficult case, simplify the decision tree: temporarily test one host condition with a known default, then add port, process, inbound or GeoIP conditions one at a time.

**Process conditions** are dependent on the traffic source and operating system. A pure HTTP/SOCKS request does not necessarily expose the originating OS process in the same way as a device-level packet capture. Do not treat a successful hostname-only route test as proof of a process rule.

## Advanced: saved state versus effective state

The current [route contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/route/types.go) tracks `revision`, and the activation status reports `savedRevision`, `appliedRevision`, `applying` and `error`. These are useful when an editor shows a rule that the running router has not accepted.

| Observation | Interpretation | Next check |
| --- | --- | --- |
| Saved revision is newer than applied | Edits have not become effective | Run **Apply**; inspect the reported error |
| Applied revision matches saved | Backend accepted the update | Test the route and inspect a real connection |
| Route test chooses the wrong target | Rule order, condition or default is different than expected | Look at match history, selectors and lists |
| Route test passes but app ignores the rule | Traffic may not reach the intended inbound, or lacks hostname/process metadata | Inspect live connection entries |
| Rule depends on a remote list | List contents might be stale or invalid | Refresh lists and inspect list errors |

For developers, the frontend implements these operations in [`src/api/route.ts`](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/route.ts): `getRouteConfig()`, `saveRouteConfig()`, `applyRouteChanges()`, `getRouteActivationStatus()` and `testRule(host)`. The test request takes a **hostname**, not an arbitrary URL with scheme, port and path. See [Developer guide](/documents/reference/developer-guide/) for the RPC transport details.
