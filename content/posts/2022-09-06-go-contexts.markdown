---
date: "2022-09-06T00:00:00Z"
tags: ['programming', 'tutorials']
title: Go Contexts
---

Go is a simple language, but I was pretty confused by the `context` package
when I first learned about it. I had trouble understanding how it could be used
to set a deadline or to cancel functions or how it even worked. Since then,
I've gotten a firmer grasp on how to use it both as a user and as a library
author.

Let's start by defining what a `Context` is and its purpose. A `Context` is a
construct used to signal a function to stop its work and return. The key is
that a function needs to be *context aware* in order for this to have any
affect; there's no magic.

Here is an example of a context aware function. Notice that we check
`ctx.Done()` to see if the context has been canceled in the function
doing the work.

```go
import (
	"context"
	"fmt"
	"time"
)

func doWork(ctx context.Context) (int, error) {
	select {
	case <-time.After(2 * time.Second):
		return 1337, nil
	case <-ctx.Done():
		return 0, ctx.Err()
	}
}

func main() {
	ctx := context.Background()
	fmt.Println(doWork(ctx))

	ctx, cancel := context.WithTimeout(ctx, 1*time.Second)
	defer cancel()
	fmt.Println(doWork(ctx))
}
```

```
1337 <nil>
0 context deadline exceeded
```

In this example, we use a `select` statement to return immediately when the
context is finished, which is generally good practice. By doing so, we respect
the callers' wish to cancel and return early.

Ultimately, contexts are a pretty simple and powerful concept, but requires
cooperation with child functions to work well. That is the part that previously
confused me. I had incorrectly believed contexts had some magic that would
ensure a deadline wasn't exceeded, but as with most things in Go, there is no
magic and the idea is quite simple.
