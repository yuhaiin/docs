---
title: SOCKS5
description: Proxy inbound and outbound: configuration fields, example, limits and testing.
---

SOCKS5 is an application proxy. The backend can accept SOCKS5 inbound traffic, or connect to a remote SOCKS5 server as an outbound.

## Before you configure

1. For an outbound: remote host/port and optional username/password.
2. For an inbound: listening host/port, optional credentials and whether UDP associate is supported.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "SOCKS5 example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "simple",
      "simple": {
        "host": "proxy.example.com",
        "port": 1080
      }
    },
    {
      "type": "socks5",
      "socks5": {
        "user": "EXAMPLE_USER",
        "password": "REPLACE_ME"
      }
    }
  ]
}
```

## Compatibility and security limits

- The outbound fields are `user` and `password`; inbound fields are `username`, `password`, and `udp`. These structures are distinct.
- SOCKS5 UDP support requires compatible server and client behavior; TCP success does not imply UDP works.
- The local Mixed preset accepts SOCKS5 and HTTP on the same port.

## If it doesn't connect

1. Try a browser through a Local SOCKS5 or Mixed inbound and check Connections.
2. If authentication fails, compare the server's username/password rather than substituting inbound credentials.
3. For UDP applications, confirm both inbound and outbound support the required UDP behavior.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go). Avoid sharing saved credentials or full node exports in public support requests.
