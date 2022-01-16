---
layout: post
title:  "Ground Up: Gates"
date:   2021-07-13 00:00:00 -0500
categories: tutorials
---
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js" integrity="sha512-ovjLI1ZcZe6bw+ImQ21r+sv8q/Vwob2kq7tFidK6E1LWfi0T4uobbmpfEU1//a9h9o5Kkt+MnMWf6rWlg0EiMw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<style type="text/css" media="all">
table {
    margin: 30px auto;
}
.sum-table {
    display: inline-block;
    padding-right: 40px;
}
.sum-table table {
    border: none;
}
.sum-table tr {
    border: none;
}
.sum-table td {
    border: none;
}
.sum-table .last-row td {
    border-top: 1px solid black;
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
    display: inline-block;
    vertical-align: middle;
}
.interactive {
    padding: 5px 0px 0px 5px;
    margin: 20px auto;
    border: 1px dashed gray;
}
.table-div table {
    margin-top: 5px;
    margin-bottom: 5px;
}
#adderCircuit {
    width: 400px;
    height: 360px;
    display: inline-block;
    vertical-align: middle;
}
#adder2Circuit {
    width: 280px;
    height: 280px;
    display: inline-block;
    vertical-align: middle;
}
</style>
<script type="text/javascript">
    window.globals = {};
    function updateState(checkbox, global) {
        window.globals[global] = checkbox.checked;
        window.globals.updateAdder();
        window.globals.updateAdder2();
        updateTables();
    }
    function updateTables() {
        var table = document.getElementById("adderTable").children[0].children;
        var index = (window.globals["adderA"] ? 4 : 0) + (window.globals["adderB"] ? 2 : 0) + (window.globals["adderC"] ? 1 : 0) + 1;
        for (var i = 1; i < table.length; i++) {
            table[i].style.backgroundColor = i == index ? 'yellow' : 'white';
        }

        var table = document.getElementById("adder2Table").children[0].children;
        var a1 = window.globals["adder2A1"] ? 1 : 0;
        var a0 = window.globals["adder2A0"] ? 1 : 0;
        var b1 = window.globals["adder2B1"] ? 1 : 0;
        var b0 = window.globals["adder2B0"] ? 1 : 0;
        var out2 = window.globals["adder2Out2"] ? 1 : 0;
        var out1 = window.globals["adder2Out1"] ? 1 : 0;
        var out0 = window.globals["adder2Out0"] ? 1 : 0;
        var a = a1 * 2 + a0;
        var b = b1 * 2 + b0;
        var out = out2 * 4 + out1 * 2 + out0;
        table[1].children[1].children[0].innerText = '' + a1 + a0;
        table[1].children[2].children[0].innerText = '' + b1 + b0;
        table[1].children[3].children[0].innerText = '' + out2 + out1 + out0;
        table[2].children[1].children[0].innerText = a;
        table[2].children[2].children[0].innerText = b;
        table[2].children[3].children[0].innerText = out;
    }
    window.onload = function() {
        window.globals.updateAdder();
        window.globals.updateAdder2();
        updateTables()
    }
</script>

Welcome to a series of posts cleverly titled ***Ground Up***,
where I explain computing concepts from the ground up! We'll explore
how computers work starting with transistors and going from there.
This post specifically covers gates, binary math, and adders.

* [Part 1: Bits]({% post_url 2021-06-18-ground-up-bits %})
* ***Part 2: Gates***
* [Part 3: Memory]({% post_url 2021-07-18-ground-up-memory %})

## Gates
In the [previous section]({% post_url 2021-06-18-ground-up-bits %})
we learned about transistors and how we can use them to make circuits
that perform binary logic.  Let's catalog these gates as additions to
our building blocks.

<table>
<thead><tr><th>Gate</th><th>Transition Table</th><th>Gate Symbol</th></tr></thead>
<tr><td><b>NOT</b></td><td><table><thead><tr><th>A</th><th>Output</th></tr></thead><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/NOT.svg" width="160"/></td></tr>
<tr><td><b>AND</b></td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/AND.svg" width="160"/></td></tr>
<tr><td><b>NAND</b></td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/NAND.svg" width="160"/></td></tr>
<tr><td><b>OR</b></td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/OR.svg" width="160"/></td></tr>
<tr><td><b>NOR</b></td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/NOR.svg" width="160"/></td></tr>
<tr><td><b>XOR</b></td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/XOR.svg" width="160"/></td></tr>
<tr><td><b>XNOR</b></td><td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></td><td style="text-align: center;"><img src="/assets/kb/gates/XNOR.svg" width="160"/></td></tr>
</table>

