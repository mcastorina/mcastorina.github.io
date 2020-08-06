---
layout: post
title:  "Integrating clap and rustyline"
date:   2020-08-05 00:00:00 -0500
categories: programming
---
My [latest project](https://github.com/mcastorina/repost) is a
command line interpreter written in Rust.  As such, I wanted to use
[rustyline](https://github.com/kkawakam/rustyline) for the line
reader and [clap](https://github.com/clap-rs/clap) for argument
parsing. This post explores how I integrated these two libraries
to leverage a single source of data for both argument parsing and
tab completions.

TLDR; [here is a POC gist](https://gist.github.com/mcastorina/7ad4782f75e3707f9f534c05b72e390c)

## Why I chose to do this
One behavior of Rust is informing the compiler of data that is
related, so I thought it made sense to have my tab completion be
based off of clap's argument parsing. In this way, whenever I add,
remove, or modify the argument parsing code, the tab completion
will stay in sync.

## Premise
The idea stemmed from wanting a single source of data for both
libraries to use. Once I explored both libraries, I came up with an
idea: I can define my clap App using YAML and parse the same YAML
to feed into the tab completion. This approach has a few drawbacks
(no validator support), however I believe the convenience is worth
it.

In order for this to be viable, however, the YAML has to be part of
the compiled binary. We cannot do this parsing at runtime, because we
don't want to allow the user to modify it. Clap already has a `load_yaml!`
macro that does this, which uses the `include_str!` macro underneath to include
the file at compile time. Perfect.

## Actually doing it
This was a lot more challenging than I make it sound, and it took
me a couple of days to get it working. I'll explain the main logic
here, but if you are looking for a POC to copy and paste, [here is
the gist](https://gist.github.com/mcastorina/7ad4782f75e3707f9f534c05b72e390c).

### Summary
1. Parse the YAML into a recursive structure (each struct has a list of completions)
2. Split the input string into words
3. Walk the structure using the input tokens
4. Filter candidates by the start of the last word

Example: "set environment l"
```
1. LUT                       = {"create": ["request", "variable"], "set": [{"request": [], "environment": ["local", "stage"]}]}
2. "set environment l"       = ["set", "environment", "l"]
3. LUT["set"]["environment"] = ["local", "stage"]
4. Filter by "l"             = ["local"]
```

Now this sounds simple, but almost all of the complexity is in step 1:
Creating the structure from the clap YAML file. My goal was
to have the completer work for both subcommands and aliases, but only
complete the subcommand name. A quick example should clarify what I mean:

```yaml
subcommands:
  - create:
      visible_aliases: ["new", "add", "c"]
      subcommands:
        - request:
            visible_aliases: ["req", "r"]
        - variable:
            visible_aliases: ["var", "v"]
```

```
"c"         should complete to "create "
"create r"  should complete to "create request "
"new r"     should complete to "new request "
"n"         should not complete to anything
```

At the time of writing, this is how I designed this structure.
Describing it, however, makes me think I should treat the subcommand name
and visible aliases the same, and ignore non-visible aliases. Ah
well, time will tell.

### YAML Parsing
There's not much to go into here. Once you have your working clap
YAML file, you can parse it with `serde_yaml` and recursively build
out the relevant information from the tree.

### Setting up rustyline
I have to admit, setting up rustyline with custom completions is a
pain. I believe there is work being done to make it easier, but the
docs need improvement. Hopefully my POC can help others simplify
the process a bit.

For rustyline, we need to create a helper type that implements
`Helper`, `Hinter`, `Highlighter`, `Validator`, and `Completer`.
All we really need to do is implement `Completer` to get the recursive
struct we generated, then walk the tree to find the list of possible
completions. The last step is to filter out the candidates by the last word
being typed, so `cr<TAB>` will actually complete instead of giving you a list
of options.

## Conclusion
There are plenty of ways to extend this to be even better by parsing
more of the details of the clap YAML file (e.g. `possible_values`,
flag names, etc.), however this provides a very good start that
covers 90% of my project's common commands.
