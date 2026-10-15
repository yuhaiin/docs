---
title: "ShadowsocksR"
description: "outbound: current Yuhaiin support and configuration."
---

ShadowsocksR adds legacy obfuscation and authentication modes around the Shadowsocks family. Use it only with servers that explicitly support ShadowsocksR.

## Where it fits

**Support:** outbound. Consult the [Node editor](/documents/features/nodes/) for outgoing chain steps and [Inbounds](/documents/features/inbounds/) for traffic entry.

## Typed outbound example

This is a structural example, **not working credentials**. Replace placeholders and match all additional transport requirements of your remote server.

```json
{
  "id": "example-node",
  "name": "ShadowsocksR example",
  "origin": "manual",
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
      "type": "shadowsocksr",
      "shadowsocksr": {
        "server": "proxy.example.com",
        "port": "8388",
        "method": "aes-256-cfb",
        "password": "REPLACE_ME",
        "obfs": "plain",
        "obfsparam": "",
        "protocol": "origin",
        "protoparam": ""
      }
    }
  ]
}
```

## Fields and requirements

1. `server`, `port`: server address and string-form port as defined in the current contract.
2. `method`, `password`: encryption and secret.
3. `obfs`, `obfsparam`, `protocol`, `protoparam`: matching server-side modes.

## Important limits and troubleshooting

- ShadowsocksR and Shadowsocks are not drop-in interchangeable.
- Cipher/mode combinations are legacy; choose a newer supported protocol if you control both ends.
- If a server rejects the connection, inspect the obfs/protocol values before modifying TLS or DNS.

When testing, first confirm that the application reaches an enabled inbound. Then check the route target, outbound credentials and [Network diagnostics](/documents/features/diagnostics/). The frontend UI can differ by platform, so use the supported fields from the [current Go contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) rather than examples from old releases.
