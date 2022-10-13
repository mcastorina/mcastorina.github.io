---
layout: post
title:  "Bash"
category: Computer Languages
---

The Bourne Again Shell, bash, is a standard command line interpreter
that is POSIX compliant.

## Hello World
```bash
echo "Hello, World!"
```

## Redirection and Substitution

| Symbol | Description | Example |
| ------ | ----------- | ------- |
| `|`   | Pipe STDOUT from one command to STDIN of another | `echo 'hello world' | grep 'hello'` |
| `>`   | Redirect STDOUT | `ls > output.txt` |
| `>>`  | Redirect STDOUT and append to file | `ls / >> output.txt` |
| `2>`  | Redirect STDERR | `ls 2> output-err.txt` |
| `2>>` | Redirect STDERR and append to file | `ls / 2>> output-err.txt` |
| `<`   | Redirect file as STDIN | `echo 'hello world' > a; grep 'hello' < a` |
| `<<EOF` | Read in text until `EOF` is encountered and send as STDIN | `grep 'hello' <<EOF\nhello world\nEOF` |
| `<<-EOF` | Same as `<<EOF` with leading tabs removed | `grep 'hello' <<EOF\n\thello world\nEOF` |
| `<<<` | Redirect string as STDIN | `grep 'hello' <<< 'hello world'` |
| `>()` | Receive STDIN to command as a file | `echo 'hello world' > >(grep 'hello')` |
| `<()` | Send STDOUT of command as a file | `grep 'hello' <(echo 'hello world')` |
| `$()` | Use output of command as string | `echo '/tmp' > a; ls $(cat a)` |
| `$(())` | Use output of arithmetic as string | `echo "1+1 is $((1+1))"` |

## Control Operators

| Symbol | Description |
| ------ | ----------- |
| `[` `test` | Condition evaluation utility command |
| `if` `elif` `else` | Evaluate statement if the return code is 0 |
| `[[ ]]` | Shell built-in to enhance `[` |
| `for`  | Iterate over a list of values |
| `while` | Do commands while command returns 0 |
| `case` | Selectively execute commands based on matching pattern |
| `select` | Continuously ask for user to select a choice from a list and execute commands |

### Single vs Double Bracket
`[` or `test` is a command whereas `[[` is a shell built-in. I
prefer `[[` over `[` because it offers better regex and boolean
operations.

