---
title: Bandwidth, quotas and resource limits
description: Apply global traffic shaping and authenticated user resource policies.
---

**Traffic Control** manages bandwidth profiles and resource diagnostics. Shaping starts disabled. The underlying admission budgets and lightweight output queues still protect resources.

## Limit an inbound or route

1. Open **Traffic Control** and enable shaping.
2. Set global upload/download limits, then create reusable QoS profiles if different traffic needs different caps.
3. Bind a profile to an inbound or a route rule, or choose a default profile for unbound traffic.
4. Select **Save and activate**. Generate traffic and inspect resource diagnostics.

The UI uses decimal **Mbps**: 1 Mbps is 125,000 bytes/s. Zero rate means unlimited. For a positive rate, zero burst uses the engine's default burst. Global, inbound and route caps compose; using one profile for multiple scopes does not turn them into one shared bucket. Existing TCP streams and later UDP datagrams use updated limits without a listener restart.

TCP applies backpressure; UDP over-limit admission drops the whole datagram. Counters describe application bytes at the admission boundary, excluding physical-link encapsulation and retransmissions.

## Fairness on lightweight TUN output

The TUN output scheduler offers default FIFO or explicit **FQ-CoDel**. FQ-CoDel groups by destination IP and then flow to limit one host's advantage from opening many flows. It applies to the lightweight TUN output queue, not the physical WAN interface, and IP grouping is not authenticated user fairness. Changing a bandwidth policy does not silently enable FQ-CoDel.

## Authenticated resource governance

On **Traffic Control**, the identity resource policy section adds user/group/credential bandwidth, active-session caps, connection-creation rate, optional packet rate and byte quotas. These use the same engine as Traffic Control. An explicit user override replaces the default user profile but cannot remove group or credential constraints. Shared group budgets aggregate all members; individual group limits apply separately to each member.

Daily and monthly quotas reset at **UTC** boundaries; lifetime quotas retain their stable quota ID. Review the configured exhausted action and current quota status. Live admission counters enforce quotas independently of sampled usage reports. Lowering an active-session cap blocks new admissions while existing sessions drain.

Anonymous and shared-password traffic has no user budget. Use user-only authentication and [Traffic Access](/documents/features/traffic-access/) for protected entry points. Aggregate Traffic Control diagnostics are distinct from [user usage and audit](/documents/features/usage/).

See the backend guides for [Traffic Control](https://github.com/yuhaiin/yuhaiin/blob/main/docs/traffic-control/README.md) and [resource governance](https://github.com/yuhaiin/yuhaiin/blob/main/docs/resource-governance.md), including quota persistence and recovery limits.
