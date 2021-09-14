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
        updateTables();
    }
    function updateTables() {
        updateSRLatchTable();
        updateGatedSRLatchTable();
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
.table-div {
    display: inline-block;
    vertical-align: middle;
}
#srLatchCircuit {
    width: 200px;
    height: 190px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 40px;
}
#gatedSRLatchCircuit {
    width: 400px;
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
    var scale = 32;
    function gatePath(anchor, kind) {
        var a = new Path();
        a.strokeColor = 'black';
        a.strokeWidth = 2;
        var b = new Path();
        b.strokeColor = 'black';
        b.strokeWidth = 2;
        var out = new Path();
        out.strokeColor = 'black';
        out.strokeWidth = 2;

        var raster = new Raster('/assets/ground-up/' + kind + '.svg');
        raster.position = (anchor + [1.4, 0])*scale;

        a.moveTo((anchor + [0, -0.3])*scale);
        a.lineBy(new Point(0.8, 0)*scale);
        b.moveTo((anchor + [0, 0.3])*scale);
        b.lineBy(new Point(0.8, 0)*scale);
        out.moveTo((anchor + [2, 0])*scale);
        if (kind == 'nor') {
            out.moveTo((anchor + [2.3, 0])*scale);
        }
        out.lineTo((anchor + [2.8, 0])*scale);

        return {a: a, b: b, out: out};
    }
    function norPath(anchor) {
        return gatePath(anchor, 'nor');
    }
    function drawLabel(anchor, content, fontSize) {
        if (!fontSize) {
            fontSize = 20;
        }
        new PointText({
            point: anchor*scale,
            justification: 'center',
            fontSize: fontSize,
            content: content
        });
    }
    function drawLabels(anchor) {
        drawLabel(anchor + [2, 2], 'R');
        drawLabel(anchor + [2, 6.5], 'S');
        drawLabel(anchor + [7, 2.2], 'Q');

        drawLabel(anchor + [4.4, 2.1], 'NOR', fontSize=10);
        drawLabel(anchor + [4.4, 6.1], 'NOR', fontSize=10);
    }

    // compound paths
    var nor1Out = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
    var nor2Out = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
    var sInput = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
    var rInput = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});

    var anchor = new Point(-1.5, -1);
    var lineOffset = new Point(0.25, 0)*scale;

    var nor1 = norPath(anchor + [3, 2]);
    var nor2 = norPath(anchor + [3, 6]);

    nor1Out.addChild(nor1.out);
    nor1Out.addChild(nor2.a);
    nor1Out.moveTo(nor1.out.position + lineOffset);
    nor1Out.lineBy(new Point(0, 1.3)*scale);
    nor1Out.lineBy(new Point(-2.8, 1.4)*scale);
    nor1Out.lineBy(new Point(0, 1)*scale);
    nor1Out.moveTo(nor1.out.position + lineOffset);
    nor1Out.lineBy(new Point(0.7, 0)*scale);

    nor2Out.addChild(nor2.out);
    nor2Out.addChild(nor1.b);
    nor2Out.moveTo(nor2.out.position + lineOffset);
    nor2Out.lineBy(new Point(0, -1.3)*scale);
    nor2Out.lineBy(new Point(-2.8, -1.4)*scale);
    nor2Out.lineBy(new Point(0, -1)*scale);

    rInput.addChild(nor1.a);
    rInput.moveTo(nor1.a.position - lineOffset);
    rInput.lineBy(new Point(-0.7, 0)*scale);

    sInput.addChild(nor2.b);
    sInput.moveTo(nor2.b.position - lineOffset);
    sInput.lineBy(new Point(-0.7, 0)*scale);

    drawLabels(anchor);

    var q = false;
    window.globals.updateSRLatch = function() {
        var s = window.globals.srLatchS;
        var r = window.globals.srLatchR;
        q = !(r || !(s || q))

        rInput.strokeColor = r ? 'red' : 'black';
        sInput.strokeColor = s ? 'red' : 'black';
        nor1Out.strokeColor = q ? 'red' : 'black';
        nor2Out.strokeColor = !(q || s) ? 'red' : 'black';
    }
</script>
<canvas id="srLatchCircuit" resize></canvas>

This circuit is a ***transparent*** latch, which means changes in the
input are immediately reflected in the output. One way to add more
control is to add a ***gate*** which will prevent any changes to the
circuit until it is enabled by a signal.

