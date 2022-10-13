---
layout: post
title:  "Ruby"
category: Computer Languages
---

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
:symbol_name.object_id  == :symbol_name.object_id
"symbol_name".object_id != "symbol_name".object_id

:symbol_name.to_s    == "symbol_name"
"symbol_name".to_sym == :symbol_name
```

## Send
Because everything is an object, everything implements the `send`
method. Whenever you do `object.method`, it is actually doing
`object.send(:method)`. This is a very powerful concept that allows
for meta-programming.

## Blocks
A block is a closure that is passed to a method when it is called.
It allows methods to provide more generic functionality by allowing
running the provided code in the block. Blocks can accept parameters
and are called from the method with `yield`.

```ruby
def example
    puts 'Start'
    yield 'first'
    puts 'Back in example'
    yield 'second'
    puts 'End'
end

example {|yield_count| puts "  In the block from the #{yield_count} yield"}
```

Output:
```
Start
  In the block from the first yield
Back in example
  In the block from the second yield
End
```

Another useful method is `block_given?` to test whether the caller
provided a block.

## Monkey Patching
Ruby allows for monkey patching, meaning any class can be re-opened
to change or add methods.

An example of monkey patching is the `colorize` gem. When you
`require colorize`, the library monkey patches the String class
to add color methods like `red` and `bold`, allowing the programmer
to simply do `puts "string".red` to print a red string.

This is a very powerful concept that should rarely be used. The only
time I would consider monkey patching is if it were to *add* a method,
 never overwrite one.
