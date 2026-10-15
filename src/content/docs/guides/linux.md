---
title: "Linux: first setup"
description: "Set up the CLI, user proxy and optional Linux TUN configuration."
---

On Linux, start with a local application proxy. TUN, transparent redirect and TPROXY are more involved because they can alter routing and firewall state.

## Download and run

Choose a release for your CPU from [the official release list](https://github.com/yuhaiin/yuhaiin/releases). For a typical 64-bit Intel/AMD system use a Linux **amd64** build; for many ARM systems use **arm64**. Rename the executable to `yuhaiin`, then:

```sh frame="none"
chmod +x ./yuhaiin
./yuhaiin -host 127.0.0.1:50051
```

Open `http://127.0.0.1:50051` on the same device. To keep configuration in a specific directory use `-path /path/to/data`; keep that directory private.

## Route a single app

1. Create a Direct or proxy node and select it in **Home**.
2. Configure and enable a Local Mixed inbound, normally `127.0.0.1:9002`.
3. Run a simple request through that inbound:

   ```sh frame="none"
   curl --proxy http://127.0.0.1:9002 https://example.com/
   ```

4. Open **Monitoring → Connections**. If the request succeeds and a connection appears, the application-to-Yuhaiin path works.

On desktop environments, **Settings → Configuration → System proxy integration** may configure supported desktop proxy settings. Headless apps, containers and command-line tools may ignore those settings.

## TUN or transparent proxy

Only after the local test succeeds, consult [TUN](/documents/guides/tun/) or [Advanced inbounds](/documents/reference/advanced-inbounds/). On Linux, these modes can require `/dev/net/tun`, privileges, firewall policy or routing tables. Container networking requires separate planning.

## Service operation

The backend repository includes a [systemd unit example](https://github.com/yuhaiin/yuhaiin/blob/main/scripts/systemd/yuhaiin.service). Review and adapt its executable path, service user and storage directory; do not blindly paste an example unit that points to a different system's filesystem.

If routes fail, disable the TUN inbound and follow [Recovery](/documents/guides/recover-network/). Do not repeatedly restart a broken transparent-proxy rule without removing the underlying firewall configuration.
