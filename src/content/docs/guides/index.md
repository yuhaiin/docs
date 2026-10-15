---
title: Start here
description: A nontechnical path from installation to a working proxy.
---

Yuhaiin can direct an application's internet connections through a proxy server, send them directly, or block them. You can use it without knowing how networks work. The Web UI provides the settings you need.

## Which guide should I follow?

1. [Install and open Yuhaiin](/documents/guides/install/). Install the correct program and open its control page.
2. [Make your first connection](/documents/guides/first-connection/). Start with a local proxy and confirm that it works.
3. [Choose how applications connect](/documents/guides/local-proxy/). Enable a local app proxy or, if needed, a system-wide TUN.
4. [Check your connection](/documents/guides/troubleshooting/) when something does not work.

**Using Android?** See the [Android guide](/documents/guides/android/) for the separate mobile app.

## Three words you will see

- **Node:** a destination for outgoing traffic. It might be a proxy service you own or a simple **Direct** connection.
- **Inbound:** how traffic enters Yuhaiin, for example from an application using a local HTTP/SOCKS proxy, or from a TUN virtual network adapter.
- **Route rule:** a decision about a connection: proxy it, connect directly, or block it.

A node alone does not automatically redirect traffic from your browser. An inbound needs to receive it, and routing determines what happens next.

## Start small

For your first test, use a local inbound bound to `127.0.0.1`. This listens only on your own computer. You do not need administrator access just to test an HTTP or SOCKS local proxy. Leave advanced DNS, TUN, IPv6 and custom routing alone until the simple case works.

Read the [glossary](/documents/guides/glossary/) when a term is unfamiliar. You can return to the [configuration reference](/documents/reference/configuration/) once the basic setup is running.
