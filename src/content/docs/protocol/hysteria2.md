---
title: "Hysteria 2"
description: "QUIC proxy inbound and outbound: configuration fields, example, limits and testing."
---

Hysteria 2 uses QUIC over UDP with authentication and encrypted transport. Yuhaiin supports it as an outgoing node and as a server-side inbound.

## Before you configure

1. Host (with UDP port), authentication token and TLS identity of the Hysteria 2 server.
2. Optional Salamander obfuscation password if the server enables it.
3. Optional upload/download bandwidth limits and port/address hopping settings.
4. For a server inbound, a QUIC listening network, TLS certificate and matching auth.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "Hysteria 2 example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "hysteria2",
      "hysteria2": {
        "host": "vpn.example.com:443",
        "auth": "REPLACE_ME",
        "tls": {
          "enable": true,
          "servernames": [
            "vpn.example.com"
          ]
        }
      }
    }
  ]
}
```

## Compatibility and security limits

- Hysteria 2 requires a suitable UDP route; an upstream TCP-only proxy cannot transparently carry native QUIC.
- Upload/download bandwidth fields are **bytes per second** in the current contract; zero selects automatic congestion control.
- Port hopping and address hopping are optional; not every server is configured for them.
- Client and server must agree on TLS/obfuscation; do not disable certificate verification to work around wrong SNI.

## If it doesn't connect

1. Check UDP reachability first; TCP Ping via another node does not prove UDP can traverse the network.
2. Match auth and Salamander password with server settings.
3. If hopping fails, temporarily disable it and confirm the base server endpoint works.
4. Check server certificate hostname and your client's configured TLS server name.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/docs/hysteria2.md). Avoid sharing saved credentials or full node exports in public support requests.
