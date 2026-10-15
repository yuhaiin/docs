---
title: "OpenVPN"
description: "VPN outbound: configuration fields, example, limits and testing."
---

This is a native, in-process OpenVPN **client outbound**. It does not launch an external OpenVPN application or create a host TUN interface. The client uses Yuhaiin's in-process IP stack to carry application TCP and UDP.

## Before you configure

1. Gateway hostname and port, and whether the server uses UDP or TCP.
2. Server CA certificate or an identity verifiable with system trust roots.
3. Username/password and/or client certificate/key as required by the server.
4. Optional tls-auth **or** tls-crypt static key from the profile, with matching key direction.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "OpenVPN example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "openvpn",
      "openvpn": {
        "gateway": "vpn.example.com:1194",
        "network": "udp",
        "username": "EXAMPLE_USER",
        "password": "REPLACE_ME",
        "ca_cert_pem": "-----BEGIN CERTIFICATE-----\nYOUR_CA_CERTIFICATE\n-----END CERTIFICATE-----",
        "auto_reconnect": true
      }
    }
  ]
}
```

## Compatibility and security limits

- The node editor does **not** parse or import `.ovpn` files: copy supported parameters from the profile.
- Unsupported: compression, TAP mode, legacy CBC/static-key data mode, tls-crypt-v2, interactive MFA, and fragmented PUSH_REPLY.
- Pushed DNS and route details are informational. Configure Yuhaiin's resolver roles and route rules explicitly.
- Rekeying can preserve sockets, but full reconnect does not migrate existing app sockets.

## If it doesn't connect

1. Check whether the gateway uses TCP or UDP, including the port and required intermediate proxy.
2. Check CA trust and exact server name. Do not turn off verification to fix a typo.
3. Compare the profile's tls-auth direction / tls-crypt key and AEAD cipher set. These modes cannot be used together.
4. If the node becomes active but internal sites fail, inspect server-pushed settings as **information** and configure Yuhaiin routes/DNS separately.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/openvpn/README.md). Avoid sharing saved credentials or full node exports in public support requests.
