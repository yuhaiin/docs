---
title: Route different websites differently
description: A first example of proxy, direct, block and rule testing.
---

Routing rules tell Yuhaiin what to do with connections already received by an inbound. Start with **one rule**, verify it, and then add more.

## Example: proxy most traffic, direct for one site

1. Set up [a working local proxy](/documents/guides/first-connection/) first.
2. Open **Routing → Route rules** and inspect the **Unmatched traffic** default. Set it to **Proxy** and choose the intended default destination.
3. Add a rule matching a hostname that you control or can test, such as `example.com`. Choose **Direct** for that rule.
4. Save and apply the routing changes. If the interface shows an apply error or a pending revision, the running decision may still be the old one.
5. Open **Routing → Test route**. Check the chosen target and matched rule for `example.com` and for an unrelated domain.

This changes routing only for traffic that reaches Yuhaiin. A browser that bypasses the inbound will not be affected.

## Example: block a domain

Create a rule for your chosen host list or hostname and set the action to **Block**. Apply the change, then test the route and inspect **Monitoring → Blocked history**. Remember that apps may connect by IP without a hostname, which can bypass a name-only match.

## Rule ordering

A broad rule above a specific one may consume traffic first. Put more specific conditions before a broad catch-all. Use **All**, **Any**, and **Not** conditions when an individual host or port is insufficient.

If a rule depends on a remote list, confirm the list downloaded and that its content matches the kind of condition you selected.

## Selector example

Create a named selector under **Destinations → Selectors** and point a rule at it. When you later change the selector's chosen node, rules referring to the selector keep the same target identifier. This is useful when several domains should switch proxy nodes together.

For match types and revision/apply semantics, read [Routing](/documents/features/routing/).
