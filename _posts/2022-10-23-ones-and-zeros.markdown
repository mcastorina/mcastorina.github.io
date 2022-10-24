---
layout: post
title:  "Ones and Zeros"
date:   2022-10-23 00:00:00 -0500
tags: programming
---

The root of digital logic is being able to differentiate between *something*
and *not something*. This little seed has basically built the entirety of the
information age. You've probably heard it before: a computer is just ones and
zeros, but let's explore this a bit (ha) in the context of programming and
data.

### Bits of Data

Data ultimately comprises of ones and zeros (called bits) stored in memory, and
we can manipulate how it is represented using different types in a programming
language. Let's look at an example in C.

```c
#include <stdio.h>
#include <stdint.h>

int main() {
    int8_t data = -1;

    // Print data as a signed 8-bit decimal number.
    printf("int8_t:  %d\n", data);

    // Print data as an unsigned 8-bit decimal number.
    printf("uint8_t: %d\n", *(uint8_t*)&data);
}
```

```
int8_t:  -1
uint8_t: 255
```

Let's break down what's happening here.

First we create a variable `data` that is 1 byte (8 bits) large and
store `-1` into it.

```c
int8_t data = -1;
```

But what is `-1`? Well, most computers represent `-1` in ones and zeros as all
1s in a thing called [two's compliment](https://en.wikipedia.org/wiki/Two%27s_complement). That's sort of out of scope for this
post, but the gist is that representing negative numbers this way makes binary
addition and subtraction all make sense.

Anyway, since the variable is 1 byte large, the bits will be 8 ones: `11111111`.

We then tell `printf` to print this data in two different ways: as a signed
integer and as an unsigned integer.

```c
printf("int8_t:  %d\n", data);
printf("uint8_t: %d\n", *(uint8_t*)&data);
```

The whole `*(uint8_t*)&data` is a bit strange if you're unfamiliar with C, but
here's what it's doing (from right to left).

```
&data       : Take the address of data (this is a pointer)
(uint8_t*)  : Ignore whatever type that pointer was pointing to, you're
              now pointing to a uint8_t type
*           : Get the actual data that we are pointing at as a uint8_t
```

So that's cool and all, but like, why not just make a new variable and assign
it the value of `data`? Well, the point I'm trying to make is the underlying
data is the same. There's no hidden conversions happening. We are only changing
how the program interprets the ones and zeros.

### Floating Around

Let's take this a step further. Did you know `float` in C is 32 bits?

```c
#include <stdio.h>
#include <stdint.h>

int main() {
    float data = 1337.0;

    printf("float:    %f\n", data);
    printf("uint32_t: 0x%x\n", *(uint32_t*)&data);
}
```

```
float:    1337.000000
uint32_t: 0x44a72000
```

The keen reader will notice that `0x44a72000` is not equal to `1337` at all.
Or, it is, but in a different interpretation? You see, `0x44a72000` is the
[IEEE floating point](https://en.wikipedia.org/wiki/IEEE_754) representation for `1337.0`. Those are the underlying
ones and zeros for that number, so while those specific underlying ones and
zeros are unequal to `1337`, taking those ones and zeros as an IEEE floating
point number means it *is* equal to `1337.0`.

Wow that made no sense at all. Here, just stare at this until you become one
with the universe.

```c
uint32_t data = 0x44a72000;
printf("%s\n", 1337.0 == *(float*)&data ? "true" : "false");
```

```
true
```

This manipulation of floating points by its underlying bits is
probably most famous from the [fast inverse square root](https://en.wikipedia.org/wiki/Fast_inverse_square_root) function in
*Quake*.

```c
i  = * ( long * ) &y;           // evil floating point bit level hacking
i  = 0x5f3759df - ( i >> 1 );   // what the fuck?
```

All this to say, how we interpret data is kind of arbitrary. Standards
were made to facilitate interoperability and communications. [ASCII](https://en.wikipedia.org/wiki/ASCII) is one
such standard developed by Bell Labs in the 1960s.

Actually, this "interpretation is in the eye of the beholder" is the idea
behind [deniable encryption](https://en.wikipedia.org/wiki/Deniable_encryption).

> Deniable encryption makes it impossible to prove
> the existence of the plaintext message without the proper decryption key. This
> may be done by allowing an encrypted message to be decrypted to different
> sensible plaintexts, depending on the key used. This allows the sender to have
> plausible deniability if compelled to give up their encryption key.

Okay, it's not *exactly* the same, but the gist is that a collection of bits
can be interpreted in more than one way. Speaking of which, I'm just going to
leave these floats here..

```
0x1.dcde86p+79
0x1.e8c2e4p+107
0x1.e8c2d8p+83
0x1.e6dcdep-61
0x1.e8d04p+105
0x1.74e6ep-33
0x1.d2da5ep+71
0x1.d0c2c6p-35
0x1.5eded2p+67
0x1.cae6e6p+105
0x1.da5ee6p+115
0x1.cae8e6p+101
0x1.e65af2p+95
0x1.caecd8p+73
0x1.dce05cp+79
```


<details>
<summary>Hint</summary>
{% highlight c %}{% raw %}
#include <stdio.h>

int main() {
    char *msg = "Wouldn't you like to know, weather boy?\0\0\0";
    for (char *c = msg; *c != 0; c += 4) {
        printf("%a\n", *(float*)c);
    }
}
{% endraw %}{% endhighlight %}
</details>
<p></p>

### Conclusion

Understanding the underlying ones and zeros of data in your program isn't
always important, but it is certainly nice to know for high performance or
memory-constrained systems. Manipulating the interpretation of data like this
is weirdly one of my favorite stupid things to do in C. I love that you can
peel back the veil and see through the matrix at what the data really is,
however pointless that might be.

**P.S.** After writing this post, I realized a C `union` might've been a better
choice for demonstrating "the data is the same and the interpretation is
different" because that's literally the whole point of `union`!
