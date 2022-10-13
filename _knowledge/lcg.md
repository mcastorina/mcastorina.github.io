---
layout: post
title:  "Linear Congruential Generator"
category: Math
---
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

Linear Congruential Generator is an algorithm to produce a sequence of
pseudorandom numbers.

{% raw %}
$$ X_{n+1} = (aX_n + c) \bmod{m} $$
{% endraw %}

Reference: [Linear Congruential Generator](https://en.wikipedia.org/wiki/Linear_congruential_generator)

## Non-repeating PRNG
When $$c \neq 0$$, correctly chosen parameters allow a period equal to $$m$$,
for all seed values. This will occur if and only if:

1. $$m$$ and $$c$$ are relatively prime (coprime)
2. $$a-1$$ is divisible by all prime factors of $$m$$
3. $$a-1$$ is divisible by $$4$$ if $$m$$ is divisible by $$4$$

These three requirements are referred to as the Hull-Dobell Theorem.

### Example
Suppose we want a PRNG that outputs integers $$[0, 10)$$. We will choose our values according to the Hull-Dobell Theorem above: $$m = 10$$, $$c = 7$$, $$a = 11$$.

| $$n$$ | $$X_n$$ | $$X_{n+1} = (11X_n + 7) \bmod{10}$$ |
| --- | --- | --- |
| 0   | 0   | 7   |
| 1   | 7   | 4   |
| 2   | 4   | 1   |
| 3   | 1   | 8   |
| 4   | 8   | 5   |
| 5   | 5   | 2   |
| 6   | 2   | 9   |
| 7   | 9   | 6   |
| 8   | 6   | 3   |
| 9   | 3   | 0   |
| 10  | 0   | 7   |

Note that despite the period being equal to $$m$$, it doesn't make a
particularly good PRNG. See [spectral test](https://en.wikipedia.org/wiki/Spectral_test) for checking the quality of LCGs.
