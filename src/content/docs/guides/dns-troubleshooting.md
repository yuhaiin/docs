---
title: Fix DNS without guessing
description: Separate resolver failures, FakeIP routing and remote-node failures.
---

DNS translates a hostname into an IP address. A website may fail because the name could not be resolved, because the returned IP cannot be reached, or because the routed destination rejected the connection. These are different failures.

## What is actually failing?

Open **Diagnostics → Network diagnostics**. Enter `www.cloudflare.com` without a scheme or port. Compare **DNS A**, **DNS AAAA**, **Route**, and **Routed HTTPS** results.

| Result | Likely next step |
| --- | --- |
| A and AAAA both fail | Check configured resolvers, network access to those resolvers, and bootstrap resolution |
| A succeeds, AAAA fails | IPv6 may be unavailable for that name or connection; test IPv4 before changing all settings |
| DNS succeeds, routed HTTPS fails | Examine routing, node authentication and certificate validation |
| FakeIP address resolves but webpage fails | Confirm packets to the synthetic IP are actually captured by the inbound |
| Only one domain fails | Check Hosts overrides, block rules, list content and DNS cache |

## Check DNS roles

Open **DNS → Resolver roles**. Direct and proxied traffic can use different resolvers. The separate bootstrap resolver is used when a DNS server's own hostname needs resolution.

A bootstrap resolver should not depend recursively on the encrypted resolver it is trying to reach.

## Test one resolver

In **DNS → Resolvers**, inspect the selected server type and host. Valid types in the backend are `udp`, `tcp`, `doh`, `dot`, `doq`, `doh3`, and `system`. Prefer a working known server and default TLS verification before trying advanced settings.

## Check FakeIP and host overrides

Open the **DNS server** tab to inspect FakeIP settings and ranges. Ensure its fake-address prefixes do not clash with actual LAN addresses, VPN-assigned addresses or excluded routes. A TUN may need **Auto FakeIP Route** to make the addresses reachable via Yuhaiin.

Then check **Hosts** and **DNS cache**. An override may win over your expected public answer; a cached old answer may remain until expiry or cache reset.

For concepts and configuration, see [DNS and resolvers](/documents/features/dns/). Do not publish a full diagnostics report until you remove sensitive hostnames and IPs.
