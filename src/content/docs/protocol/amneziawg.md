---
title: "AmneziaWG"
description: "VPN outbound: configuration fields, example, limits and testing."
---

AmneziaWG v3 uses the official `amneziawg-go` userspace engine integrated into Yuhaiin's in-process IP stack. Its obfuscation settings must match those on the peer.

## Before you configure

1. Private key, local tunnel address prefix and peer public key.
2. Peer's outer endpoint host:port and allowed IP prefixes.
3. Optional preshared key and keepalive.
4. Amnezia-specific obfuscation parameters (`jc`, `jmin`, `jmax`, `s1`–`s4`, `h1`–`h4`, `i1`–`i5`, etc.) obtained from the server.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "AmneziaWG example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "amneziawg",
      "amneziawg": {
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
        "jc": 4,
        "jmin": 40,
        "jmax": 70
      }
    }
  ]
}
```

## Compatibility and security limits

- `endpoint` at the top level is the **local tunnel address list**; the peer's `endpoint` is the **remote server host:port**.
- This is not a general WireGuard substitute if the server expects Amnezia-specific packet headers.
- Transport is UDP-based; compatible UDP connectivity is required.

## If it doesn't connect

1. Compare tunnel address, peer public key and allowed IP ranges with the official peer configuration.
2. Check the obfuscation parameters as a set; partial or copied defaults may not match your server.
3. If handshake counters do not advance, verify outer UDP path before modifying DNS rules.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/amneziawg/README.md). Avoid sharing saved credentials or full node exports in public support requests.
