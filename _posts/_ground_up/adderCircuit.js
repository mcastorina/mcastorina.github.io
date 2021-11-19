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
    out.lineBy(new Point(0.8, 0)*scale);

    return {a: a, b: b, out: out};
}
function xorPath(anchor) {
    return gatePath(anchor, 'xor');
}
function andPath(anchor) {
    return gatePath(anchor, 'and');
}
function orPath(anchor) {
    return gatePath(anchor, 'or');
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
    drawLabel(anchor + [-0.5, 2.75], 'A');
    drawLabel(anchor + [-0.5, 3.5], 'B');
    drawLabel(anchor + [-0.5, 5], 'C');
    drawLabel(anchor + [0, 8], 'A');
    drawLabel(anchor + [0, 8.6], 'B');
    drawLabel(anchor + [0, 9.2], 'C');
    drawLabel(anchor + [7.5, 8.6], 'Out₀');
    drawLabel(anchor + [9.8, 4.8], 'Out₁');

    // gate labels
    drawLabel(anchor + [2.4, 2.6], 'AND', fontSize=10);
    drawLabel(anchor + [2.4, 4.1], 'AND', fontSize=10);
    drawLabel(anchor + [2.4, 5.6], 'AND', fontSize=10);
    drawLabel(anchor + [5.2, 3.35], 'OR', fontSize=10);
    drawLabel(anchor + [8, 4.1], 'OR', fontSize=10);
    drawLabel(anchor + [2.4, 8.1], 'XOR', fontSize=10);
    drawLabel(anchor + [5.2, 8.4], 'XOR', fontSize=10);
}

// compound paths
var aInput = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var bInput = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var cInput = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var xor1Out = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var and1Out = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var and2Out = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var and3Out = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var or1Out = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});

var anchor = new Point(1.5, 0);
var xor1 = xorPath(anchor + [1, 8]);
aInput.addChild(xor1.a);
bInput.addChild(xor1.b);
xor1Out.addChild(xor1.out);
var xor2 = xorPath(anchor + [3.8, 8.3]);
xor1Out.addChild(xor2.a);
cInput.addChild(xor2.b);
var and1 = andPath(anchor + [1, 2.5]);
aInput.addChild(and1.a);
bInput.addChild(and1.b);
and1Out.addChild(and1.out);
var and2 = andPath(anchor + [1, 4]);
bInput.addChild(and2.a);
cInput.addChild(and2.b);
and2Out.addChild(and2.out);
var and3 = andPath(anchor + [1, 5.5]);
cInput.addChild(and3.a);
aInput.addChild(and3.b);
and3Out.addChild(and3.out);
var or1 = orPath(anchor + [3.8, 3.25]);
and1Out.addChild(or1.a);
and2Out.addChild(or1.b);
or1Out.addChild(or1.out);
var or2 = orPath(anchor + [6.6, 4]);
or1Out.addChild(or2.a);
and3Out.addChild(or2.b);

var lineOffset = new Point(0.4, 0)*scale;
// connecting lines - and
aInput.moveTo(and1.a.position - lineOffset);
aInput.lineBy(new Point(-0.4, 0)*scale);
aInput.lineBy(new Point(0, 3.6)*scale);
aInput.lineBy(new Point(0.4, 0)*scale);
aInput.moveTo(and1.a.position + new Point(-0.8, 0.3)*scale);
aInput.lineBy(new Point(-0.5, 0)*scale);

bInput.moveTo(and1.b.position - lineOffset);
bInput.lineBy(new Point(0, 0.9)*scale);
bInput.moveTo(and1.b.position + new Point(-0.4, 0.45)*scale);
bInput.lineBy(new Point(-0.9, 0)*scale);

cInput.moveTo(and2.b.position - lineOffset);
cInput.lineBy(new Point(0, 0.9)*scale);
cInput.moveTo(and2.b.position + new Point(-0.4, 0.45)*scale);
cInput.lineBy(new Point(-0.9, 0)*scale);

// connecting lines - or
and1Out.moveTo(and1.out.position + lineOffset);
and1Out.lineBy(new Point(0, 0.45)*scale);
and2Out.moveTo(and2.out.position + lineOffset);
and2Out.lineBy(new Point(0, -0.45)*scale);
and3Out.moveTo(and3.out.position + lineOffset);
and3Out.lineBy(new Point(1, 0)*scale);
and3Out.lineBy(new Point(0, -1.2)*scale);
and3Out.lineBy(new Point(2, 0)*scale);
or1Out.moveTo(or1.out.position + lineOffset);
or1Out.lineBy(new Point(0, 0.45)*scale);

// connecting lines - xor
aInput.moveTo(xor1.a.position - lineOffset);
aInput.lineBy(new Point(-0.5, 0)*scale);

bInput.moveTo(xor1.b.position - lineOffset);
bInput.lineBy(new Point(-0.5, 0)*scale);

cInput.moveTo(xor2.b.position - lineOffset);
cInput.lineBy(new Point(0, 0.3)*scale);
cInput.lineBy(new Point(-3.3, 0)*scale);

drawLabels(anchor);

window.globals.updateAdder = function() {
    var a = window.globals.adderA;
    var b = window.globals.adderB;
    var c = window.globals.adderC;

    aInput.strokeColor = a ? 'red' : 'black';
    bInput.strokeColor = b ? 'red' : 'black';
    cInput.strokeColor = c ? 'red' : 'black';
    xor1Out.strokeColor = a ^ b ? 'red' : 'black';
    xor2.out.strokeColor = a ^ b ^ c ? 'red' : 'black';
    and1Out.strokeColor = a && b ? 'red' : 'black';
    and2Out.strokeColor = b && c ? 'red' : 'black';
    and3Out.strokeColor = c && a ? 'red' : 'black';
    or1Out.strokeColor = b && (a || c) ? 'red' : 'black';
    or2.out.strokeColor = a && b || b && c || c && a ? 'red' : 'black';
}
