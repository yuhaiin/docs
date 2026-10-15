---
title: Configuration model
description: Current node, inbound and routing API shapes with code references.
---

Yuhaiin's current API uses **typed resource contracts**. Old examples built around `server.servers`, a single monolithic `bypass_file` or node `protocols` are historical and should not be pasted into the current API.

The Web UI is recommended for ordinary changes because it creates and validates these resource structures.

## Outbound nodes

Nodes have `id`, `name`, `group`, `origin`, `enabled` and `chain` fields. A chain is a list of typed protocol entries, in order.

Example **shape** for a simple Direct node (illustrative; generated IDs may differ):

```json
{
  "id": "direct-example",
  "name": "Direct",
  "group": "default",
  "origin": "manual",
  "enabled": true,
  "chain": [
    { "type": "direct", "direct": {} }
  ]
}
```

A proxy node might begin with `{ "type": "simple", "simple": { "host": "proxy.example.com", "port": 1080 } }` and then use `{ "type": "socks5", "socks5": { "user": "", "password": "" } }`. Use the node editor rather than assuming fields from an older guide.

Source: [Node contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go).

## Inbound resources

The current inbound contract has four structural fields besides its identifier and name:

```json
{
  "id": "local-example",
  "name": "Local proxy",
  "enabled": true,
  "network": {
    "type": "tcp_udp",
    "tcp_udp": { "host": "127.0.0.1:9002", "udp": "enabled" }
  },
  "transports": [],
  "protocol": {
    "type": "mixed",
    "mixed": { "username": "", "password": "" }
  }
}
```

Here `network` decides how the listener is created; `transports` add optional framing or encryption; `protocol` handles accepted traffic. TUN instead uses the `empty` network type. Source: [Inbound contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go).

## Routing

Routing configuration identifies a `defaultMode`, `defaultTarget`, `directResolver`, `proxyResolver` and other behavior flags. A rule defines `mode`, `target` and matching expressions in `rules`. Targets may represent a node, selector or currently selected default.

```json
{
  "revision": 0,
  "defaultMode": "direct",
  "defaultTarget": { "type": "selected" },
  "directResolver": "",
  "proxyResolver": "",
  "resolveLocally": false,
  "udpProxyFqdnStrategy": ""
}
```

The object above is a **field-oriented illustration**, not a recommended configuration to import wholesale. Revisions and IDs are maintained by the service. Source: [Route contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/route/types.go).

## Why examples may differ between versions

The Web UI's generated clients and the Go backend must agree about field names and variants. If you use a separately hosted frontend, verify it was built for the backend version you are running. API clients should consult the current tagged contract definitions rather than relying on copied JSON from a previous release.
