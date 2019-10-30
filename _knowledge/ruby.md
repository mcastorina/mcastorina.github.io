---
layout: default
title:  "Ruby"
category: Computer Languages
---

# Ruby
Ruby is a programming language that is similar to Python but with
notable differences. I consider it a "high level" language because
it uses dynamic types, garbage collection, and everything is an
object.  Its syntax is designed to make the programmer happy and
is generally minimalist.

## Hello World
```ruby
puts 'Hello, World!'
```

## Symbols
One interesting features of Ruby is the idea of a symbol. A symbol
is a program wide unique identifier for anything. There is no need
to create them or assign them. To reference a method, you can use
its symbol. A symbol looks like a variable prefixed with a colon:
`:symbol`.

```
"symbol_name".object_id != "symbol_name".object_id
:symbol_name.object_id  == :symbol_name.object_id

:symbol_name.to_s    == "symbol_name"
"symbol_name".to_sym == :symbol_name
```

## Send
Because everything is an object, everything implements the `send`
method. Whenever you do `object.method`, it is actually doing
`object.send(:method)`. This is a very powerful concept that allows
for meta-programming.
