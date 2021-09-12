---
layout: default
title:  "XSS"
category: Hacking
---

# Cross-Site Scripting (XSS)
XSS is a vulnerability in a website that allows an attacker to inject
client-side scripts into web pages viewed by other clients. A common
target for this attack is user session cookies.

## Types

**Non-persistent (reflected)** XSS vulnerabilities simply take user input
(e.g. via a form query parameter) and uses it as part of the HTML body
or other form of evaluation. The attacker can craft a URL containing
the attack and send it to the victim.

**Persistent (stored)** XSS vulnerabilities are more complex in nature
because the attacker must get the server to store malicious data and
serve it to users as part of the normal HTML page.

## Resources
* Generally, getting a page to execute `alert(document.domain)` is a sign
there is a XSS vulnerability.
  * This can be done within `<script>` tags or via
    `<img src="javascript:alert(document.domain)">`
* [https://webhook.site/](https://webhook.site/) can be used to view
requests in an attack.
