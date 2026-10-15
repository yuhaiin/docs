---
title: How Yuhaiin processes traffic
description: Architecture explanation without requiring low-level network experience.
---

This is the high-level traffic path, useful when diagnosing a problem or contributing code.

```text
Application / operating system
            |
      Inbound listener
  (HTTP, SOCKS, TUN, ...)
            |
      DNS and routing
  (host lists, rules, GeoIP)
            |
    Selected outbound node
  (Direct, proxy, VPN, ...)
            |
         Network
```

The three parts can fail independently: an app might not send traffic to its inbound; an inbound may work but route to the wrong node; or a selected node may be unreachable.

## Node chains

The current `pkg/contract/node` defines each node's outgoing chain as typed protocol steps. A proxy service may require a socket connection followed by TLS/WebSocket framing followed by protocol authentication. A VPN implementation may handle its own packet/stream transport.

## Inbound layers

`pkg/contract/inbound` separates listening network, optional transport layers and protocol. A TUN inbound has no TCP/UDP listen socket; it obtains packets from a virtual interface.

## Route evaluation

`pkg/contract/route` defines default routing and rules. Rules can combine host, process, inbound, port, network, and GeoIP conditions. Lists and selectors are separate resources that rules may reference.

## Diagnostics and the control plane

The Web UI uses backend HTTP/JSON APIs. Network diagnostics checks specific backend paths, but does not drive a packet through every layer. Real connections and logs provide complementary evidence.

For the actual types and implementation, consult the [Go backend](https://github.com/yuhaiin/yuhaiin) and the [React frontend](https://github.com/yuhaiin/yuhaiin-react). Interface and API contracts are the source of truth if this overview differs from a new release.
