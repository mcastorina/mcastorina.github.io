---
date: "2026-03-30T09:00:00Z"
tags: misc
title: WireGuard is simply elegant
---

[WireGuard](https://tailscale.com/) is a secure, easy to use, and simple VPN
solution that is the underlying technology for
[Tailscale](https://tailscale.com/). I've personally used it in both flavors
and have been very happy with its reliability and the fact that it "just
works." So this week, I decided to learn how it *can* "just work" by reading
the [whitepaper](/assets/wireguard.pdf) describing its design and also watching
the [2018 BlackHat keynote](https://www.youtube.com/watch?v=88GyLoZbDNw).

While I enjoy exploring the technical details of a secure communication
protocol¹ and will dive into that later, I want to take some time to appreciate
the simple elegance of the WireGuard protocol that I strive to match in my own
work.

WireGuard, like most software, solves a specific problem. I admire that it
takes a focused approach with intentional design goals for achieving it, like
"simple, fast, and secure." These goals clearly inform many of the
implementation details, like making it a kernel-module to avoid copying bytes
(making it fast).

I won't go through all of the design goals, but I do want to highlight that
they achieved all of them by knowing the ecosystem in which WireGuard would
exist. For example, they matched SSH patterns by not trying to solve the key
exchange problem. Users already have a tolerance, understanding, and, most
importantly, existing mechanisms for this, so public keys can be shared
out-of-band in whatever manner a user chooses. Another great example of this is
the opinionated choice of the cryptography used. WireGuard is implemented using
one cryptosystem (`ChaCha20-Poly1305`) after witnessing the massive complexity
and ensuing vulnerabilities of systems like TLS. This greatly reduces
complexity and makes it faster and even more secure. The author both followed
existing patterns and learned what not to do from existing technologies.

I love all these design goals, but my favorite is "simplicity" because it's
something I strive for in my own software. Making something simple and useful
is not easy! I often reference the [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy)
"do one thing and do it well," but WireGuard has managed to do something quite
complex and make it appear simple. One way it does this is by exposing a
stateless interface to a stateful system, which is novel to me.

> From the perspective of the user, WireGuard appears stateless. The private
> key of the interface is configured, followed by the public key of each of its
> peers, and then a user may simply send packets normally.

As a tool, this makes a lot of sense to do. You want your tool to be easy to
use and unlocks the ability to build atop it. The complexity associated with
state is all handled by a simple timer-based state machine, where all
transitions are accounted for, so even if there is state, it eventually resets
when nothing happens.

WireGuard really is quite simple and effective, but the effort and quality that
went into designing it is something to be admired. I will absolutely reference
these design principles in my own work, and I highly recommend reading the
[whitepaper](https://www.wireguard.com/papers/wireguard.pdf) yourself!


---


¹ I recently worked through [cryptopals](https://github.com/mcastorina/cryptopals) without any external
  libraries, but even in 2014 (!!) I wrote a [toy project](https://github.com/mcastorina/simple-chat/)
  for end-to-end encrypted communication
