---
title: Your first connection
description: Set up a working direct node and local proxy without networking expertise.
---

This example uses a **Direct** node, so it does not require a paid proxy subscription or a remote server. It checks that Yuhaiin is receiving traffic. Later you can replace Direct with your own proxy node.

## Before you begin

Start Yuhaiin and open the local [Web UI](/documents/guides/install/). The sidebar uses task-oriented groups such as **Destinations**, **Routing**, **Traffic entry**, and **Diagnostics**.

## Step 1: Add a destination

1. Open **Destinations → Nodes** (the node page).
2. Add a node and choose the **Direct** template.
3. Give it a recognizable name, such as **My direct connection**, then save.
4. On **Home**, find the setup card and choose that node as your default destination. Make sure both **TCP** and **UDP** selections are configured where available.

**Direct** means that Yuhaiin connects to the website using this computer's internet connection. It does not hide your public IP address.

Open **Routing → Route rules** and review **Unmatched traffic**. To use your selected node for traffic without a matching rule, set the default mode to **Proxy** and set its default target appropriately. If the mode is **Direct**, a remote proxy node you selected may never be used. Save and apply any pending changes.

If you already have proxy-provider settings, you can add a **SOCKS5**, **HTTP**, **Shadowsocks**, **Trojan** or other supported node instead. The provider must give you the address, port and any required credentials. See [Nodes and subscriptions](/documents/features/nodes/).

## Step 2: Enable a local entry

1. Open **Traffic entry → Inbounds**.
2. Create a **Local** preset. It creates a Mixed HTTP/SOCKS listener, normally at `127.0.0.1:9002`.
3. Check **Enabled** and save. The listener must be running before an application can send it traffic.

Local means *on this computer*. It is not the IP address of a remote proxy provider.

## Step 3: Tell one application to use it

Configure your browser or another application to use an **HTTP proxy** or **SOCKS5 proxy**:

- Host: `127.0.0.1`
- Port: `9002`
- Type: HTTP or SOCKS5

Use the address and port **shown in your inbound settings** if you changed the preset. Not all browsers provide independent proxy settings; some inherit your operating system's configuration.

Visit a familiar website. Then open **Monitoring → Connections**. A new connection entry indicates that the application reached Yuhaiin.

## Step 4: Check the result

Open **Diagnostics → Network diagnostics** and run the default hostname check. This tests several backend paths, but it cannot by itself prove that a particular browser is configured to use the local inbound. Confirm both the **Connections** page and a successful page load.

If you see no connections, the application is probably not using the configured proxy. See [Troubleshooting](/documents/guides/troubleshooting/).

## What next?

- To proxy other devices on your LAN, read [Local versus LAN proxy](/documents/guides/local-proxy/).
- To capture more system traffic, read [System-wide TUN](/documents/guides/tun/).
- For different destinations for different websites, read [Routing rules](/documents/features/routing/).
