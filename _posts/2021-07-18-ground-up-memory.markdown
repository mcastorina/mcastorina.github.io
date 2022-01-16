---
layout: post
title:  "Ground Up: Memory"
date:   2021-09-14 00:00:00 -0500
categories: tutorials
---
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js" integrity="sha512-ovjLI1ZcZe6bw+ImQ21r+sv8q/Vwob2kq7tFidK6E1LWfi0T4uobbmpfEU1//a9h9o5Kkt+MnMWf6rWlg0EiMw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="text/javascript">
    window.globals = {};
    function updateState(checkbox, global) {
        window.globals[global] = checkbox.checked;
        window.globals.updateSRLatch();
        window.globals.updateGatedSRLatch();
        window.globals.updateDFlipFlop();
        updateTables();
    }
    function updateTables() {
        updateSRLatchTable();
        updateGatedSRLatchTable();
        updateDFlipFlopTable();
    }
    function updateSRLatchTable() {
        var table = document.getElementById("srLatchTable").children[0].children;
        var index = (window.globals["srLatchS"] ? 2 : 0) + (window.globals["srLatchR"] ? 1 : 0) + 1;
        for (var i = 1; i < table.length; i++) {
            table[i].style.backgroundColor = i == index ? 'yellow' : 'white';
        }
    }
    function updateGatedSRLatchTable() {
        var table = document.getElementById("gatedSRLatchTable").children[0].children;
        var index = (!window.globals["gatedSRLatchG"] ? 0 : ((window.globals["gatedSRLatchS"] ? 2 : 0) + (window.globals["gatedSRLatchR"] ? 1 : 0) + 1)) + 1;
        for (var i = 1; i < table.length; i++) {
            table[i].style.backgroundColor = i == index ? 'yellow' : 'white';
        }
    }
    function updateDFlipFlopTable() {
        var table = document.getElementById("dFlipFlopTable").children[0].children;
        var index = (window.globals["dFlipFlopClk"] ? 2 : 0) + (window.globals["dFlipFlopD"] ? 1 : 0) + 1;
        for (var i = 1; i < table.length; i++) {
            table[i].style.backgroundColor = i == index ? 'yellow' : 'white';
        }
    }
    window.onload = function() {
        window.globals.updateSRLatch();
        window.globals.updateGatedSRLatch();
        window.globals.updateDFlipFlop();
        updateTables()
    }
</script>
<style type="text/css" media="all">
.gate {
    display: inline-block;
    vertical-align: middle;
    width: unset;
}
p.gate {
    vertical-align: unset;
}
table {
    margin: 30px auto;
}
.table-div {
    display: inline-block;
    vertical-align: middle;
}
.interactive {
    padding: 20px;
    margin: 20px auto;
    border: 1px dashed gray;
}
.table-div table {
    margin-bottom: 5px;
}
#srLatchCircuit {
    width: 200px;
    height: 190px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 40px;
}
#gatedSRLatchCircuit {
    width: 300px;
    height: 190px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 40px;
}
#dFlipFlop {
    width: 320px;
    height: 190px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 40px;
}
</style>

Welcome to a series of posts cleverly titled ***Ground Up***,
where I explain computing concepts from the ground up! We'll explore
how computers work starting with transistors and going from there.
This post specifically covers how to create memory from gates.

* [Part 1: Bits]({% post_url 2021-06-18-ground-up-bits %})
* [Part 2: Gates]({% post_url 2021-07-06-ground-up-gates %})
* ***Part 3: Memory***

## Memory
Memory is a way for a system to persist state. So far, everything we have
built has been purely functional and independent of state. In terms of
circuits, we want to build something whose output is a function of the
inputs *and* output. One way to achieve this is quite literally to use
the output of the circuit as one of the inputs.

### SR-Latch
We are going to design a circuit called **SR-Latch** which can **s**et
and **r**eset its state. It will have two inputs: (*S* and *R*) and one
output (*Q*). Also remember we will use the output as an input as well,
so the third input is *Q* too. When creating the transition table,
we will denote the new output as *Q'*.

|  S  |  R  |  Q  |  Q' |
|:---:|:---:|:---:|:---:|
| `0` | `0` | `0` | `0` |
| `0` | `0` | `1` | `1` |
| `0` | `1` | `X` | `0` |
| `1` | `0` | `X` | `1` |
{: style="width: 30%;"}

**Note:** `X` indicates "do not care"

You'll notice that we did not define what would happen if both *S*
and *R* are `1` because there is no logical result. Let's call this
situation undefined behavior.

Taking a step back and thinking about what we are trying to achieve,
it seems like the properties of an **OR** gate will be useful. In fact,
we will use **NOR** gates.

{% raw %}
$$ Q' = \overline{(R + \overline{(S + Q)})} $$
{% endraw %}

