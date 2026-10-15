---
title: "Fortinet SSL VPN"
description: "VPN outbound: configuration fields, example, limits and testing."
---

This outbound logs into a compatible Fortinet SSL-VPN tunnel-mode gateway over HTTPS. Data runs over TLS and may move to DTLS when supported.

## Before you configure

1. Compatible FortiOS tunnel-mode gateway and username.
2. Password and, when required, the configured realm.
3. Optional one-time token or TOTP secret, plus trusted CA PEM if the gateway uses a private CA.
4. Optional `disable_dtls` and MTU.

## Example outbound node

The following is a **template**, not a working server account. Replace every hostname, address, key and credential with values from your server operator. The typed `chain` format is for the current backend; normally use **Destinations → Nodes** instead of pasting JSON into the Web UI.

```json
{
  "id": "example-node",
  "name": "Fortinet SSL VPN example",
  "origin": "manual",
  "group": "examples",
  "enabled": true,
  "chain": [
    {
      "type": "fortinet",
      "fortinet": {
        "gateway": "vpn.example.com",
        "username": "EXAMPLE_USER",
        "password": "REPLACE_ME",
        "realm": "",
        "disable_dtls": false
      }
    }
  ]
}
```

## Compatibility and security limits

- Not all FortiOS versions expose the same SSL VPN tunnel feature: FortiOS 7.6.3 and later replace SSL-VPN tunnel mode with IPsec.
- Interactive MFA methods are not universally supported; the API exposes one-time `token` or `totp_secret` fields.
- TOTP secrets are long-term credentials. Do not store or share them casually.

## If it doesn't connect

1. Confirm that your FortiOS deployment still supports SSL-VPN tunnel mode.
2. Distinguish TLS login failure from DTLS data-path failure by retrying with `disable_dtls` enabled.
3. Check realm and second-factor method; server-side requirements may not match the UI's options.
4. Use a trusted private CA rather than disabling TLS certificate validation.

## Where to go next

Check the [outbound node tutorial](/documents/features/nodes/) and [network diagnostics](/documents/features/diagnostics/). For exact fields, behavior and test coverage see the [backend source](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/net/proxy/fortinet/README.md). Avoid sharing saved credentials or full node exports in public support requests.
