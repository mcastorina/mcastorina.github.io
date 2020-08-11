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

[The Rust Book](https://doc.rust-lang.org/stable/book/)

[Rust Docs](https://docs.rs/)

## Hello World
```bash
fn main() {
    println!("Hello, World!");
}
```

## Traits
Rust has a powerful trait system that describes functionality for
a set of structs (similar to Go's interface system). There are some
standard traits that are very helpful, like the `From` trait for
error handling.

```rust
impl From<T> for Error {
    fn from(err: T) -> Error {
        // ...
    }
}
```

By implementing this trait, you can use a common error type and the `?`
operator will automatically convert between types when returning.

## Sum Types
I first learned about sum types from Rust's enums. A sum type is structure
that may be one of many different variants. Each variant can have any number
of attributes associated with it as well.

The most basic sum type is Rust's `Option<T>` type. It may be either
`Some(T)` or `None`. I believe this is a great improvement to `null`
checking that forces you to handle the error case. Most compilers,
including Rust, will enforce that you check all variants of a sum type.
