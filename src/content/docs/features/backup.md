---
title: Back up and restore
description: Safely back up settings and avoid destructive restores.
---

Backups make it possible to recover settings when you reinstall or move Yuhaiin. The current **Settings → Backup** page supports S3-compatible backup storage and explicit backup/restore actions.

## Before enabling cloud backups

Prepare an S3-compatible endpoint, bucket, region and access credentials. Some storage services require **path-style** requests; the Web UI provides an option for that.

1. Open **Settings → Backup**.
2. Give the instance an identifiable name.
3. Configure the backup interval and the S3 endpoint, bucket, region and keys.
4. Save the settings.
5. Use **Backup now** and verify the backup was created at your storage provider.

Backups may include nodes, subscriptions, lists and other configuration data. Treat backup objects as sensitive, since configurations can contain passwords, certificates and private keys.

## Restore

**Restore now** reads the configured backup and can **overwrite the current configuration**. Before using it, verify which instance created the backup and that you have a current copy of your existing configuration. Do not test restore against your only working setup.

If you use local data-directory backups instead, stop the backend before manipulating database files, and restore a complete, consistent snapshot. Merely copying one database file while Yuhaiin is writing to it may be unsafe.

For details of the Android-specific configuration backup format, see the backend [Android backup notes](https://github.com/yuhaiin/yuhaiin/blob/main/docs/android-config-backup.md).
