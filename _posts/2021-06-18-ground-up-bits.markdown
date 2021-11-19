---
layout: post
title:  "Ground Up: Bits"
date:   2021-06-22 00:00:00 -0500
categories: tutorials
---
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js" integrity="sha512-ovjLI1ZcZe6bw+ImQ21r+sv8q/Vwob2kq7tFidK6E1LWfi0T4uobbmpfEU1//a9h9o5Kkt+MnMWf6rWlg0EiMw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

Welcome to a new series of posts cleverly titled ***Ground Up***,
where I explain computing concepts from the ground up! We'll explore
how computers work starting with transistors and going from there.
This post specifically covers transistors, digital logic, and binary.

* ***Part 1: Bits***
* [Part 2: Gates]({% post_url 2021-07-06-ground-up-gates %})
* [Part 3: Memory]({% post_url 2021-07-18-ground-up-memory %})

## Transistors
At the end of the day, computers are complex circuits built mostly of
transistors. Transistors are electrical components that can be thought
of as gates that allow or deny current to flow. That's it.

<style type="text/css" media="all">
.gate th, td {
    padding: 10px;
}
.gate {
    display: inline-block;
    vertical-align: middle;
    width: unset;
}
p.gate {
    vertical-align: unset;
}
.table-div {
    width: 30%;
    display: inline-block;
    vertical-align: middle;
}
canvas {
    display: inline-block;
    vertical-align: middle;
    height: 120px;
}
#not {
    height: 240px;
    width: 210px;
}
#and {
    height: 380px;
    width: 420px;
}
#or {
    height: 380px;
    width: 420px;
}
#xor {
    height: 430px;
    width: 280px;
}
</style>
<script type="text/javascript">
    window.globals = {};
    function updateState(checkbox, global) {
        window.globals[global] = checkbox.checked;
        window.globals.updateNot();
        window.globals.updateAnd();
        window.globals.updateOr();
        window.globals.updateXor();
        updateTables();
    }
    function updateTables() {
        var notTable = document.getElementById("notTable").children[0].children;
        var notIndex = (window.globals.notA ? 1 : 0) + 1;
        for (var i = 1; i < notTable.length; i++) {
            notTable[i].style.backgroundColor = i == notIndex ? 'yellow' : 'white';
        }
        updateTable2("and");
        updateTable2("or");
        updateTable2("xor");
    }
    function updateTable2(prefix) {
        var table = document.getElementById(prefix + "Table").children[0].children;
        var index = (window.globals[prefix + "A"] ? 2 : 0) + (window.globals[prefix + "B"] ? 1 : 0) + 1;
        for (var i = 1; i < table.length; i++) {
            table[i].style.backgroundColor = i == index ? 'yellow' : 'white';
        }
    }
    window.onload = function() {
        window.globals.updateNot();
        window.globals.updateAnd();
        window.globals.updateOr();
        window.globals.updateXor();
        updateTables();
    }
</script>

<script type="text/paperscript" canvas="nchannel">
{% include_relative _ground_up/nchannel.js %}
</script>

<p class="gate"><input type="checkbox" onclick="updateState(this, 'nChannel');"><label>G</label></p>
<canvas id="nchannel" resize></canvas>

It is from this simple building block we can begin to form more complex
logic. There are two common variants of transistors: P-Channel and
N-Channel. The above is an N-Channel transistor, which means the current flows
when voltage is applied to the Gate (G). A P-Channel transistor means the
current flows when there is *no* voltage applied to the Gate.

<script type="text/paperscript" canvas="pchannel">
{% include_relative _ground_up/pchannel.js %}
</script>

<p class="gate"><input type="checkbox" onclick="updateState(this, 'pChannel');"><label>G</label></p>
<canvas id="pchannel" resize></canvas>

The dot on the input gate indicates negation and is a common symbol in
digital logic. It helps me to remember that the `P` in "P-Channel" has
a hole in the letter like the dot on the schematic.

## Binary Logic
Before we start using these building blocks, let's cover what binary
logic is.  Through the transistor, we have a way to allow current to
flow or not, which can be thought of as two states: on or off. When the
voltage in a circuit is above a threshold, it is considered to be "on",
and when the voltage is below a threshold, it is "off". This is the basis
of binary logic: there are only two possible states the circuit can be
in. From here on, we'll denote "on" with a `1` and "off" with a `0`.

`NOT` is the simplest binary operation, involving only a single input. The `NOT`
operation will negate its input. If the input is a `1`, the output is a `0`. If the
input is a `0`, the output is a `1`. Below is a table of binary operations for your
reference.

<table>
  <thead>
    <tr>
      <th style="text-align: center">Binary Operator</th>
      <th style="text-align: center">Symbol</th>
      <th>Description</th>
      <th>Transition Table</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center"><b>NOT</b></td>
      <td style="text-align: center">~</td>
      <td>Negate its input</td>
      <td><table><thead><tr><th>A</th><th>Output</th></tr></thead><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td></tr></table></td>
    </tr>
    <tr>
      <td style="text-align: center"><b>AND</b></td>
      <td style="text-align: center">&amp;</td>
      <td>Outputs <code class="language-plaintext highlighter-rouge">1</code> if both inputs are <code class="language-plaintext highlighter-rouge">1</code></td>
      <td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></td>
    </tr>
    <tr>
      <td style="text-align: center"><b>OR</b></td>
      <td style="text-align: center">|</td>
      <td>Outputs <code class="language-plaintext highlighter-rouge">1</code> if either input is <code class="language-plaintext highlighter-rouge">1</code></td>
      <td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></td>
    </tr>
    <tr>
      <td style="text-align: center"><b>XOR</b></td>
      <td style="text-align: center">$$\oplus$$</td>
      <td>Outputs <code class="language-plaintext highlighter-rouge">1</code> if its inputs are not equal</td>
      <td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></table></td>
    </tr>
  </tbody>
