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
</script>
<script type="text/paperscript" canvas="nchannel">
    var path = new CompoundPath();
    path.strokeColor = 'black';
    path.strokeWidth = 2;
    var anchor = new Point(70, 10);

    path.moveTo(anchor);
    path.lineBy([ 0, 24 ]);
    path.lineBy([ -30, 0 ]);
    path.lineBy([ 0, 48 ]);
    path.lineBy([ 30, 0 ]);
    path.lineBy([ 0, 24 ]);

    path.moveTo(anchor + [-35, 24]);
    path.lineBy([0, 48]);

    var gateLength = 24;
    path.moveTo(anchor + [-35 - gateLength, 48]);
    path.lineBy([gateLength, 0]);

    var drain = new PointText({
        point: anchor + [15, 10],
        justification: 'center',
        fontSize: 20,
        content: 'D'
    });
    var source = new PointText({
        point: anchor + [15, 95],
        justification: 'center',
        fontSize: 20,
        content: 'S'
    });

    var symbol = new Symbol(new Path.Circle({
        center: [0, 0],
        radius: 2,
        fillColor: 'red'
    }));
    var dots = new Array();
    for (var i = 0; i < 10; i++) {
        dots.push(symbol.place(anchor));
    }

    function onFrame(event) {
        var runOffset = window.globals.nChannel ? (event.count * 2) : 0;
        var p = path.children[0];
        for (var i = 0; i < dots.length; i++) {
            var dotOffset = 100 * i / dots.length;
            var offset = (runOffset + dotOffset) % 101;
            dots[i].position = p.getPointAt(p.length * offset / 100);
        }
    }
</script>

<p class="gate"><input type="checkbox" onclick="updateState(this, 'nChannel');"><label>G</label></p>
<canvas id="nchannel" resize></canvas>

It is from this simple building block we can begin to form more complex
logic. There are two common variants of transistors: P-Channel and
N-Channel. The above is an N-Channel transistor, which means the current flows
when voltage is applied to the Gate (G). A P-Channel transistor means the
current flows when there is *no* voltage applied to the Gate.

<script type="text/paperscript" canvas="pchannel">
    var path = new CompoundPath();
    path.strokeColor = 'black';
    path.strokeWidth = 2;
    var anchor = new Point(70, 10);

    path.moveTo(anchor);
    path.lineBy([ 0, 24 ]);
    path.lineBy([ -30, 0 ]);
    path.lineBy([ 0, 48 ]);
    path.lineBy([ 30, 0 ]);
    path.lineBy([ 0, 24 ]);

    path.moveTo(anchor + [-35, 24]);
    path.lineBy([0, 48]);

    var gateLength = 18;
    path.moveTo(anchor + [-41 - gateLength, 48]);
    path.lineBy([gateLength, 0]);

    var dot = new Path.Circle(anchor + [ -38, 48 ], 3);
    dot.strokeColor = 'black';
    dot.strokeWidth = 2;

    var drain = new PointText({
        point: anchor + [15, 10],
        justification: 'center',
        fontSize: 20,
        content: 'S'
    });
    var source = new PointText({
        point: anchor + [15, 95],
        justification: 'center',
        fontSize: 20,
        content: 'D'
    });

    var symbol = new Symbol(new Path.Circle({
        center: [0, 0],
        radius: 2,
        fillColor: 'red'
    }));
    var dots = new Array();
    for (var i = 0; i < 10; i++) {
        dots.push(symbol.place(anchor));
    }

    function onFrame(event) {
        var runOffset = window.globals.pChannel ? 0 : (event.count * 2);
        var p = path.children[0];
        for (var i = 0; i < dots.length; i++) {
            var dotOffset = 100 * i / dots.length;
            var offset = (runOffset + dotOffset) % 101;
            dots[i].position = p.getPointAt(p.length * offset / 100);
        }
    }
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

