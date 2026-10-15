---
title: HTTP proxy
description: Proxy inbound and outbound: configuration fields, example, limits and testing.
---

An HTTP proxy supports ordinary web requests and the CONNECT method for tunneling TCP streams. It is not the same as a full-device VPN.

## Before you configure

1. For an outbound: proxy host/port and optional Basic authentication.
2. For an inbound: local listener, optional username/password and suitable network settings.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "HTTP proxy example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "simple",
      "simple": {
        "host": "proxy.example.com",
        "port": 8080
      }
    },
    {
      "type": "http",
      "http": {
        "user": "EXAMPLE_USER",
        "password": "REPLACE_ME"
      }
    }
  ]
}
```

## Compatibility and security limits

- Outbound fields use `user`/`password`; inbound HTTP fields use `username`/`password`.
- Plain HTTP CONNECT does not provide generic native UDP proxying.
- An HTTP proxy configured on localhost affects only applications that actually use it.

## If it doesn't connect

1. Test a TCP HTTPS site using a local Mixed inbound.
2. Use curl explicitly: `curl --proxy http://127.0.0.1:9002 https://example.com/`.
3. If TLS sites fail but HTTP sites work, check CONNECT handling and the chosen remote server.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go). Avoid sharing saved credentials or full node exports in public support requests.
