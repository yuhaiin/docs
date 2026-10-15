---
title: Android setup
description: Simple instructions for the dedicated Android VPN app.
---

Android uses the separate [Yuhaiin Android application](https://github.com/yuhaiin/yuhaiin-android). Its screens and permissions are different from the desktop backend's Web UI.

## Basic setup

1. Get the current Android release from the [Android project](https://github.com/yuhaiin/yuhaiin-android) and install it using Android's normal app-install flow.
2. Open the app, import or add the node details provided by your proxy service, and select the desired destination.
3. Start the VPN service. Android will show a system confirmation when an app first creates a VPN connection. Review it before accepting.
4. Check that the VPN indicator appears, and verify web browsing.
5. Use the app's connection views or supported network-diagnostics interface to investigate failures.

Android's **VPN permission** gives Yuhaiin access to route device traffic. The VPN icon does not prove the remote server is reachable; test an actual website.

## What is different from desktop?

On Android, the system manages the VPN interface and routes through `VpnService`. Desktop instructions about manually creating `tun://` interfaces, `systemd`, or `launchd` do not apply.

Another VPN often cannot be active at the same time. Android battery optimization, background restrictions and mobile-network changes may interrupt a connection. If reconnection fails, open the app and inspect its current state before changing unrelated DNS settings.

## A safe troubleshooting order

Check whether the VPN is started, whether the selected node is reachable, whether name lookup works, and then whether traffic routing works. If one test fails, compare it with another instead of assuming the remote server is broken.

For current app capabilities and downloads, use the [Android repository](https://github.com/yuhaiin/yuhaiin-android).
