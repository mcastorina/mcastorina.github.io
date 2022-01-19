var scale = 32;
function gatePath(anchor, kind, negateOut) {
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
    if (negateOut) {
        var dot = new Path.Circle((anchor + [2.1, 0])*scale, 0.1*scale);
        dot.strokeWidth = 2;
        dot.strokeColor = 'black';
        out.addChild(dot);
    }

    a.moveTo((anchor + [0, -0.3])*scale);
    a.lineBy(new Point(0.8, 0)*scale);
    b.moveTo((anchor + [0, 0.3])*scale);
    b.lineBy(new Point(0.8, 0)*scale);
    if (negateOut) {
        out.moveTo((anchor + [2.2, 0])*scale);
    } else {
        out.moveTo((anchor + [2, 0])*scale);
    }
    out.lineTo((anchor + [2.8, 0])*scale);

    return {a: a, b: b, out: out};
}
function andPath(anchor) {
    return gatePath(anchor, 'and');
}
function nandPath(anchor) {
    return gatePath(anchor, 'and', negateOut=true);
}
function orPath(anchor) {
    return gatePath(anchor, 'or');
}
function dffPath(anchor, kind) {
    var a = new Path();
    a.strokeColor = 'black';
    a.strokeWidth = 2;
    var b = new Path();
    b.strokeColor = 'black';
    b.strokeWidth = 2;
    var out = new Path();
    out.strokeColor = 'black';
    out.strokeWidth = 2;

    var raster = new Raster('/assets/ground-up/dff.svg');
    raster.position = (anchor + [1.7, 0])*scale;

    a.moveTo((anchor + [0, -0.6])*scale);
    a.lineBy(new Point(0.8, 0)*scale);
    b.moveTo((anchor + [0, 0.6])*scale);
    b.lineBy(new Point(0.6, 0)*scale);
    var dot = new Path.Circle((anchor + [0.7, 0.6])*scale, 0.1*scale);
    dot.strokeWidth = 2;
    dot.strokeColor = 'black';
    b.addChild(dot);
    out.moveTo((anchor + [2.6, -0.6])*scale);
    out.lineBy(new Point(0.6, 0)*scale);

    return {d: a, clk: b, q: out};
}
function and5Path(anchor, posIndex) {
    var a = new Path({strokeWidth: 2, strokeColor: 'black'});
    var b = new Path({strokeWidth: 2, strokeColor: 'black'});
    var c = new Path({strokeWidth: 2, strokeColor: 'black'});
    var d = new Path({strokeWidth: 2, strokeColor: 'black'});
    var e = new Path({strokeWidth: 2, strokeColor: 'black'});
    var out = new Path({strokeWidth: 2, strokeColor: 'black'});

    var raster = new Raster('/assets/ground-up/and5.svg');
    raster.scale(2);
    raster.position = (anchor + [2, 0])*scale;

    var paths = [a, b, c, d, e];
    for (var i = 0; i < 5; i += 1) {
        p = paths[i];
        p.moveTo((anchor + [0, (i-2)*0.5])*scale);
        if (i == posIndex) {
            p.lineBy(new Point(0.8, 0)*scale);
        } else {
            p.lineBy(new Point(0.6, 0)*scale);
            var dot = new Path.Circle((anchor + [0.7, (i-2)*0.5])*scale, 0.1*scale);
            dot.strokeWidth = 2;
            dot.strokeColor = 'black';
            p.addChild(dot);
        }
    }
    out.moveTo((anchor + [3.2, 0])*scale);
    out.lineBy(new Point(0.8, 0)*scale);

    return {a: a, b: b, c: c, d: d, e: e, out: out};
}
function or5Path(anchor) {
    var a = new Path({strokeWidth: 2, strokeColor: 'black'});
    var b = new Path({strokeWidth: 2, strokeColor: 'black'});
    var c = new Path({strokeWidth: 2, strokeColor: 'black'});
    var d = new Path({strokeWidth: 2, strokeColor: 'black'});
    var e = new Path({strokeWidth: 2, strokeColor: 'black'});
    var out = new Path({strokeWidth: 2, strokeColor: 'black'});

    var raster = new Raster('/assets/ground-up/or5.svg');
    raster.scale(2);
    raster.position = (anchor + [2, 0])*scale;

    var paths = [a, b, c, d, e];
    for (var i = 0; i < 5; i += 1) {
        p = paths[i];
        p.moveTo((anchor + [0, (i-2)*0.5])*scale);
        p.lineBy(new Point(0.9 - (i-2)*(i-2)*0.07, 0)*scale);
    }
    out.moveTo((anchor + [3.4, 0])*scale);
    out.lineBy(new Point(0.6, 0)*scale);

    return {a: a, b: b, c: c, d: d, e: e, out: out};
}
function muxPath(anchor) {
    var a = new Path({strokeWidth: 2, strokeColor: 'black'});
    var b = new Path({strokeWidth: 2, strokeColor: 'black'});
    var c = new Path({strokeWidth: 2, strokeColor: 'black'});
    var d = new Path({strokeWidth: 2, strokeColor: 'black'});
    var s0 = new Path({strokeWidth: 2, strokeColor: 'black'});
    var s1 = new Path({strokeWidth: 2, strokeColor: 'black'});
    var out = new Path({strokeWidth: 2, strokeColor: 'black'});

    var raster = new Raster('/assets/ground-up/mux.svg');
    raster.position = (anchor + [1.8, 0])*scale;

    a.moveTo((anchor + [0, -1.5])*scale);
    a.lineBy(new Point(0.8, 0)*scale);
    b.moveTo((anchor + [0, -0.5])*scale);
    b.lineBy(new Point(0.8, 0)*scale);
    c.moveTo((anchor + [0, 0.5])*scale);
    c.lineBy(new Point(0.8, 0)*scale);
    d.moveTo((anchor + [0, 1.5])*scale);
    d.lineBy(new Point(0.8, 0)*scale);
    s1.moveTo((anchor + [1.5, 2.6])*scale);
    s1.lineBy(new Point(0, 0.8)*scale);
    s0.moveTo((anchor + [2.3, 2.2])*scale);
    s0.lineBy(new Point(0, 1.2)*scale);
    out.moveTo((anchor + [2.8, 0])*scale);
    out.lineBy(new Point(0.6, 0)*scale);

    return {a: a, b: b, c: c, d: d, s1: s1, s0: s0, out: out};
}
function notPath(anchor) {
    var input = new Path({strokeWidth: 2, strokeColor: 'black'});
    var out = new Path({strokeWidth: 2, strokeColor: 'black'});

    var raster = new Raster('/assets/ground-up/not.svg');
    raster.scale(0.2);
    raster.position = (anchor + [0.7, 0])*scale;

    input.moveTo((anchor + [-0.6, 0])*scale);
    input.lineBy(new Point(0.8, 0)*scale);
    out.moveTo((anchor + [1.2, 0])*scale);
    out.lineBy(new Point(0.6, 0)*scale);

    return {input: input, out: out};
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
    for (var i = 0; i < 3; i += 1) {
        drawLabel(anchor + [0.5, i*3 + 2.2], 'B₀', fontSize=18);
        drawLabel(anchor + [0.5, i*3 + 2.7], 'B₁', fontSize=18);
        drawLabel(anchor + [0.5, i*3 + 3.2], 'B₂', fontSize=18);
        drawLabel(anchor + [0.5, i*3 + 3.7], 'B₃', fontSize=18);
        drawLabel(anchor + [0.5, i*3 + 4.2], 'R', fontSize=18);
    }
    drawLabel(anchor + [0.5, 13 + 2.2], 'B₀', fontSize=18);
    drawLabel(anchor + [0.5, 13 + 2.7], 'B₁', fontSize=18);
    drawLabel(anchor + [0.5, 13 + 3.2], 'B₂', fontSize=18);
    drawLabel(anchor + [0.5, 13 + 3.7], 'B₃', fontSize=18);
    drawLabel(anchor + [0.5, 13 + 4.2], 'R', fontSize=18);
    drawLabel(anchor + [7, 7.7], 'R̅');

    drawLabel(anchor + [8.8, 4.7], '00', fontSize=16);
    drawLabel(anchor + [8.8, 5.7], '01', fontSize=16);
    drawLabel(anchor + [8.8, 6.7], '10', fontSize=16);
    drawLabel(anchor + [8.8, 7.7], '11', fontSize=16);
    drawLabel(anchor + [9, 8.4], 'S₁', fontSize=16);
    drawLabel(anchor + [9.8, 7.9], 'S₀', fontSize=16);

    drawLabel(anchor + [14.5, 15.8], 'Locked');
}

