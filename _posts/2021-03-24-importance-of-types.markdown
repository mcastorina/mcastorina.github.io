---
layout: post
title:  "The Importance of Types"
date:   2021-03-30 00:00:00 -0500
tags: programming
---
There are many programming languages, but they can all be put into one
of two groups. Those that are dynamically typed and those that are not.
This post compares the two styles and will conclude with reasons why
professional software development should use a statically typed language.

Let's start with dynamic typed languages like Python and JavaScript. These
languages are fantastic for learning programming and creating small
projects. It is so easy to start writing code that just works, but
the caveat is a lot of functionality is stored in the sole developer's
mind. So it's easy if you're the only developer of the project or if the
codebase is small, but it will need more organization when it grows. This
could mean more rigid development practices, external tooling, or bolting
on (optional) types after the fact.

Static typed languages like Go and Rust use the compiler to enforce
types. The benefit is that it is clear what data you need to provide
to a function, and there is no possible way to use that function with
anything else. At the end of the day, variables are just collections of
bytes, and how we interpret them gives them meaning. A static type system
simply provides a way to enforce input data is in a certain format.

What this boils down to is maintainability. Dynamically typed languages
are harder to maintain than statically typed languages simply because
there are no guarantees as to how data is being interpreted. This means
the developer needs to figure it out from context or have that information
in their brain. Additionally, compilers catch these type mismatches at
compile time instead of runtime, which completely eliminates an entire
class of bugs.

So why do I believe statically typed languages are easier to maintain? The
knowledge of the type is encoded in the source file and checked by
the compiler. In languages like Rust, you can even create types with
guarantees about values as well (for example, a type can have a max
value of 100). These guarantees are enforced by the compiler so you can
operate on the data with better assumptions.
