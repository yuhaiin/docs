---
title: Accounts, roles and sign-in
description: Initialize management access, delegate permissions and link an identity provider.
---

The standalone server uses local management accounts. **Account & security** contains **Account**, **Credentials**, **Usage & audit** and **Administration**. Pages and actions depend on your effective permissions.

## First administrator

1. Start Yuhaiin and read the **Initialization code** from local startup output or service logs.
2. Open the Web UI, choose the controller URL and select **Create administrator**.
3. Enter the code and choose a login name and password. The code expires after 15 minutes; restart an uninitialized server to obtain another.
4. After enrollment, sign in normally. Initialization closes permanently; later restarts do not print another setup code.

Use loopback HTTP for local access or trusted HTTPS for remote management. Keep the management listener restricted as described in [Security](/documents/guides/security/). Legacy `-u`/`-p` flags and HTTP Basic credentials no longer grant standalone management access. For lost credentials, use the stopped-server local recovery procedure in the [management authentication guide](https://github.com/yuhaiin/yuhaiin/blob/main/docs/MANAGEMENT_AUTH.md).

Native Android and core embeddings without the identity module use local-only management. They have no account enrollment or identity database; the paired UI hides account controls. This is separate from standalone server authentication.

## Delegate management permissions

In **Administration**, manage users and custom roles. Effective permissions combine the built-in base role and assigned custom roles:

| Base role | Intended use |
| --- | --- |
| Admin | Full administration; retain an enrolled local administrator for recovery |
| Read-only | Inspect configuration without changing it |
| Proxy-only (`none`) | Own identity, inbound credentials and usage; add custom permissions for a narrowly scoped operator |

Traffic groups control network-policy membership; they do not grant management permissions. A custom role with broad permissions does not replace the protected local administrator for last-administrator checks.

In **Account**, inspect your effective permissions, register supported passkeys, link external accounts and revoke sessions. API tokens have issuance-time scopes as well as the owner's current permissions: promoting a user does not broaden an existing token.

## Optional OpenID Connect

1. In **Administration**, add an identity provider with its exact HTTPS issuer, display name and client ID.
2. Register the displayed callback at your provider using Authorization Code with PKCE S256. Set a client secret for a confidential client.
3. Save, sign in locally and explicitly link the external identity from **Account**.
4. Test the linked sign-in while retaining working local credentials.

Matching emails or provider group/role claims do not automatically create accounts or grant permissions. Disabling a provider revokes its sessions but retains links; deletion removes links. External-provider logout alone does not revoke an issued local session. Use local session controls when needed.

See the backend guides for [roles](https://github.com/yuhaiin/yuhaiin/blob/main/docs/management-roles.md) and [OIDC](https://github.com/yuhaiin/yuhaiin/blob/main/docs/oidc.md), and the [proxy credential guide](/documents/features/credentials/) for traffic authentication.
