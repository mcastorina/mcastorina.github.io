---
layout: kb
title:  "Systemd"
category: Technologies
---


A suite of basic building blocks for initalizing and managing a Linux system.

## Units
The basic object that `systmed` manages is a unit. There are many types, but
the most common is a `service` unit, which we can interact with via the
`systmectl` command.

```bash
# start, stop, and restart a service
sudo systemctl start nginx.service
sudo systemctl stop nginx.service
sudo systemctl restart nginx.service
# reload a service's configuration (not unit configuration)
sudo systemctl reload nginx.service
# reload a service's unit configuration
sudo systemctl daemon-reload nginx.service

# get the status of a unit
systemctl status nginx.service

# control whether the service starts on bootup
sudo systemctl enable nginx.service
sudo systemctl disable nginx.service

# get unit information
systemctl list-units
```

To inspect a unit file, the following commands can be used.

```bash
# print the unit file
systemctl cat nginx.service
# view the dependency tree
systemctl list-dependencies nginx.service
# view low level settings
systemctl show nginx.service
```

Unit files may be edited as well via `systemctl`.

```bash
sudo systemctl edit nginx.service
sudo systemctl edit --full nginx.service
```

## Logs
A `systemd` component called `journald` collects and manages journal entries
for all parts of the system. `journald` can be interacted with via
`journalctl`.

```bash
# see all log entries
journalctl

# see only kernel logs
journalctl -k

# see logs from a specific unit
journalctl -u nginx.service
```

## Targets (Runlevels)
Targets are used to group units together via dependencies and are standardized
synchronization points.

```bash
# list all available targets
systemctl list-unit-files --type=target
# get the default target2 that systemd tries to reach at boot
systemctl get-default
# list what units are tied to a target
systemctl list-dependencies multi-user.target
```
