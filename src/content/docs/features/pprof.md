---
title: Performance profiler
description: Capture CPU and memory profiles without command-line Graphviz.
---

**Diagnostics → pprof** is for investigating resource consumption in the Go backend. It is not a proxy speed test or network connectivity check.

## Enable and capture

1. Open **Settings → Configuration** and enable **pprof**, then save.
2. Open **Diagnostics → pprof**.
3. Choose a profile type. The current UI offers **CPU**, **Heap**, **Allocations**, **Goroutine**, **Mutex**, and **Block**.
4. Select the capture duration where applicable and start recording.
5. When complete, select the session to examine its flamegraph, top-functions view, or detailed graph.

CPU, mutex and block profiles are sampled over an interval. Heap or goroutine snapshots are immediate representations of a moment; comparing two snapshots often tells you more than one screenshot.

## Interactive graphs

The graph viewer uses an in-browser Graphviz WASM integration instead of depending on a host-side `dot` executable. Use graph navigation controls and available pointer gestures to inspect large call graphs. A flamegraph is often easier to read for the first investigation.

## Interpreting results

- **High CPU:** look for repeated hot functions in a CPU sample taken during the slowdown.
- **Growing memory:** compare heap samples after similar activity, not just allocations.
- **Stalled requests:** goroutine and mutex/block profiles can reveal waiting and contention.

Profiles can consume CPU, memory and disk space while recording. Delete sessions you no longer need and disable profiling in normal use if unnecessary.

**Privacy:** profile labels and stacks can expose file paths, function names or application details. Review before sharing. See [Monitoring](/documents/features/monitoring/) and [the Go runtime profiling documentation](https://pkg.go.dev/runtime/pprof).
