---
title: L2TPv2
description: Unencrypted VPN outbound: configuration fields, example, limits and testing.
---

This client runs L2TPv2 over UDP and negotiates PPP. It is intended for compatible networks where the required encryption, if any, is provided separately.

## Before you configure

1. Server gateway, usually including UDP port 1701.
2. Username/password for PPP if required.
3. Authentication method (`auto`, `pap`, `chap-md5`, or `mschap-v2`).
4. Optional L2TP control shared secret and MTU.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "L2TPv2 example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "l2tp",
      "l2tp": {
        "gateway": "vpn.example.com:1701",
        "username": "EXAMPLE_USER",
        "password": "REPLACE_ME",
        "auth_type": "auto",
        "auto_reconnect": true
      }
    }
  ]
}
```

## Compatibility and security limits

- **This node does not implement IPsec or MPPE. L2TP control authentication does not encrypt user traffic.**
- PAP sends passwords without cryptographic protection; CHAP/MS-CHAPv2 use legacy algorithms.
- Optional IPv6CP interface negotiation does not automatically establish global IPv6 routing; further address setup may be needed.
- Underlying UDP must be supported by any preceding outbound in a chain.

## If it doesn't connect

1. Confirm whether your server requires L2TP **with IPsec**: that expectation is not met by this bare client.
2. Check PPP authentication variant and credentials.
3. If IPv6 is requested, inspect both server prefix assignment and MTU.
4. Use another encrypted VPN method when confidentiality is required.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/l2tp/README.md). Avoid sharing saved credentials or full node exports in public support requests.
