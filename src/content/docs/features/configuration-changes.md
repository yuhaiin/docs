---
title: Configuration changes and secret access
description: Review supported administrative changes and preserve masked credentials when editing.
---

Managed deployments distinguish permission to read/edit a resource from permission to read/change its secrets. Ordinary reads can show masked credentials even to administrators.

## Edit without replacing a password

Leave a saved secret's placeholder unchanged when modifying unrelated settings. It preserves the stored value; it is not an empty password or a portable credential. Explicit reveal requires `secrets:read`; replacing a secret requires `secrets:manage`, in addition to the resource permissions.

Reload after a server restart or a revision conflict before retrying a stale edit. A masked node copy is not a usable portable credential export. Avoid sharing a revealed value or unredacted original import source.

TUN lifecycle hooks, native library paths and backup restoration additionally require `system:execute`. Trusted management UI Origin changes require `security:write`.

## Review supported configuration changes

In **Account & security → Administration**, the configuration-change workflow supports staging, validation, safe differences, commit/history and explicit rollback for supported management resources. Supported resources include traffic groups, roles/assignments, access/resource policies, identity providers, audit settings, and routing rules/defaults/lists/order. Each change owns one resource in one database; prerequisites must already exist. Rollback prepares a new draft and never commits automatically.

Validation is advisory. Commit checks current permissions, references and revisions again. A competing edit can produce a conflict; retain the draft, reload current state and review it before retrying. Rollback requires current authority and valid references, and cannot recreate revoked credentials or deleted external-account sessions.

Safe differences omit reusable secrets. A history entry alone does not establish that a separate runtime activation succeeded; inspect the resource's active status as well.

See [supported change resources](https://github.com/yuhaiin/yuhaiin/blob/main/docs/configuration-changes.md) and [secret masking rules](https://github.com/yuhaiin/yuhaiin/blob/main/docs/secret-isolation.md).
