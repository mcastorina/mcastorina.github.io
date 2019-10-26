---
layout: default
title:  "Bash"
category: Computer Languages
---

# Bash
The Bourne Again Shell, bash, is a standard command line interpreter
that is POSIX compliant.

## Redirection and Substitution

| Symbol | Description | Example |
| ------ | ----------- | ------- |
| `|`    | Pipe STDOUT from one command to STDIN of another | `echo 'hello world' | grep 'hello'` |
| `>`    | Redirect STDOUT | `ls > output.txt` |
| `>>`   | Redirect STDOUT and append to file | `ls / >> output.txt` |
| `2>`   | Redirect STDERR | `ls 2> output-err.txt` |
| `2>>`  | Redirect STDERR and append to file | `ls / 2>> output-err.txt` |
| `<`    | Redirect file as STDIN | `echo '/tmp' > a; ls < a` |
| `<<<`  | Redirect string as STDIN | `grep 'hello' <<< 'hello world'` |
| `>()` | Use output of command as file | `echo 'hello world' > >(grep 'hello')` |
| `<()` | Use output of command as file | `grep 'hello' <(echo 'hello world')` |
| `$()` | Use output of command as string | `echo '/tmp' > a; ls $(cat a)` |
| `$(())` | Use output of arithmetic as string | `echo "1+1 is $((1+1))"` |
