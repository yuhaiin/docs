---
title: Backup, recovery and protected updates
description: Choose configuration snapshots or encrypted deployment archives and restore with startup verification.
---

Open **Settings → Backup**. Choose the backup type based on what you need to recover:

| Type | Purpose and limits |
| --- | --- |
| Configuration snapshot | Migrate settings using JSON export or an S3 SQLite snapshot; excludes private management identities and access policies and clears recognized authentication material |
| Full encrypted recovery archive | Coherent stopped-writer database/file inventory including management state, credentials, quotas and required dependencies; optional traffic history |

A saved backup setting or successful upload is not a tested recovery. Keep the external private key and a compatible executable available.

## Configuration snapshots

Configure the S3 endpoint, bucket, region, credentials and path-style option if required. Save, run **Backup now**, and check the result. The legacy snapshot interval is in **minutes**. New exports clear recognized node/inbound credentials, subscription URLs and private runtime material, and disable affected imported entries until reviewed. Re-enter credentials before enabling them. Configuration-bound text and private paths can still contain secrets; older backup objects are not rewritten. Protect both formats.

Exports containing private URL user information, queries or fragments in checked source/probe fields are refused rather than silently changed; use a full encrypted archive for those configurations.

A configuration restore can overwrite current settings. Preserve a known-good copy and verify the source instance before restoring. For native Android's separate configuration format, see [Android backup notes](https://github.com/yuhaiin/yuhaiin/blob/main/docs/android-config-backup.md).

## Full encrypted backups

1. Generate an external recovery identity in a protected location:

   ```sh
   yuhaiin recovery keygen -identity-file /private/offline/recovery.key
   ```

2. Keep that private identity separate from both the deployment and backup destination. Enter only its returned public `age1...` recipient in **Full disaster recovery backup**.
3. Choose local storage or S3 and explicitly allow maintenance. Capture stops the service and interrupts connections; coordinate external certificate/identity writers too.
4. Save, choose **Create full backup**, and confirm the interruption. Enable periodic capture separately if wanted; it is disabled by default and runs without the browser open.
5. Review history. S3 readback verifies ciphertext length and SHA-256; use **Verify archive** with the external key for authenticated decryption/inventory verification.

Automatic maintenance requires the actual installed `yuhaiin.service` on a root-owned Linux systemd host or a systemd user service with lingering enabled. Standalone, macOS, Windows and embedded deployments need the reviewed offline CLI workflow. See [managed backup prerequisites](https://github.com/yuhaiin/yuhaiin/blob/main/docs/managed-recovery-backups.md).

## Restore an archive

Retrieve or import the archive, verify it, and review the sealed preview before confirmed activation. Choose **original instance** when recovering the same identity, or **clone** when creating another deployment. Clone recovery removes source credentials/private identity material and disables inherited maintenance, monitoring and certificate jobs; explicitly enroll it before use.

File activation is only an intermediate state. Completion requires the restored service's database, listener and startup checks. Keep a compatible binary and stopped-writer recovery path available. Never test against your only working installation.

For offline verification:

```sh
yuhaiin recovery verify -archive /backups/instance.yhb   -identity-file /private/offline/recovery.key
```

Follow the [offline recovery guide](https://github.com/yuhaiin/yuhaiin/blob/main/docs/recovery-archive.md) for preview, activation, platform prerequisites and rollback. Do not copy a live SQLite main file as a substitute for a coherent snapshot.

## Protected software updates

**Help & about → About → Software Update** reports compatibility and recovery readiness. On supported Linux services, configure an external public recovery recipient and maintenance consent before updating. Protection defaults on; periodic backups are a separate setting. A protected update captures an encrypted recovery point before binary replacement and independently verifies startup.

**Previous versions** retains the two most recently replaced executables. Restoring one does not revert databases or migrations. If a new executable may have migrated data and startup fails, the target can remain stopped for manual paired binary/database recovery; automatic reversal of irreversible migrations is not promised.

See [update recovery procedures](https://github.com/yuhaiin/yuhaiin/blob/main/docs/update-rollback.md). Do not disable protection merely to work around a schema incompatibility.
