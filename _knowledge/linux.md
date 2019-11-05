---
layout: default
title:  "Linux"
category: Software Development
---

# Linux
Linux is a family of open source operating systems stemming from
Unix. Common Linux distributions include: Debian, Ubuntu, and Fedora.
Personally, my Linux distribution of choice is Arch Linux.

## Command Line Interface
All Linux distributions have a command line interface (CLI) usually
running [bash](/knowledge/bash.html). It is a way to quickly
and efficiently perform tasks on the computer using available
commands.  The CLI is particularly suited for automation of repetitive
or delayed tasks, and provides very simple inter-process communication.

I usually do 90% of my work on the command line because I have found
it to be faster and easier to perform tasks (especially if it is
repetitive). My shell emulator of choice is [zsh](https://www.zsh.org/)
for its many plugins.

## File System
In Linux, everything is a file. This means that all connected
hardware is represented as a file. Files are files. Directories are
files. Sockets are files. Everything. This concept means the same
tools can be applied when manipulating or interacting with devices.

| Path | Description |
| ---- | ----------- |
| `/`  | Root of the filesystem |
| `/root` | Root user's home directory |
| `/home` | Normal users' home directories |
| `/bin` | Essential user binaries |
| `/boot` | Static boot files |
| `/dev` | Device files (like hard drives) |
| `/etc` | Configuration files |
| `/lib` | Essential shared libraries |
| `/opt` | Optional packages |
| `/proc` | Kernel and process files |
| `/sbin` | System administration binaries |
| `/tmp` | Temporary files |
| `/usr` | User binaries (and read only data) |
| `/var` | Variable data files (like log files) |

## Kernel and User Space
System memory is divided into two distinct spaces: **kernel space**
and **user space**. Kernel space is the protected memory space that
runs the operating system. It has full access to the hardware,
contains kernel code, and most of the memory is directly mapped to
physical memory.

User space is where the normal application runs.  It has limited
access to resources and contains process code, data, and memory
mapped files. User programs can request resources through **system
calls** to the kernel.

## Cron
Cron is a time based job scheduler. Each line in a cron table file
represents a job. Here is a template describing each entry in the
table.

```
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * command to execute
```

### Anacron
Anacron is similar to cron, except it does not expect the system
to always be continuously running. In other words, anacron will
reschedule jobs if the system is off at the time the job was supposed
to run, unlike cron which will skip the job entirely.

## Tools
Working in Linux and the CLI, you will invariably learn many tools
for system administration and development. Below is a list of common
commands in no particular order.

| Tool | Description |
| ---- | ----------- |
| `ls` | List files  |
| `cd` | Change directory |
| `mv` | Rename files |
| `cp` | Copy files |
| `touch` | Change file timestamps |
| `mkdir` | Make directories |
| `rm` | Unlink files |
| `sed` | Stream editor |
| `awk` | Pattern scanning and processing language |
| `curl` | Transfer a URL |
| `make` | Maintain a group of programs |
| `find` | Walk a file hierarchy |
| `man` | Display manual pages |
| `grep` | File pattern searcher |
| `watch` | Execute a program periodically with output |
| `tmux` | Terminal multiplexer |
| `wc` | Word, line, and character counter |
| `less` | `less` is `more` |
| `tar` | Archiving utility |
| `gzip` | Compression tool |
| `date` | Display or set date and time |
| `ssh` | OpenSSH client |
| `scp` | Copy files via SSH |
| `ftp` | File transfer protocol client |
| `rsync` | Remote and local file copying tool |
| `ncat` | Concatenate and redirect sockets |
| `lsblk` | List block devices |
| `lsusb` | List USB devices |
| `lspci` | List all PCI devices |
| `df` | Report file system disk space usage |
| `du` | Estimate file space usage |
| `cut` | Remove sections from each line of files |
| `paste` | Merge lines of files |
| `diff` | Compare files line by line |
| `comm` | Compare two sorted files line by line |
| `seq` | Print a sequence of numbers |
| `yes` | Output a string repeatedly until killed |
| `crontab` | Maintain crontab files for individual users |
| `useradd` | Create a new user |
| `groupadd` | Create a new group |
| `usermod` | Modify a user account |
| `groupmod` | Modify a group definition |
| `cfdisk` | Display or manipulate a disk partition table |
| `mkfs` | Build a Linux filesystem |
| `mktemp` | Create a temporary file or directory |
| `mount` | Mount a filesystem |
| `umount` | Unmount a filesystem |
| `pianobar` | CLI Pandora client |
