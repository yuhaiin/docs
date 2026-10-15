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

## Follow a failure through the data path

For a real incident, capture one failing application request and check each boundary independently:

| Boundary | What to inspect | Source to start reading |
| --- | --- | --- |
| Application → inbound | Listener address, enabled state, binding errors, per-inbound events | [Inbound runtime](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/inbound/inbound.go) |
| Inbound → router | Hostname visibility, network/port, inbound identity | [Route contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/route/types.go) |
| Router → selected node | Rule order, default mode, selected TCP/UDP target, activation revisions | [Route API client](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/route.ts) |
| Node → remote endpoint | Protocol chain, credentials, TLS, transport and endpoint reachability | [Node contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) |
| DNS / FakeIP | Resolver roles, cache, synthetic address mapping | [Resolver contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/resolver/types.go) |

A connection missing from the monitoring page suggests you should start **before routing**, with the app and inbound. A visible connection that fails after selecting a target calls for route/node investigation instead.

## Saved state is not runtime state

Most resource editors persist a desired configuration. Network listeners may still fail to bind, and routing rules may be saved without having been successfully applied. Treat the **stored inbound**, **inbound runtime status** and **routing activation status** as separate observables.

On a clean backend installation, the imported `mixed` listener is `127.0.0.1:1080`; a newly created Local preset in React proposes `127.0.0.1:9002`. This is one concrete example of why a UI template must not be documented as an existing runtime default.

## For contributors: follow the contract boundaries

The current implementation separates typed persisted resources (`pkg/contract/*`, `pkg/store/*`) from the running route/listener state. The frontend uses generated contract types and RPC mapping rather than posting arbitrary JSON to each displayed logical URL.

Read [Developer guide](/documents/reference/developer-guide/) for a reproducible workflow and [Configuration model](/documents/reference/configuration/) for the typed resource shapes. Follow source references instead of treating historic `protocols` node examples as current.
