---
layout: kb
title:  "ELF"
category: Technologies
---

The Executable and Linkable Format is a standard file format for
executable files, object code, shared libraries, and core dumps.

ELF is flexible by design, extensible, and cross-platform. On the left
is a typical layout of an ELF file. Once it is loaded into memory,
the program will look like the layout on the right.

<div markdown="1" style="display: flex; align-items: center">

![elf layout](/assets/kb/elf.svg)
{: style="width: 300px; flex: 50%;" }
![program layout](/assets/kb/program-layout.jpg)
{: style="flex: 50%;" }

</div>

## Program Sections

| Name | Description |
| ---- | ----------- |
| **text** | Read-only program instructions and data |
| **data** | Statically initialized non-zero data |
| **bss**  | Uninitialized or zero data |
| **heap** | Runtime allocated memory |
| **stack** | Runtime memory used for local variables and function calls |
