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
