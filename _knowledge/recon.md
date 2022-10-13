---
layout: post
title:  "Reconnaissance"
category: Hacking
---

## Passive Reconnaissance
Passive reconnaissance is the act of gathering information about
your target without directly interacting with the target. There is
a lot of information that you can obtain, including employee names
and emails, servers, hostnames, even employee images or badge photos.

### Passive Recon Tools
There are many tools out there, but here are some to get started.

- [Google Fu](https://coursebuilder.withgoogle.com/sample/course) -- Find hosts, files, or any publicly indexed information

```
site:example.com -site:www.example.com
site:example.com filetype:pdf
site:example.com inurl:etc -intext:etc ext:passwd
```

- [Certificate Transparency](https://transparencyreport.google.com/https/certificates) -- Find issued certificates
- Regional Internet Registries -- Find subnets and technical contacts
  - AFRINIC, APNIC, ARIN, LACNIC, RIPE
- [Netcraft](https://www.netcraft.com/) -- Find site reports and other services
- [Shodan](https://shodan.io) -- Find server information and other services
- [Censys.io](https://censys.io) -- Find server information and other services


- [spiderfoot](https://github.com/smicallef/spiderfoot)
- [theHarvester](https://github.com/laramies/theHarvester)
- [discover](https://github.com/leebaird/discover)
- [recon-ng](https://github.com/lanmaster53/recon-ng) -- Metasploit framework style interface


## Active Reconnaissance

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

## smbmap
Samba Share Enumerator

```bash
# enumerate samba $IP with guest credentials
smbmap -H $IP -u guest
```

## dig
DNS lookup utility

```bash
# lookup zone transfer
dig axfr @$IP $HOST
```

