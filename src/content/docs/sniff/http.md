---
title: HTTP traffic inspection
description: Understand how hostname metadata can affect routing.
---

HTTP requests sometimes contain a readable host name. Depending on inbound and traffic properties, that information may be available to routing without a separate DNS lookup.

**Limitations:** HTTPS encrypts most application content. Hostname discovery is not guaranteed, and it should not be used as a security boundary. The current routing model uses host lists and other match expressions; see [Routing](/documents/features/routing/) and [Connections](/documents/features/monitoring/).

If hostname matching fails, use **Routing → Test route** and inspect a real connection before assuming that HTTP information was captured.
