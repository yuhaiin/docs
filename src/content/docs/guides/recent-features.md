---
title: Recent capabilities
description: Find the new management, traffic policy, reliability and inbound guides.
---

This guide covers capabilities checked against backend `main` at `077027bd` on **2 November 2026**, together with frontend `main` at `6d1b3569`. Your installed binary and paired Web UI must include a feature before its controls and APIs are available. An older tagged release may differ from current main.

| What you want to do | Guide |
| --- | --- |
| Initialize management login, delegate roles or link OIDC | [Accounts and sign-in](/documents/features/account-security/) |
| Issue a secret per device or reuse remote credentials | [Credentials](/documents/features/credentials/) |
| Allow users/groups to reach specific destinations | [Traffic Access](/documents/features/traffic-access/) |
| Shape bandwidth and set user/group/device quotas | [Traffic Control](/documents/features/traffic-control/) |
| Fail over between nodes or choose by measurements | [Automatic selectors](/documents/features/selectors/) |
| Inspect user usage, sessions and administrative actions | [Usage and audit](/documents/features/usage/) |
| Review supported changes and edit masked secrets | [Configuration changes](/documents/features/configuration-changes/) |
| Recover an installation or protect a software update | [Backup and recovery](/documents/features/backup/) |
| Issue and renew HTTPS site certificates | [Certificates](/documents/features/certificates/) |
| Reverse proxy an app or apply HTTP rules | [HTTP Gateway](/documents/features/gateway/) |
| Run trusted SSH commands through isolated networking | [Experimental SSH inbound](/documents/protocol/ssh/) |
| Override DNS answers by name and question type | [Custom DNS replies](/documents/features/dns/#custom-replies) |

## Before upgrading

Keep an enrolled local administrator and verified backup available. Configuration snapshots do not preserve the private management identity database; choose a full encrypted recovery archive when account and policy state must survive. Executable rollback does not reverse a database migration.

Automatic selection, Traffic Access, shaping and scheduled full backups require explicit configuration. Native Android/core-only deployments omit the optional server identity features. Automatic disruptive recovery/update maintenance is currently qualified for root-owned Linux systemd or lingering systemd user services. SSH inbound is experimental and Linux-only.

The backend [capability overview](https://github.com/yuhaiin/yuhaiin/blob/main/readme.md) and each linked guide describe platform and measurement limits. Start with [first connection](/documents/guides/first-connection/) if you are setting up Yuhaiin for the first time.