<script type="text/paperscript" canvas="not">
    var scale = 32;
    function gatePath(anchor) {
        var path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo((anchor + [0, 0.25])*scale);
        path.lineBy(new Point(0, 0.5)*scale);
        return path;
    }
    function pChannelPath(anchor, direction) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo(anchor*scale);
        if (direction == 'LR') {
            path.lineBy(new Point(0.8, 0)*scale);
            path.moveBy(new Point(0.2, -0.5)*scale);
            path.lineBy(new Point(0, 1)*scale);
            var dot = new Path.Circle((anchor + [0.9, 0])*scale, 0.1*scale);
            path.addChild(dot);
            return path;
        }
        path.lineBy(new Point(-0.8, 0)*scale);
        path.moveBy(new Point(-0.2, -0.5)*scale);
        path.lineBy(new Point(0, 1)*scale);
        var dot = new Path.Circle((anchor + [-0.9, 0])*scale, 0.1*scale);
        path.addChild(dot);
        return path;
    }
    function nChannelPath(anchor, direction) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo(anchor*scale);
        if (direction == 'LR') {
            path.lineBy(new Point(1, 0)*scale);
        } else {
            path.lineBy(new Point(-1, 0)*scale);
        }
        path.moveBy(new Point(0, -0.5)*scale);
        path.lineBy(new Point(0, 1)*scale);
        return path;
    }
    function notPPath(anchor) {
        return gatePath(anchor + [2.2, 2]);
    }
    function notNPath(anchor) {
        return gatePath(anchor + [2.2, 5]);
    }
    function notOutPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [2.2, 2.75])*scale);
        path.lineTo((anchor + [2.2, 3])*scale);
        path.lineTo((anchor + [3, 3])*scale);
        path.lineBy(new Point(0, 2)*scale);
        path.lineTo((anchor + [2.2, 5])*scale);
        path.lineTo((anchor + [2.2, 5.25])*scale);

        path.moveTo((anchor + [3, 4])*scale);
        path.lineBy(new Point(1, 0)*scale);

        return path;
    }
    function inputAPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.addChild(pChannelPath(anchor + [1, 2.5], 'LR'));
        path.addChild(nChannelPath(anchor + [1, 5.5], 'LR'));

        path.moveTo((anchor + [1, 2.5])*scale);
        path.lineBy(new Point(0, 3)*scale);
        path.moveTo((anchor + [0, 4])*scale);
        path.lineBy(new Point(1, 0)*scale);

        return path;
    }

    function drawVdd(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'red';
        path.strokeWidth = 2;

        var triangle = new Path.RegularPolygon((anchor + [3, 1])*scale, 3, scale/2.5);
        path.addChild(triangle);

        path.moveTo((anchor + [3, 1 + 1/5])*scale);
        path.lineTo((anchor + [3, 2])*scale);
        path.lineTo((anchor + [2.2, 2])*scale);
        path.lineTo((anchor + [2.2, 2.25])*scale);
    }
    function drawGnd(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [2.2, 5.75])*scale);
        path.lineTo((anchor + [2.2, 6])*scale);
        path.lineTo((anchor + [3, 6])*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.moveBy(new Point(-0.4, 0)*scale);
        path.lineBy(new Point(0.8, 0)*scale);
        path.moveBy(new Point(-0.1, 0.15)*scale);
        path.lineBy(new Point(-0.6, 0)*scale);
        path.moveBy(new Point(0.1, 0.15)*scale);
        path.lineBy(new Point(0.4, 0)*scale);
    }
    function drawLabels(anchor) {
        new PointText({
            point: (anchor + [-0.5, 4.25])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'A'
        });
        new PointText({
            point: (anchor + [5, 4.25])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'Out'
        });
        new PointText({
            point: (anchor + [4.1, 1.1])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'Vdd'
        });
        new PointText({
            point: (anchor + [4.2, 7.4])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'Gnd'
        });
    }

    var anchor  = new Point(1, -0.25);
    var notP    = notPPath(anchor);
    var notN    = notNPath(anchor);
    var notOut  = notOutPath(anchor);
    var inputA  = inputAPath(anchor);
    drawVdd(anchor);
    drawGnd(anchor);
    drawLabels(anchor);

    window.globals.updateNot = function() {
        var a = window.globals.notA;
        notP.strokeColor = !a ? 'red' : 'white';
        notN.strokeColor = a ? 'black' : 'white';
        notOut.strokeColor = !a ? 'red' : 'black';
        inputA.strokeColor = a ? 'red' : 'black';
    }
</script>
<div class="table-div"><table class="gate" id="notTable">
    <tr>
        <th><input type="checkbox" onclick="updateState(this, 'notA');"><label>A</label></th>
        <th>Out</th>
    </tr>
    <tr><td><code>0</code></td><td><code>1</code></td></tr>
    <tr><td><code>1</code></td><td><code>0</code></td></tr>
</table></div>
<canvas id="not" resize></canvas>

### AND Gate

