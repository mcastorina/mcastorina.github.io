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
