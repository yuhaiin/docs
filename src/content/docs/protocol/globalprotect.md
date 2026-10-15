---
title: GlobalProtect
description: Experimental VPN outbound: configuration fields, example, limits and testing.
---

This client connects to a **GlobalProtect gateway** using a password-based login and an SSL IP tunnel, optionally attempting ESP/UDP. It is not a replacement for the full enterprise-managed GlobalProtect application.

## Before you configure

1. A gateway hostname (not a portal discovery URL with an additional path).
2. Username and password accepted by that gateway.
3. Optional enterprise CA PEM certificate; optional device/computer name.
4. Whether to try ESP/UDP with `use_esp` (SSL remains the fallback).

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "GlobalProtect example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "globalprotect",
      "globalprotect": {
        "gateway": "vpn.example.com",
        "username": "EXAMPLE_USER",
        "password": "REPLACE_ME",
        "use_esp": false
      }
    }
  ]
}
```

## Compatibility and security limits

- No portal discovery, SAML/SSO, interactive MFA, HIP report, client certificate login, or negotiated IPv6.
- A gateway enforcing HIP or interactive login can reject the client even when credentials are correct.
- Pushed DNS, access/exclusion routes, and LAN policies are **not applied** to host networking.
- The backend can expose active gateway details; it does not log in just to show that information.

## If it doesn't connect

1. Verify you were given a **gateway**, not just the portal URL.
2. If login asks for SAML, SSO, OTP challenges, or HIP, the required feature may be unsupported.
3. If `use_esp` is enabled but UDP is unavailable, inspect active transport (`ssl` versus `esp`) before blaming DNS.
4. If login succeeds but a specific corporate host fails, inspect Yuhaiin's own DNS and routing; server-provided policy is not automatically installed.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/globalprotect/README.md). Avoid sharing saved credentials or full node exports in public support requests.
