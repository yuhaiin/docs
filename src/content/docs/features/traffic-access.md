---
title: Traffic access policies
description: Authorize destinations for authenticated users and groups before routing.
---

In **Account & security → Administration**, traffic groups and Traffic Access define which network destinations a user may reach. [Routing](/documents/features/routing/) chooses how allowed traffic is forwarded. A matching route does not grant access.

## Protect an entry point

1. Create users and traffic groups, and issue [inbound credentials](/documents/features/credentials/).
2. Set each supported protected inbound to **User credentials only** and choose its permitted users.
3. Configure ordered Traffic Access allow/deny rules and an explicit default, preferably deny.
4. Combine identity and destination requirements inside **all** when both must match. Separate top-level conditions are OR.
5. Validate the draft and save/activate it. Preview an active credential with an explicit resolved IP; preview evaluates the active policy, not an unsaved draft.
6. Test both an allowed and a denied destination with a real authenticated client.

Rules use first enabled match in saved order. Put a narrow deny before a broader allow when it must take precedence. Destination domains match the original name; CIDRs match the actual resolved endpoint. Domains and CIDRs within one destination condition are OR; use separate conditions inside **all** to require both. `*.example.com` excludes the apex `example.com`.

## Scope and anonymous traffic

Traffic Access starts disabled. When enabled, prefer all-inbound scope or explicitly review every unselected listener. Inside protected scope, a valid authenticated user and credential are mandatory even when the default is allow. Legacy/shared-password traffic, native TUN traffic without trusted identity, and unauthenticated direct HTTP Gateway listeners cannot acquire an identity merely from an IP address or HTTP header.

Groups do not grant management roles. Changing membership invalidates affected traffic identities and sessions. Publishing a policy rechecks retained authorizations and closes sessions that lose access.

Access settings live in the private management database and are outside ordinary configuration backups. Use [full recovery archives](/documents/features/backup/) to preserve them. See [backend policy semantics](https://github.com/yuhaiin/yuhaiin/blob/main/docs/traffic-access.md) for supported conditions, scope and revocation behavior.
