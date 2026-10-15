---
title: "SoftEther native SSL-VPN"
description: "Experimental VPN outbound: configuration fields, example, limits and testing."
---

This is a client for the **native SoftEther SSL-VPN protocol**, not for SoftEther Server's separately supported SSTP and OpenVPN compatibility modes. It uses a userspace network stack without creating a host TAP device.

## Before you configure

1. Server gateway and port, ordinarily 443.
2. Virtual hub name, usually `DEFAULT`, and server-issued credentials or supported certificate authentication.
3. A working DHCP gateway on the remote virtual network, or both a static IPv4 address and router.
4. Optional UDP acceleration, IPv6 static address/router and reconnect settings.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "SoftEther native SSL-VPN example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "softether",
      "softether": {
        "gateway": "vpn.example.org:443",
        "hub": "DEFAULT",
        "username": "EXAMPLE_USER",
        "password": "REPLACE_ME",
        "auto_reconnect": true
      }
    }
  ]
}
```

## Compatibility and security limits

- Default address assignment needs remote DHCP (e.g. SecureNAT). Supplying only `address` without `router` is not enough for static IPv4.
- Optional IPv6 requires **both** `ipv6_address` and `ipv6_router`; automatic SLAAC/DHCPv6 are not implemented.
- UDP Acceleration v2 requires a direct suitable UDP path; it can fall back to TLS and does not work through every upstream.
- No host-wide kill switch or automatically applied pushed DNS/split routing; sessions are rebuilt after reconnect.

## If it doesn't connect

1. Check hub name and user permissions on the SoftEther server.
2. If authentication succeeds but traffic never flows, check remote DHCP/route/SecureNAT settings.
3. For optional UDP acceleration, compare behavior with it disabled; not all server/transport paths can use it.
4. When using manual IPv6, verify both address/router and MTU at least 1280.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/softether/README.md). Avoid sharing saved credentials or full node exports in public support requests.
