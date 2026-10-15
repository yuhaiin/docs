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

## Translate a provider profile into supported fields

Yuhaiin's OpenVPN outbound is a **native client**, not a wrapper around the OpenVPN CLI. It does not accept an `.ovpn` file directly. Review the profile's directives and enter supported values in the node editor:

| Profile information | Yuhaiin field or behavior |
| --- | --- |
| `remote host port` | `gateway` includes hostname and port, e.g. `vpn.example.com:1194` |
| `proto udp` or `proto tcp` | `network`, either `udp` or `tcp` |
| `ca` | PEM contents in `ca_cert_pem`, or validated system roots |
| `cert` / `key` | `client_cert_pem` and `client_key_pem` if the server requires certificates |
| User/password login | `username` and `password` |
| `tls-auth` / `tls-crypt` | `tls_auth_key` **or** `tls_crypt_key`, never both |
| `key-direction` | `key_direction`: 0 or 1, matching the profile |
| `data-ciphers` | `data_ciphers` (AEAD suites supported by the client) |

Do not blindly copy directives such as `script-security`, route-update hooks or compression: they are not generic node settings. The backend explicitly does not execute scripts or install server-pushed routes.

## Advanced: handshake, rekey and reconnect

The [native implementation notes](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/openvpn/README.md) describe separate failure paths:

- **TLS/authentication failure:** validate the CA/server identity, credentials and static-key direction. Avoid disabling verification.
- **Data channel cipher mismatch:** inspect the offered `data_ciphers` and the server's selected AEAD suite.
- **Soft rekey:** a successful negotiated rekey can retain established application sockets.
- **Full reconnect:** `auto_reconnect` recreates the tunnel after eligible failures, but existing application sockets are not migrated.
- **Remote network works but internal hostnames fail:** server-pushed DNS and routes are available as information, but Yuhaiin's own routing and resolver roles must be configured separately.

The source's documented interoperability runner starts a stock OpenVPN server in Podman or Docker. The **server** needs elevated network permissions; Yuhaiin's Go client does not. Use the source's test matrix to distinguish unit tests from actual gateway compatibility.
