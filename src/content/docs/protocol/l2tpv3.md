---
title: L2TPv3 pseudowire
description: Advanced unencrypted VPN outbound: configuration fields, example, limits and testing.
---

L2TPv3 transports Ethernet frames over UDP and exposes a userspace network stack for upper-layer traffic. It is for operators with a compatible remote pseudowire endpoint.

## Before you configure

1. Remote UDP gateway and compatible peer configuration.
2. For dynamic sessions, control negotiation and optional shared secret.
3. For static sessions, matching local/peer session IDs and cookies.
4. At least one IPv4/IPv6 interface prefix, with routers when used for forwarding.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "L2TPv3 pseudowire example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "l2tpv3",
      "l2tpv3": {
        "gateway": "vpn.example.com:1701",
        "remote_end_id": "branch-b",
        "sublayer": true,
        "address": "10.89.0.2/24",
        "router": "10.89.0.1"
      }
    }
  ]
}
```

## Compatibility and security limits

- Data frames are not encrypted. A control shared secret does not make the data channel confidential.
- Static mode requires both peers to agree on session IDs, UDP endpoints, cookies and L2-specific sublayer.
- IPv4/IPv6 addresses inside the virtual network are distinct from the public UDP gateway.
- Only UDP encapsulation is supported, not raw IP protocol 115.

## If it doesn't connect

1. Match session IDs and cookie direction carefully with the server; names can differ between implementations.
2. Confirm whether the server enables dynamic control or static session mode.
3. Ensure the interface address and router are inside the intended pseudowire network.
4. Prefer an authenticated encrypted underlay for sensitive traffic.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/l2tp/README.md). Avoid sharing saved credentials or full node exports in public support requests.
