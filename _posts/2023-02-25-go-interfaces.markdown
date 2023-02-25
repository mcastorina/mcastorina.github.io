---
layout: post
title:  "What are Go interfaces?"
date:   2023-02-25 09:00:00 -0500
tags: programming
---

I was talking to my coworker about interfaces when the question arose about why
a concrete slice has to manually be converted into an interface slice. I'll
demonstrate this as a simple example.

```go
ints := []int{1, 3, 3, 7}

var anys []any = ints // Error!
// cannot use ints (variable of type []int) as type []any in variable declaration
```

This is perhaps surprising because semantically every `int` is an `any`, so why
doesn't it work? I told my coworker it was because elements in a slice must all
have the same size, and interfaces are wide pointers. It was a good enough
explanation at the time, but it got me wondering.. are interfaces really wide
pointers? How are they actually represented at runtime?

## iface and eface

Well fortunately for us, Go is [open source](https://github.com/golang/go)! Poking around we can find a few
promising struct definitions: [iface and eface](https://github.com/golang/go/blob/169203f3ee022abf66647abc99fd483fd10f9a54/src/runtime/runtime2.go#L202-L210).

```go
type iface struct {
	tab  *itab
	data unsafe.Pointer
}

type eface struct {
	_type *_type
	data  unsafe.Pointer
}
```

We can see here that both `iface` and `eface` are, indeed, double wide
pointers. The first pointer contains some sort of information about the type
and the second is a pointer to the actual data.

If these are the actual runtime types, we should be able to write a program to
inspect them. Let's start by copying `eface` and its child structs.

## Inspecting eface

```go
package main

import (
	"fmt"
	"unsafe"
)

func main() {
	var a any = int64(0x41414141)
	e := *(*eface)(unsafe.Pointer(&a))

	fmt.Printf("%+v\n", e)
	fmt.Printf("%+v\n", e._type)
	fmt.Printf("0x%x\n", *(*int64)(e.data))
}

type eface struct {
	_type *_type
	data  unsafe.Pointer
}

type _type struct {
	size       uintptr
	ptrdata    uintptr // size of memory prefix holding all pointers
	hash       uint32
	tflag      uint8
	align      uint8
	fieldAlign uint8
	kind       uint8
	// function for comparing objects of this type
	// (ptr to object A, ptr to object B) -> ==?
	equal func(unsafe.Pointer, unsafe.Pointer) bool
	// gcdata stores the GC type data for the garbage collector.
	// If the KindGCProg bit is set in kind, gcdata is a GC program.
	// Otherwise it is a ptrmask bitmap. See mbitmap.go for details.
	gcdata *byte
	// The original types for these two were `nameOff` and `typeOff` which are
	// just int32. They represent an offset into.. something? for these values.
	str       int32
	ptrToThis int32
}
```

Running this on my machine I get:

```
{_type:0x489c00 data:0x4b9048}
&{size:8 ptrdata:0 hash:2580995395 tflag:15 align:8 fieldAlign:8 kind:6 equal:0x402fa0 gcdata:0x4b8f7d str:2320 ptrToThis:17664}
0x41414141
```

Here we can see all of the information looks reasonably accurate. The size and
align is 8 bytes, the pointer types look like addresses, and of course the data
matches. `eface` appears to only be for the `any` type, or as it was previously
known, the *empty* interface `interface{}`. Empty interfaces, unlike other
interfaces, don't have any methods associated with them.

## Inspecting iface

Now let's take a look at `iface`.

```go
package main

import (
	"fmt"
	"unsafe"
)

type I interface {
	I1()
	I2()
}
type S struct {
	foo int32
	bar string
}

func (s S) I1() { fmt.Println("I1") }
func (s S) I2() { fmt.Println("I2") }

func main() {
	var s I = S{0x41414141, "BBBB"}

	i := *(*iface)(unsafe.Pointer(&s))
	fmt.Printf("%+v\n", i)
	fmt.Printf("%+v\n", i.tab)
	fmt.Printf("%+v\n", *(*S)(i.data))
	fmt.Printf("struct addr:    %+v\n", s.I1)
	fmt.Printf("fun table:      %+v\n", (*func())(unsafe.Pointer(&i.tab.fun[0])))
}

type iface struct {
	tab  *itab
	data unsafe.Pointer
}

type itab struct {
	inter *interfacetype
	_type *_type
	hash  uint32 // copy of _type.hash. Used for type switches.
	_     [4]byte
	fun   [1]uintptr // variable sized. fun[0]==0 means _type does not implement inter.
}

type interfacetype struct {
	typ     _type
	pkgpath *byte
	mhdr    []imethod
}

type imethod struct {
	// The original types for these two were `nameOff` and `typeOff` which are
	// just int32. They represent an offset into.. something? for these values.
	name int32
	ityp int32
}

type _type struct {
	/* Removed for brevity */
}
```

Again, running this on my machine we get:

```
{tab:0x4b9e28 data:0xc000010030}
&{inter:0x48e060 _type:0x492140 hash:837923000 _:[0 0 0 0] fun:[4729568]}
{foo:1094795585 bar:BBBB}
struct addr:    0x482be0
fun table:      0x4b9e40
```

And again, most of this data looks reasonable. One thing I couldn't figure out
though, is how to get the function address from the `fun` table. I printed them
out above and they are clearly different, off by about `0x37260` bytes. If
anyone knows how this is done, please let me know!

## Conclusion

So overall, interfaces *are* wide pointers with a special case for the empty
interface. One pointer always points to the actual data, and the other points
to type information, of which there's a table of function pointers to call the
methods of the interface. There's certainly more to explore here, but that's a
good enough mental model for now.
