---
date: "2021-04-21T00:00:00Z"
tags: programming
title: Thoughts on Abstractions
---
Computers are like onions. They stink, make you cry, and when you leave
them out in the sun they get brown and start sprouting little white hairs.

Wait, that's not right. Computers are like ogres! They have layers. Lots
of layers. In fact, modern technology is *built* on abstractions. This
is fantastic for containing complexity, assuming everything works as
intended, because you can work on larger problems without thinking about
the lower levels. For example, a developer can write a program that
sends messages across the Internet without ever knowing how that data
is physically sent.

Poorly designed abstractions can be a hindrance, however. By hiding
complexity, you can also hide functionality. Here's an over-simplified
example: a device has three buttons that turns an LED red, green, and
blue respectively. Now take this device, wrap a container around it,
and only expose the red button.  The interface is simpler now, but the
green and blue colors are no longer available.

In software, abstractions can be used in libraries, APIs (like the
backend server used by a web interface), or even function definitions.
It's so easy to add abstractions that developers often over-complicate
software by adding leaky or poor abstractions.

When it makes sense to add abstractions, however, it's important to
design them to both contain complexity and be flexible. Because users
will always start with the simplest tasks, the best software optimizes
for the common case while keeping the more complex features available,
once needed. Additionally, the simpler the building blocks, the easier
it is to build on. Your software may be used in ways you could never
imagine, so being simple and extensible allows for more innovation.
