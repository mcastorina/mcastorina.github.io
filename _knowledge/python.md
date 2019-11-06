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

## Python Package Index
[PyPI](https://pypi.org/) is a repository for python packages. It
allows for anyone to publish or download published packages very
easily.