</table>

Great! Now you may be wondering why this is useful. Well, you can actually
build a lot of interesting things just from these components alone,
including memory, state machines, and eventually computers.

## Using Transistors
Let's now build the components that will perform these binary operations
using the only building block we have: transistors! I highly recommend
you try this exercise on your own before seeing how I've done it here.

[This online simulator](https://www.falstad.com/circuit/) is a good
tool you may use.  The components we are using are the N-Channel and
P-Channel MOSFETs (under Active Components).

**Electronics Introduction**

For those new to electronics, here are a few notes to help you build
the below circuits.

 * Voltage on a wire does not change
 * Circuits generally have a power and ground component
     * Do not connect power to ground - your circuit will melt as current
       approaches infinity

**Transistor Characteristics**

Because N-Channel and P-Channel transistors are electrical components
that abide by the laws of physics, there are some restrictions on
how they can be used in circuits. They are not *completely* binary
in allowing current to flow or not, and it actually depends on the
"Gate to Source" voltage. The important thing to note is that N-Channel
transistors should source low voltages, and P-Channel transistors should
source high voltages. You will notice in the examples below that all of
the P-Channel transistors are on the "top half" of the circuit and all
of the N-Channel transistors are on the "bottom half" because of this.

This limitation also results in inverse operators being easier to build
than their logical counterparts. To build an AND gate in practice,
it is a NAND gate (NOT-AND) followed by a NOT gate.

### NOT Gate

<div class="table-div"><table class="gate" id="notTable">
    <tr>
        <th><input type="checkbox" onclick="updateState(this, 'notA');"><label>A</label></th>
        <th>Out</th>
    </tr>
    <tr><td><code>0</code></td><td><code>1</code></td></tr>
    <tr><td><code>1</code></td><td><code>0</code></td></tr>
</table></div>

<script type="text/paperscript" canvas="not">
{% include_relative _ground_up/not.js %}
</script>
<canvas id="not" resize></canvas>

### AND Gate

<div class="table-div"><table class="gate" id="andTable">
    <tr>
        <th><input type="checkbox" onclick="updateState(this, 'andA');"><label>A</label></th>
        <th><input type="checkbox" onclick="updateState(this, 'andB');"><label>B</label></th>
        <th>Out</th>
    </tr>
    <tr><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td></tr>
    <tr><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td></tr>
    <tr><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td></tr>
    <tr><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td></tr>
</table></div>

<script type="text/paperscript" canvas="and">
{% include_relative _ground_up/and.js %}
</script>
<canvas id="and" resize></canvas>

### OR Gate

<div class="table-div"><table class="gate" id="orTable">
    <tr>
        <th><input type="checkbox" onclick="updateState(this, 'orA');"><label>A</label></th>
        <th><input type="checkbox" onclick="updateState(this, 'orB');"><label>B</label></th>
        <th>Out</th>
    </tr>
    <tr><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td></tr>
    <tr><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td></tr>
    <tr><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td></tr>
    <tr><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td></tr>
</table></div>

<script type="text/paperscript" canvas="or">
{% include_relative _ground_up/or.js %}
</script>
<canvas id="or" resize></canvas>

### XOR Gate

<div class="table-div">
<table class="gate" id="xorTable">
    <tr>
        <th><input type="checkbox" onclick="updateState(this, 'xorA');"><label>A</label></th>
        <th><input type="checkbox" onclick="updateState(this, 'xorB');"><label>B</label></th>
        <th>Out</th>
    </tr>
    <tr><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td></tr>
    <tr><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td></tr>
    <tr><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td></tr>
    <tr><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td></tr>
</table>
<p>Note: The bars over the label indicates negation. For simplicity I removed the transistors to calculate that from A and B.</p>
</div>

<script type="text/paperscript" canvas="xor">
{% include_relative _ground_up/xor.js %}
</script>
<canvas id="xor" resize></canvas>

## More Bits
Just as a note, these components operate on at most 2 bits, where a bit
is a `1` or a `0`.  As we build components up, we will want to work on
larger groupings of bits, and it should be known that these operations
can be applied in a bitwise fashion. You can `AND` two 4-bit inputs by
using the `AND` operation on each pair of bits. For example `0110 AND
1100` would be `0100`.

| | Bit 3 | Bit 2 | Bit 1 | Bit 0 |
|:---:|:---:|:---:|:---:|:---:|
| **A** | `0` | `1` | `1` | `0` |
| **B** | `1` | `1` | `0` | `0` |
| **Output** | `0` | `1` | `0` | `0` |

## Conclusion
This post covered the very basics of computers: transistors, digital
logic, and binary operators. If any parts were unclear, please feel
free to contact me.

[Take me to the next part!]({% post_url 2021-07-06-ground-up-gates %})

<script>updateTables();</script>