// compound paths
var b0Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var b1Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var b2Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var b3Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var rPath  = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var clkPath = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var andAOut = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var andBOut = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var andCOut = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var muxOut = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var s0Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var s0NotPath = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var s1Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var orS0Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var orS1Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var andS0Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var andS1Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});

var anchor = new Point(1, -1);
var lineOffset = new Point(0.25, 0)*scale;

var andA = and5Path(anchor + [1, 3], 3);
var andB = and5Path(anchor + [1, 6], 0);
var andC = and5Path(anchor + [1, 9], 1);
var orButtons = or5Path(anchor + [1, 16]);
var d1 = dffPath(anchor + [6, 14]);
var d0 = dffPath(anchor + [6, 17]);
var mux = muxPath(anchor + [7.5, 6]);
var orS1 = orPath(anchor + [10, 11]);
var orS0 = orPath(anchor + [10, 13]);
var andS1 = andPath(anchor + [13, 5]);
var andS0 = andPath(anchor + [13, 7]);
var andLock = nandPath(anchor + [11, 16]);

b0Path.addChild(andA.a);
b0Path.addChild(andB.a);
b0Path.addChild(andC.a);
b0Path.addChild(orButtons.a);

b1Path.addChild(andA.b);
b1Path.addChild(andB.b);
b1Path.addChild(andC.b);
b1Path.addChild(orButtons.b);

