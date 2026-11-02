---
title: Inbound and upstream credentials
description: Issue per-device proxy secrets and reuse outbound authentication safely.
---

**Account & security → Credentials** manages two independent kinds of credentials. A management password or API token does not authenticate proxy traffic.

## Give a device access to an inbound

1. Create or choose a local user in **Administration**.
2. In **Credentials**, create an **Inbound credential** for that user. Give it a device name, optional expiry, and optional inbound/protocol restrictions.
3. Copy the generated `yp_...` secret immediately. It is shown only on creation or rotation.
4. Edit the supported inbound, select **User credentials only**, and explicitly allow that user. Save and check its runtime status.
5. Configure the client using the table below, then send real traffic and inspect **Usage & audit**.

| Client protocol | Authentication |
| --- | --- |
| HTTP / SOCKS5 | User's login name and generated secret |
| Yuubinsya | Generated secret as `password` |
| Hysteria 2 | Generated secret as `auth`; Salamander password is a separate field |
| SSTP | User's login name and newly issued or rotated device secret |

A credential's empty scope lists allow supported protocols and inbounds that already authorize its owner. They never authorize an otherwise forbidden inbound. Name credentials per device to rotate or revoke one independently; a name does not verify the physical device.

## Understand authentication modes

- **Legacy credentials** retains the protocol's original shared/anonymous behavior.
- **User credentials only** accepts only selected users' independent secrets. An empty user selection admits nobody.
- **Users and legacy credentials** explicitly accepts both. Shared-password traffic stays unattributed and independent of user revocation.

Existing inbounds without authentication settings keep legacy behavior. An older authentication object without a mode keeps mixed behavior. Supported user-authenticated listeners are HTTP, SOCKS5, Mixed, Yuubinsya, Hysteria2 and SSTP. Mixed disables SOCKS4 in user-authenticated modes. SOCKS5 UDP clients must keep their TCP association open and permit the returned UDP relay port.

Revocation, rotation or user disablement also cancels affected active sessions. To restrict destinations, configure [Traffic Access](/documents/features/traffic-access/); an inbound allowlist alone does not define destination permissions.

## Reuse a remote server's credentials

Create an **Upstream credential** for outbound nodes, then select it in the corresponding node protocol layer. It has no local user owner. Each chain layer has its own `credentialRef`; do not also supply inline authentication in that layer. Missing or incompatible references fail instead of silently reverting to another password.

## Troubleshoot a rejected secret

Check that the user is active, the credential has not expired, its protocol/inbound scopes match, and the listener explicitly permits the owner in the intended mode. Paste the raw generated secret into the correct client field. For Hysteria2, do not confuse `auth` with Salamander; for SSTP, rotate credentials issued before SSTP verifier support.

See [backend credential details](https://github.com/yuhaiin/yuhaiin/blob/main/docs/proxy-credentials.md). User authentication requires the optional server identity module; native Android retains inline credentials.
