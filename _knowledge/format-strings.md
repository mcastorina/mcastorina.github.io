---
layout: post
title:  "Format Strings"
category: Hacking
---

The `printf` family of functions accept a format string as an argument
which may be used for formatting the list of arguments passed to the
function.

```c
int printf(const char *restrict format, ...);
```

It is unsafe to use user-supplied input as the format string because
there is a directive (more below) that can write an integer to a memory
location. Further, the format string can expose any data that is on the
stack.

Reference: `man 3 printf`

## Specification
The overall syntax of a conversion specification is:

```
%[$][flags][width][.precision][length modifier]conversion
```

### Positional argument
Represented as `$` above, this option represents the nth argument passed
to `printf` (1-indexed).

```c
printf("%2$d %1$d", 10, 20)
// Output: 20 10
```

### Flags

| Flag | Description |
| ---- | ----------- |
| `0`  | Zero pad the value |
| `-`  | Left adjust to the field boundary |
| `<space>`  | A blank should be left before a positive number |
| `+`  | Always use a sign (+/-) before a number |
| `'`  | Group output with thousands' grouping characters (if locale information has any) |

### Width
Specifying a minimum field width will pad with spaces (by default) on
either the left or right of the value. Instead of a decimal digit, a
`*` or `*m$` will specify that the field width is given in the next or
`m`th argument respectively.

### Precision
Precision represents the minimum number of decimal digits to display
for floating point numbers. Similar to width, `*` or `*m$` may be used
to indicate the precision is given in an argument.

### Length modifier

| Modifier | Description |
| -------- | ----------- |
| `hh`     | `char` / `unsigned char` |
| `h`      | `short` / `unsigned short` |
| `l`      | `long` / `unsigned long` |
| `ll`     | `long long` / `unsigned long long` |
| `q`      | synonymous to `ll` |
| `L`      | `long double` |
| `j`      | `intmax_t` / `uintmax_t` |
| `z`      | `size_t` / `ssize_t` |
| `t`      | `ptrdiff_t` |

### Conversion specifier
The type of conversion to apply to the argument.

| Specifier | Description |
| --------- | ----------- |
| `d`, `i`  | signed decimal notation |
| `o`       | unsigned octal notation |
| `u`       | unsigned decimal notation |
| `x`, `X`  | unsigned hexadecimal notation (lower / upper cased) |
| `e`, `E`  | decimal exponent notation `[-]d.ddde±dd` |
| `f`, `F`  | decimal notation `[-]ddd.ddd` |
| `g`, `G`  | automatically choose `e` or `f` |
| `a`, `A`  | hexadecimal decimal notation `[-]0xh.hhhhp±d` |
| `c`       | `char` representation |
| `s`       | string representation |
| `p`       | hexadecimal representation of a pointer |
| `n`       | write the number of characters written so far to an argument |
| `%`       | literal `%` |

## Danger of format specifiers
If you didn't catch it, `%n` will write the number of written characters
so far to a pointer (passed as an argument).

```c
int num;
printf("hello%n", &num);
// num == 5
```

This, combined with the variable argument list `printf` uses means an
attacker can overwrite arbitrary bytes in memory (e.g. pointers on the
stack). If the input buffer also exists on the stack, the attacker can
supply the address they want to overwrite as well.

```c
#include <stdio.h>

int main() {
    int secret = 0xdeadbeef;
    int *x = &secret;
    printf("%-1337x%6$n");
    // secret == 1337
    printf("\n%d\n", secret);
}
```

```bash
$ gcc -m32 test.c -o test && ./test
```
