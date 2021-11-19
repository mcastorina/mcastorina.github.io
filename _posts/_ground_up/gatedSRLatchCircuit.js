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