## Binary
Gates operate on binary data; "on" or "off," `1` or `0`. This data
doesn't really mean anything unless we *give it* meaning, and I think a useful
thing we could do is have it represent numbers. Binary numbers are
exactly like normal numbers, except we only have two symbols to work with
(represented by "off" and "on").

If we were to count up in binary, we would start with `0`, then `1`,
then.. well that's all the symbols we have!  To get around this, let's
add a more significant digit `10`. Do you see any similarities with
using [ten](/assets/ground-up/base10.png) symbols to count?  I hope so,
because this way of thinking can be extended to any basis, including base
16 which uses 16 symbols! But we'll get to that later.  For now, it's
enough to know how to represent larger numbers using binary digits (bits).

### Converting Between Binary and Decimal Numbers
We have established that we can represent numbers in binary, and if we
stick to this representation, we can express the relationship between
binary and decimal numbers using math. Given a binary number $$B$$ with $$n$$
bits, it's decimal value can be calculated as:

{% raw %}
$$
\sum_{k=0}^{n-1} B_{k}\cdot 2^{k}
$$
{% endraw %}

where $$B_{k}$$ is the $$k$$th significant bit of $$B$$.

I find it's best to comprehend this with an example. A three-bit binary number `101` would be:

{% raw %}
$$
\begin{align}
101_2 &= (1)\cdot 2^{2} + (0)\cdot 2^{1} + (1)\cdot 2^{0} \\
  &= 2^{2} + 2^{0} \\
  &= 4 + 1 \\
  &= 5
\end{align}
$$
{% endraw %}

Going from decimal to binary is a similar operation. The way I think of
it, is finding all of the powers of two that sum to the decimal value.
An algorithm to do this for a decimal number $$D$$ is to repeatedly
divide $$D$$ by $$2$$ and noting the remainder until $$D$$ is $$0$$. The
binary number is the remainders in reverse order. Here is an example
for converting $$6$$ to binary.

| Division | Remainder |
|:---:|:---:|
| 6/2=3 | 0 |
| 3/2=1 | 1 |
| 1/2=0 | 1 |
| **Result** | 110 |
{: style="width: 30%;"}

Alternatively, $$6$$ is $$4 + 2$$ = $$2^{2} + 2^{1}$$ which means bit $$2$$ and $$1$$ are set: `110`.

### Binary Math
We can even perform math in binary the same way we normally do. `1` +
`1` = `10`. Here's another example of using larger numbers: `0110` + `1100`.
On the left is the binary representation, and the right is the decimal.

<div class='sum-table'>
<table>
<tr><td></td><td>1</td><td> </td><td> </td><td> </td></tr>
<tr><td></td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>+</td><td>1</td><td>1</td><td>0</td><td>0</td></tr>
<tr class='last-row'><td></td><td>10</td><td>0</td><td>1</td><td>0</td></tr>
</table>
</div>

<div class='sum-table'>
<table>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td>6</td></tr>
<tr><td>+</td><td>1</td><td>2</td></tr>
<tr class='last-row'><td></td><td>1</td><td>8</td></tr>
</table>
</div>

Hopefully this example makes it clear, but the same rules of adding
decimal numbers applies to adding binary numbers. When you overflow,
you need to carry the 1 to the next significant digit.

## Adder
Now that we know how to represent numbers using binary, let's make
a circuit that will add two bits for us.  We'll begin with the state
transition table. We have two bits as input, and two bits as output.

| A   | B   | Out<sub>1</sub> | Out<sub>0</sub> |
|:---:|:---:|:---: |:---:|
| `0` | `0` | `0`  | `0`  |
| `0` | `1` | `0`  | `1`  |
| `1` | `0` | `0`  | `1`  |
| `1` | `1` | `1`  | `0`  |
{: style="width: 30%;"}

This table describes adding two single bits together, with the output
being a single two-bit number. <code>Out<sub>1</sub></code> is the
most signifcant bit, and <code>Out<sub>0</sub></code> is the least
significant bit.

