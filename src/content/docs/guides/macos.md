---
title: "macOS: first setup"
description: "Apple Silicon and Intel Mac installation, local proxy, and TUN permissions."
---

For a first test on macOS, run Yuhaiin locally and configure just one app. TUN and system-wide network routes can be enabled later.

## Install

Download the matching release from [Yuhaiin releases](https://github.com/yuhaiin/yuhaiin/releases): **darwin-arm64** for Apple Silicon (M-series), **darwin-amd64** for Intel. Alternatively, if you use Homebrew:

```sh frame="none"
brew tap yuhaiin/yuhaiin
brew install yuhaiin
```

For a downloaded standalone executable, rename it to `yuhaiin`, open Terminal in its folder and run:

```sh frame="none"
chmod +x ./yuhaiin
./yuhaiin -host 127.0.0.1:50051
```

macOS may warn that an unsigned app cannot be verified. Confirm the file came from the official repository before making a deliberate security override. The [backend README](https://github.com/yuhaiin/yuhaiin#readme) also describes quarantine and ad-hoc signing for manual installations.

Open `http://127.0.0.1:50051`. Avoid running the management listener on `0.0.0.0` unless you want and have secured remote access.

## Use the local proxy

Open **Traffic entry → Inbounds** and use the existing enabled **mixed** inbound (fresh-install default **`127.0.0.1:1080`**). Create a new listener only if the existing one is unavailable; the React **new Local preset** uses `127.0.0.1:9002` as its initial value. Set this as the HTTP or SOCKS proxy for one application, or use **Settings → Configuration → System proxy integration** for applications that follow macOS proxy settings. Check a page load and the Connections list.

Do not enable both Yuhaiin and another app's automatic system proxy control without checking which settings were applied.

## System-wide capture

To use a virtual `utun` interface, follow [TUN](/documents/guides/tun/). On macOS this commonly requires elevated permissions. Routes may conflict with an existing VPN or managed-device policy; test with one network at a time.

## Recover

Disable TUN first, then turn off system proxy integration. Quit the manual process with Ctrl+C. In macOS network settings, remove any stale HTTP/SOCKS proxy pointing to the actual inbound address (typically `127.0.0.1:1080` on a fresh install) if it remained enabled after the process exited. Restarting Yuhaiin is not a substitute for removing a stale OS proxy.

See [Network diagnostics](/documents/features/diagnostics/) for the next check.
