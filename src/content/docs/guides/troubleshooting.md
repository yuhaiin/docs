---
title: Troubleshooting connections
description: Diagnose DNS, proxy, routes, TUN and upstream nodes systematically.
---

Use these checks in order. Changing five settings at once makes it difficult to know what solved the problem.

## 1. Can you open the Web UI?

Start the backend with `-host 127.0.0.1:50051` and open `http://127.0.0.1:50051` **on the same device**. If the port is in use, select another port. On a clean installation the existing Mixed application proxy listens on **`127.0.0.1:1080`**, while the management Web UI here listens on **`127.0.0.1:50051`**. An additional Local preset created in React may listen on `9002` instead. **These are different listeners.** Always check the actual inbound configuration.

## 2. Does Yuhaiin receive connections?

In **Traffic entry → Inbounds**, confirm that the inbound is enabled and the address/port match your app's proxy settings. Open **Monitoring → Connections** and retry loading a page.

If no new connection appears, the browser may be bypassing the proxy. If new connections appear, the issue is more likely with a node, routing rule, or DNS.

## 3. Test without complicated routing

Choose a **Direct** node as the default destination and temporarily use a simple default routing mode appropriate for your setup. If Direct works but your remote node does not, double-check its address, port, password, certificates and network reachability.

A latency result is not the same as loading a website. Some protocols or networks do not support every ping type.

## 4. Run Network diagnostics

Open **Diagnostics → Network diagnostics** and enter a **hostname** such as `www.cloudflare.com`, without `https://`, a port or a path. A run checks:

| Check | What it can tell you |
| --- | --- |
| TUN | Whether the backend has a registered TUN listener and its ingress counters |
| DNS A / AAAA | Whether IPv4/IPv6 name lookups work through configured resolvers |
| Direct IPv4 / IPv6 | Whether the backend can reach particular test endpoints directly |
| Route | Which routing decision applies to the test target |
| Routed HTTPS | Whether the backend can make an HTTPS request using that route |
| Selected TCP node | Whether an HTTPS request works through the selected TCP destination |

A **TUN registration** does not guarantee system routes are correct. The diagnostics request itself does **not** pass through TUN. The selected-node probe does **not** test UDP. An absent IPv6 record may be a warning rather than a failure.

You can copy or download the report. It contains hostnames, IPs, routing information and device details: review it before sharing.

## 5. Interpret familiar symptoms

- **DNS fails:** Check **DNS → Resolvers**, resolver roles, hosts overrides and cache. Compare with a known working resolver.
- **Only one domain fails:** Use **Routing → Test route** to check the matching rule. Inspect list matches and block history.
- **VPN enabled but apps offline:** Verify TUN permissions, routes, capture and upstream reachability separately.
- **Some apps work, others do not:** Check whether they use the system proxy and whether traffic enters the inbound.
- **Works on Wi-Fi but not cellular:** Check UDP restrictions, captive portals, TLS validation, and changing networks.
- **Works with Direct but not proxy:** Verify remote server credentials, protocol layering and TLS server name.
- **It stopped after an edit:** Confirm **Save** and any separate **Apply** action succeeded, then inspect logs.

## 6. Collect a useful report

Record the platform, application version, the action that failed, a redacted diagnostics report and relevant logs from **Diagnostics → Logs**. Remove passwords, private keys, subscription links and personal hostnames before posting an issue on [GitHub](https://github.com/yuhaiin/yuhaiin/issues).
