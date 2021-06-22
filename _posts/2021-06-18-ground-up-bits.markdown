---
layout: post
title:  "Ground Up: Bits"
date:   2021-06-22 00:00:00 -0500
categories: tutorials
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js" integrity="sha512-ovjLI1ZcZe6bw+ImQ21r+sv8q/Vwob2kq7tFidK6E1LWfi0T4uobbmpfEU1//a9h9o5Kkt+MnMWf6rWlg0EiMw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

Welcome to a new series of posts cleverly titled ***Ground Up***,
where I explain computing concepts from the ground up! We'll explore
how computers work starting with transistors and going from there.
This post specifically covers transistors, digital logic, and binary.

## Transistors
At the end of the day, computers are complex circuits built mostly of
transistors. Transistors are electrical components that can be thought
of as gates that allow or deny current to flow. That's it.

<style type="text/css" media="all">
.gate {
    display: inline-block;
}
canvas {
    display: inline-block;
    vertical-align: middle;
    height: 120px;
}
</style>
<script type="text/javascript">
    window.globals = {
        pChannel: false,
        nChannel: false
    };
    function updatePChannel(checkbox) {
        window.globals.pChannel = checkbox.checked;
    }
    function updateNChannel(checkbox) {
        window.globals.nChannel = checkbox.checked;
    }
</script>
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
        var runOffset = window.globals.pChannel ? (event.count * 2) : 0;
        var p = path.children[0];
        for (var i = 0; i < dots.length; i++) {
            var dotOffset = 100 * i / dots.length;
            var offset = (runOffset + dotOffset) % 101;
            dots[i].position = p.getPointAt(p.length * offset / 100);
        }
    }
</script>

<p class="gate"><input type="checkbox" onclick="updatePChannel(this);"><label>G</label></p>
<canvas id="pchannel" resize></canvas>

It is from this simple building block we can begin to form more complex
logic. There are two common variants of transistors: P-Channel and
N-Channel. The above is a P-Channel transistor, which means the current flows
when voltage is applied to the Gate (G). An N-Channel transistor means the
current flows when there is *no* voltage applied to the Gate.

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
        var runOffset = window.globals.nChannel ? 0 : (event.count * 2);
        var p = path.children[0];
        for (var i = 0; i < dots.length; i++) {
            var dotOffset = 100 * i / dots.length;
            var offset = (runOffset + dotOffset) % 101;
            dots[i].position = p.getPointAt(p.length * offset / 100);
        }
    }
</script>

<p class="gate"><input type="checkbox" onclick="updateNChannel(this);"><label>G</label></p>
<canvas id="nchannel" resize></canvas>

The dot on the input gate indicates negation and is a common symbol in
digital logic.

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
      <td style="text-align: center">NOT</td>
      <td style="text-align: center"><code class="language-plaintext highlighter-rouge">~</code></td>
      <td>Negate its input</td>
      <td><table><thead><tr><th>A</th><th>Output</th></tr></thead><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td></tr></table></td>
    </tr>
    <tr>
      <td style="text-align: center">AND</td>
      <td style="text-align: center"><code class="language-plaintext highlighter-rouge">&amp;</code></td>
      <td>Outputs <code class="language-plaintext highlighter-rouge">1</code> if both inputs are <code class="language-plaintext highlighter-rouge">1</code></td>
      <td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></td>
    </tr>
    <tr>
      <td style="text-align: center">OR</td>
      <td style="text-align: center"><code class="language-plaintext highlighter-rouge">|</code></td>
      <td>Outputs <code class="language-plaintext highlighter-rouge">1</code> if either input is <code class="language-plaintext highlighter-rouge">1</code></td>
      <td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></table></td>
    </tr>
    <tr>
      <td style="text-align: center">XOR</td>
      <td style="text-align: center"><code class="language-plaintext highlighter-rouge">^</code></td>
      <td>Outputs <code class="language-plaintext highlighter-rouge">1</code> if its inputs are not equal</td>
      <td><table><thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></table></td>
    </tr>
  </tbody>
</table>

Great! Now you may be wondering why this is useful. Well, you can actually
build a lot of interesting things just from these components alone,
including memory, state machines, and eventually computers.

### Using Transistors
Let's now build the components that will perform these binary operations
using the only building block we have: transistors! I highly recommend
you try this exercise on your own before seeing how I've done it here.

// TODO: interactive animations

### More Bits
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