So far so good, but there's one problem. Sometimes we need to add 3 bits together
when there is a carry-over like in the previous example.

Let's modify the circuit to sum three bits: two inputs and a carry.

| A   | B   | C   | Out<sub>1</sub> | Out<sub>0</sub> |
|:---:|:---:|:---:|:---::|:---:|
| `0` | `0` | `0` | `0`  | `0`  |
| `0` | `0` | `1` | `0`  | `1`  |
| `0` | `1` | `0` | `0`  | `1`  |
| `0` | `1` | `1` | `1`  | `0`  |
| `1` | `0` | `0` | `0`  | `1`  |
| `1` | `0` | `1` | `1`  | `0`  |
| `1` | `1` | `0` | `1`  | `0`  |
| `1` | `1` | `1` | `1`  | `1`  |
{: style="width: 30%;"}

Now let's create this circuit using our building blocks.  The first step
is to create a minimal boolean expression that models our transition
table.  We want to express each output bit as a function of input bits.
One way to figure this out is with Karnaugh Maps, but we'll cover that later.
For now, we will use the following.

{% raw %}
$$
\begin{align}
Out_1 &= AB | BC | AC \\
Out_0 &= A \oplus B \oplus C \\
\end{align}
$$
{% endraw %}
Note: sometimes **AND** is represented as multiplication and **OR**
as addition. Similarly you may see **XOR** represented with `^`.

Instructions: toggle the inputs to see how the circuit reacts.

<div class="interactive">
<div class="table-div">
<table class="gate" id="adderTable">
    <tr>
        <th><input type="checkbox" onclick="updateState(this, 'adderA');"><label>A</label></th>
        <th><input type="checkbox" onclick="updateState(this, 'adderB');"><label>B</label></th>
        <th><input type="checkbox" onclick="updateState(this, 'adderC');"><label>C</label></th>
        <th>Out<sub>1</sub></th>
        <th>Out<sub>0</sub></th>
    </tr>
    <tr><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td></tr>
    <tr><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td></tr>
    <tr><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td></tr>
    <tr><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td></tr>
    <tr><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td><td><code>1</code></td></tr>
    <tr><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td></tr>
    <tr><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>0</code></td></tr>
    <tr><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td></tr>
</table>
</div>

<script type="text/paperscript" canvas="adderCircuit">
{% include_relative _ground_up/adderCircuit.js %}
</script>
<canvas id="adderCircuit" resize></canvas>
</div>

Let's try stacking two together to add 2-bit numbers. For simplicity,
we will package the above gates together into a single unit. You'll notice
we connect <b>Out<sub>1</sub></b>, the overflow bit, directly to **C**,
and this can be chained indefinitely.

<div class="interactive" style="padding: 20px; width: 93%;">
<div class="table-div">
<table class="gate" id="adder2Table">
    <tr>
        <th></th>
        <th><input type="checkbox" onclick="updateState(this, 'adder2A1');"><label>A<sub>1</sub></label>
        <input type="checkbox" onclick="updateState(this, 'adder2A0');"><label>A<sub>0</sub></label></th>
        <th><input type="checkbox" onclick="updateState(this, 'adder2B1');"><label>B<sub>1</sub></label>
        <input type="checkbox" onclick="updateState(this, 'adder2B0');"><label>B<sub>0</sub></label></th>
        <th>Out</th>
    </tr>
    <tr><td><b>Binary</b></td><td><code>00</code></td><td><code>00</code></td><td><code>00</code></td></tr>
    <tr><td><b>Decimal</b></td><td><code>0</code></td><td><code>0</code></td><td><code>0</code></td></tr>
</table>
</div>

<script type="text/paperscript" canvas="adder2Circuit">
{% include_relative _ground_up/adder2Circuit.js %}
</script>
<canvas id="adder2Circuit" resize></canvas>
</div>

## Conclusion
Excellent! Hopefully you are starting to see the usefulness of all of
these low level components as we start to build up what we can do with
them. Here's a bonus challenge: see if you can modify our adder to do
subtraction! Hint: you do not have to change any internal gates.

As always if any parts were unclear, please feel free to contact me.

[Take me to the next part!]({% post_url 2021-07-18-ground-up-memory %})

<script>updateTables();</script>
