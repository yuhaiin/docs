---
title: "Windows: first setup"
description: "Run Yuhaiin safely on Windows and connect a browser."
---

A Windows desktop can use Yuhaiin through its local HTTP/SOCKS proxy or through a TUN adapter. Begin with a local proxy; administrator privileges are not needed for ordinary application proxy use.

## Download and start

1. Download the correct Windows archive or executable from [Yuhaiin releases](https://github.com/yuhaiin/yuhaiin/releases). Most Intel/AMD laptops use **windows-amd64**. Do not choose `amd64v3` unless you know your CPU supports it.
2. Extract the archive, if necessary. Open the folder in File Explorer.
3. In that folder, open PowerShell and run the **actual downloaded filename**. For example, after renaming it to `yuhaiin.exe`:

   ```powershell frame="none"
   .\yuhaiin.exe -host 127.0.0.1:50051
   ```

4. Keep the terminal open and visit `http://127.0.0.1:50051` **on this PC**. The Web UI is the management page, not the proxy address.

If Windows warns about an unfamiliar application, verify the release source before deciding whether to run it. Do not disable security software just to get the program to start.

## Configure one browser

Follow [Your first connection](/documents/guides/first-connection/). The **Local** inbound preset normally listens on `127.0.0.1:9002`. Point your browser or its OS proxy settings to that address. Open **Monitoring → Connections** to confirm traffic enters Yuhaiin.

In **Settings → Configuration**, the HTTP and SOCKS5 **System proxy integration** options can request Windows proxy integration. They are not the same as a full VPN: some apps ignore system proxy settings. Revert them if another proxy tool already owns the system settings.

## Full-device traffic

If you need apps without proxy settings, use [TUN](/documents/guides/tun/). Creating a Windows tunnel can require administrator permissions and a compatible network driver. Do not start by changing your physical network adapter's static IP or default gateway.

## Stop, update or recover

Use Ctrl+C in the terminal to stop the program if you started it manually. Disable any system proxy configuration that points to the stopped program; otherwise browser traffic may fail. For updates, first back up the data directory, then replace the executable without deleting the configuration.

**If a website stops loading:** temporarily disable the system proxy setting and the TUN inbound, confirm normal internet access, then follow [Troubleshooting](/documents/guides/troubleshooting/).
