---
layout: post
title:  "Why I Prefer Rust Error Handling Over Go"
date:   2020-06-25 00:00:00 -0500
categories: programming
---
A large part of software development is handling errors. Generally
speaking, we cannot predict and account for everything that is
input to the program, but it is important to handle issues
gracefully as the algorithm encounters them. Like it or not, as
engineers it is our job to provide a good user experience and that
includes error handling.

This post describes my experiences with error handling in two
programming languages: Go and Rust. We compare a simple example
of reading the contents of a file.

## Go
Let us start by exploring error handling in Go. One of the biggest
advantages of Go is that it aims to keep everything simple. As such,
there is not much to error handling. Go provides an `error` interface,
so any type that implements it can be returned as an `error`.

```go
func getFileContents() ([]byte, error) {
    file, err := os.Open("file.txt")
    if err != nil {
        return nil, err
    }
    defer file.Close()

    b, err := ioutil.ReadAll(file)
    return b, err
}
```

If you are familiar with Go, you will know that this error checking
boilerplate is *everywhere*.

```go
if err != nil {
    return nil, err
}
```

That is because majority of the time, error handling means "pass the
error back up to the caller." There is nothing wrong with that, and
I suspect it is the reason why languages like to use the `try` `catch`
paradigm, but that is why it is everywhere in Go.

Another reason it is everywhere is because it *works* everywhere.
The power of this error handling model comes from its simplicity.
You can create your own types that implement the `error` interface
and handle it just like any other error.

### Errors are Everywhere
Let's face it, errors are everywhere. If you imagine any non-trivial
program, its function call tree will almost always return an error.
As we established, majority of error handling is passing the error
to the parent (also known as bubbling up), which means every function
needs to return an `error`. At the root is where all of these errors need
to be addressed. This is the point that I do not like about Go error handling.

It is at this point that you have an `error` interface that can be
*any* concrete type.  You could simply print the error using the
`Error()` method as defined by the interface, but I think that hides
a lot of important information for the parent to properly handle
the error for different cases. Going back to our file reading
example, let us consider two reasons for an error: the file does not
exist, and the file is not readable.

```go
func main() {
    _, err := getFileContents()
    if err != nil {
        switch err := err.(type) {
        case *os.PathError:
            switch err := err.Unwrap().(type) {
            case syscall.Errno:
                syscallNum := uintptr(err)
                if syscallNum == 2 {
                    // file does not exist
                    fmt.Println("file does not exist")
                } else if syscallNum == 13 {
                    // permission denied
                    fmt.Println("permission denied")
                } else {
                    // unhandled error
                    fmt.Println("unhandled error")
                }
            }
        }
        return
    }
    fmt.Println("Success!")
}
```

Before you start writing this example off as bad code, there is
reason I chose to demonstrate this abomination.  It shows just how
terrible and messy it is to handle different error types. There
will almost always be an unknown case that you cannot handle, and
many times libraries will return an `errors.errorsString` type which
you cannot detect the type of because it is un-exported!

Now, maybe I am doing something wrong here, and if so, please correct me!
Before I get a flood of emails (haha, like anyone is reading this), let me
provide the *proper* way to check for file existence and permission errors.

```go
func main() {
    _, err := getFileContents()
    if err != nil {
        if os.IsNotExist(err) {
            // file does not exist
            fmt.Println("file does not exist")
        } else if os.IsPermission(err) {
            // permission denied
            fmt.Println("permission denied")
        } else {
            // unhandled error
            fmt.Println("unhandled error")
        }
        return
    }
    fmt.Println("Success!")
}
```

Better, but not by much if you ask me. Let's take a look at the
Rust side. Spoiler alert: I like it better.

## Rust
One of the biggest advantages of Rust is its compiler. It is by far
the best compiler I have ever worked with. It points you to exactly
the part of the code that is wrong, provides clear explanations of
the error, and even gives you tips on how to fix it. Most
importantly for this post, the compiler knows how to do things *for*
you (more on this later). Let's jump into an example.

```rust
fn get_file_contents() -> io::Result<Vec<u8>> {
    let mut file = File::open("file.txt")?;
    let mut contents = vec![];
    file.read_to_end(&mut contents)?;
    Ok(contents)
}
```

On first reading, this looks a lot more complicated than the Go
version. What is `io::Result<Vec<u8>>` and why is there a `?` at
the end of some lines? Those familiar with Rust can probably answer
these questions better than me (I am a new Rustacean), and it is
not the focus of this post. However, I will provide a short summary:
`Result` types hold one of two types: an `Ok` or an `Err` type. The
`?` operator essentially says: "if it is an `Err`, return from the
function, otherwise extract the data from `Ok`."

By comparison to the Go version, there is no error checking boilerplate
in the Rust version. Instead, it is replaced with `?`. As with Go, this
bubbles up the error to be handled by the parent caller. Let's see how
that looks.

```rust
fn main() {
    let result = get_file_contents();
    if let Err(x) = result {
        match x.kind() {
            ErrorKind::NotFound => println!("not found"),
            ErrorKind::PermissionDenied => println!("permission denied"),
            _ => println!("unhandled error"),
        };
        return;
    };
    println!("success!");
}
```

I think this is on-par with the non-abominable Go version. One bonus
that Rust offers is ensuring you handle all enum cases (with `_`
being the catch-all). I will also note that this is handling the
specific `io::Error` type. This is contrasted to `Go` by handling
the generic `error` interface.

### Errors are Everywhere (especially in Rust)
Imagining our function tree again, there are a lot of places where
we would want to bubble up errors, but they will not always be `io::Error`
types! What is the point of `?` if it only works for errors of the same type?
Well, it turns out `?` will automatically convert from one error type to another,
you just need to tell the compiler how to do that. Let me say that again because
the first time I learned it, it was a complete revelation. The Rust compiler will
automatically translate errors if it knows how to!

Alright, let's do it.

First let's change the return type to `Result<Vec<u8>, MyError>`
so we can return our custom error type.
```rust
fn get_file_contents() -> Result<Vec<u8>, MyError> {
    // snip
}
```

Now let's define `MyError` and how to convert `io::Error` to it. Let's
just store the IO error in an enum.
```rust
enum MyError {
    IOError(io::Error),
}
impl From<io::Error> for MyError {
    fn from(err: io::Error) -> MyError {
        MyError::IOError(err)
    }
}
```

Finally, let's update the error handling in main.
```rust
fn main() {
    let result = get_file_contents();
    if let Err(x) = result {
        match x {
            MyError::IOError(x) => {
                match x.kind() {
                    ErrorKind::NotFound => println!("not found"),
                    ErrorKind::PermissionDenied => println!("permission denied"),
                    _ => println!("unknown error"),
                };
            }
        };
        return;
    };
    println!("success!");
}
```
Note that we now need to `match x` because it is a `MyError` enum. Also note that there
is only one case and no catch-all `_` case.

## Conclusion
These two examples are not that different, so why do I like the Rust
version better? It scales better. No information is lost or hidden
and it can easily grow to include other types of errors. There is less
boilerplate, and you can easily chain functions together and abort
in the middle.

To demonstrate, we can rewrite part of our `get_file_contents` from
```rust
let mut file = File::open("file.txt")?;
file.read_to_end(&mut contents)?;
```

to

```rust
File::open("file.txt")?.read_to_end(&mut contents)?;
```
