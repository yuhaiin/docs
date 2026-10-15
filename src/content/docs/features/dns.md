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

## A reproducible DNS check

When a hostname fails, determine whether the failure happens during resolution or after Yuhaiin has an address:

1. Pick a known hostname such as `example.com`.
2. Open **DNS → Resolvers**. Test a resolver against an **A** query, then an **AAAA** query. Read the response code, answer records, elapsed time and any error independently.
3. Open **DNS → Resolver roles** and check which resolver the **direct** and **proxy** paths use. If an encrypted resolver is addressed by hostname, check the **bootstrap** resolver as well.
4. Look in **DNS → Hosts** for an override of that hostname, and **DNS → DNS cache** for a saved answer. Remove a particular stale entry before changing all DNS settings.
5. Run **Diagnostics → Network diagnostics**. If DNS succeeds but the routed HTTPS check fails, inspect the route or outbound rather than repeatedly replacing resolvers.

A successful lookup does not prove that a remote connection can use the returned address. Likewise, a failed IPv6 (AAAA) answer may be expected on a network or resolver without usable IPv6.

## FakeIP: the address is intentionally synthetic

When FakeIP is enabled, Yuhaiin may return a synthetic address and retain a domain-to-address mapping. The connection must then be captured by a compatible inbound and mapped back to the original hostname. If the connection bypasses Yuhaiin, the synthetic address is not a usable public destination.

The backend's current [default FakeIP address pools](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/network/defaults/defaults.go) use `198.18.0.0/16` for IPv4 and `2001:2::/64` for IPv6. These are benchmarking ranges, not an ordinary remote public proxy server. Their selection avoids an issue where Chromium treats some RFC1918/ULA FakeIP addresses as local-network targets and blocks requests before they reach TUN.

**Do not confuse** these FakeIP ranges with the TUN interface's own address or the address of your HTTP/SOCKS listener. They have separate roles.

## Advanced: bootstrap, policy and leakage boundaries

An encrypted resolver can still require an ordinary lookup to find its upstream IP. That initial **bootstrap** lookup should be configured deliberately so it does not depend recursively on the encrypted resolver being initialized.

Yuhaiin exposes [resolver contracts](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/resolver/types.go) for `host`, transport `type`, `tlsServerName` and cache/test results. Resolver roles live in the [routing configuration](https://github.com/yuhaiin/yuhaiin/blob/main/pkg/contract/route/types.go) as `directResolver` and `proxyResolver`; the Web UI saves and applies them separately from editing an individual resolver.

An encrypted DNS transport protects a query between Yuhaiin and its upstream; it does **not** imply that every application uses that resolver, or that traffic cannot leave by a direct route. Verify capture at the inbound and the actual route before making privacy claims.

For developer debugging, [`src/api/resolvers.ts`](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/resolvers.ts) exposes resolver test and cache operations, and [`src/docs/bypass/resolver/roles.tsx`](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/docs/bypass/resolver/roles.tsx) performs a route-config save followed by Apply.
