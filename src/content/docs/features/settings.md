---
title: Settings and Web UI
description: Understand application settings and management UI access.
---

The settings pages change the behavior of the running backend and Web UI.

## General configuration

Open **Settings → Configuration** for application settings. Some changes affect how the system proxy, network interface, logging or other global options behave. Read each field before applying it, and change only one family of settings at a time.

## Web UI settings

**Settings → Web UI** includes preferences specific to the browser-based control page. The Web UI is a client of the backend API, so changing the visual theme does not change whether traffic is intercepted.

## Keep access restricted

The backend manages HTTP APIs and the Web UI on the same configured HTTP listener. Its current CLI default listens on `0.0.0.0:50051`. For a personal computer use `-host 127.0.0.1:50051` unless remote access is intentionally configured.

See [Security](/documents/guides/security/) and [Installation](/documents/guides/install/). For developer-facing data structures, consult the [Configuration reference](/documents/reference/configuration/).

## System proxy and manual network interface

The **Configuration** page includes HTTP and SOCKS5 system proxy integration, optional manual outgoing network interface, IPv6, log level and other controls. Leave interface selection automatic until a specific problem requires it. See [System proxy versus TUN](/documents/features/system-proxy/) and [Network recovery](/documents/guides/recover-network/).

## Runtime profiling

The **Enable pprof** setting allows CPU, heap and goroutine captures. Enable only when investigating resource usage. [Profiler instructions](/documents/features/pprof/) explain sessions and the browser graph viewer.
