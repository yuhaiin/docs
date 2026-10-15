---
title: SSTP
description: VPN outbound: configuration fields, example, limits and testing.
---

SSTP carries PPP over a TLS connection and uses MS-CHAPv2 authentication. In Yuhaiin it is an outbound node backed by the userspace IP stack.

## Before you configure

1. SSTP server hostname and optional port.
2. Username/password accepted by the server.
3. A TLS certificate the client can validate; optional inner MTU.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "SSTP example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "sstp",
      "sstp": {
        "gateway": "vpn.example.com",
        "username": "EXAMPLE_USER",
        "password": "REPLACE_ME",
        "insecure_skip_verify": false
      }
    }
  ]
}
```

## Compatibility and security limits

- SSTP is distinct from native SoftEther SSL-VPN and OpenVPN.
- MS-CHAPv2 is a legacy authentication method; protect credentials and use unique passwords.
- The embedded tunnel does not by itself modify your OS routing table.

## If it doesn't connect

1. If authentication fails, verify the gateway's SSTP compatibility mode, not just that it advertises 'SSL VPN'.
2. Check hostname/certificate trust when TLS negotiation fails.
3. If connection succeeds but routing fails, inspect destination selection and the local inbound.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/sstp/README.md). Avoid sharing saved credentials or full node exports in public support requests.
