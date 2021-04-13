---
layout: post
title:  "Trusting Data"
date:   2021-04-13 00:00:00 -0500
categories: programming
---

When creating programs, you will almost certainly operate on data. This
could come from users submitting information to your website, or data
read in from a database. Wherever it comes from, developers define
how that data is used and what can be done with it. As such, it is
important to think whether the data is trusted and safe to operate on,
or if your program can be exploited when the data is changed.

An over-simplified description of a program is a machine that takes
in data, applies transformations, and outputs data. In many cases,
developers write code for expected input, trusting the data will be
in a format that is known. Hackers, on the other hand, like to see
what your machine will do when supplied with unexpected data.

Put simply, never trust data that comes into your program. That includes
from a database or other internal system. It's easy to forget, but if
a hacker poisons a supposed trusted data source, then they can reach
even further without the layered validation in your system.

A real life example of this is stored cross-site scripting. It happens
when a hacker is able to save malicious JavaScript in a database that
later gets served to other users of a website. Validating the data as
it comes out of the database is an extra layer to your security posture
that could protect your users and alert you that something is amiss.
