---
layout: post
title:  "Ground Up: State Machines"
date:   2022-01-19 00:00:00 -0500
categories: tutorials
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js" integrity="sha512-ovjLI1ZcZe6bw+ImQ21r+sv8q/Vwob2kq7tFidK6E1LWfi0T4uobbmpfEU1//a9h9o5Kkt+MnMWf6rWlg0EiMw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="text/javascript">
    window.globals = {};
    function updateState(checkbox, global) {
        window.globals[global] = checkbox.checked;
        window.globals.updateLock();
        updateTables();
    }
    function updateTables() {
        updateLockTable();
    }
    function updateLockTable() {
        var row = document.getElementById("lockTable").children[0].children[1].children;
        row[0].children[0].innerText = window.globals["lockB0"] ? "1" : "0";
        row[1].children[0].innerText = window.globals["lockB1"] ? "1" : "0";
        row[2].children[0].innerText = window.globals["lockB2"] ? "1" : "0";
        row[3].children[0].innerText = window.globals["lockB3"] ? "1" : "0";
        row[4].children[0].innerText = window.globals["lockR"] ? "1" : "0";
        row[5].children[0].innerText = window.globals["lockS"] || "A";
        row[6].children[0].innerText = window.globals["lockL"] || "1";
    }
    window.onload = function() {
        window.globals.updateLock();
        updateTables()
    }
</script>
<style type="text/css" media="all">
.gate {
    vertical-align: middle;
    width: unset;
}
p.gate {
    vertical-align: unset;
}
.table-div {
    vertical-align: middle;
}
.interactive {
    padding: 20px;
    margin: 20px auto;
    border: 1px dashed gray;
}
.table-div table {
    margin-bottom: 5px;
    margin-top: 5px;
}
table {
    margin: 30px auto;
}
#lock {
    width: 600px;
    height: 600px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 40px;
}
</style>

Welcome to a series of posts cleverly titled ***Ground Up***,
where I explain computing concepts from the ground up! We'll explore
how computers work starting with transistors and going from there.
This post specifically covers finite state machines.

* [Part 1: Bits]({% post_url 2021-06-18-ground-up-bits %})
* [Part 2: Gates]({% post_url 2021-07-06-ground-up-gates %})
* [Part 3: Memory]({% post_url 2021-07-18-ground-up-memory %})
* ***Part 4: State Machines***

## State Machines
Finite state machines (FSMs) are a way to model solutions to problems. It
describes the system as a machine that changes state in reaction to
inputs to produce the appropriate outputs. There are two common types of
finite state machines: **Moore** machines and **Mealy** machines. Moore
machines define the outputs soley on the current state, while Mealy
machines define the outputs on the current state *and* input values.

FSMs are used in a variety of useful products and services, such as
combination locks, traffic lights, and elevators. Even part of a CPU
uses a finite state machine for parsing and executing instructions,
which is why we are learning about them.

## Multiplexers
There is one important logic gate missing from our tool belt that will
be very helpful in implementing a FSM: the multiplexer (MUX). I will leave
the implementation details as an exercise to the reader and simply provide
the truth table and schematic symbol.

<div class="table-div" style="width: 100%; display: inline-block; margin-bottom: 20px;">
<table class="gate" style="margin: 0 10% 0 15%; display: inline-block;">
  <thead>
    <tr>
      <th style="text-align: center">A</th>
      <th style="text-align: center">B</th>
      <th style="text-align: center">S<sub>0</sub></th>
      <th style="text-align: center">Z</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center"><code class="highlighter-rouge">X</code></td>
      <td style="text-align: center"><code class="highlighter-rouge">X</code></td>
      <td style="text-align: center"><code class="highlighter-rouge">0</code></td>
      <td style="text-align: center"><code class="highlighter-rouge">A</code></td>
    </tr>
    <tr>
      <td style="text-align: center"><code class="highlighter-rouge">X</code></td>
      <td style="text-align: center"><code class="highlighter-rouge">X</code></td>
      <td style="text-align: center"><code class="highlighter-rouge">1</code></td>
      <td style="text-align: center"><code class="highlighter-rouge">B</code></td>
    </tr>
  </tbody>
</table>
<img src="/assets/kb/gates/MUX.svg" style="display: inline-block; width: 20%; vertical-align: middle"/>
</div>

