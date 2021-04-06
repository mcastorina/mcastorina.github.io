---
layout: post
title:  "Good Function Design"
date:   2021-04-06 00:00:00 -0500
categories: programming
---
A fundamental part of software development is creating functions. It
keeps your code organized, readable, and prevents duplication. Like
any other skill, writing good functions can be improved with practice
and intention. If you learn anything from this post, it should be that
function call sites should be readable! A developer should be able to
infer what a function does without knowing its definition.

## Choosing when to create a function
I have learned many arguments and philosophies about this. There's DRY
(**D**on't **R**epeat **Y**ourself), which, as the name suggests,
advocates for never repeating the same piece of code. There's WET
(**W**rite **E**very **T**ime), which aims to avoid abstractions and
keep code simple. Finally, there's the Rule of Three, in which you
refactor when you are writing similar code for the third time.

Personally, I prefer the "Rule of Three" principle for its pragmatism.
Repeating yourself twice is okay, but if it keeps happening, then the time
invested in creating a new function will be worth knowing you now have a
single source of truth that can (and should) be tested. Additionally, it
keeps the code simple by only introducing abstractions when they are needed.

## Readability
The single most important aspect to software development is
readability! It is the root of collaboration, maintenance, and
understanding. That is why functions need to be readable in two places:
at the definition and at the call site. It is more important to make
the call site readable, however, because it is used more, and it is
most likely going to be other developers' first encounter with the
function. If you can infer what the function is doing at the call site,
you save time (by not looking up the definition) and you save cognitive
load (by not having to remember the definition).

The best approach I have found to writing readable functions is to write
how I would use it at the call site first. This way, I can isolate how
it will read before actually designing the function. This is similar to
test-driven development (TDD) where you start by testing the non-existent
function call before defining the actual function.

## Boolean Parameters
Rarely should you ever use boolean parameters. Again, this ties back to
readability. Boolean parameters in function definitions almost *never*
produce readable code at the call site, because all you will see is a
`true` or `false` in the function call.

There are many ways to remedy this, depending on the situation. A few
ideas are:

* Create two, well named functions
* Use named arguments if your language supports it
* Use constants or variables to replace `true` and `false` at the call
  site with a readable name

To reiterate, I'm not saying to *never* use boolean parameters. Sometimes
it makes sense. Sometimes you need to slightly modify the behavior of
a private function and that would be okay. Be pragmatic in your decisions,
but keep readability in mind.

## Conclusion
Write readable code and be practical.
