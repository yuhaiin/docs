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

## Bandwidth and hopping: exact field units

The [Go node contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) uses `upload_bps` and `download_bps` in **bytes per second**, not bits per second. Zero selects automatic congestion control rather than a hard zero-throughput limit. If a provider gives bit/s rates, convert units before entering an API payload; check the Web UI's own units rather than assuming they are the same.

The client can also use `hop_addresses` and optional `hop_interval_seconds`, `min_hop_interval_seconds` and `max_hop_interval_seconds`. These intervals are **seconds**; zero selects the implementation default of 30 seconds. Fixed and random hopping intervals cannot be configured together, and the contract requires a minimum of five seconds.

Port/address hopping is not a magic connectivity fix. First confirm the base `host` can authenticate over UDP and validate TLS, then add the hopping settings expected by the server.

## Advanced: distinguish transport failure from authentication

| Symptom | Inspect first |
| --- | --- |
| UDP packets never reach the server | Local firewall, provider UDP endpoint, intermediate proxy capabilities |
| QUIC/TLS handshake fails | TLS identity, server name, certificate chain and network path |
| QUIC connects but requests are rejected | Hysteria authentication token and server policy |
| Only hopping fails | Base endpoint first; interval and address/port pool second |
| Small requests work; large transfers fail | MTU/path changes and negotiated congestion control |

The server-side **Hysteria 2 inbound** is a separate typed configuration from the client outbound. Do not copy outbound fields directly into an inbound object. Refer to the [inbound contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go) and [Advanced inbounds](/documents/reference/advanced-inbounds/) for listener/TLS requirements.
