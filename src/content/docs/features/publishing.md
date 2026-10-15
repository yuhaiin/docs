---
title: Publish selected nodes
description: Configure a shared subscription endpoint for selected node profiles.
---

**Destinations → Publish** is for sharing a set of node configurations with other clients. This is different from an outbound node, a server-side inbound, or importing a provider subscription.

## Create a published set

1. Open **Destinations → Publish** and create an entry.
2. Give it an identifier. The current editor also asks for a **Display address**, **Path**, and an optional **Password**.
3. Choose which nodes to include and save.
4. Use the address and path shown by your configured publishing service for a client that understands the generated subscription format.

The display address does not magically create public DNS, TLS, port forwarding or firewall access. Before using a URL from another device, verify the server is reachable at that address and that you have deliberately exposed a secure endpoint.

## Protect shared credentials

A published profile can include server addresses, authentication tokens or private keys needed by the receiving client. Share it only with intended recipients. Prefer HTTPS with valid certificates, keep the publish password private, and avoid **Allow insecure HTTP** on untrusted networks.

If a publish URL leaks, change the password or disable the published configuration. Removing a subscription URL alone does not necessarily revoke credentials embedded in already downloaded profiles.

## Troubleshoot

If the receiving device cannot fetch the list, test reachability and HTTP/TLS first. If it can fetch a list but nodes fail, test each outbound separately.

See [Nodes and subscriptions](/documents/features/nodes/) and [Security](/documents/guides/security/).
