---
title: DNS and resolvers
description: Choose resolvers, manage DNS roles, FakeIP, hosts and cache.
---

DNS turns a domain such as `example.com` into an IP address. Yuhaiin can use different resolvers for direct and proxied traffic.

Open **DNS** under traffic configuration. The current Web UI has **Resolvers**, **Resolver roles**, **DNS server**, **Hosts** and **DNS cache** sections.

## Resolvers

Create an upstream resolver using the supported transport, such as ordinary UDP/TCP DNS, DNS over HTTPS (DoH), DNS over TLS (DoT), or DNS over QUIC (DoQ). Use a server that you trust. Encrypted DNS protects the query in transit but does not make browsing anonymous.

## Resolver roles

Choose resolvers for **direct** and **proxied** requests and review the bootstrap resolver. Bootstrap is useful when the address of an encrypted DNS server is itself a hostname; the name has to be resolved before connecting to it.

## DNS server and FakeIP

The **DNS server** accepts DNS queries from compatible clients when enabled. FakeIP can return addresses from a reserved mapping pool rather than the website's real address; Yuhaiin later recovers the original domain from that mapping.

Use FakeIP only if your inbound/route configuration actually captures connections to those synthetic addresses. The **Auto FakeIP Route** setting for kernel-managed TUNs can help; see [TUN](/documents/guides/tun/).

## Hosts and cache

**Hosts** provides explicit mappings/overrides. **DNS cache** shows or manages cached answers. A stale override or cached entry can make a website fail after its DNS changes.

## Diagnosing a DNS problem

1. Try resolving the hostname in **Network diagnostics**.
2. Compare a direct resolver with a configured proxy resolver.
3. Check Hosts, FakeIP and cache state.
4. Compare an IP-only connection with a hostname connection.

DNS success does not guarantee that the selected outbound can reach the resolved IP.
