---
layout: kb
title:  "Modular Arithmetic"
category: Math
---
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

Modular arithmetic is a type of mathematical arithmetic in which numbers
(consisting entirely of integers) wrap around a modulus. An intuitive
example is time past 12:00 wraps around to 1:00, however in math the
possible values are $$ \left[0, modulus-1 \right]$$.

A value in modular arithmetic is also the remainder when dividing by the
modulus. This is common in computer science and programming languages
as the `%` operator. For example, $$12 \bmod{10} \equiv 2$$.

<table>
  <thead>
    <tr>
      <th style="text-align: center">..</th>
      <th style="text-align: center">-2</th>
      <th style="text-align: center">-1</th>
      <th style="text-align: center">0</th>
      <th style="text-align: center">1</th>
      <th style="text-align: center">2</th>
      <th style="text-align: center">3</th>
      <th style="text-align: center">4</th>
      <th style="text-align: center">5</th>
      <th style="text-align: center">6</th>
      <th style="text-align: center">7</th>
      <th style="text-align: center">8</th>
      <th style="text-align: center">9</th>
      <th style="text-align: center">10</th>
      <th style="text-align: center">11</th>
      <th style="text-align: center; background-color: yellow;">12</th>
      <th>..</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center">..</td>
      <td style="text-align: center">8</td>
      <td style="text-align: center">9</td>
      <td style="text-align: center">0</td>
      <td style="text-align: center">1</td>
      <td style="text-align: center">2</td>
      <td style="text-align: center">3</td>
      <td style="text-align: center">4</td>
      <td style="text-align: center">5</td>
      <td style="text-align: center">6</td>
      <td style="text-align: center">7</td>
      <td style="text-align: center">8</td>
      <td style="text-align: center">9</td>
      <td style="text-align: center">0</td>
      <td style="text-align: center">1</td>
      <td style="text-align: center; background-color: yellow;">2</td>
      <td>..</td>
    </tr>
  </tbody>
</table>


## Addition and Subtraction
Values must be positive integers less than the modulus, so any value
outside of that range can be converted by repeatedly adding / subtracting
the modulus until the condition is met.

For example, the following three numbers are all equivalent to $$7
\bmod{10}$$: $$-3, -13, 17$$.  This pattern can repeat indefinitely, and
adding or subtracting a modulus is equivalent to adding or subtracting
$$0$$.

When adding two numbers in modular arithmetic, normal arithmetic may
be used, followed by taking the remainder when dividing by the modulus.
For example, $$3 + 9 \bmod{10} \equiv 12 \bmod{10}$$. $$\frac{12}{10} =
1 \;\mathrm{rem}\; 2$$, so our final answer is $$2 \bmod{10}$$.

## Multiplication
Multiplication works similar to addition, in that normal arithmetic may
be used, followed by taking the remainder. Example: $$3 \cdot 9 \bmod{10}
\equiv 27 \bmod{10}$$. $$\frac{27}{10} = 2 \;\mathrm{rem}\; 7$$, so our final answer
is $$7 \bmod{10}$$.

For large numbers, [Montgomery Multiplication](https://en.wikipedia.org/wiki/Montgomery_modular_multiplication)
is an efficient algorithm for performing modular multiplication.

## Division
Division, or rather inverse multiplication, only sometimes exists in
modular arithmetic. The inverse multiplication can be thought of as
follows:

What is $$B^{-1}$$ such that

{% raw %}
$$ B \cdot B^{-1} \bmod{C} \equiv 1 $$
{% endraw %}

$$B^{-1}$$ in this definition is called the modular multiplicative inverse,
and it only exists if $$B$$ and $$C$$ are coprime (their greatest common
divisor is 1).

### Finding the modular multiplicative inverse
The most common way to find the inverse of
$$B \bmod{C}$$ is by using the [extended Euclidean
algorithm](https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm). It
works by recursively defining $$B$$ and $$C$$ in terms of its
remainders. It may be easiest to see in an example.

#### Example
This example finds the modular multiplicative inverse of $$7 \bmod{10}$$. We know
it exists because $$7$$ and $$10$$ are coprime.

| Step | Description | Result |
|:----:|:----------- |:------ |
| 1    | Define 10 divided by 7 in terms of the integer result and remainder | $$10 \equiv 7(1) + 3$$ |
| 2    | Define the divisor (7) in terms of the remainder (3) | $$7 \equiv 3(2) + 1$$ |
| 3    | Rearrange all equations in terms of the remainder | {%raw%} $$ \begin{align} 3 &\equiv 10 - 7(1) \\ 1 &\equiv 7 - 3(2) \end{align} $$ {%endraw%} |
| 4    | Substitute equations to get one equation in terms of the original values (7 and 10) | $$ 1 \equiv 7 - \left[ 10 - 7(1) \right](2) $$ |
| 5    | Simplify | {%raw%} $$ \begin{align} 1 &\equiv 7 - \left[ 10 - 7(1) \right](2) \\ &\equiv 7 - (10(2) - 7(2)) \\ &\equiv 7(3) - 10(2) \end{align} $$ {%endraw%} |
| 6    | Rearrange and simplify 10(2) to 0 | $$ \begin{align} 1\cdot 7^{-1} &\equiv 3 \\ 7^{-1} &\equiv 3 \end{align} $$ |

**Note:** step (2) is the expanded form of recursion. This step should be repeated until the remainder is $$1$$.

Therefore, the modular multiplicative inverse of $$7 \bmod{10}$$ is
$$3$$. We can test this result by multiplying any number by $$7$$ then
taking the inverse:

{% raw %}
$$
\begin{align}
9 \cdot 7 \bmod{10} &\equiv 3 \\
3 \cdot 7^{-1} \bmod{10} &\equiv \\
3 \cdot 3 \bmod{10} &\equiv 9
\end{align}
$$
{% endraw %}
