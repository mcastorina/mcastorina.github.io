---
date: "2022-10-12T00:00:00Z"
tags: programming
title: Rust's Display Trait
---

Rust's trait system is pretty cool, and one of the common traits is
[Display](https://doc.rust-lang.org/std/fmt/trait.Display.html). Defining an
implementation for this trait will allow you to use the standard formatter `{}`
with your type, but the official example is a bit misleading.

```rust
use std::fmt;

struct Point {
    x: i32,
    y: i32,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

fn main() {
    let origin = Point { x: 0, y: 0 };
    println!("The origin is: {origin}");
}
```

```
The origin is: (0, 0)
```

Well, that output is expected, but what if we add some padding?
This should right align, using `-` as padding, and a width of 10
([reference](https://doc.rust-lang.org/std/fmt/index.html)).

```rust
fn main() {
    let origin = Point { x: 0, y: 0 };
    println!("The origin is: |{origin:->10}|");
}
```

```
The origin is: |(0, 0)|
```

Hm.. so format specifiers just get thrown away? It actually depends on how
`Display` is implemented, which is why I say the example is misleading. Let's
fix it to respect formatting.

```rust
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        format!("({}, {})", self.x, self.y).fmt(f)
    }
}
```

```
The origin is: |----(0, 0)|
```

Yay!

What we're doing here is generating a `String` and using its `Display`
implementation to format it as expected. Note that we can also use any of the
methods provided by
[Formatter](https://doc.rust-lang.org/std/fmt/struct.Formatter.html)
if we want to pass formatting to our `Point` attributes too.

P.S. implementing `Display` allows you to call `to_string()` as well, which is
pretty neat.
