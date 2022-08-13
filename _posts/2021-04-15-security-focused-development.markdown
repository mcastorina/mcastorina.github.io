---
layout: post
title:  "Security Focused Development"
date:   2021-04-27 00:00:00 -0500
tags: programming
---

As the security industry grows and more and more critical systems are
put online, the demand for security focused developers will grow as
well.  Security focused development, as the name suggests, is software
development with security in mind. Software engineers need to think like
hackers while developing systems in order to keep users secure.

As an engineer with a strong interest in ethical hacking, I naturally
think about how the code I write could be exploited. So here are my tips
on secure software development.

## Don't trust any input data
I covered this idea in [another post](/posts/trusting-data.html), but the
main idea is that any input to your system can be malicious. This includes
data from databases, even if you control everything that goes in. A
common assumption is that the database is a trusted resource, however
there are a myriad of ways to infiltrate and poison it. Hackers just
need to find one way to do so to take advantage of this assumption.

## Follow cryptographic best practices
Cryptography is hard. Or rather, it's easy to get wrong without knowing
it's wrong.  Libraries are getting better about this, but always follow
the best practices. That means using standard libraries for cryptography
(do not roll your own!), never store sensitive information unencrypted,
salt your hashes, and always [encrypt-then-MAC](/knowledge/mac.html#encrypt-then-mac).

## Use idempotent operations
Idempotent operations are operations that when ran more than once, have
no further effect on the outcome. I always remember it as assigning a
variable versus incrementing a variable.

```python
a = 0

a = 1  # idempotent
a += 1 # not idempotent
```

Both ways will set the variable to `1`, but executing the non-idempotent
version multiple times will continue to affect the output.

The reason this is important is because it makes retry operations safe in
distributed systems. It will also give you peace of mind knowing there's
no difference running it once or 100 times (how many times do you hit `Ctrl+S`
to make *sure* your document is saved?).

## Conclusion
Similar to how the development life-cycle shifted from waterfall to agile,
I believe we'll see a similar shift to security focused developers. It
doesn't take much to keep security in mind when developing software, but
also know that it doesn't stop when you commit your code. Regular security
audits are necessary to staying safe, because the security industry is
constantly innovating.
