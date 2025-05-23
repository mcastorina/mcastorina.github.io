---
date: "2022-02-23T09:00:00Z"
tags: programming
title: How I Design Rust Programs
---

As I have learned and gained more experience using Rust, I noticed that the way
I write Rust code is a bit different than the way I write in other languages.

When writing an application in Rust, I create the data structures I think I'll
need, then decide on "who owns what." Which modules are responsible for which
functionality. There's a focus on organization, perhaps instigated by the
borrow checker and the fact that one file is (usually) one module. This is
enabled especially by the `todo!` macro which allows me to stub out function
and method definitions without worrying about implementation details. Again,
it's a focus on how modules relate, how information is transformed, and the
overall organization of an application.

I quite like this aspect of Rust programming because I enjoy the design process
a bit more than the implementation. It's satisfying to create a system that is
sustainable and extensible. I've written so many programs that simply don't
scale (which is fine for their purpose) that it's refreshing to slow down a
bit, think about the system as a whole, and setup long lasting structures.

As with any tool, however, it's effective for some work and not for others, and
it's only as effective as how well you use it. Rust is great for building large
applications that require good organization, but I have definitely written
terribly organized Rust programs. This doesn't lessen the effectiveness of the
tool, but I think it does say something about the ergonomics of the tool
itself. For example, it is quite obvious how to use a hammer. Sure, you *could*
whack at a nail with the side of a hammer, but the natural usage of it doesn't
encourage that.

Getting back to tool usage, in my experience quick scripts, exploratory
programming, and concurrency**\*** are not great with Rust. Barring concurrency, the
main reason I see friction in these areas is the compilation speed. The time
between `code change` and `result of code change` is a bit too high and is
better in other languages. Overall, however, I've found for Rust that if the
code compiles, then it runs as expected.

This shift in coding style was very much a natural progression as I use the
language more, and I really enjoy programming this way. It's often quoted that
Rust surfaces the inherent complexity of software development, and while I
agree with that statement, I have also found that the Rust compiler is a
fantastic tool for managing that complexity in a meaningful way. As always
though, it takes time and investment to learn tools well, so keep that in mind
when choosing!

**\*Note:** this has been my personal experience with Rust; others have their own
workflows that differ and nothing in this post should be taken as fact. Regarding
concurrency specifically, I find Go's concurrency model a lot easier to grok and
will tend to choose that over Rust for those use cases.
