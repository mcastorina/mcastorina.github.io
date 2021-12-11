---
layout: post
title:  "Rust traits are more powerful than I thought"
date:   2021-12-11 00:00:00 -0500
categories: programming
---

I have been learning the Rust programming language in my spare time for
a little over 2 years now. My first mental model of traits consisted of
a contract for types that would implement the trait, similar to Go's
interfaces. It wasn't until recently when I decided to explore traits
during [Advent of Code](https://adventofcode.com/2021/) that I started
to realize how integrated these contracts are into the language and
standard library. Using traits really helped clean up the code I was
writing.

## Hammers and nails
[If all you have is a hammer, everything looks like a nail]({% post_url 2021-01-24-hammer %}),
or, you can't really use traits unless you know about them. For example,
the [FromStr](https://doc.rust-lang.org/nightly/core/str/trait.FromStr.html)
trait is used for [str::parse](https://doc.rust-lang.org/stable/std/primitive.str.html#method.parse).

```rust
use std::str::FromStr;

#[derive(Debug, PartialEq)]
enum Foo {
    Bar,
    Baz,
}

impl FromStr for Foo {
    type Err = &'static str;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "bar" => Ok(Foo::Bar),
            "baz" => Ok(Foo::Baz),
            _ => Err("not bar or baz"),
        }
    }
}

fn main() {
    let f: Foo = "bar".parse().unwrap();
    assert_eq!(f, Foo::Bar);
}
```

As such, here's a laundry list of traits that I'm currently finding
useful:

* [FromStr](https://doc.rust-lang.org/nightly/core/str/trait.FromStr.html)
* [From](https://doc.rust-lang.org/std/convert/trait.From.html) (and [Into](https://doc.rust-lang.org/std/convert/trait.Into.html), which we get for free if implementing `From`)
* [TryFrom](https://doc.rust-lang.org/std/convert/trait.TryFrom.html) (and [TryInto](https://doc.rust-lang.org/std/convert/trait.TryInto.html), which we similarly get for free from `TryFrom`)
* Everything in [ops](https://doc.rust-lang.org/std/ops/index.html#traits) like `Index` and `IndexMut`
* [Hash](https://doc.rust-lang.org/std/hash/trait.Hash.html)
* [AsRef](https://doc.rust-lang.org/std/convert/trait.AsRef.html)
* [Default](https://doc.rust-lang.org/std/default/trait.Default.html)
* [Display](https://doc.rust-lang.org/std/fmt/trait.Display.html)
* [Debug](https://doc.rust-lang.org/std/fmt/trait.Debug.html)
* [Error](https://doc.rust-lang.org/std/error/trait.Error.html)
* [Iterator](https://doc.rust-lang.org/std/iter/trait.Iterator.html)
* [IntoIterator](https://doc.rust-lang.org/std/iter/trait.IntoIterator.html) and [FromIterator](https://doc.rust-lang.org/std/iter/trait.FromIterator.html)

Some of these are derivable, which makes it very easy to get functionality
for free.


## Traits and generics
Traits are tightly integrated with generic code via [trait
bounds](https://doc.rust-lang.org/rust-by-example/generics/bounds.html).
In the example above, `str::parse` is generic over any type that
implements the `FromStr` trait. Similarly, types that implement
`IntoIterator` work with Rust's `for loop` syntax.

Something that clicked recently for me is using trait bounds to make
my library API friendlier to more types. For example, I might define a
function with an `AsRef<str>` trait boundary to allow any type that can
return a `&str` to be used.

```rust
fn print_it<S: AsRef<str>>(s: S) {
    println!("{}", s.as_ref());
}

// usage can be..
print_it("foo");
print_it(String::from("foo"));
```

Perhaps the `Display` trait would have been more suitable here, but this
simple example demonstrates the flexibility in function definitions. This
aspect of trait boundaries is very similar to Go interfaces.

I think a very useful trait bound is `Into<T>`, which allows a function
to take any type so long as it can be converted into `T`.

```rust
struct Foo {
    data: String,
}

impl Foo {
    fn new<S: Into<String>>(s: S) -> Self {
        Self { data: s.into() }
    }
}

fn main() {
    let x = Foo::new("bar");
    let y = Foo::new(String::from("baz"));
}
```

## Conclusion
Learning more about the trait ecosystem has helped me write cleaner and
more idiomatic Rust code. I have found it's more than just a tool of
the language, but its deep integration in the standard library helps
tremendously with code composability and integration.
