---
layout: kb
title:  "Make"
category: Software Development
---

Make is a utility to maintain groups of programs. Its purpose is
to automatically determine which pieces of a large program need to
be recompiled and issue the commands to recompile them. Generally,
it can describe any task where some files must be updated automatically
from others whenever the others change.

Make requires a **Makefile** to tell it what to do. The rest of
this entry will contain details on Makefile syntax, best practices,
and other useful information.

Reference: [GNU Make Manual](https://www.gnu.org/software/make/manual/make.html)

## Vocabulary
Make uses **rules** to describe the relationship between an output
file and dependencies. In its simplest form, a rule looks like this:

```
target ... : prerequisites ...
	recipe
	...
	...
```

| Vocabulary | Description |
| ---------- | ----------- |
| **target** | Usually, the name of the file that is generated |
| **prerequisite** | A file that is used as input to create the target |
| **recipe** | The command(s) to create the target using the prerequisites (note: by default the recipe must be prefixed with a tab character) |
