---
title: Managed HTTPS certificates
description: Issue and renew ACME site certificates using HTTP-01 or Cloudflare DNS-01.
---

Open **Certificates** to manage HTTPS site resources. Issuance and renewal run on the server, even with the browser closed. These site certificates are separate from Gateway MITM CA and TLS Auto CA certificates.

## Issue a certificate

1. Choose **New ACME certificate**, enter a name, account email and exact domain/SAN set.
2. Start with the CA's **Staging** environment to test challenges. Staging certificates are not publicly trusted; use Production for the final site.
3. Choose a challenge method below and complete its prerequisites.
4. Accept the selected CA's terms, set automatic renewal as desired, save and inspect issuance status.
5. Reference the issued resource from the HTTP Gateway's TLS termination settings. Check the hostname and certificate served by a real TLS connection.

| Challenge | Requirements |
| --- | --- |
| HTTP-01 | Explicitly opted-in existing plain HTTP Gateway on port 80, public DNS reaching it, and a source ACL allowing CA validation |
| DNS-01 | Cloudflare zone and scoped DNS read/write API token; supports wildcard names |

HTTP-01 does not open a new listener automatically. DNS-01 waits for TXT propagation and removes only records owned by that challenge. Provider tokens are write-only; leaving an update blank preserves the existing token.

## Renewal and failures

Inspect expiry, next renewal, failure/backoff state and CA renewal advice when available. A failed issuance retains an existing valid certificate. Successful replacement serves new material to new handshakes while established streams continue. Manual renewal respects minimum intervals and failure backoff.

Referenced certificates and providers cannot be deleted while in use. Management HTTPS can opt into a managed resource using the host-owned `-https-certificate-id` startup argument; saving a site resource alone does not change the management listener.

Keep external backup keys available for [full recovery](/documents/features/backup/). Clone recovery clears private site/account keys and DNS tokens and disables inherited renewal jobs; explicitly enroll the clone before use.

See [backend certificate lifecycle](https://github.com/yuhaiin/yuhaiin/blob/main/docs/managed-certificates.md) for trust, reference and recovery requirements.
