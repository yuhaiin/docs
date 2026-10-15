---
title: Connections, logs and history
description: Read active connections, failure history, logs and performance profiles.
---

Open the **Monitoring** section to understand which traffic Yuhaiin handles.

## Home

The Home dashboard summarizes traffic and shows a setup card for selecting default destinations, configuring traffic entry, and running diagnostics.

## Active connections

**Monitoring → Connections** lists current connections. You can use this to answer a first question: **Did this application reach Yuhaiin at all?** If the list stays empty while an app is loading a page, revisit the app's proxy settings or TUN capture before changing outbound credentials.

## History and failures

The sidebar includes **History**, **Failed history**, and **Blocked history**. Use them to separate ordinary connection failures from explicit block rules. A blocked entry can be intentional.

## Logs

**Diagnostics → Logs** shows backend messages. Increase logging detail temporarily when investigating a problem, but be aware that logs can contain hostnames and other operational metadata.

## pprof

**Diagnostics → pprof** is for performance profiling, not normal connectivity troubleshooting. CPU and heap profiles, charts and graphs are primarily for developers investigating resource use; profiling may add overhead. Do not publish unreviewed profiles from a device holding sensitive data.

For a systematic check across DNS, routes and outbounds, use [Network diagnostics](/documents/features/diagnostics/).

## Active outbound sessions

For long-lived VPN or multiplexed connections, [Active outbound nodes](/documents/features/active-nodes/) shows running instances. Closing a session does not erase the node; the next traffic may reconnect.

## Walk through a single failing connection

A useful investigation has one known application, one target hostname and one deliberate request. Open the relevant monitoring views *before* retrying the request:

1. **Connections:** Did Yuhaiin receive traffic at all? If not, investigate the browser's proxy setting or OS TUN route. No outbound rewrite can fix traffic that never arrived.
2. **Failed history:** If traffic reached Yuhaiin, was the failure during the outbound connection, protocol negotiation, DNS or application transfer? Capture the actual reported error.
3. **Blocked history:** Check whether a routing rule intentionally rejected the request. A blocked connection is not necessarily a broken server.
4. **Active nodes:** Verify which outbound instance exists. Its presence does not prove that every destination is reachable through it.
5. **Logs:** Correlate the time of one test request with backend errors. Increase logging only for the investigation and restore the previous level afterwards.

### Worked comparison

If `curl --proxy http://127.0.0.1:1080 https://example.com/` succeeds against a clean backend but your browser request never appears in Connections, the browser is probably not using that proxy. If **both** reach Connections but only the remote proxy path fails, compare the route decision, selected node and remote authentication rather than changing inbound ports.

Replace `1080` in the command if your actual saved Mixed listener has a different port.

## Advanced: live versus historical measurements

The current frontend exposes distinct calls in [`src/api/connections.ts`](https://github.com/yuhaiin/yuhaiin-react/blob/main/src/api/connections.ts) for active connections, all history, failed history, aggregate traffic and telemetry. These are different datasets:

- **Connections** show what is live now. A very short connection may disappear before you open the page.
- **History** records past attempts or completions according to backend retention and instrumentation.
- **Traffic charts** aggregate data over intervals. A peak in a chart does not identify a particular stalled socket.
- **Failed history** is better for specific error messages; **pprof** is for CPU, allocation and contention bottlenecks.

Capture a timestamp and one reproducible request if you intend to compare logs with the connection monitor. Do not infer that zero active connections means no earlier requests occurred.
