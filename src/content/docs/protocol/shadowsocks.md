---
title: Shadowsocks
description: Proxy outbound: configuration fields, example, limits and testing.
---

Shadowsocks is an encrypted proxy. In Yuhaiin's current node model, the client normally uses a simple network dialer followed by a Shadowsocks protocol step.

## Before you configure

1. Server host and port.
2. AEAD cipher method and matching password.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "Shadowsocks example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "simple",
      "simple": {
        "host": "proxy.example.com",
        "port": 8388
      }
    },
    {
      "type": "shadowsocks",
      "shadowsocks": {
        "method": "aes-256-gcm",
        "password": "REPLACE_ME"
      }
    }
  ]
}
```

## Compatibility and security limits

- The current outbound contract uses `chain`, not the former `protocols` array.
- Shadowsocks is an outbound-only protocol in the typed inbound contract; do not invent a Shadowsocks listener in that API.
- The server must recognize the same method and password; TLS is not automatically added.

## If it doesn't connect

1. Verify host/port and the exact cipher. A wrong password often looks like a connection that stalls after reaching the port.
2. Test one TCP application first, then UDP if needed.
3. Confirm the app uses a local inbound and is routed to this node.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go). Avoid sharing saved credentials or full node exports in public support requests.
