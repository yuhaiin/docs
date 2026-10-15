---
title: Restore your connection
description: Undo a broken system proxy, TUN or DNS configuration.
---

If internet access stopped immediately after enabling an inbound or a system setting, restore a simple network path before making more changes.

## If the Web UI is still reachable

1. Open **Traffic entry → Inbounds** and disable the new TUN or transparent-proxy inbound.
2. Disable **Settings → Configuration → System proxy integration** if its local proxy listener is no longer running.
3. Undo the DNS server/route rule change you just made, **Save**, and **Apply** if the routing page has a separate apply action.
4. Confirm a familiar website works without Yuhaiin. Only then re-enable one component at a time.

## If you cannot open the Web UI

If the backend is still running, the original local management URL is `http://127.0.0.1:50051` unless you chose another port. If it is no longer running and the OS still points to its local proxy, disable that OS proxy manually.

- **Windows:** turn off a stale manual proxy in the operating system's Proxy settings; check VPN adapters and routes if TUN was enabled.
- **macOS:** remove the stale HTTP/SOCKS proxy in the active network service settings; disconnect the recently created tunnel.
- **Linux:** remove stale desktop proxy settings; if you added firewall or policy-routing rules yourself, undo the exact rules you installed.

Do not run a generic script that flushes *every* firewall table on a remote server. That can disconnect SSH or remove unrelated security rules.

## If DNS alone fails

Check that DNS settings no longer point to a stopped listener. Restore the system's previous resolver first, then use [DNS troubleshooting](/documents/guides/dns-troubleshooting/).

## Keep useful evidence

Before reporting the problem, record the platform, affected inbound, whether the backend responds, and which diagnostics checks failed. Remove credentials and private hostnames from the report.

Once normal internet access returns, restart with [a local Mixed proxy](/documents/guides/first-connection/), then introduce TUN again with explicit route exclusions.
