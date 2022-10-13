---
layout: post
title:  "V"
category: Computer Languages
---

V is a very young compiled language targeting many domains. It's a very
exciting project that has a lot of potential in many domains. I would
best describe it as a mix of [Rust](/knowledge/rust.html) and
[Go](/knowledge/go.html).

## Hello World
```go
println('Hello, World!')
```

## Option and Results
V combines `Option` and `Result` into one type, and forces you to handle
errors directly at the call site. A variable cannot be an `Option` type.

```go
fn maybe(n int) ?int {
    if n < 10 {
        return error('expected n >= 10')
    }
    return n
}

// handle with `or` block
n := maybe(5) or {
    panic('error: $err')
}

// handle with default value
n := maybe(5) or { 0 }

// bubble up the error
n := maybe(5) ?
```

## Concurrency
V takes inspiration from Go's concurrency model from a developer's
perspective, however it uses system threads instead of green
threads. There is no V runtime to manage them. V also has some nice
thread ergonomics not available in Go.

```go
go fn(){
    // do something
}()
```

```go
fn fair_dice() int {
    return 4
}
handle := go fair_dice()
result := handle.wait()
println(result) // 4
```

```go
fn square(i int) int { return i * i }

mut threads := []thread int{}
for _ in 0 .. 10 {
    threads << go square(i)
}

result := threads.wait()
println(result) // [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```