### Gated SR-Latch
This circuit simply uses **AND** gates to allow the *S* or *R*
signal through to the rest of the circuit. SR-Latches are useful for
synchronizing changes on a clocked signal.

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
    var scale = 32;
    function gatePath(anchor, kind) {
        var a = new Path();
        a.strokeColor = 'black';
        a.strokeWidth = 2;
        var b = new Path();
        b.strokeColor = 'black';
        b.strokeWidth = 2;
        var out = new Path();
        out.strokeColor = 'black';
        out.strokeWidth = 2;

        var raster = new Raster('/assets/ground-up/' + kind + '.svg');
        raster.position = (anchor + [1.4, 0])*scale;

        a.moveTo((anchor + [0, -0.3])*scale);
        a.lineBy(new Point(0.8, 0)*scale);
        b.moveTo((anchor + [0, 0.3])*scale);
        b.lineBy(new Point(0.8, 0)*scale);
        out.moveTo((anchor + [2, 0])*scale);
        if (kind == 'nor') {
            out.moveTo((anchor + [2.3, 0])*scale);
        }
        out.lineTo((anchor + [2.8, 0])*scale);

        return {a: a, b: b, out: out};
    }
    function norPath(anchor) {
        return gatePath(anchor, 'nor');
    }
    function andPath(anchor) {
        return gatePath(anchor, 'and');
    }
    function drawLabel(anchor, content, fontSize) {
        if (!fontSize) {
            fontSize = 20;
        }
        new PointText({
            point: anchor*scale,
            justification: 'center',
            fontSize: fontSize,
            content: content
        });
    }
    function drawLabels(anchor) {
        drawLabel(anchor + [-1, 1.7], 'R');
        drawLabel(anchor + [-1, 6.8], 'S');
        drawLabel(anchor + [-1.2, 4.25], 'G');
        drawLabel(anchor + [7, 2.2], 'Q');

        drawLabel(anchor + [4.4, 2.1], 'NOR', fontSize=10);
        drawLabel(anchor + [4.4, 6.1], 'NOR', fontSize=10);

        drawLabel(anchor + [1.4, 1.8], 'AND', fontSize=10);
        drawLabel(anchor + [1.4, 6.4], 'AND', fontSize=10);
    }

    // compound paths
    var nor1Out = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
    var nor2Out = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
    var sInput = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
    var rInput = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
    var gInput = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
    var gsInput = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
    var grInput = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});

    var anchor = new Point(2, -1);
    var lineOffset = new Point(0.25, 0)*scale;

    var nor1 = norPath(anchor + [3, 2]);
    var nor2 = norPath(anchor + [3, 6]);
    var and1 = andPath(anchor + [0, 1.7]);
    var and2 = andPath(anchor + [0, 6.3]);

    nor1Out.addChild(nor1.out);
    nor1Out.addChild(nor2.a);
    nor1Out.moveTo(nor1.out.position + lineOffset);
    nor1Out.lineBy(new Point(0, 1.3)*scale);
    nor1Out.lineBy(new Point(-2.8, 1.4)*scale);
    nor1Out.lineBy(new Point(0, 1)*scale);
    nor1Out.moveTo(nor1.out.position + lineOffset);
    nor1Out.lineBy(new Point(0.7, 0)*scale);

    nor2Out.addChild(nor2.out);
    nor2Out.addChild(nor1.b);
    nor2Out.moveTo(nor2.out.position + lineOffset);
    nor2Out.lineBy(new Point(0, -1.3)*scale);
    nor2Out.lineBy(new Point(-2.8, -1.4)*scale);
    nor2Out.lineBy(new Point(0, -1)*scale);

    rInput.addChild(and1.out);
    rInput.addChild(nor1.a);
    rInput.moveTo(nor1.a.position - lineOffset);
    rInput.lineBy(new Point(-0.7, 0)*scale);

    grInput.addChild(and1.a);
    grInput.moveTo(and1.a.position - lineOffset);
    grInput.lineBy(new Point(-0.7, 0)*scale);

    sInput.addChild(and2.out);
    sInput.addChild(nor2.b);
    sInput.moveTo(nor2.b.position - lineOffset);
    sInput.lineBy(new Point(-0.7, 0)*scale);

    gsInput.addChild(and2.b);
    gsInput.moveTo(and2.b.position - lineOffset);
    gsInput.lineBy(new Point(-0.7, 0)*scale);

    gInput.addChild(and1.b);
    gInput.addChild(and2.a);
    gInput.moveTo(and1.b.position - lineOffset*1.5);
    gInput.lineTo(and2.a.position - lineOffset*1.5);
    gInput.moveTo((and1.b.position + and2.a.position)/2 + new Point(-1.1, 0)*scale);
    gInput.lineBy(new Point(0.7, 0)*scale);

    drawLabels(anchor);

    var q = false;
    window.globals.updateGatedSRLatch = function() {
        var g = window.globals.gatedSRLatchG;
        var s = window.globals.gatedSRLatchS;
        var r = window.globals.gatedSRLatchR;
        q = !(r || !(s || q));

        grInput.strokeColor = r ? 'red' : 'black';
        gsInput.strokeColor = s ? 'red' : 'black';
        gInput.strokeColor = g ? 'red' : 'black';
        rInput.strokeColor = g && r ? 'red' : 'black';
        sInput.strokeColor = g && s ? 'red' : 'black';
        if (!g) { return; }
        nor1Out.strokeColor = q ? 'red' : 'black';
        nor2Out.strokeColor = !(q || s) ? 'red' : 'black';
    }
</script>
<canvas id="gatedSRLatchCircuit" resize></canvas>


## Conclusion
We successfully created a way to persist state, which will be very useful
in building things like registers and state machines. Note that this
is *volatile memory*, meaning the memory is lost when power is turned
off. This is just one way to create in-circuit memory, but it's a great
building block to have in our toolset.

As always if any parts were unclear, please feel free to contact me.
