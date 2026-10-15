---
title: BitTorrent traffic
description: Routing peer-to-peer connections.
---

BitTorrent clients often open many TCP and UDP connections directly to IP addresses, without a domain name for each peer. A domain-only rule is unlikely to capture every peer connection.

If you need a particular behavior, configure an inbound that actually receives the client's traffic and use matching conditions suitable for the information available, such as network, port, process or IP lists. Process detection can depend on the platform and mode.

Start with [Inbounds](/documents/features/inbounds/) and [Routing rules](/documents/features/routing/); verify results using [Connections](/documents/features/monitoring/). A protocol label by itself is not a reliable blocklist or privacy control.
