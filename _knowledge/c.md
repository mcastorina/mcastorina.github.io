---
layout: default
title:  "C"
category: Computer Languages
---

# C
The C programming language is commonly used in embedded and operating
systems. I see it as a "low level" language that is one step above
assembly. It is very easy to work with raw resources, and a firm
understanding of how a computer works will benefit the C programmer.
Due to its lack of strict checking and manual memory management, it is
also very easy to make mistakes.

## Pointers
A pointer is an address of a memory location. The type of the pointer
defines how large that memory location is, so a `int*` is (in most cases)
4 bytes. The following example demonstrates this, as well as endianness.

```c
#include <stdio.h>

int main(int argc, char **argv) {
    int val = 0x01020304;

    int *a = &val;
    short *b = a;

    printf("a = 0x%p\n", a);
    printf("%s\n", a == b ? "a == b" : "a != b");
    printf("*a = 0x%x\n*b = 0x%x\n", *a, *b);
    printf("*(char*)a = 0x%x\n", *(char*)a);
}
```

Output (on my machine):

```
a = 0x0x7ffeeb8daefc
a == b
*a = 0x1020304
*b = 0x304
*(char*)a = 0x4
```

The following beautiful ASCII art depicts memory as a byte array
and the pointer pointing to it. Note that the actual byte `*a` is
pointing to is `0x04` not `0x01`. This is because my architecture
is little endian.

```
                --------
int *a   --->   | 0x04 |    0x7ffeeb8daefc
                | 0x03 |    0x7ffeeb8daefd
                | 0x02 |    0x7ffeeb8daefe
                | 0x01 |    0x7ffeeb8daeff
                --------
```

## Endianness
The order of bytes in memory is the endianness of an architecture.
Little endian is least significant byte first (like in the last
example), and big endian is most significant byte first.
