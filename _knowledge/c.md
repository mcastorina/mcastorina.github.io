---
layout: post
title:  "C"
category: Computer Languages
---

The C programming language is commonly used in embedded and operating
systems. I see it as a "low level" language that is one step above
assembly. It is very easy to work with raw resources, and a firm
understanding of how a computer works will benefit the C programmer.
Due to its lack of strict checking and manual memory management, it is
also very easy to make mistakes.

## Hello World
```c
#include <stdio.h>

int main(int argc, char **argv) {
    printf("Hello, World!\n");
}
```

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

## Structs
Structs are logical groupings of values. By default, structs do not
have a named type, but you can declare a struct as a type using
`typedef`.  In memory, the struct members are next to each other
with padding to ensure each member aligns on a 4 byte boundary
(usually; it depends on your architecture). This happens because
the architecture reads in memory 4 bytes at a time, and it cannot
offset the read instruction.

```c
// struct definition
struct my_struct {
    int x;
    int y;
};

// struct type definition
typedef struct my_sturct {
    int x;
    int y;
} my_sturct;

// struct packing (the following size is 4 bytes)
struct my_packed_struct {
    unsigned int x : 20;  // x is 20 bits
    unsigned int y : 12;  // y is 12 bits
};
```

## Libraries
C has many, many standard libraries. Here are a few useful ones.

| Library | Description |
| ------- | ----------- |
| **stdio.h** | Provides standard I/O utilities including `printf` `fopen` `fgets` |
| **stdint.h** | Provides many types including `uint8_t` `uint16_t` `uint32_t` `uint64_t` `uintptr_t` `int8_t` `int16_t` `int32_t` `int64_t` `intptr_t` |
| **string.h** | Provides string functions including `memcpy` `strncpy` `strncat` `strlen` `strtok` |
