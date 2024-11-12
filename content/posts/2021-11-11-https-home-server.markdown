---
date: "2021-11-11T00:00:00Z"
tags: tutorials
title: HTTPS for your Home Server
---

Do you have a home server and would like to securely connect to it? Or
are you tired of remembering your IP address? This post, as you may
have guessed, describes software and technologies to easily setup HTTPS
for your home server.

**Warning:** opening up your home server to the Internet is dangerous
without proper precautions. Your server *will* be found by bots and they
*will* attempt to gain access.

## Domain Name
The first step to getting HTTPS is to get a domain name for your
IP address. This is important because SSL certificates can only be
issued to a domain. If you don't want to purchase one, I recommend
[duckdns.org](https://www.duckdns.org/). They offer free sub-domains
(up to 5) that you can point to any IP address.

## Proxy (and SSL)
The second step is to setup a proxy with SSL capabilities. I have been
using [Nginx Proxy Manager](https://nginxproxymanager.com/) for awhile
now and it works quite well. The most important feature being automatic
SSL certificate renewal, so there is little maintenance. I would also
recommend setting up access lists to only allow certain external IPs
access to your server.

In fact, Nginx Proxy Manager has a guide on [hosting your home
network](https://nginxproxymanager.com/guide/#hosting-your-home-network)
that goes into more detail how to set it up.

## Conclusion
That's it! It's really simple, but I had no idea duckdns existed and
I'm so grateful that it does.
