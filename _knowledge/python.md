---
layout: default
title:  "Python"
category: Computer Languages
---

# Python
Python is a general purpose programming language that is very easy
to use. I consider it a "high level" language because it has object
oriented structures, garbage collection, dynamic typing, and it is
interpreted. Python aims for readable code by using indentation for
code blocks as well.

## Hello World
```python
print('Hello, World!')
```

## Types
Python has the expected basic types of any programming language:
boolean, int, float, string, arrays, and hashes. In addition to
those, there are also complex numbers, tuples, and sets.

| Type | Description | Example |
| ---- | ----------- | ------- |
| `int` | Any integer number regardless of size | `10` |
| `float` | Floating point numbers | `0.5` |
| `complex` | Complex number (real + imaginary) | `1+2j` |
| `str` | String of characters | `'hello'` |
| `list` | Array | `['hello', 'world']` |
| `tuple` | Immutable list | `('hello', 'world')` |
| `dict` | Hash | `{'hello': 'world'}` |

The following functions are used to convert between data types.

| Function | Description |
| -------- | ----------- |
| `int(x [,base])` | Converts x to an integer |
| `float(x)` | Converts x to a floating point number |
| `complex(real [,imag])` | Creates a complex number |
| `str(x)` | Converts x to a string representation |
| `tuple(x)` | Converts x to a tuple |
| `list(x)` | Converts x to a list |
| `set(x)` | Converts x to a set |
| `dict(x)` | Creates a dictionary for a sequence of (key, value) tuples |
| `frozenset(x)` | Converts x to a frozen set |
| `chr(x)` | Converts an integer to a character |
| `unichr(x)` | Converts an integer to a Unicode character |
| `ord(x)` | Converts a character to its integer value |
| `hex(x)` | Converts an integer to a hexadecimal string |
| `oct(x)` | Converts an integer to an octal string |

**Note:** A frozen set is an immutable set object

### Type Checking
There are two built-ins to check the type of a variable: `type` and `isinstance`.
`type` checks the exact class matches, while `isinstance` checks if the variable
is an instance of the class or any subclass.

```python
var = 'hello'

if isinstance(var, int):
    print("var is a number")
elif isinstance(var, str):
    print("var is a string")
else:
    print("var is something else")

if type(var) is int:
    print("var is a number")
elif type(var) is str:
    print("var is a string")
else:
    print("var is something else")
```

## Classes
Python has object oriented constructs like classes and inheritance.

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def whoami(self):
        print(self.name)

# Dog extends Animal
class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)
    def speak(self):
        print('Woof!')
```

Python does not have abstract classes or methods built-in to the
language, but the abstract base class (`abc`) module adds this
functionality. This module prevents initializing an `Animal` class
or defining a class that does not implement the `speak` method.

```python
from abc import ABC, abstractmethod

# Animal extends ABC (abstract base class)
class Animal(ABC):
    def __init__(self, name):
        self.name = name
        super().__init__()
    def whoami(self):
        print(self.name)
    @abstractmethod
    def speak(self):
        # decorator used to identify an abstract method that must
        # be overwritten by the extending class
        pass

# Dog extends Animal
class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)
    def speak(self):
        print('Woof!')
```

## Generator
A generator is a special function that is used to create an iterator.
In a generator function, `yield` is used instead of `return` to
provide a sequence of values. This is useful for large datasets to
work with one item at a time instead of the entire set.

```python
# very simple generator
def generator():
    yield 1
    yield 2
    yield 3

for value in generator():
    print(value)
```

### Anonymous Generator
Like anonymous functions, Python allows anonymous function generators.

```python
generator = (x*x for x in range(5))

for value in generator:
    print(value)
```

## Python Package Index
[PyPI](https://pypi.org/) is a repository for python packages. It
allows for anyone to publish or download published packages very
easily.
