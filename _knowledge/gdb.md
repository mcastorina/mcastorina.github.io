---
layout: default
title:  "GDB"
category: Hacking
---

# GDB
The GNU Debugger is a tool used for debugging another program while
it executes. You may set breakpoints, examine memory and registers,
and step through the code line by line or instruction by instruction.

This tool is most useful for reverse engineering an unknown
executable or debugging a C program you are writing.  [GDB Enhancement
Features](https://github.com/hugsy/gef) is a popular addon specifically
for reverse engineering and exploitation.

## Commands
There are many commands, but here are some common ones. Note that most
commands may be abbreviated.

| Command | Description |
| ------- | ----------- |
| `layout` | Set the layout of the TUI: `regs` `src` |
| `break` | Set a breakpoint: `main` `*0xaddress` |
| `run` | Run the program. Add arguments after `run` to use in ARGV |
| `print` | Print something: `$rax` `0x123` |
| `call` | Call a function in the program |
| `x` | Examine memory: `x $rsp` |
| `refresh` | Refresh the TUI |
| `continue` | Continue running the program |
| `next` | Run the next line of the program, then stop |
| `step` | Run the next instruction of the program, going into a sub-routine if there is one |
| `nexti` | Run the next instruction of the program |
| `stepi` | Run the next instruction of the program, going into a sub-routine if there is one |

Most display commands accept a format for displaying the data as well.
The FMT is specified like so: `CMD/FMT ...`.

```
FMT is a repeat count followed by a format letter and a size letter.
Format letters are o(octal), x(hex), d(decimal), u(unsigned decimal),
  t(binary), f(float), a(address), i(instruction), c(char), s(string)
  and z(hex, zero padded on the left).
Size letters are b(byte), h(halfword), w(word), g(giant, 8 bytes).
```

### Useful Commands

* **Assembly TUI:** `layout asm`
* **Code TUI:** `layout src`
* **Register TUI:** `layout reg`
* **Set assembly flavor to intel:** `set disassembly-flavor intel`
* **Print mapped address space:** `info proc map`
* **Print stack frame info:** `info frame`
* **Write a string in memory:** `set {char [12]} 0xdeadbeef = "hello world"`
* **Jump directly to instruction:** `jump *0xdeadbeef`
