---
title: Frequently asked questions
description: Answers to common first-time questions.
---

## Do I need a remote server?

No, **Direct** makes a useful first test and Yuhaiin can work as a local routing tool. To send traffic through a remote proxy, you need your own proxy server or credentials from a provider.

## Why doesn't adding a node change my browser traffic?

You must also choose an outgoing destination and provide an **inbound**. Then the browser or operating system must send traffic into that inbound. Follow [Your first connection](/documents/guides/first-connection/).

## Is an HTTP proxy the same as a VPN?

No. An HTTP/SOCKS proxy usually affects only applications configured to use it. TUN can capture more of the device's IP traffic, but requires system permissions and routing.

## Can I use different servers for different sites?

Yes. Use [Route rules](/documents/features/routing/) to match destinations and send them to Direct, a fixed node, the current selection or a selector.

## Why are there separate TCP and UDP selections?

Different applications use different transport protocols. Some outgoing protocols can carry both; others do not. A website loading successfully via TCP does not prove that UDP applications will work.

## Does Yuhaiin change my DNS?

It depends on how you configure DNS resolvers, the inbound and system settings. See [DNS](/documents/features/dns/). Do not assume a proxy alone changes every device DNS query.

## Where should I ask for help?

Start with [Troubleshooting](/documents/guides/troubleshooting/) and then search [existing issues](https://github.com/yuhaiin/yuhaiin/issues), including your platform and redacted diagnostics.
