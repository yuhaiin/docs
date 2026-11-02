---
title: User usage and audit
description: Read attributed traffic reports, session history and management security events.
---

Open **Account & security → Usage & audit**. The server identity module records traffic by user and credential, with breakdowns by inbound, node and protocol. Own-user reports and administrative reports are permission-gated.

## Read the traffic reports

Choose a UTC time range and inspect upload/download totals, time series, rates and session counts. Use a separate [credential](/documents/features/credentials/) per device for useful breakdowns; credential names are labels, not physical-device attestation.

- Bytes are proxy payload counters, not NIC/WAN wire bytes or billed traffic.
- Active minutes count each user once per minute with observed payload activity.
- Combined session duration includes idle time and parallel sessions; it is not a person's time online.
- Anonymous traffic and invalid authentication proofs are unattributed; a submitted username alone is not trusted identity.

## Inspect session audit

A session record includes source/target metadata, stable identity IDs, selected node/selector/rule, timestamps, byte totals and an end reason. It stores no request bodies, headers, passwords or full request URLs. One HTTP connection is not one request, and one full-cone UDP mapping is not a log of every destination it visits.

Sampling occurs once per second and persistence normally approximately every five seconds. Abrupt exit can lose recent observations. Check persistence errors and dropped-audit indicators before relying on completeness. This bounded operational history is not a lossless billing or compliance ledger. [Live quotas](/documents/features/traffic-control/) use independent enforcement counters.

## Management security audit

Administration also exposes management security events, filters, paginated export, retention and optional HTTPS SIEM/syslog-over-TLS forwarding. These record administrative actions separately from traffic sessions. Lowering retention deletes older records; exports are bounded pages, so retain the cursor and deduplicate by instance/event ID when collecting multiple pages. Review worker errors, backlog and drop counters for remote delivery.

See [traffic reporting details](https://github.com/yuhaiin/yuhaiin/blob/main/docs/user-usage.md) and [management audit semantics](https://github.com/yuhaiin/yuhaiin/blob/main/docs/security-audit.md). Native Android/core-only configurations do not enable this identity recorder.
