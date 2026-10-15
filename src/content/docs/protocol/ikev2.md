---
title: IKEv2 / IPsec
description: VPN outbound: configuration fields, example, limits and testing.
---

Yuhaiin's IKEv2 outbound negotiates an IPsec tunnel, transporting application TCP/UDP through the in-process ESP stack. It does not require a host OS VPN connection.

## Before you configure

1. Gateway address and local/client identity.
2. Pre-shared key to authenticate the gateway.
3. Expected server identity, if configured.
4. Optional username/password when the gateway requires EAP-MSCHAPv2.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "IKEv2 / IPsec example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "ikev2",
      "ikev2": {
        "gateway": "vpn.example.com",
        "local_id": "user@example.com",
        "server_id": "vpn.example.com",
        "psk": "REPLACE_ME",
        "tcp": false
      }
    }
  ]
}
```

## Compatibility and security limits

- The current node contract exposes PSK + optional EAP-MSCHAPv2. Other native lower-layer options are not all exposed in the UI.
- TCP encapsulation requires a server supporting RFC 8229. The ordinary path is UDP/NAT-T.
- EAP-MSCHAPv2 uses legacy password-derived cryptography and is vulnerable to offline guessing. Prefer stronger authentication on the server when available.

## If it doesn't connect

1. Verify the gateway's local/server ID format and PSK. Both identifiers are meaningful even when the hostname is correct.
2. Try UDP mode first unless the server specifically supports TCP encapsulation.
3. If EAP authentication fails, confirm username/password and that the server permits EAP-MSCHAPv2.
4. Do not assume an IPsec gateway configured only for certificates can use the current node form.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/ikev2/README.md). Avoid sharing saved credentials or full node exports in public support requests.
