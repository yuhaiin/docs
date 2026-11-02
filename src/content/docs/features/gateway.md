---
title: HTTP Gateway
description: Reverse proxy applications and apply HTTP rules through existing outbound nodes.
---

**HTTP Gateway** provides HTTP request rules, reverse proxying and opt-in interception. It uses the existing outbound nodes and selectors, so a backend application can be reached through a VPN node as well as Direct.

## Reverse proxy an application

1. Start a test application on a private address such as `127.0.0.1:3000`.
2. Create an upstream with that backend URL and choose Direct or an existing TCP-capable node/selector.
3. Create a Gateway listener on a loopback test port and give it a reverse-proxy action referencing the upstream.
4. Add Host/path rules as needed. Test with the intended Host header before exposing the listener.
5. For HTTPS, configure file TLS material or a [managed certificate](/documents/features/certificates/) covering the client hostname.

Upstreams support round robin, weighted round robin and least active HTTP requests. Health checks, timeouts, request limits and retries are separate settings. Non-idempotent POST/PATCH bodies are not replayed by default. WebSocket, SSE and gRPC share the reverse-proxy path; HTTPS backends must support HTTP/2 for gRPC.

## HTTP rules

Conditions combine **all**, **any** and **not**, with fields such as host, path, method, header and query. A leaf can contain multiple values, which are OR. Actions can forward, reverse proxy, respond, redirect or block. Use the Gateway rule test tools, then check a real request; these HTTP conditions are distinct from network route rules.

## Interception

An interception-only Gateway has no direct listen address. Route captured TCP traffic to it using the HTTP Gateway route action. Begin with plain HTTP. HTTPS inspection requires explicitly configured MITM mode, selected domains/ports and client trust of the Gateway's public CA.

Pinned clients, client certificate authentication, non-HTTP TLS and HTTP/3 are not transparently decrypted. Review exclusions before enabling inspection. Once MITM handshake bytes are sent, a failed handshake closes the connection rather than silently falling back.

A direct Gateway listener does not authenticate proxy users. [Traffic Access](/documents/features/traffic-access/) denies it when included in a protected identity scope; use a supported authenticated proxy inbound with interception for identity-aware HTTP access.

See backend [reverse-proxy recipes](https://github.com/yuhaiin/yuhaiin/blob/main/docs/gateway/reverse-proxy.md), [HTTP rules](https://github.com/yuhaiin/yuhaiin/blob/main/docs/gateway/routing.md) and [interception limits](https://github.com/yuhaiin/yuhaiin/blob/main/docs/gateway/interception.md).