b2Path.addChild(andA.c);
b2Path.addChild(andB.c);
b2Path.addChild(andC.c);
b2Path.addChild(orButtons.c);

b3Path.addChild(andA.d);
b3Path.addChild(andB.d);
b3Path.addChild(andC.d);
b3Path.addChild(orButtons.d);

rPath.addChild(andA.e);
rPath.addChild(andB.e);
rPath.addChild(andC.e);
rPath.addChild(orButtons.e);

clkPath.addChild(orButtons.out);
clkPath.addChild(d1.clk);
clkPath.addChild(d0.clk);
clkPath.moveTo(d1.clk.position - lineOffset);
clkPath.lineBy(new Point(-0.05, 0)*scale);
clkPath.lineBy(new Point(0, 3.02)*scale);
clkPath.moveTo(orButtons.out.position + lineOffset);
clkPath.lineBy(new Point(1.05, 0)*scale);

andAOut.addChild(andA.out);
andAOut.addChild(mux.a);
andAOut.moveTo(andA.out.position + lineOffset);
andAOut.lineBy(new Point(1, 0)*scale);
andAOut.lineBy(new Point(0, 1.5)*scale);
andAOut.lineBy(new Point(1.7, 0)*scale);

andBOut.addChild(andB.out);
andBOut.addChild(mux.b);
andBOut.moveTo(andB.out.position + lineOffset);
andBOut.lineBy(new Point(1, 0)*scale);
andBOut.lineBy(new Point(0, -0.5)*scale);
andBOut.lineBy(new Point(1.7, 0)*scale);

andCOut.addChild(andC.out);
andCOut.addChild(mux.c);
andCOut.moveTo(andC.out.position + lineOffset);
andCOut.lineBy(new Point(1, 0)*scale);
andCOut.lineBy(new Point(0, -2.5)*scale);
andCOut.lineBy(new Point(1.7, 0)*scale);

muxOut.addChild(mux.out);
muxOut.addChild(andS0.a);
muxOut.addChild(andS1.b);
muxOut.moveTo(mux.out.position + lineOffset);
muxOut.lineBy(new Point(2.15, 0)*scale);
muxOut.moveBy(new Point(0, -0.7)*scale);
muxOut.lineBy(new Point(0, 1.4)*scale);

s0Path.addChild(d0.q);
s0Path.addChild(mux.s0);
s0Path.addChild(orS1.b);
s0Path.addChild(andLock.b);
s0Path.moveTo(d0.q.position + lineOffset);
s0Path.lineBy(new Point(0.65, 0)*scale);
s0Path.lineBy(new Point(0, -0.1)*scale);
s0Path.lineBy(new Point(1.9 - 0.65, 0)*scale);
s0Path.moveBy(new Point(0.65 - 1.9, 0)*scale);
s0Path.lineBy(new Point(0, -5)*scale);
s0Path.lineBy(new Point(0.2, 0)*scale);
s0Path.moveBy(new Point(-0.2, 0)*scale);
s0Path.lineBy(new Point(0, -2)*scale);

s0NotPath.addChild(orS0.b);
s0NotPath.moveTo(orS0.b.position - lineOffset);
s0NotPath.lineBy(new Point(-0.11, 0)*scale);
s0NotPath.lineBy(new Point(0, 4.3)*scale);
s0NotPath.lineBy(new Point(-1.4, 0)*scale);


s1Path.addChild(d1.q);
s1Path.addChild(mux.s1);
s1Path.addChild(orS1.a);
s1Path.addChild(orS0.a);
s1Path.addChild(andLock.a);
s1Path.moveTo(d1.q.position + lineOffset);
s1Path.lineBy(new Point(0, -0.7)*scale);
s1Path.lineBy(new Point(0.85, 0)*scale);
s1Path.lineBy(new Point(-1, 0)*scale);
s1Path.lineBy(new Point(0, -2)*scale);
s1Path.lineBy(new Point(1, 0)*scale);
s1Path.moveBy(new Point(-1, 0)*scale);
s1Path.lineBy(new Point(0, -1.3)*scale);
s1Path.moveTo(d1.q.position + lineOffset);
s1Path.lineBy(new Point(0, 2.3)*scale);
s1Path.lineBy(new Point(1.9, 0)*scale);

