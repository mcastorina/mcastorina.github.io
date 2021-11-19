var scale = 32;
function latchPath(anchor, kind) {
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
    raster.position = (anchor + [1.7, 0])*scale;

    a.moveTo((anchor + [0, -0.6])*scale);
    a.lineBy(new Point(0.8, 0)*scale);
    b.moveTo((anchor + [0, 0.6])*scale);
    b.lineBy(new Point(0.8, 0)*scale);
    out.moveTo((anchor + [2.6, -0.6])*scale);
    out.lineBy(new Point(0.6, 0)*scale);

    return {d: a, e: b, out: out};
}
function notPath(anchor) {
    var input = new Path();
    input.strokeColor = 'black';
    input.strokeWidth = 2;
    var out = new Path();
    out.strokeColor = 'black';
    out.strokeWidth = 2;

    var raster = new Raster('/assets/ground-up/not.svg');
    raster.scale(0.2);
    raster.position = (anchor + [0.7, 0])*scale;

    input.moveTo((anchor + [-0.6, 0])*scale);
    input.lineBy(new Point(0.8, 0)*scale);
    out.moveTo((anchor + [1.2, 0])*scale);
    out.lineBy(new Point(0.6, 0)*scale);

    return {input: input, out: out};
}
function dlatchPath(anchor) {
    return latchPath(anchor, 'dlatch');
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
    drawLabel(anchor + [-0.4, 2.6], 'D');
    drawLabel(anchor + [-1.2, 3.8], 'Clk');
    drawLabel(anchor + [7.6, 2.6], 'Q');
    drawLabel(anchor + [2.52, 5.1], 'NOT', fontsize=8);
}

// compound paths
var d1Out = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var notOut = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var clkInput = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});

var anchor = new Point(2, -1);
var lineOffset = new Point(0.25, 0)*scale;

var d1 = dlatchPath(anchor + [0, 3]);
var d2 = dlatchPath(anchor + [4, 3]);
var not = notPath(anchor + [2, 5]);

d1Out.addChild(d1.out);
d1Out.addChild(d2.d);
d1Out.moveTo(d1.out.position + lineOffset);
d1Out.lineBy(new Point(0.9, 0)*scale);

notOut.addChild(not.out);
notOut.addChild(d2.e);
notOut.moveTo(not.out.position + lineOffset);
notOut.lineBy(new Point(0.28, 0)*scale);
notOut.lineBy(new Point(0, -1.4)*scale);

clkInput.addChild(d1.e);
clkInput.addChild(not.input);
clkInput.moveTo(d1.e.position - new Point(1, 0)*scale);
clkInput.lineBy(new Point(0.6, 0)*scale);
clkInput.lineBy(new Point(0, 1.4)*scale);
clkInput.lineBy(new Point(1.42, 0)*scale);

drawLabels(anchor);

window.globals.updateDFlipFlop = function() {
    var d = window.globals.dFlipFlopD;
    var clk = window.globals.dFlipFlopClk;

    d1.d.strokeColor = d ? 'red' : 'black';
    clkInput.strokeColor = clk ? 'red' : 'black';
    notOut.strokeColor = !clk ? 'red' : 'black';
    if (clk) {
        d1Out.strokeColor = d ? 'red' : 'black';
    } else {
        d2.out.strokeColor = d1Out.strokeColor;
    }
}
