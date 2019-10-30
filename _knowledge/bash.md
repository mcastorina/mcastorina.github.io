---
layout: default
title:  "Bash"
category: Computer Languages
---

# Bash
The Bourne Again Shell, bash, is a standard command line interpreter
that is POSIX compliant.

## Hello World
```bash
echo "Hello, World!"
```

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
    echo 'infinte loop!'
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
