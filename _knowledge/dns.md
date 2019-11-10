---
layout: default
title:  "DNS"
category: Technologies
---

# DNS
The Domain Name System is a decentralized naming system for computers
connected on a network. It primarily translates human readable
domain names into IP addresses. The job of assigning domain names
and mapping them to Internet resources goes to authoritative name
servers for each domain. A DNS name server is a server that stores
DNS records for a domain. It responds with answers to queries against
its database.

## Resource Records
Here are the most common resources stored in a DNS name server.

| Type | Description |
| ---- | ----------- |
| **A** | Address record - an IPv4 address |
| **AAAA** | Address record - an IPv6 address |
| **CNAME** | Canonical name - alias of one name to another; the lookup will continue by retrying with the new name |
| **MX** | Mail exchange record - maps a domain name to a list of message transfer agents |
| **NS** | Name server record - delegates a DNS zone to use the authoritative name servers |
| **PTR** | Pointer resource record - alias of one name to another; the lookup will stop here (used for reverse name lookup) |
| **SOA** | Start of authority record - specifies authoritative information about a DNS zone |
| **TXT** | Text record - originally for human readable text, but now leveraged for opportunistic encryption and other protocols |

Reference: [List of DNS Record Types](https://en.wikipedia.org/wiki/List_of_DNS_record_types)

## Address Resolution
To determine the IP address of a domain, the client must find the
correct name server to query. This starts by asking the root. The
root will then point the client to another name server to query.
This iteration continues until the client connects to the final
name server that has the address of the domain name in question.

In reality, caching is used in DNS servers to offload the root
servers, so only a few percentage of requests require a query to
the root name servers.
