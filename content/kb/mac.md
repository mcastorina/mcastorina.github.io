---
layout: kb
title:  "MAC"
category: Technologies
---

Message authentication code (MAC) is a piece of data that is used to
confirm that the message came from the stated sender and has not been
changed.

## HMAC
HMAC is a specific type of MAC that uses a cryptographic hashing algorithm
along with a secret key.

## Encrypt-then-MAC
Encrypt-then-MAC refers to encrypting the message first, then generating
the MAC using the cipher text.  It is preferred over MAC-then-Encrypt
because it:

 * Provides integrity of the cipher text and plain text
 * No information can be leaked from the MAC, assuming the cipher text appears random
 * MAC-then-Encrypt must decrypt before authenticating the message
   * Allows an opportunity for vulnerabilities in the decryption implementation