Instructions: toggle the inputs to see how the circuit reacts.

<div class="interactive" style="width: 65%;">
<div class="table-div">
<table class="gate" id="srLatchTable">
    <tr>
        <th><input type="checkbox" onclick="updateState(this, 'srLatchS');"><label>S</label></th>
        <th><input type="checkbox" onclick="updateState(this, 'srLatchR');"><label>R</label></th>
        <th>Q</th>
        <th>Q'</th>
    </tr>
    <tr><td><code>0</code></td><td><code>0</code></td><td><code>X</code></td><td><code>Q</code></td></tr>
    <tr><td><code>0</code></td><td><code>1</code></td><td><code>X</code></td><td><code>0</code></td></tr>
    <tr><td><code>1</code></td><td><code>0</code></td><td><code>X</code></td><td><code>1</code></td></tr>
    <tr><td><code>1</code></td><td><code>1</code></td><td><code>X</code></td><td><code>?</code></td></tr>
</table>
</div>

<script type="text/paperscript" canvas="srLatchCircuit">
{% include_relative _ground_up/srLatchCircuit.js %}
</script>
<canvas id="srLatchCircuit" resize></canvas>
</div>

This circuit is a ***transparent*** latch, which means changes in the
input are immediately reflected in the output. One way to add more
control is to add a ***gate*** which will prevent any changes to the
circuit until it is enabled by a signal.

### Gated SR-Latch
This circuit simply uses **AND** gates to allow the *S* or *R*
signal through to the rest of the circuit.

<div class="interactive" style="width: 90%;">
<div class="table-div">
<table class="gate" id="gatedSRLatchTable">
    <tr>
        <th><input type="checkbox" onclick="updateState(this, 'gatedSRLatchG');"><label>G</label></th>
        <th><input type="checkbox" onclick="updateState(this, 'gatedSRLatchS');"><label>S</label></th>
        <th><input type="checkbox" onclick="updateState(this, 'gatedSRLatchR');"><label>R</label></th>
        <th>Q</th>
        <th>Q'</th>
    </tr>
    <tr><td><code>0</code></td><td><code>X</code></td><td><code>X</code></td><td><code>X</code></td><td><code>Q</code></td></tr>
    <tr><td><code>1</code></td><td><code>0</code></td><td><code>0</code></td><td><code>X</code></td><td><code>Q</code></td></tr>
    <tr><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td><td><code>X</code></td><td><code>0</code></td></tr>
    <tr><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>X</code></td><td><code>1</code></td></tr>
    <tr><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>X</code></td><td><code>?</code></td></tr>
</table>
</div>

<script type="text/paperscript" canvas="gatedSRLatchCircuit">
{% include_relative _ground_up/gatedSRLatchCircuit.js %}
</script>
<canvas id="gatedSRLatchCircuit" resize></canvas>
</div>

**Note:** a common variant of this latch is a *D-Latch* in which a single
*data* bit is saved when the *gate* is enabled. This is easily achieved
by wiring *R* to *not S*, so the latch is reset when the data is `0`
and set when it is `1`.

### Flip Flops
Flip flops are edge-triggered memory units usually built with two
underlying gated latches. They are useful for precisely synchronizing
changes to a clock signal.

<div class="interactive" style="width: 80%;">
<div class="table-div">
<table class="gate" id="dFlipFlopTable">
    <tr>
        <th><input type="checkbox" onclick="updateState(this, 'dFlipFlopClk');"><label>Clk</label></th>
        <th><input type="checkbox" onclick="updateState(this, 'dFlipFlopD');"><label>D</label></th>
        <th>Q</th>
    </tr>
    <tr><td><code>0</code></td><td><code>X</code></td><td><code>Q</code></td></tr>
    <tr><td><code>0</code></td><td><code>X</code></td><td><code>Q</code></td></tr>
    <tr><td><code>1->0</code></td><td><code>0</code></td><td><code>0</code></td></tr>
    <tr><td><code>1->0</code></td><td><code>1</code></td><td><code>1</code></td></tr>
</table>
</div>
<script type="text/paperscript" canvas="dFlipFlop">
{% include_relative _ground_up/dFlipFlop.js %}
</script>
<canvas id="dFlipFlop" resize></canvas>
</div>

**Note:** the above uses two D-Latches, where the value of *D* gets saved
when *E* is `1`. Notice how the final output *Q* only gets updated on
the falling edge (`1 -> 0`) of the *Clk* signal.

## Conclusion
We successfully created a way to persist state, which will be very useful
in building things like registers and state machines. Note that this
is *volatile memory*, meaning the memory is lost when power is turned
off. This is just one way to create in-circuit memory, but it's a great
building block to have in our toolset.

As always if any parts were unclear, please feel free to contact me.
