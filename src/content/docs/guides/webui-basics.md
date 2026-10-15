---
title: Understand the Web UI
description: What the main pages control and where to look first.
---

Yuhaiin has two jobs: a backend that processes network connections and a Web UI that configures it. A browser page does not itself redirect network traffic.

## Which page does what?

| Page | Purpose |
| --- | --- |
| **Home** | Setup checklist and current default destination |
| **Destinations → Nodes** | Configure individual outbound connections |
| **Destinations → Selectors** | Give a reusable name to a node choice |
| **Destinations → Subscriptions** | Import and update provider profiles |
| **Destinations → Publish** | Make selected node profiles available to other clients |
| **Destinations → Active nodes** | Inspect active outbound instances and close one |
| **Routing → Route rules** | Proxy, connect directly, or block matching traffic |
| **Routing → Rule lists** | Manage host, process and other matching datasets |
| **Routing → Test route** | Preview the route chosen for a host |
| **Traffic entry → Inbounds** | Choose which applications send traffic to Yuhaiin |
| **DNS** | Resolvers, DNS roles, DNS server/FakeIP, Hosts and cache |
| **Diagnostics** | Network checks, logs and performance profiling |
| **Settings** | Backend configuration, Web UI preferences and backups |

The Web UI includes **Monitoring → Connections**, **History**, **Failed history**, and **Blocked history** to observe real traffic.

## Three separate settings that are easy to confuse

1. **Selected node:** where outbound traffic can go when the route uses the selected destination.
2. **Inbound:** how an application sends traffic to Yuhaiin.
3. **Route:** which selected node, direct connection or block action should apply.

Creating one of these does not automatically set up the other two.

## Save versus apply

Many resource editors have a **Save** operation. Routing and resolver roles may additionally have **Apply** or **Save and apply**, and an activation status. A saved rule can exist without being active yet.

## Which mode should a beginner use?

Start with a **Direct** destination and **Local** Mixed inbound, test one app, and confirm a connection in Monitoring. Then add your real server node. Avoid tuning MTU, UDP buffers or IPv6 until a specific problem requires it.

See [Your first connection](/documents/guides/first-connection/) for the complete procedure.
