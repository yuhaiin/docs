---
title: Install Yuhaiin
description: Choose the correct release and start a local Web UI safely.
---

Yuhaiin has a **backend** that handles network connections and a **Web UI** that configures it. Desktop releases normally include the Web UI. The separate Android app has its own setup.

## 1. Get the application

Download a release for your device from the [official releases page](https://github.com/yuhaiin/yuhaiin/releases). Release names change, so use the latest stable release rather than copying an old version-specific URL.

| Your device | Typical download |
| --- | --- |
| Windows on an Intel/AMD PC | `windows-amd64` |
| Windows on ARM | `windows-arm64` |
| Mac with an M-series chip | `darwin-arm64` |
| Intel Mac | `darwin-amd64` |
| Linux on an Intel/AMD PC | `linux-amd64` |
| Linux on ARM | `linux-arm64` |

You may also see `amd64v3` or `amd64v4` builds. Those require newer CPU instruction sets. **Choose plain `amd64` unless you know your CPU supports the optimized variant.** Other operating systems and architectures may be listed on the release page.

On Windows, extract the download if it is an archive. Release executable filenames often include the operating system and architecture. The following commands assume that you **rename** the downloaded executable to `yuhaiin` (`yuhaiin.exe` on Windows).

On macOS or Linux, run these commands in the folder with the downloaded file (replace the example filename with the one you downloaded):

```sh
mv ./yuhaiin-linux-amd64 ./yuhaiin
chmod +x ./yuhaiin
```

On Windows, rename a file such as `yuhaiin-windows-amd64.exe` to `yuhaiin.exe` in Explorer or use its actual filename in the command below.

macOS might block an unsigned download. Review the publisher and file before overriding a macOS security warning. Do not blindly run commands from unknown download mirrors.

## 2. Start it safely

Open a terminal in the folder containing the executable. Run:

```sh
./yuhaiin -host 127.0.0.1:50051
```

On Windows, from PowerShell in the same folder:

```powershell
.\yuhaiin.exe -host 127.0.0.1:50051
```

Leave that terminal open. Open **http://127.0.0.1:50051** in a browser **on the same computer**.

The backend's CLI default is `0.0.0.0:50051`, which listens on all available interfaces. Explicitly choosing `127.0.0.1` is safer for a beginner. If you set the optional `-u` and `-p` username/password arguments, keep those credentials private and do not expose the interface over untrusted networks without HTTPS.

## 3. First launch and data

Yuhaiin saves settings in a local data directory. The actual default can vary by operating system; the command-line help displays it. To choose a specific directory, use `-path /your/folder`. The HTTP port may be changed with `-host`.

Try [your first connection](/documents/guides/first-connection/) before enabling a service or TUN. Later you can set up [system-wide traffic](/documents/guides/tun/) or use the platform's service manager.

## Alternative: macOS Homebrew

The backend README describes a maintained Homebrew tap:

```sh
brew tap yuhaiin/yuhaiin
brew install yuhaiin
```

Check the [backend repository](https://github.com/yuhaiin/yuhaiin) for changed packaging instructions. For manual builds, see [Build from source](/documents/guides/build/).
