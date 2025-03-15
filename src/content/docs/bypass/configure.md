---
title: Configure
---

## Mode

- proxy
- direct
- block

## Tag

## Resolve Strategy

- Prefer IPv4
- Only IPv4
- Prefer IPv6
- Only IPv6

## UDP Proxy FQDN

## Resolver

Which [resolver](../../resolver/resolver) to use.

## Rule Config

### Domain/IP

For example following patterns are supported:

- `www.example.com`
- `*.example.com`
- `www.example.*`
- `*.example.*`
- `10.0.0.1`
- `10.0.1.1/24`
- `2001:db8::`
- `[2001:db8::]/64`

### Process

Only absolute path is supported.

- `process:///usr/bin/curl`

### Local File

Local Rule File which contains one rule per line.

- `file:///etc/yuhaiin/rules.txt`

Format same as [Domain/IP](#domainip):

```txt
# comment
www.example.com
*.example.com
10.0.0.1
10.0.1.1/24
```

### Remote

Remote Rule File which contains one rule per line.  
We provide [yuhaiin/kitte](https://github.com/yuhaiin/kitte/tree/auto-update).

- `https://raw.githubusercontent.com/yuhaiin/yuhaiin/master/src/content/docs/bypass/rules.txt`
