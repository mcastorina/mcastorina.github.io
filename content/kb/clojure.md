---
layout: kb
title:  "Clojure"
category: Computer Languages
---

Clojure is a functional dialect of lisp. It is built on top of Java
which makes interoperability easy. One thing I like about Clojure:
the more concise the code is, the more readable it is. Additionally,
functional programming (with a REPL) is quite productive and rewarding.

Because Clojure is a dialect of lisp, it follows the paradigm of "code
as data".

## Hello World
```clojure
(println "Hello, World!")
```

## Functions
```clojure
(defn function-name
  "function description"
  [args]
  (body)
)
```

You can also execute different code given the argument arity. This is
useful for setting default argument values.

```clojure
(defn function-name
  "function description"
  ([] (no-args-body))
  ([a] (one-arg-body))
  ([a b] (two-arg-body))
)
```

## Macros
Lisp can be very hard to read with all of those parentheses, especially
when executing various different transformations. Because function names
always come first, you can get a horribly nested expression like so:
`(str (+ 3 (* 10 n)))`. To follow logically what is happening, we have to
read from inside the expression, out. A better approach is to use macros.
The following is equivalent to the example expression.

```clojure
(->> n
     (* 10)
     (+ 3)
     (str))
```

Now we can logically follow the transformations a lot more easily.
