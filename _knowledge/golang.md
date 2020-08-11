---
layout: default
title:  "GoLang"
category: Computer Languages
---

# GoLang
GoLang is a relatively new programming language. I consider it a
"middle level" language because it is strictly-typed, compiled, and
provides more protections than C. It also has a garbage collector,
lightweight concurrency models, and builtin `chan` and `error` types.

## Hello World
```go
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## Concurrency
GoLang offers a concurrency model using goroutines, which are
lightweight threads managed by the Go runtime.

```go
go func(){
    // do something
}()
```

## Channels
Channels are a "typed conduit through which you can send and receive
values with the channel operator, `<-`." It is basically a buffer
to send and receive data. Sending will block when the buffer is
full, and receiving will block when the buffer is empty. By default, a
channel has only one slot, but you can change the length on initialization.

```go
package main

import "fmt"

func main() {
    // create a buffered channel of length 10
    ch := make(chan int, 10)
    for i := 0; i < 10; i++ {
        ch <- i
    }
    for i := 0; i < 10; i++ {
        fmt.Println(<-ch)
    }
}
```

## Maps
Maps are the builtin `dict` of GoLang. They can be used to create
sets, avoid `O(n^2)` algorithms, and of course lookup tables.

```go
// create a map
m := map[string]string{}
m := make(map[string]string)

// check item exists in map
if item, ok := m["hello"]; ok {
    // item exists
}

// convert an array to a map
m := map[string]bool{}
for _, item := range arr {
    m[item] = true
}
```

**Note:** Maps are not safe for concurrent use.


## Pointers
GoLang, like C, has pointers, but GoLang's pointers are safer than
C. You cannot (easily) convert between two different pointer types,
and the pointer operator is the same as the struct operator. This
means you don't have to worry about whether your object is a pointer
or not, you can do `object.Attribute` and GoLang will figure out
whether it needs to dereference the pointer first or not.

## Methods
GoLang defines struct methods using pointer receivers, which allows
for the OOP style of `struct.func()`.

```go
package main
import "fmt"

type Example string
func (e *Example) Examp() string {
    return "Examp: " + string(*e)
}

func main() {
    e := Example("hello")
    fmt.Println(e.Examp())
}
```

## Loops
GoLang uses `for` for all types of loops. Labels can be used to
break or continue when in a nested context.

```go
// infinite loop
for { }

// standard for loop
for i := 0; i < 10; i++ { }

// while loop
i := 0
for i < 10 { i++ }

// iterate over slice
for index, item := range slice { }

// labeled loop
loop:
for {
    break loop
}
```

## Style
GoLang has a very opinionated style.

- Tabs not spaces
- Capitalized functions and attributes are considered exported
- Exported code should have a comment explaining it (code is also docs)
- `{` on the same line

## Unit Tests and Benchmarks
GoLang has builtin support for unit tests and benchmarking. Test
files should end in `_test.go` for Go to automatically find them.
Functions must start with `Test` or `Benchmark` as well. Run with
`go test -bench .`.

```go
package main

import "testing"

func TestExamp(t *testing.T) {
    e := Example("hello")
    got := e.Examp()
    want := "Examp: hello"

    if got != want {
        t.Errorf("got %s, want %s", got, want)
    }
}

func BenchmarkExamp(b *testing.B) {
    e := Example("hello")
    for i := 0; i < b.N; i++ {
        e.Examp()
    }
}
```

## Tools

- `go build`: build Go binaries
- `go test`: unit tests
- `go fmt`: format code according to the Go style
- `go get`: install remote packages
- `go vet`: static code analyzer
- `go run`: shortcut to build and execute code
