---
layout: default
title:  "Reconnaissance"
category: Hacking
---

## nmap
```bash
# default scripts, version detection
nmap -sC -sV $IP

# all 65535 ports
nmap -p- $IP

# search for hosts on subnet
nmap -sn $IP/24
```

Reference: [Nmap Man Page](https://nmap.org/book/man.html)
