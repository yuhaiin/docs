---
title: Quick start
---

## running

download lastest release

```bash
curl https://github.com/yuhaiin/yuhaiin/releases/download/v0.3.8/yuhaiin_linux_amd64v3 > yuhaiin
chmod +x yuhaiin
```

start

```bash
yuhaiin -host="127.0.0.1:50051" -path=$HOME/.config/yuhaiin
```

## Install

### Linux

```bash
mv yuhaiin_linux_amd64v3 /usr/bin/yuhaiin
```

#### systemd

create systemd service with blow content

```bash
vim /etc/systemd/system/yuhaiin.service
systemctl daemon-reload
systemctl start yuhaiin
systemctl enable yuhaiin
```

```systemd
[Unit]
Description=yuhaiin
Requires=

[Service]
ExecStart=yuhaiin
Restart=always
RestartSec=30
Slice=yuhaiin.slice

[Install]
Also=
WantedBy=default.target
```

### Windows

#### Service

install as windows

```bash
./yuhaiin_windows_amd64v3.exe install
```

### MacOS

```bash
mv yuhaiin_darwin_amd64v3 /usr/bin/yuhaiin
```

#### Launchctl

create a plist with blow content

```bash
vim yuhaiin.plist
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>io.github.Asutorufa.yuhaiin</string>
    
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/yuhaiin</string>
    </array>
    
    <key>WorkingDirectory</key>
    <string>/etc/yuhaiin</string>
    
    <key>RunAtLoad</key>
    <true/>

</dict>
</plist>
```

```bash
launchctl load yuhaiin.plist
launchctl start io.github.Asutorufa.yuhaiin
```
