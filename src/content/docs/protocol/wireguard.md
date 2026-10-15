---
title: "WireGuard"
description: "VPN outbound: configuration fields, example, limits and testing."
---

WireGuard creates an encrypted IP tunnel between a local key and one or more remote peers. The Yuhaiin implementation uses a userspace stack for application traffic.

## Before you configure

1. Your own private key and a local tunnel address prefix.
2. Remote peer public key, outer endpoint and allowed IPs.
3. Optional preshared key, persistent keepalive and MTU.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "WireGuard example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "wireguard",
      "wireguard": {
        "secretKey": "REPLACE_BASE64_PRIVATE_KEY",
        "endpoint": [
          "10.8.0.2/32"
        ],
        "peers": [
          {
            "publicKey": "REPLACE_BASE64_PEER_PUBLIC_KEY",
            "endpoint": "vpn.example.com:51820",
            "allowedIps": [
              "0.0.0.0/0"
            ],
            "keepAlive": 25
          }
        ],
        "mtu": 1400
      }
    }
  ]
}
```

## Compatibility and security limits

- The node's outer peer endpoint and local interface addresses are different: `endpoint` in the root object lists local prefixes, while the peer has the server endpoint.
- WireGuard uses UDP outside the tunnel even when it carries TCP inside.
- The Yuhaiin outbound does not, on its own, register a host-wide TUN or change OS routing.

## If it doesn't connect

1. Ensure the peer is configured to recognize your public key and local tunnel IP.
2. Make sure your peer's `allowedIps` and routing policy include the target network.
3. Verify UDP reachability and firewall policy before tuning MTU.
4. If only certain sites fail, inspect destination routing or DNS rather than immediately replacing keys.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go). Avoid sharing saved credentials or full node exports in public support requests.

## Understand the two different endpoints

WireGuard node configuration uses `endpoint` in **two places**, and they have different meanings:

| Field | Meaning |
| --- | --- |
| `wireguard.endpoint` | An array of **local tunnel address prefixes**, e.g. `10.8.0.2/32` |
| `wireguard.peers[].endpoint` | **Remote UDP server** address, e.g. `vpn.example.com:51820` |
| `wireguard.peers[].allowedIps` | IP prefixes accepted/routed via that peer inside the VPN |
| `wireguard.peers[].publicKey` | Identity of the remote peer |
| `wireguard.secretKey` | This client's private key; never publish it |
| `wireguard.mtu` | Packet size to use inside the encrypted link |

This is an **outbound** used by Yuhaiin's in-process IP stack. It does not, by itself, create a system TUN interface, install a host default route or replace the OS DNS configuration. The separate [TUN guide](/documents/guides/tun/) explains how applications reach Yuhaiin.

## Advanced: a failed handshake versus unreachable destinations

First prove UDP can reach the peer's **outer** endpoint. Then compare the server's configured peer public key, address assignment and allowed IPs. Finally test an inner destination through the node.

A tunnel can establish without automatically making a particular internal subnet reachable. Inspect the peer's allowed IPs, the destination route selected by Yuhaiin and the DNS answer for the target hostname. If an application never reaches the inbound, changing WireGuard keys or MTU cannot fix it.

The node contract defines `Wireguard` and `WireguardPeer` separately in [`pkg/contract/node/types.go`](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go). Notice the spelling: `allowedIps` and `keepAlive` use camelCase in the JSON shape. Do not copy a conventional wg-quick configuration verbatim into these JSON fields.
