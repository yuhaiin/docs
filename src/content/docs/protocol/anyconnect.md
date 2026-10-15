---
title: "AnyConnect"
description: "VPN outbound: configuration fields, example, limits and testing."
---

This outbound uses a compatible AnyConnect XML login and **CSTP over TLS**. When offered by the gateway and permitted by the network, it can use a DTLS data channel.

## Before you configure

1. Compatible gateway hostname and optional port.
2. Username and password.
3. Server TLS identity or trusted certificate.
4. Optional `disable_dtls` and MTU preferences.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "AnyConnect example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "anyconnect",
      "anyconnect": {
        "gateway": "vpn.example.com",
        "username": "EXAMPLE_USER",
        "password": "REPLACE_ME",
        "disable_dtls": false
      }
    }
  ]
}
```

## Compatibility and security limits

- Some enterprise web-based login, SSO or MFA systems need flows that are not exposed by this node.
- DTLS is optional; a successful TLS session does not guarantee UDP operation.
- This client is not Cisco's full endpoint-management agent.

## If it doesn't connect

1. Check gateway URL/port and whether browser-based sign-in is mandatory.
2. If TCP works but UDP-based apps fail, test with DTLS disabled; this helps distinguish UDP path issues.
3. If certificate verification fails, import a trusted CA on the appropriate platform instead of accepting all certificates.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/anyconnect/README.md). Avoid sharing saved credentials or full node exports in public support requests.