<script type="text/paperscript" canvas="and">
    var scale = 32;
    function gatePath(anchor) {
        var path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo((anchor + [0, 0.25])*scale);
        path.lineBy(new Point(0, 0.5)*scale);
        return path;
    }
    function pChannelPath(anchor, direction) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo(anchor*scale);
        if (direction == 'LR') {
            path.lineBy(new Point(0.8, 0)*scale);
            path.moveBy(new Point(0.2, -0.5)*scale);
            path.lineBy(new Point(0, 1)*scale);
            var dot = new Path.Circle((anchor + [0.9, 0])*scale, 0.1*scale);
            path.addChild(dot);
            return path;
        }
        path.lineBy(new Point(-0.8, 0)*scale);
        path.moveBy(new Point(-0.2, -0.5)*scale);
        path.lineBy(new Point(0, 1)*scale);
        var dot = new Path.Circle((anchor + [-0.9, 0])*scale, 0.1*scale);
        path.addChild(dot);
        return path;
    }
    function nChannelPath(anchor, direction) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo(anchor*scale);
        if (direction == 'LR') {
            path.lineBy(new Point(1, 0)*scale);
        } else {
            path.lineBy(new Point(-1, 0)*scale);
        }
        path.moveBy(new Point(0, -0.5)*scale);
        path.lineBy(new Point(0, 1)*scale);
        return path;
    }
    function nandAPPath(anchor) {
        return gatePath(anchor + [1.2, 3]);
    }
    function nandBPPath(anchor) {
        return gatePath(anchor + [4.8, 3]);
    }
    function nandANPath(anchor) {
        return gatePath(anchor + [2.2, 7]);
    }
    function nandBNPath(anchor) {
        return gatePath(anchor + [2.2, 9]);
    }
    function nandOutPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [1.2, 3.75])*scale);
        path.lineTo((anchor + [1.2, 4])*scale);
        path.lineTo((anchor + [2, 4])*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.lineBy(new Point(2, 0)*scale);
        path.lineBy(new Point(0, -1)*scale);
        path.lineTo((anchor + [4.8, 4])*scale);
        path.lineTo((anchor + [4.8, 3.75])*scale);

        path.moveTo((anchor + [2.2, 7.25])*scale);
        path.lineTo((anchor + [2.2, 7])*scale);
        path.lineTo((anchor + [3, 7])*scale);
        path.lineBy(new Point(0, -2)*scale);

        path.moveTo((anchor + [3, 6])*scale);
        path.lineBy(new Point(4, 0)*scale);

        path.moveTo((anchor + [8, 4])*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.moveTo((anchor + [8, 7])*scale);
        path.lineBy(new Point(0, 1)*scale);

        path.moveTo((anchor + [7.8, 4.5])*scale);
        path.lineBy(new Point(-0.8, 0)*scale);
        path.lineBy(new Point(0, 3)*scale);
        path.lineBy(new Point(1, 0)*scale);

        var dot = new Path.Circle((anchor + [7.9, 4.5])*scale, 0.1*scale);
        path.addChild(dot);

        return path;
    }
    function nandGndPath(anchor) {
        var path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [2.2, 7.75])*scale);
        path.lineTo((anchor + [2.2, 8])*scale);
        path.lineTo((anchor + [3, 8])*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.lineTo((anchor + [2.2, 9])*scale);
        path.lineTo((anchor + [2.2, 9.25])*scale);

        return path;
    }
    function notPPath(anchor) {
        return gatePath(anchor + [8.2, 4]);
    }
    function notNPath(anchor) {
        return gatePath(anchor + [8.2, 7]);
    }
    function notOutPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [8.2, 4.75])*scale);
        path.lineTo((anchor + [8.2, 5])*scale);
        path.lineTo((anchor + [9, 5])*scale);
        path.lineBy(new Point(0, 2)*scale);
        path.lineTo((anchor + [8.2, 7])*scale);
        path.lineTo((anchor + [8.2, 7.25])*scale);

        path.moveTo((anchor + [9, 6])*scale);
        path.lineBy(new Point(1, 0)*scale);

        return path;
    }
    function inputAPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.addChild(pChannelPath(anchor + [0, 3.5], 'LR'));
        path.addChild(nChannelPath(anchor + [1, 7.5], 'LR'));
        return path;
    }
    function inputBPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.addChild(pChannelPath(anchor + [6, 3.5], 'RL'));
        path.addChild(nChannelPath(anchor + [1, 9.5], 'LR'));
        return path;
    }

    function drawVdd(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'red';
        path.strokeWidth = 2;

        // NAND Vdd
        var triangle1 = new Path.RegularPolygon((anchor + [3, 1])*scale, 3, scale/2.5);
        path.addChild(triangle1);

        path.moveTo((anchor + [3, 1 + 1/5])*scale);
        path.lineBy(new Point(0, 1 - 1/5)*scale);

        path.moveTo((anchor + [1.2, 3.25])*scale);
        path.lineTo((anchor + [1.2, 3])*scale);
        path.lineTo((anchor + [2, 3])*scale);
        path.lineBy(new Point(0, -1)*scale);
        path.lineBy(new Point(2, 0)*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.lineTo((anchor + [4.8, 3])*scale);
        path.lineTo((anchor + [4.8, 3.25])*scale);

        // NOT Vdd
        var triangle2 = new Path.RegularPolygon((anchor + [9, 3])*scale, 3, scale/2.5);
        path.addChild(triangle2);

        path.moveTo((anchor + [9, 3 + 1/5])*scale);
        path.lineTo((anchor + [9, 4])*scale);
        path.lineTo((anchor + [8.2, 4])*scale);
        path.lineTo((anchor + [8.2, 4.25])*scale);
    }
    function drawGnd(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        // NAND Gnd
        path.moveTo((anchor + [2.2, 9.75])*scale);
        path.lineTo((anchor + [2.2, 10])*scale);
        path.lineTo((anchor + [3, 10])*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.moveBy(new Point(-0.4, 0)*scale);
        path.lineBy(new Point(0.8, 0)*scale);
        path.moveBy(new Point(-0.1, 0.15)*scale);
        path.lineBy(new Point(-0.6, 0)*scale);
        path.moveBy(new Point(0.1, 0.15)*scale);
        path.lineBy(new Point(0.4, 0)*scale);

        // NOT Gnd
        path.moveTo((anchor + [8.2, 7.75])*scale);
        path.lineTo((anchor + [8.2, 8])*scale);
        path.lineTo((anchor + [9, 8])*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.moveBy(new Point(-0.4, 0)*scale);
        path.lineBy(new Point(0.8, 0)*scale);
        path.moveBy(new Point(-0.1, 0.15)*scale);
        path.lineBy(new Point(-0.6, 0)*scale);
        path.moveBy(new Point(0.1, 0.15)*scale);
        path.lineBy(new Point(0.4, 0)*scale);
    }
    function drawLabels(anchor) {
        new PointText({
            point: (anchor + [-0.5, 3.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'A'
        });
        new PointText({
            point: (anchor + [6.5, 3.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'B'
        });
        new PointText({
            point: (anchor + [0.5, 7.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'A'
        });
        new PointText({
            point: (anchor + [0.5, 9.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'B'
        });
        new PointText({
            point: (anchor + [11, 6.25])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'Out'
        });
    }

    var anchor  = new Point(1, 0);
    var nandAP  = nandAPPath(anchor);
    var nandBP  = nandBPPath(anchor);
    var nandAN  = nandANPath(anchor);
    var nandBN  = nandBNPath(anchor);
    var nandOut = nandOutPath(anchor);
    var nandGnd = nandGndPath(anchor);
    var notP    = notPPath(anchor);
    var notN    = notNPath(anchor);
    var notOut  = notOutPath(anchor);
    var inputA  = inputAPath(anchor);
    var inputB  = inputBPath(anchor);
    drawVdd(anchor);
    drawGnd(anchor);
    drawLabels(anchor);

    window.globals.updateAnd = function() {
        var a = window.globals.andA;
        var b = window.globals.andB;
        nandAP.strokeColor = a ? 'white' : 'red';
        nandBP.strokeColor = b ? 'white' : 'red';
        nandAN.strokeColor = a ? (b ? 'black' : 'red') : 'white';
        nandBN.strokeColor = b ? 'black' : 'white';
        nandOut.strokeColor = !(a && b) ? 'red' : 'black';
        nandGnd.strokeColor = b ? 'black' : (a ? 'red' : 'cyan');
        notP.strokeColor = (a && b) ? 'red' : 'white';
        notN.strokeColor = !(a && b) ? 'black' : 'white';
        notOut.strokeColor = a && b ? 'red' : 'black';
        inputA.strokeColor = a ? 'red' : 'black';
        inputB.strokeColor = b ? 'red' : 'black';
    }
</script>

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
<canvas id="and" resize></canvas>

### OR Gate

<script type="text/paperscript" canvas="or">
    var scale = 32;
    function gatePath(anchor) {
        var path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo((anchor + [0, 0.25])*scale);
        path.lineBy(new Point(0, 0.5)*scale);
        return path;
    }
    function pChannelPath(anchor, direction) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo(anchor*scale);
        if (direction == 'LR') {
            path.lineBy(new Point(0.8, 0)*scale);
            path.moveBy(new Point(0.2, -0.5)*scale);
            path.lineBy(new Point(0, 1)*scale);
            var dot = new Path.Circle((anchor + [0.9, 0])*scale, 0.1*scale);
            path.addChild(dot);
            return path;
        }
        path.lineBy(new Point(-0.8, 0)*scale);
        path.moveBy(new Point(-0.2, -0.5)*scale);
        path.lineBy(new Point(0, 1)*scale);
        var dot = new Path.Circle((anchor + [-0.9, 0])*scale, 0.1*scale);
        path.addChild(dot);
        return path;
    }
    function nChannelPath(anchor, direction) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo(anchor*scale);
        if (direction == 'LR') {
            path.lineBy(new Point(1, 0)*scale);
        } else {
            path.lineBy(new Point(-1, 0)*scale);
        }
        path.moveBy(new Point(0, -0.5)*scale);
        path.lineBy(new Point(0, 1)*scale);
        return path;
    }
    function norAPPath(anchor) {
        return gatePath(anchor + [2.2, 2]);
    }
    function norBPPath(anchor) {
        return gatePath(anchor + [2.2, 4]);
    }
    function norANPath(anchor) {
        return gatePath(anchor + [1.2, 8]);
    }
    function norBNPath(anchor) {
        return gatePath(anchor + [4.8, 8]);
    }
    function norOutPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [2.2, 4.75])*scale);
        path.lineTo((anchor + [2.2, 5])*scale);
        path.lineTo((anchor + [3, 5])*scale);
        path.lineBy(new Point(0, 2)*scale);

        path.moveTo((anchor + [1.2, 8.25])*scale);
        path.lineTo((anchor + [1.2, 8])*scale);
        path.lineTo((anchor + [2, 8])*scale);
        path.lineBy(new Point(0, -1)*scale);
        path.lineBy(new Point(2, 0)*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.lineTo((anchor + [4.8, 8])*scale);
        path.lineTo((anchor + [4.8, 8.25])*scale);

        path.moveTo((anchor + [3, 6])*scale);
        path.lineBy(new Point(4, 0)*scale);

        path.moveTo((anchor + [8, 4])*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.moveTo((anchor + [8, 7])*scale);
        path.lineBy(new Point(0, 1)*scale);

        path.moveTo((anchor + [7.8, 4.5])*scale);
        path.lineBy(new Point(-0.8, 0)*scale);
        path.lineBy(new Point(0, 3)*scale);
        path.lineBy(new Point(1, 0)*scale);

        var dot = new Path.Circle((anchor + [7.9, 4.5])*scale, 0.1*scale);
        path.addChild(dot);

        return path;
    }
    function norVddPath(anchor) {
        var path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [2.2, 2.75])*scale);
        path.lineTo((anchor + [2.2, 3])*scale);
        path.lineTo((anchor + [3, 3])*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.lineTo((anchor + [2.2, 4])*scale);
        path.lineTo((anchor + [2.2, 4.25])*scale);

        return path;
    }
    function notPPath(anchor) {
        return gatePath(anchor + [8.2, 4]);
    }
    function notNPath(anchor) {
        return gatePath(anchor + [8.2, 7]);
    }
    function notOutPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [8.2, 4.75])*scale);
        path.lineTo((anchor + [8.2, 5])*scale);
        path.lineTo((anchor + [9, 5])*scale);
        path.lineBy(new Point(0, 2)*scale);
        path.lineTo((anchor + [8.2, 7])*scale);
        path.lineTo((anchor + [8.2, 7.25])*scale);

        path.moveTo((anchor + [9, 6])*scale);
        path.lineBy(new Point(1, 0)*scale);

        return path;
    }
    function inputAPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.addChild(pChannelPath(anchor + [1, 2.5], 'LR'));
        path.addChild(nChannelPath(anchor + [0, 8.5], 'LR'));
        return path;
    }
    function inputBPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.addChild(pChannelPath(anchor + [1, 4.5], 'LR'));
        path.addChild(nChannelPath(anchor + [6, 8.5], 'RL'));
        return path;
    }

    function drawVdd(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'red';
        path.strokeWidth = 2;

        // NOR Vdd
        var triangle1 = new Path.RegularPolygon((anchor + [3, 1])*scale, 3, scale/2.5);
        path.addChild(triangle1);

        path.moveTo((anchor + [3, 1 + 1/5])*scale);
        path.lineBy(new Point(0, 1 - 1/5)*scale);

        path.moveTo((anchor + [2.2, 2.25])*scale);
        path.lineTo((anchor + [2.2, 2])*scale);
        path.lineTo((anchor + [3, 2])*scale);

        // NOT Vdd
        var triangle2 = new Path.RegularPolygon((anchor + [9, 3])*scale, 3, scale/2.5);
        path.addChild(triangle2);

        path.moveTo((anchor + [9, 3 + 1/5])*scale);
        path.lineTo((anchor + [9, 4])*scale);
        path.lineTo((anchor + [8.2, 4])*scale);
        path.lineTo((anchor + [8.2, 4.25])*scale);
    }
    function drawGnd(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        // NOR Gnd
        path.moveTo((anchor + [1.2, 8.75])*scale);
        path.lineTo((anchor + [1.2, 9])*scale);
        path.lineTo((anchor + [2, 9])*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.lineBy(new Point(2, 0)*scale);
        path.lineBy(new Point(0, -1)*scale);
        path.lineTo((anchor + [4.8, 9])*scale);
        path.lineTo((anchor + [4.8, 8.75])*scale);

        path.moveTo((anchor + [3, 10])*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.moveBy(new Point(-0.4, 0)*scale);
        path.lineBy(new Point(0.8, 0)*scale);
        path.moveBy(new Point(-0.1, 0.15)*scale);
        path.lineBy(new Point(-0.6, 0)*scale);
        path.moveBy(new Point(0.1, 0.15)*scale);
        path.lineBy(new Point(0.4, 0)*scale);

        // NOT Gnd
        path.moveTo((anchor + [8.2, 7.75])*scale);
        path.lineTo((anchor + [8.2, 8])*scale);
        path.lineTo((anchor + [9, 8])*scale);
        path.lineBy(new Point(0, 1)*scale);
        path.moveBy(new Point(-0.4, 0)*scale);
        path.lineBy(new Point(0.8, 0)*scale);
        path.moveBy(new Point(-0.1, 0.15)*scale);
        path.lineBy(new Point(-0.6, 0)*scale);
        path.moveBy(new Point(0.1, 0.15)*scale);
        path.lineBy(new Point(0.4, 0)*scale);
    }
    function drawLabels(anchor) {
        new PointText({
            point: (anchor + [0.5, 2.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'A'
        });
        new PointText({
            point: (anchor + [0.5, 4.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'B'
        });
        new PointText({
            point: (anchor + [-0.5, 8.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'A'
        });
        new PointText({
            point: (anchor + [6.5, 8.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'B'
        });
        new PointText({
            point: (anchor + [11, 6.25])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'Out'
        });
    }

    var anchor  = new Point(1, 0);
    var norAP   = norAPPath(anchor);
    var norBP   = norBPPath(anchor);
    var norAN   = norANPath(anchor);
    var norBN   = norBNPath(anchor);
    var norOut  = norOutPath(anchor);
    var norVdd  = norVddPath(anchor);
    var notP    = notPPath(anchor);
    var notN    = notNPath(anchor);
    var notOut  = notOutPath(anchor);
    var inputA  = inputAPath(anchor);
    var inputB  = inputBPath(anchor);
    drawVdd(anchor);
    drawGnd(anchor);
    drawLabels(anchor);

    window.globals.updateOr = function() {
        var a = window.globals.orA;
        var b = window.globals.orB;
        norAP.strokeColor = a ? 'white' : 'red';
        norBP.strokeColor = b ? 'white' : (a ? 'black' : 'red' );
        norAN.strokeColor = a ? 'black' : 'white';
        norBN.strokeColor = b ? 'black' : 'white';
        norOut.strokeColor = !(a || b) ? 'red' : 'black';
        norVdd.strokeColor = a ? (b ? 'cyan' : 'black') : 'red';
        notP.strokeColor = (a || b) ? 'red' : 'white';
        notN.strokeColor = !(a || b) ? 'black' : 'white';
        notOut.strokeColor = (a || b) ? 'red' : 'black';
        inputA.strokeColor = a ? 'red' : 'black';
        inputB.strokeColor = b ? 'red' : 'black';
    }
</script>

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
<canvas id="or" resize></canvas>

### XOR Gate

<script type="text/paperscript" canvas="xor">
    var scale = 32;
    function gatePath(anchor) {
        var path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo((anchor + [0, 0.25])*scale);
        path.lineBy(new Point(0, 0.5)*scale);
        return path;
    }
    function pChannelPath(anchor, direction) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo(anchor*scale);
        if (direction == 'LR') {
            path.lineBy(new Point(0.8, 0)*scale);
            path.moveBy(new Point(0.2, -0.5)*scale);
            path.lineBy(new Point(0, 1)*scale);
            var dot = new Path.Circle((anchor + [0.9, 0])*scale, 0.1*scale);
            path.addChild(dot);
            return path;
        }
        path.lineBy(new Point(-0.8, 0)*scale);
        path.moveBy(new Point(-0.2, -0.5)*scale);
        path.lineBy(new Point(0, 1)*scale);
        var dot = new Path.Circle((anchor + [-0.9, 0])*scale, 0.1*scale);
        path.addChild(dot);
        return path;
    }
    function nChannelPath(anchor, direction) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.moveTo(anchor*scale);
        if (direction == 'LR') {
            path.lineBy(new Point(1, 0)*scale);
        } else {
            path.lineBy(new Point(-1, 0)*scale);
        }
        path.moveBy(new Point(0, -0.5)*scale);
        path.lineBy(new Point(0, 1)*scale);
        return path;
    }
    function aPPath(anchor) {
        return gatePath(anchor + [2.2, 3]);
    }
    function naPPath(anchor) {
        return gatePath(anchor + [5.8, 3]);
    }
    function bPPath(anchor) {
        return gatePath(anchor + [5.8, 5]);
    }
    function nbPPath(anchor) {
        return gatePath(anchor + [2.2, 5]);
    }
    function aNPath(anchor) {
        return gatePath(anchor + [2.2, 8]);
    }
    function naNPath(anchor) {
        return gatePath(anchor + [5.8, 8]);
    }
    function bNPath(anchor) {
        return gatePath(anchor + [2.2, 10]);
    }
    function nbNPath(anchor) {
        return gatePath(anchor + [5.8, 10]);
    }

    function anbPath(anchor) {
        var path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [2.2, 3.75])*scale);
        path.lineTo((anchor + [2.2, 4])*scale);
        path.lineTo((anchor + [3, 4])*scale);
        path.lineTo((anchor + [3, 5])*scale);
        path.lineTo((anchor + [2.2, 5])*scale);
        path.lineTo((anchor + [2.2, 5.25])*scale);
        return path;
    }
    function nabPath(anchor) {
        var path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [5.8, 3.75])*scale);
        path.lineTo((anchor + [5.8, 4])*scale);
        path.lineTo((anchor + [5, 4])*scale);
        path.lineTo((anchor + [5, 5])*scale);
        path.lineTo((anchor + [5.8, 5])*scale);
        path.lineTo((anchor + [5.8, 5.25])*scale);
        return path;
    }
    function abPath(anchor) {
        var path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [2.2, 8.75])*scale);
        path.lineTo((anchor + [2.2, 9])*scale);
        path.lineTo((anchor + [3, 9])*scale);
        path.lineTo((anchor + [3, 10])*scale);
        path.lineTo((anchor + [2.2, 10])*scale);
        path.lineTo((anchor + [2.2, 10.25])*scale);
        return path;
    }
    function nanbPath(anchor) {
        var path = new Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [5.8, 8.75])*scale);
        path.lineTo((anchor + [5.8, 9])*scale);
        path.lineTo((anchor + [5, 9])*scale);
        path.lineTo((anchor + [5, 10])*scale);
        path.lineTo((anchor + [5.8, 10])*scale);
        path.lineTo((anchor + [5.8, 10.25])*scale);
        return path;
    }

    function outPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [2.2, 5.75])*scale);
        path.lineTo((anchor + [2.2, 6])*scale);
        path.lineTo((anchor + [3, 6])*scale);
        path.lineTo((anchor + [3, 8])*scale);
        path.lineTo((anchor + [2.2, 8])*scale);
        path.lineTo((anchor + [2.2, 8.25])*scale);

        path.moveTo((anchor + [5.8, 5.75])*scale);
        path.lineTo((anchor + [5.8, 6])*scale);
        path.lineTo((anchor + [5, 6])*scale);
        path.lineTo((anchor + [5, 8])*scale);
        path.lineTo((anchor + [5.8, 8])*scale);
        path.lineTo((anchor + [5.8, 8.25])*scale);

        path.moveTo((anchor + [3, 7])*scale);
        path.lineBy(new Point(4, 0)*scale);
        return path;
    }
    function inputAPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.addChild(pChannelPath(anchor + [1, 3.5], 'LR'));
        path.addChild(nChannelPath(anchor + [1, 8.5], 'LR'));
        return path;
    }
    function inputNAPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.addChild(pChannelPath(anchor + [7, 3.5], 'RL'));
        path.addChild(nChannelPath(anchor + [7, 8.5], 'RL'));
        return path;
    }
    function inputBPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.addChild(pChannelPath(anchor + [7, 5.5], 'RL'));
        path.addChild(nChannelPath(anchor + [1, 10.5], 'LR'));
        return path;
    }
    function inputNBPath(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.addChild(pChannelPath(anchor + [1, 5.5], 'LR'));
        path.addChild(nChannelPath(anchor + [7, 10.5], 'RL'));
        return path;
    }

    function drawVdd(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'red';
        path.strokeWidth = 2;

        var triangle = new Path.RegularPolygon((anchor + [4, 1])*scale, 3, scale/2.5);
        path.addChild(triangle);

        path.moveTo((anchor + [4, 1 + 1/5])*scale);
        path.lineBy(new Point(0, 1 - 1/5)*scale);

        path.moveTo((anchor + [2.2, 3.25])*scale);
        path.lineTo((anchor + [2.2, 3])*scale);
        path.lineTo((anchor + [3, 3])*scale);
        path.lineTo((anchor + [3, 2])*scale);
        path.lineTo((anchor + [5, 2])*scale);
        path.lineTo((anchor + [5, 3])*scale);
        path.lineTo((anchor + [5.8, 3])*scale);
        path.lineTo((anchor + [5.8, 3.25])*scale);
    }
    function drawGnd(anchor) {
        var path = new CompoundPath();
        path.strokeColor = 'black';
        path.strokeWidth = 2;

        path.moveTo((anchor + [2.2, 10.75])*scale);
        path.lineTo((anchor + [2.2, 11])*scale);
        path.lineTo((anchor + [3, 11])*scale);
        path.lineTo((anchor + [3, 12])*scale);
        path.lineTo((anchor + [5, 12])*scale);
        path.lineTo((anchor + [5, 11])*scale);
        path.lineTo((anchor + [5.8, 11])*scale);
        path.lineTo((anchor + [5.8, 10.75])*scale);

        path.moveTo((anchor + [4, 12])*scale);
        path.lineBy(new Point(0, 1 - 1/5)*scale);
        path.moveBy(new Point(-0.4, 0)*scale);
        path.lineBy(new Point(0.8, 0)*scale);
        path.moveBy(new Point(-0.1, 0.15)*scale);
        path.lineBy(new Point(-0.6, 0)*scale);
        path.moveBy(new Point(0.1, 0.15)*scale);
        path.lineBy(new Point(0.4, 0)*scale);
    }
    function drawLabels(anchor) {
        new PointText({
            point: (anchor + [0.5, 3.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'A'
        });
        new PointText({
            point: (anchor + [0.5, 8.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'A'
        });
        new PointText({
            point: (anchor + [7.5, 3.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'A'
        });
        new PointText({
            point: (anchor + [7.5, 8.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'A'
        });
        new PointText({
            point: (anchor + [0.5, 10.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'B'
        });
        new PointText({
            point: (anchor + [7.5, 5.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'B'
        });

        // negated labels
        new PointText({
            point: (anchor + [7.5, 3.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'A'
        });
        new PointText({
            point: (anchor + [7.5, 8.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'A'
        });
        new PointText({
            point: (anchor + [0.5, 5.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'B'
        });
        new PointText({
            point: (anchor + [7.5, 10.75])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'B'
        });
        new PointText({
            point: (anchor + [8, 7.25])*scale,
            justification: 'center',
            fontSize: 20,
            content: 'Out'
        });
        var bars = new CompoundPath();
        bars.strokeColor = 'black';
        bars.strokeWidth = 2;
        bars.moveTo((anchor + [7.3, 3.2])*scale);
        bars.lineBy(new Point(0.4, 0)*scale);
        bars.moveTo((anchor + [7.3, 8.2])*scale);
        bars.lineBy(new Point(0.4, 0)*scale);
        bars.moveTo((anchor + [0.3, 5.2])*scale);
        bars.lineBy(new Point(0.4, 0)*scale);
        bars.moveTo((anchor + [7.3, 10.2])*scale);
        bars.lineBy(new Point(0.4, 0)*scale);
    }

    var anchor  = new Point(0, 0);
    var aP = aPPath(anchor);
    var naP = naPPath(anchor);
    var bP = bPPath(anchor);
    var nbP = nbPPath(anchor);
    var aN = aNPath(anchor);
    var naN = naNPath(anchor);
    var bN = bNPath(anchor);
    var nbN = nbNPath(anchor);

    var anb = anbPath(anchor);
    var nab = nabPath(anchor);
    var ab = abPath(anchor);
    var nanb = nanbPath(anchor);
    var out = outPath(anchor);

    var inputA = inputAPath(anchor);
    var inputNA = inputNAPath(anchor);
    var inputB = inputBPath(anchor);
    var inputNB = inputNBPath(anchor);
    drawVdd(anchor);
    drawGnd(anchor);
    drawLabels(anchor);

    window.globals.updateXor = function() {
        var a = window.globals.xorA;
        var b = window.globals.xorB;

        out.strokeColor = a ^ b ? 'red' : 'black';

        aP.strokeColor = a ? 'white' : 'red';
        naP.strokeColor = !a ? 'white' : 'red';
        bP.strokeColor = b ? 'white' : out.strokeColor;
        nbP.strokeColor = !b ? 'white' : out.strokeColor;
        aN.strokeColor = a ? out.strokeColor : 'white';
        naN.strokeColor = !a ? out.strokeColor : 'white';
        bN.strokeColor = b ? 'black' : 'white';
        nbN.strokeColor = !b ? 'black' : 'white';

        anb.strokeColor = !a ? 'red' : (!b ? 'cyan' : 'black');
        nab.strokeColor = a ? 'red' : (b ? 'cyan' : 'black');
        ab.strokeColor = b ? 'black' : (!a ? 'cyan' : 'red');
        nanb.strokeColor = !b ? 'black' : (a ? 'cyan' : 'red');

        inputA.strokeColor = a ? 'red' : 'black';
        inputNA.strokeColor = !a ? 'red' : 'black';
        inputB.strokeColor = b ? 'red' : 'black';
        inputNB.strokeColor = !b ? 'red' : 'black';
    }
</script>

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
