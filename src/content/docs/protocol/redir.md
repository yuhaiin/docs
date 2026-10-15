---
title: "Transparent REDIR"
description: "inbound: current Yuhaiin support and configuration."
---

A REDIR inbound receives traffic redirected by operating-system firewall rules. It is an advanced alternative to explicitly configuring HTTP/SOCKS proxy clients.

## Where it fits

**Support:** inbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed inbound example

```json
{
  "id": "redir-example",
  "name": "Redirect",
  "enabled": false,
  "network": {
    "type": "tcp_udp",
    "tcp_udp": {
      "host": "127.0.0.1:12345",
      "udp": "tcp_only"
    }
  },
  "transports": [],
  "protocol": {
    "type": "redir",
    "redir": {
      "host": ""
    }
  }
}
```

The example is explanatory. Adjust listen addresses, credentials and interface permissions before enabling it.

## Fields and requirements

1. `redir` is an inbound protocol, not a remote server.
2. Operating-system redirect/firewall rules decide which packets reach the listener.

## Important limits and troubleshooting

- A REDIR listener by itself does not add firewall rules or capture every application.
- Transparent redirection may need elevated privileges and correct destination recovery.
- Test in an isolated setup before changing a server's production firewall.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go) rather than examples from old releases.
