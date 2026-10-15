---
title: "Developer guide: contracts, API and runtime"
description: "Understand Yuhaiin's persistence, RPC transport, runtime state, and a source-backed debugging workflow."
---

This chapter is for contributors, automation authors and operators who need more than the basic Web UI walkthrough. It documents the boundaries visible in the current Go backend and React frontend. For the basic traffic path, see [Architecture](/documents/reference/architecture/).

## 1. Pick the layer you are trying to change

Yuhaiin is not a single configuration object. Editing a UI field may involve a typed resource, persistence, runtime activation and an independent network listener. Distinguish these boundaries before debugging:

| Layer | Responsibility | Where to look |
| --- | --- | --- |
| Go contracts | JSON-visible resource shapes and validation | [`pkg/contract`](https://github.com/yuhaiin/yuhaiin/tree/main/pkg/contract) |
| SQLite store / migrations | Save resources and import older configurations | [`pkg/store`](https://github.com/yuhaiin/yuhaiin/tree/main/pkg/store), [`pkg/legacy/chore/sqlite_db.go`](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/legacy/chore/sqlite_db.go) |
| Runtime | Create and remove actual inbounds, routes, nodes and DNS paths | [`pkg/inbound`](https://github.com/yuhaiin/yuhaiin/tree/main/pkg/inbound), [`pkg/route`](https://github.com/yuhaiin/yuhaiin/tree/main/pkg/route) |
| Frontend contracts | TypeScript representation of the Go types and UI defaults | [`src/contract`](https://github.com/yuhaiin/yuhaiin-react/tree/main/src/contract) |
| Frontend API / pages | Dispatch operations, render edit and runtime status | [`src/api`](https://github.com/yuhaiin/yuhaiin-react/tree/main/src/api), [`src/docs`](https://github.com/yuhaiin/yuhaiin-react/tree/main/src/docs) |

For example, a saved inbound with `enabled: true` is **desired state**. A port collision may still prevent an actual listener from starting. Consult its runtime status and events, not just the saved JSON.

## 2. Initialization is different from a New preset

This distinction matters to both documentation and migration code:

- The backend's [`DefaultSetting()`](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/legacy/schema/config/default.go) initializes an **enabled Mixed** inbound at **`127.0.0.1:1080`**.
- On a fresh state database, [`SqliteDB`](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/legacy/chore/sqlite_db.go) uses that default when importing initial configuration, then migrates it to the typed plain model.
- The React [`presetInbound()`](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/docs/inbound/presets.ts) proposes **`127.0.0.1:9002`** when the user explicitly **creates another Local** inbound. It proposes `0.0.0.0:9002` for a new LAN inbound.
- Once a user saves a different address, **the persisted address wins**. Neither initial constant is a reliable way to inspect an existing installation.

A testable statement is therefore: "On a clean backend installation, check the existing Mixed listener at 127.0.0.1:1080." A misleading statement is: "The default Local inbound always uses 9002."

Do not change the frontend New preset to `1080` merely to make these constants equal. The existing default listener may already occupy that port.

## 3. Typed outbound nodes

A node has metadata and an ordered `chain` of typed protocol steps. Each entry has a `type` discriminator and its corresponding payload. An outbound SOCKS5 step uses **`user`**, whereas an inbound SOCKS5/Mixed server uses **`username`**. They are separate contracts with different field names.

Refer to [Go node types](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/node/types.go) and [Inbound types](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/inbound/types.go). The frontend's [node templates](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/docs/node/templates.ts) can illustrate a valid layer order, but must not replace backend verification.

Before publishing a JSON example, check the discriminator, field spelling, unit and whether the referenced transport exists in the current branch. Many historical examples used the obsolete outbound `protocols` array; current contracts use `chain`.

## 4. Inbound resource lifecycle

The inbound contract separates:

- `network`: the bound socket (`tcp_udp`, `quic`) or an internal source (`empty` for TUN).
- `transports`: optional framing layers, such as TLS or WebSocket.
- `protocol`: HTTP, SOCKS5, Mixed, TUN or other accepted traffic.
- `enabled`: desired operational state.

The [inbound store](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/store/inbound.go) saves typed resources to `inbounds_v2`. The [contract store](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/inbound/contract_store.go) applies saved entries into the listener runtime. The React [inbound API client](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/inbounds.ts) exposes separate calls for **saved inbounds**, **runtime status**, **events** and **retry**.

When an inbound refuses connections:

1. Check the actual `network.tcp_udp.host` instead of guessing its port.
2. Check whether the saved resource is enabled and whether its runtime listener reports an error.
3. Check whether another process already owns that address.
4. Try a single explicit client request through the listener.
5. Only after a successful inbound test investigate routing and the remote node.

For full variants and platform limits, see [Advanced inbounds](/documents/reference/advanced-inbounds/).

## 5. Rule revision and activation

Routing edits are not always effective immediately. The [route contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/route/types.go) exposes `savedRevision`, `appliedRevision`, `applying` and `error` in activation status.

When debugging a changed rule, compare the revisions **before** drawing conclusions from a route test. A rule might exist in storage but not in the running router.

The frontend's [route API](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/route.ts) uses separate logical operations:

| Frontend function | Purpose |
| --- | --- |
| `getRouteConfig()` | Read the saved global defaults |
| `saveRouteConfig(config)` | Persist changed defaults |
| `applyRouteChanges()` | Request activation of saved routing changes |
| `getRouteActivationStatus()` | Inspect whether changes actually applied |
| `testRule(host)` | Evaluate a specified hostname and inspect matching decisions |

`testRule(host)` accepts a **hostname**. It does not reproduce the original socket's process, inbound identity or every available packet attribute. For these, compare a real connection in monitoring.

## 6. The frontend API is an RPC client, not a naive REST client

Code such as `requestJSON("GET", "/api/v2/route/config")` in the frontend is a **logical operation description**. The current [`src/api/client.ts`](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/client.ts) uses `resolveRPCRoute(method, path)` to map it to a generated operation, then sends an HTTP **POST** to `rpcPath(route.operation)` with a JSON request body.

Do not turn an example containing a logical GET path into a shell `curl -X GET` command without verifying the actual generated RPC route and request schema. Inspect [`src/api/generated.ts`](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/generated.ts), [generated Go contracts](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/generated-contracts.ts) and the backend [`pkg/httpapi`](https://github.com/yuhaiin/yuhaiin/tree/main/pkg/httpapi) first.

The client may attach an Authorization header, and independently hosted UI/backend combinations must agree on CORS, RPC operations and authentication. A working static page does not imply that its paired backend accepts the same RPC version.

## 7. A diagnostic report is evidence, not an end-to-end proof

The backend [diagnostics contract](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/tools/diagnostics.go) returns a report with the platform, target hostname, status-tagged checks, durations, evidence and findings. Available check states include `pass`, `fail`, `warning` and `skipped`.

Interpret results according to which layer they exercise. A registered TUN does not guarantee correct kernel routes; a successful DNS lookup does not prove the selected proxy can connect; a selected-TCP-node test does not cover UDP.

A useful failure report includes the exact observed action, saved-versus-running revision when routing is involved, inbound runtime status, redacted logs and one reproduction command. Never paste private keys or subscription tokens.

## 8. Before submitting a documentation or code PR

1. Confirm the claim against the **current Go implementation** and frontend behavior. If they differ, name both and explain their scope.
2. Use the resource's actual JSON tags, including snake_case versus camelCase, rather than guessing from a UI label.
3. Reproduce each example using the named UI action or the actual RPC route, not a guessed HTTP verb.
4. Distinguish first-start defaults, editor templates, migrated settings, and running state.
5. Keep a verification step after every tutorial, with a known expected outcome and what to inspect if it fails.
6. Run documentation link checks and the Astro build. For backend behavior, use the relevant Go tests and review platform-specific branches.

Start from [Routing rules](/documents/features/routing/), [DNS](/documents/features/dns/) and [TUN](/documents/guides/tun/) for worked investigations.
