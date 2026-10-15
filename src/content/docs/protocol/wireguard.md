---
title: WireGuard
description: VPN outbound: configuration fields, example, limits and testing.
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
