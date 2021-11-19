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
