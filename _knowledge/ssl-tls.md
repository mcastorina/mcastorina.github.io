---
layout: post
title:  "SSL/TLS"
category: Technologies
---

**SSL** (secure sockets layer) and **TLS** (transport layer security)
are two protocols that attempt to provide *confidentiality*, *integrity*,
and *authentication* when communicating across networks. Technically,
the **SSL** protocols are deprecated in favor of **TLS**, however these
two terms are often used interchangeably because TLS built off of SSL.

Confidentiality, integrity, and authentication are common properties in
information security.

* **Confidentiality** - only authorized individuals have access to information
* **Integrity** - the information has not been modified
* **Authentication** - individuals are who they say they are

Confidentiality is provided by encryption (either asymmetric or
symmetric) and integrity and authentication is provided by hashing and
[MACs](/knowledge/mac.html). Authentication cannot be fully provided
without a **Certificate Authority**, however.

## Public Key Infrastructure
A Certificate Authority along with the client and server create the
**Public Key Infrastructure**.

* **Client** - the entity requesting information (e.g. a web browser)
* **Server** - the entity serving information that must prove its identity
               (e.g. a website)
* **Certificate Authority** - the entity that validates identities and
                              allows the client to trust the server

When a server wants to prove its identity, it requests a **Certificate
Signing Request** (CSR) from the CA. In the request is the server's public
key, signed with its private key. The CA will verify the information in
the CSR and sign the server's certificate with the CA private key. Now,
when a client requests the server's certificate, it can verify the CA's
signature using the CA's public key and then trust the server.

## Handshake
There are various forms of the TLS handshake, but the most basic typically
takes two round-trips to verify the server certificate, exchange keys, and
begin using the agreed upon encryption method.

[Reference](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_handshake)

![TLS Handshake](/assets/kb/tls-handshake.svg){: width="75%" style="display: block; margin: auto"}
