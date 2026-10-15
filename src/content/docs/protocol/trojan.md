---
title: "Trojan"
description: "TLS proxy outbound: configuration fields, example, limits and testing."
---

Trojan commonly sends a password-authenticated connection through a TLS transport. The frontend template provides a `simple → tls → trojan` chain.

## Before you configure

1. Server host, port and expected TLS server name.
2. Trojan password; optional peer identity setting.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "Trojan example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "simple",
      "simple": {
        "host": "proxy.example.com",
        "port": 443
      }
    },
    {
      "type": "tls",
      "tls": {
        "enable": true,
        "servernames": [
          "proxy.example.com"
        ]
      }
    },
    {
      "type": "trojan",
      "trojan": {
        "password": "REPLACE_ME",
        "peer": "proxy.example.com"
      }
    }
  ]
}
```

## Compatibility and security limits

- A valid TLS handshake does not by itself mean the Trojan password is accepted.
- Do not configure a plain Trojan step without matching the server's transport requirements.
- The host used for socket dialing and the TLS server name can differ; copy both from the provider.

## If it doesn't connect

1. Test DNS to the gateway and TCP access to the port.
2. Check TLS certificate server name or private CA trust if the handshake fails.
3. Check password and layer order if TLS succeeds but the node rejects traffic.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go). Avoid sharing saved credentials or full node exports in public support requests.