orS0Path.addChild(orS0.out);
orS0Path.addChild(andS0.b);
orS0Path.moveTo(orS0.out.position + lineOffset);
orS0Path.lineBy(new Point(0.35, 0)*scale);
orS0Path.lineBy(new Point(0, -5.7)*scale);

orS1Path.addChild(orS1.out);
orS1Path.addChild(andS1.a);
orS1Path.moveTo(orS1.out.position + lineOffset);
orS1Path.lineBy(new Point(0.11, 0)*scale);
orS1Path.lineBy(new Point(0, -6.3)*scale);
orS1Path.lineBy(new Point(0.3, 0)*scale);

andS0Path.addChild(andS0.out);
andS0Path.addChild(d0.d);
andS0Path.moveTo(andS0.out.position + lineOffset);
andS0Path.lineBy(new Point(0.11, 0)*scale);
andS0Path.lineBy(new Point(0, 11.5)*scale);
andS0Path.lineBy(new Point(-10, 0)*scale);
andS0Path.lineBy(new Point(0, -2.1)*scale);
andS0Path.lineBy(new Point(0.3, 0)*scale);

andS1Path.addChild(andS1.out);
andS1Path.addChild(d1.d);
andS1Path.moveTo(andS1.out.position + lineOffset);
andS1Path.lineBy(new Point(0.7, 0)*scale);
andS1Path.lineBy(new Point(0, 14)*scale);
andS1Path.lineBy(new Point(-11, 0)*scale);
andS1Path.lineBy(new Point(0, -5.6)*scale);
andS1Path.lineBy(new Point(0.7, 0)*scale);

drawLabels(anchor);

var lastClk = false;
var lastS0 = 'black';
var lastS1 = 'black';
window.globals.updateLock = function() {
    var t = function(p) { return p.strokeColor == 'red' ? true : false; };
    var f = function(p) { return !t(p); };
    var b0 = window.globals.lockB0;
    var b1 = window.globals.lockB1;
    var b2 = window.globals.lockB2;
    var b3 = window.globals.lockB3;
    var reset = window.globals.lockR;
    s0Path.strokeColor = lastS0;
    s1Path.strokeColor = lastS1;

    b0Path.strokeColor = b0 ? 'red' : 'black';
    b1Path.strokeColor = b1 ? 'red' : 'black';
    b2Path.strokeColor = b2 ? 'red' : 'black';
    b3Path.strokeColor = b3 ? 'red' : 'black';
    rPath.strokeColor = reset ? 'red' : 'black';
    clkPath.strokeColor = (b0 || b1 || b2 || b3 || reset) ? 'red' : 'black';
    if (lastClk && f(clkPath)) {
        // falling edge of clk -> update state
        s0Path.strokeColor = andS0Path.strokeColor;
        s1Path.strokeColor = andS1Path.strokeColor;
    }
    s0NotPath.strokeColor = f(s0Path) ? 'red' : 'black';
    andAOut.strokeColor = !b0 && !b1 && !b2 && b3 && !reset ? 'red' : 'black';
    andBOut.strokeColor = b0 && !b1 && !b2 && !b3 && !reset ? 'red' : 'black';
    andCOut.strokeColor = !b0 && b1 && !b2 && !b3 && !reset ? 'red' : 'black';
    mux.d.strokeColor = !reset ? 'red' : 'black';
    var state = String.fromCharCode(65 + (t(s1Path) ? 2 : 0) + (t(s0Path) ? 1 : 0));
    switch (state) {
        case 'A': muxOut.strokeColor = t(andAOut) ? 'red' : 'black';
                  break;
        case 'B': muxOut.strokeColor = t(andBOut) ? 'red' : 'black';
                  break;
        case 'C': muxOut.strokeColor = t(andCOut) ? 'red' : 'black';
                  break;
        case 'D': muxOut.strokeColor = t(mux.d) ? 'red' : 'black';
                  state = 'Unlock';
                  break;
    }
    orS0Path.strokeColor = f(s0Path) || t(s1Path) ? 'red' : 'black';
    orS1Path.strokeColor = t(s0Path) || t(s1Path) ? 'red' : 'black';
    andS0Path.strokeColor = t(muxOut) && t(orS0Path) ? 'red' : 'black';
    andS1Path.strokeColor = t(muxOut) && t(orS1Path) ? 'red' : 'black';
    andLock.out.strokeColor = !(t(s0Path) && t(s1Path)) ? 'red' : 'black';
    window.globals.lockL = t(andLock.out).toString();
    window.globals.lockS = state;

    lastClk = t(clkPath);
    lastS0 = s0Path.strokeColor;
    lastS1 = s1Path.strokeColor;
}
