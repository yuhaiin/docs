---
title: Automatic outbound selection
description: Configure failover, latency, throughput and weighted selection with meaningful health evidence.
---

Open **Destinations → Selectors**. A selector retains a stable ID for routing while its backend policy chooses a node for new traffic. Existing selectors remain manual until you explicitly configure a policy; upgrading does not enable probes or speed tests.

| Policy | How new traffic chooses a candidate |
| --- | --- |
| Manual | Your selected node |
| Failover | Healthy candidates by priority, with optional preferred return |
| Lowest latency | Fresh comparable RTT measurements |
| Highest throughput | Fresh active download measurements |
| Balanced | Normalized weighted latency, throughput, stability and load components |
| Weighted | Weighted distribution of new connections/sessions among eligible candidates |

## Set up failover

1. Create a selector and add enabled candidate nodes. Lower priority numbers come first; connection weights matter for weighted mode.
2. Select **Failover**, review the fallback behavior and configure the desired probe schedule.
3. Run TCP and UDP probes separately. Check candidate health, reason and sample freshness.
4. Save and refer to the selector from the default destination or a route rule.
5. Test a new client connection and inspect its actual selected node. Repeat after making one candidate unavailable in a controlled test.

The backend keeps evaluating with the browser closed. Existing TCP streams and UDP sessions stay pinned to their chosen node; switching selection does not migrate them. A failed application request is not automatically replayed through another node.

## Measurements and switching

TCP and UDP have independent evidence. Constructing an outbound or opening a UDP socket does not prove remote reachability. Ranking requires fresh comparable samples for the configured target; an unknown RTT is not zero latency.

For throughput mode, run **Measure download** and configure explicit schedules and byte/time/concurrency/daily budgets if periodic testing is wanted. Passive traffic Bps measures current load, not available capacity. Upload testing additionally requires a compatible target and explicit consent. Speed tests consume real traffic.

Hold times, cooldowns, improvement thresholds and circuit recovery trials prevent unstable switching. A manual lock temporarily retains the selected node; unlock to resume policy. Preferred-return settings do not make an unhealthy or slower candidate automatically win.

Review fallback explicitly: reject, configured selected node, or priority-ordered unknown candidates. A fallback permitting unknown or selected nodes relaxes the normal health/ranking requirements. The live status explains the actual decision and recent switches.

See [backend selection semantics](https://github.com/yuhaiin/yuhaiin/blob/main/docs/intelligent-selectors.md) and [measurement limits](https://github.com/yuhaiin/yuhaiin/blob/main/docs/measurement-bounds.md).
