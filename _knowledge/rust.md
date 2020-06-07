---
layout: default
title:  "Rust"
category: Computer Languages
---

# Rust
Rust is a systems programming language designed for memory safety
and performance. It takes a novel approach to memory management
through an ownership system. The rust compiler keeps track of which
variables own data (memory on the heap), and will free the data when
the variable goes out of scope. It also keeps track of where the data
is borrowed (where it is referenced) with distinction between mutable
and immutable references. Overall, it can be a bit difficult to write
rust programs at the beginning, but it gets easier with practice and
makes you think differently about your program.

## Hello World
```bash
fn main() {
    println!("Hello, World!");
}
```
