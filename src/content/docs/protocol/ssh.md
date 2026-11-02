---
title: Linux SSH inbound (experimental)
description: Run SSH commands with isolated session networking through Yuhaiin routing.
---

The SSH inbound accepts public-key logins and runs a shell or SSH exec command with isolated Linux networking. Command traffic enters a TUN and the lightweight stack, then follows normal Yuhaiin inbound routing, including UDP and DNS interception.

**This is not a general security sandbox.** Commands share the host filesystem and process namespace. Enable it only for trusted identities with suitable filesystem permissions.

## Requirements and configuration

- Linux, excluding Android, with `CAP_SYS_ADMIN`, `CAP_NET_ADMIN` and `/dev/net/tun`.
- A dedicated unprivileged UID/GID and an authorized SSH public key.
- Explicit `allowUnsafeShell: true` acknowledgement.
- TCP-only `tcp_udp` network, no transport layers, and SSH protocol settings.

Configure the advanced inbound using the [backend configuration example](https://github.com/yuhaiin/yuhaiin/blob/main/docs/ssh-session-inbound.md#inbound-configuration), replacing the public key and UID/GID. Start on a loopback address such as `127.0.0.1:2222`. The server generates and persists an Ed25519 host key on first save; protect that private key and check listener runtime errors.

## Connection behavior

Shell, exec, PTY and terminal resize are supported. Password login, SFTP, agent forwarding, TCP port forwarding and remote listening are disabled. Concurrent command channels on one SSH transport share its isolated network while it is live; separate SSH transports never share it. After the last command releases the network, a later command creates a fresh one.

Host routes are unchanged. Network setup must succeed before commands start; failure does not fall back to host routing. Default session address ranges must not overlap active FakeIP pools.

This inbound uses its own configured public-key identity. It does not integrate with management proxy users and rejects inbound `authentication` settings. Process-group cleanup cannot guarantee killing escaped daemonized descendants; cgroup containment is still needed for that guarantee.

The feature remains experimental; privileged Linux integration tests do not establish production isolation. See [backend requirements and validation](https://github.com/yuhaiin/yuhaiin/blob/main/docs/ssh-session-inbound.md).
