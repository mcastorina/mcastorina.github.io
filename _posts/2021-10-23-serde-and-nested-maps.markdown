---
layout: post
title:  "Serde and Nested Maps"
date:   2021-10-23 00:00:00 -0500
tags: programming
---

In one of my Rust projects I am parsing very nested
[JSON](/knowledge/json.html) structures.  Let's use the following example
as our data source (though in reality it is 20+ deep):

```
{
    "foo": {
        "bar": [
            {
                "baz": {
                    "x": "y"
                }
            }
        ]
    }
}
```


[Serde](https://docs.serde.rs/serde/index.html) is the de-facto framework
for serializing and deserializing data efficiently in Rust. It supports
parsing JSON into either strongly typed data structures or untyped
JSON values.

Rust does not have a way to define anonymous structs, so for the strongly
typed approach we would need to define 20+ separate structs to get the
data we want. No, thank you.

Fortunately, accessing anonymous structs is quite ergonomic.

```rust
let data: Value = serde_json::from_str(input)?;
let x: &Value = &data["foo"]["bar"][0]["baz"]["x"];
```

Additionally, if there is a missing index the result will be `Null` (I
originally thought it would panic)!

```
x = String("y")  // happy case
x = Null         // sad case
```

For my project I would like to know *which* index was missing,
however, so I can quickly debug and provide a fix. In
addition to indexing with square brackets, Serde also has a
[get](https://docs.serde.rs/serde_json/value/enum.Value.html#method.get)
method that returns an `Option<&Value>`. So now we can do:

```rust
let x: Result<&Value, &'static str> = data.get("foo").ok_or("missing foo")
    .and_then(|v| v.get("bar").ok_or("missing bar"))
    .and_then(|v| v.get(0).ok_or("missing 0"))
    .and_then(|v| v.get("baz").ok_or("missing baz"))
    .and_then(|v| v.get("x").ok_or("missing x"));
```

We have more information, but at the expense of verbosity. The pattern
is quite regular, so I'm sure we can make it a macro though! I won't
pretend to be an expert on Rust macros, but I cobbled together this one:

{% raw %}
```rust
macro_rules! get {
    ($value:ident, $first:expr) => {{
        $value.get($first).ok_or(concat!("missing ", $first))
    }};
    ($value:ident, $first:expr, $($( $key:expr )+$(,)?)*) => {{
        get!($value, $first)
            $($( .and_then(|v| get!(v, $key)) )*)*
    }};
}
```
{% endraw %}

and it can be used like so:

```rust
let x: Result<&Value, &'static str> = get!(data, "foo", "bar", 0, "baz", "x");
println!("x = {:?}", x);
```

```
x = Ok(String("y"))     // happy case
x = Err("missing bar")  // sad case
```

Now, we have an ergonomic way to access nested data with information on
exactly where things go awry.
