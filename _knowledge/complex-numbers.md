---
layout: default
title:  "Complex Numbers"
category: Electrical Engineering
---
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

# Complex Numbers
Complex numbers are numbers that consist of a real and imaginary
part. Usually it is of the form $$a + jb$$ where $$a$$ and $$b$$
are real values and $$j$$ represents $$\sqrt{-1}$$. Complex numbers
can be visualized as a plane where the real part is the x-axis and
the imaginary part is the y-axis.

## Polar Form
Complex numbers can be thought of as Cartesian points on a plane,
and subsequently, they can be expressed as polar coordinates.

<p style="text-align: center"><img src="/assets/kb/complex.svg" width="240"/></p>

{% raw %}
$$
\begin{align}
z &= x + jy \\
  &= r\cdot(\cos \phi + j\sin \phi) \\
  &= r\cdot e^{j\phi}
\end{align}
$$

where

$$
\begin{align}
r &= |x+y| = \sqrt{x^2 + y^2} \\
\phi &= atan \left( \frac{y}{x} \right) \\
\end{align}
$$

{% endraw %}

## Complex Conjugate
The complex conjugate is the number with an equal real part and an imaginary part opposite in sign.

| Form | Complex Number | Complex Conjugate |
| ---- | -------------- | ----------------- |
| **Standard** | $$ a + jb $$ | $$ a - jb $$ |
| **Polar** | $$ re^{j\phi} $$ | $$ re^{-j\phi} $$ |