Essentially, the output **Z** is set to **A** if **S<sub>0</sub>** is `0` and **B** if **S<sub>0</sub>** is `1`.


## Designing a FSM
At this point in our journey, we have enough components to build a state
machine circuit. We can store the current state in memory and use logic
gates to determine the outputs.  In this post, we will make a combination
lock, where the user must input three numbers in the correct order to
unlock the lock.

![lock-fsm](/assets/ground-up/lock.png)
{: style="width: fit-content; margin-left: auto; margin-right: auto;" }

This FSM is a Moore machine with 4 states: **A**, **B**, **C**, and
**Unlock**. The text on the arrows are known as state transitions.
The diagram describes what happens when an input is received in each
state. Notice that the correct combination is `301` to reach the
**Unlock** state. There is also a *Reset* input that will immediately
reset the machine to the initial state.

**Note:** `!x` in the diagram indicates negation. It is a short-hand that
means any input besides `x`.

Because this is a Moore machine, we must define the output as a function
of the state. We only have one output: *Locked*.

| Current State   | Locked   |
| :-------------: | :------: |
| **A**           | `1`      |
| **B**           | `1`      |
| **C**           | `1`      |
| **Unlock**      | `0`      |
{: style="width: 30%;" }

## Implementing a FSM
Now comes the technical nitty-gritty part. We need to build the FSM
with the building blocks we have. We have four states that we need to
remember, which can be encoded in two bits (`00` `01` `10` `11`). We
will need a few button inputs as well: `0` `1` `2` `3` and `Reset`. Let's
make a truth table to help visualize the state transitions.

| S            | B<sub>0</sub> | B<sub>1</sub> | B<sub>2</sub> | B<sub>3</sub> | R      |        | S'         |
| :----------: | :----:        | :----:        | :----:        | :----:        | :----: | :----: | :----:     |
| **A**        | `0`           | `0`           | `0`           | `1`           | `0`    |        | **B**      |
| **A**        | _             | _             | _             | _             | _      |        | **A**      |
| **B**        | `1`           | `0`           | `0`           | `0`           | `0`    |        | **C**      |
| **B**        | _             | _             | _             | _             | _      |        | **A**      |
| **C**        | `0`           | `1`           | `0`           | `0`           | `0`    |        | **Unlock** |
| **C**        | _             | _             | _             | _             | _      |        | **A**      |
| **Unlock**   | _             | _             | _             | _             | `0`    |        | **Unlock** |
| **Unlock**   | _             | _             | _             | _             | `1`    |        | **A**      |
{: style="width: 50%;" }

**Note:** `_` indicates "do not care" and was chosen instead of `X`
to reduce clutter.

The last puzzle piece is to think about the timing. How will we determine
when a button is pressed or not to advance the state? I think the simplest
solution is to **OR** all the input buttons together to determine when a button
is pressed, so let's go with that.

Instructions: toggle the inputs to see how the circuit reacts.

<div class="interactive">
<div class="table-div">
<table class="gate" id="lockTable">
    <tr>
        <th><input type="checkbox" onclick="updateState(this, 'lockB0');"><label>B<sub>0</sub></label></th>
        <th><input type="checkbox" onclick="updateState(this, 'lockB1');"><label>B<sub>1</sub></label></th>
        <th><input type="checkbox" onclick="updateState(this, 'lockB2');"><label>B<sub>2</sub></label></th>
        <th><input type="checkbox" onclick="updateState(this, 'lockB3');"><label>B<sub>3</sub></label></th>
        <th><input type="checkbox" onclick="updateState(this, 'lockR');"><label>R</label></th>
        <th>S</th>
        <th>Locked</th>
    </tr>
    <tr>
        <td><code>0</code></td>
        <td><code>0</code></td>
        <td><code>0</code></td>
        <td><code>0</code></td>
        <td><code>0</code></td>
        <td><code>A</code></td>
        <td><code>1</code></td>
    </tr>
</table>
</div>

<script type="text/paperscript" canvas="lock">
{% include_relative _ground_up/lock.js %}
</script>
<canvas id="lock" resize></canvas>
</div>

## Conclusion
Using boolean logic and a bit of memory, we were able to create a simple
finite state machine. We utilized a multiplexer to switch between the input
combinations based on the current state in order to determine the next state.
FSMs deterministically model solutions to problems in a manageable way,
and are a very useful concept in both hardware and software domains.

As always if any parts were unclear, please feel free to contact me.