**[ syntax**

- `s1 = s2`: True if the string `s1` and `s2` are identical
- `s1 != s2`: True if the string `s1` and `s2` are not identical
- `s1 < s2`: True if the string `s1` comes before `s2` based on the
             binary value of their characters
- `s1 > s2`: True if the string `s1` comes after `s2` based on the
             binary value of their characters
- `n1 -eq n2`: True if the integers `n1` and `n2` are algebraically equal
- `n1 -ne n2`: True if the integers `n1` and `n2` are not algebraically equal
- `n1 -gt n2`: True if the integer `n1` is algebraically greater than the integer `n2`
- `n1 -ge n2`: True if the integer `n1` is algebraically greater than or equal the integer `n2`
- `n1 -lt n2`: True if the integer `n1` is algebraically less than the integer `n2`
- `n1 -le n2`: True if the integer `n1` is algebraically less than or equal the integer `n2`

| Flag | Description |
| ---- | ----------- |
| `-z` | True if the length of the string is zero |
| `-n` | True if the length of the string is non zero |
| `-e` | True if the file exists |
| `-f` | True if the file exists and is a regular file |
| `-d` | True if the file exists and is a directory |
| `-r` | True if the file exists and is readable |
| `-w` | True if the file exists is writeable |
| `-x` | True if the file exists is executable |
| `-s` | True if the file exists and has a size greater than zero |
| `-L` | True if the file exists and is a symbolic link |
| `-O` | True if the file exists and its owner matches the effective user id of this process |
| `-t` | True if the file descriptor is opened on a terminal |
| `-nt` | True if `file1` is newer than `file2` |
| `-ot` | True if `file1` is older than `file2` |
| `-ef` | True if `file1` and `file2` refer to the same file |

**[[ syntax**

`[[` builds upon `[` syntax.

- `string1 == string2`: True if the strings are equal
- `string1 =~ regex`: True if `string1` matches `regex`
- `string1 != string2`: True if the strings are not equal
- `string1 < string2`: True if `string1` sorts before `string2`
                      lexicographically in the current locale
- `string1 > string2`: True if `string1` sorts after `string2`
                      lexicographically in the current locale
- `expression1 && expression2`: True if both `expression1` and `expression2` are true
- `expression1 || expression2`: True if either `expression1` or `expression2` is true


| Flag | Description |
| ---- | ----------- |
| `-N` | True if `file` exists and has been modified since it was last read |
| `-o` | True if shell option is enabled |

**Examples**

```bash
# if syntax
if [[ $variable == pattern* ]]; then
    echo 'if'
elif [[ $variable == "const" ]]; then
    echo 'elif'
else
    echo 'else'
fi

# iterate over list
for variable in list of words; do
    echo $variable
done

# standard for loop
for (( i=0; i < 10; i++ )); do
    echo $i
done

# while
while true; do
    echo 'infinte loop?'
    break
done

# case
case $1 in
    -g|--greet)
        echo 'Hello!'
    ;;
    -h|--help)
        echo 'This is a case'
    ;;
    *) echo 'Invalid argument' ;;
esac

# select
select var in one two three; do
    echo "You selected: $var"
done
```

## Parameter Substitution
Bash has built-in variable substitution and manipulation.

```bash
# set default if variable is unset
${variable=default}

# set default if variable is empty or unset
${variable:=default}
${variable:-default}
${variable-default}

# set value if variable is set
${variable+value}
${variable:+value}

# use variable or abort and print err_msg if unset
${variable?err_msg}
${variable:?err_msg}

# non-greedily remove the pattern that matches the prefix
${var#pattern}
# greedily remove the pattern that matches the prefix
${var##pattern}

# non-greedily remove the pattern that matches the suffix
${var%pattern}
# greedily remove the pattern that matches the suffix
${var%%pattern}

# substring var[pos:pos+len]
${var:pos:len}

# search and replace pattern with replacement
${var/pattern/replacement}

# global search and replace pattern with replacement
${var//pattern/replacement}

# search and replace the prefix of var
${var/#pattern/replacement}

# search and replace the suffix of var
${var/%pattern/replacement}
```

Reference: [Advanced Bash-Scripting Guide: Manipulating Variables](http://www.tldp.org/LDP/abs/html/parameter-substitution.html)

## Arguments
Functions and scripts have access to arguments through `$1`, `$2`, `$3`
(and so on) environment variables. There are many other useful ways to
access the arguments.

The following table will refer to this example:

```bash
./test.sh a b c
```

| Expression   | Description | Example Output |
| ------------ | ----------- | -------------- |
| `$0`         | The name of the shell script                 | `./test.sh` |
| `$1`         | The first positional argument                | `a` |
| `$2`         | The second positional argument               | `b` |
| `$3`         | The third positional argument                | `c` |
| `$@`         | All positional arguments starting from 1 as an array     | `a b c` |
| `${@: -1}`   | The last positional argument                 | `c` |
| `${@: -2}`   | The last 2 positional arguments              | `b c` |
| `${@: 2: 1}` | 1 positional argument starting at position 2 | `b` |

## Special Variables

| Variable | Description |
| -------- | ----------- |
| `$#` | Number of positional arguments |
| `$*` | All positional arguments as a single string |
| `$?` | Exit status of most recently executed foreground pipeline |
| `$$` | Process ID of the shell |
| `$!` | Process ID of the job most recently placed in the background |
| `$_` | Last argument to the previous simple foreground command |

Reference: [GNU Manual: Bash Special Parameters](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html)

## Arrays
There are two types of bash arrays: indexed and associative.

An indexed array is created automatically if any variable is assigned
to using the syntax `name[subscript]=value`. Alternatively, use `declare`:

```bash
declare -a var1 # creates an indexed array
declare -A var2 # creates an associative array
```

Assigning to an array follows the same pattern for both indexed and
associative arrays. Negative values in indexed arrays will be the offset
from the last element.

```bash
var1=(val1 val2 val3)
var2=(key1 val1 key2 val2 key3 val3)

# alternative syntax
var1=([0]=val1 [1]=val2 [2]=val3)
var2=([key1]=val1 [key2]=val2 [key3]=val3)

# single assignment
var1[-1]=val4
var2[key4]=val4
```

Arrays may be accessed using their respective index (or key).
`@` or `*` may be used to access all values.

```bash
# get value
echo "${var1[2]}"
echo "${var2[key3]}"

# get all keys
echo "${!var1[@]}"
echo "${!var2[@]}"
```

**Example**

```bash
# uncomment to make associative
# declare -A arr
arr=("hello world" foo bar baz)

for k in "${!arr[@]}"; do
    v="${arr[$k]}"
    echo "arr[$k] = $v"
done
```

Reference: [GNU Manual: Bash Arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html)

## Option Parsing
There are two ways to parse command line options in bash: `getopt`
and `getopts`.  `getopts` is a bash built-in while `getopt` is a
command. I prefer using the enhanced `getopt` as it allows long options,
however the enhanced version is not on macOS by default. For fun and
portability, I wrote [my own version in pure bash](https://gist.github.com/mcastorina/682fa0ca0ff9646e283a5ef95e4cb36d).

## Trap
Bash allows to trap signals and other events using the `trap` command.

```bash
trap "echo INT received" SIGINT
```

| Signal | Description |
|:------:|:----------- |
| `EXIT` | Executed on exit from the shell |
| `DEBUG` | Executed before every simple command |
| `RETURN` | Executed each time a shell function or script run by `.` or `source` builtins finishes executing |
| `ERR` | Executed each time a command's failure would cause the shell to exit (when `-e` option is enabled) |
| `SIGINT` | Interrupt signal |
| `SIGTERM` | Terminate signal |

See `man 7 signal` for a complete list of signals to trap.

## Common Operations
**Read every line of a file**

```bash
while read line; do
    echo $line
done < file.txt
```

**Read input and continue / abort**

```bash
read -p 'Continue? [y/N]: ' i
if [[ ${i::1} != 'y' && ${i::1} != 'Y' ]]; then
    echo 'Aborting'
    exit 1
fi
```

**Generate tempfile / cleanup**
```bash
tmpfile=$(mktemp)
trap "rm $tmpfile" EXIT
```

**Generate a random string of alphanumeric characters**

```bash
cat /dev/urandom | tr -cd 'a-zA-Z0-9' | head -c 64
```

**Use vi keybindings in interactive sessions**

```bash
set -o vi
```

**Get the script directory**
```bash
script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
```
[Source](https://stackoverflow.com/a/246128)
