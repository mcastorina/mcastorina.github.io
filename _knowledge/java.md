---
layout: default
title:  "Java"
category: Computer Languages
---

# Java
Java is the first "real" language I learned. I consider it a "middle
level" language for its static typing, garbage collection, rich
libraries, and object oriented focus.

## Hello World

```java
public class HelloWorld {
    public static void main(String []args) {
        System.out.println("Hello, World!");
    }
}
```

## Objected Oriented
Java is an object oriented programming language. Besides simple
types like `int`, `double`, and `char`, everything is an Object.
Objects must start with a capital letter (such as `String`).

## Class
A class is a way to define an object. An instance of a class is
then created in the program with `new` to perform the functions
defined by the class. You will notice that static functions do not
require an object to perform on (like `main`).

```java
public class HelloWorld {
    public static void main(String []args) {
        Example e = new Example("hello");
        System.out.println(e.examp());
    }
}

class Example {
    private String s;
    // Constructor does not return a type and must match the class name
    public Example(String s) {
        // 'this' represents the current instance of the class
        this.s = s;
    }
    public String examp() {
        // 'this' is not required here as there is no ambiguity in scope
        return "Examp: " + s;
    }
}
```

## Interface
An interface is like a blueprint for a collection of classes. They
are useful for ensuring a group of classes all implement the same
functions (declared in the interface). Knowing this, we can write
methods that can accept the interface and perform the same function
regardless of which class was actually passed.
