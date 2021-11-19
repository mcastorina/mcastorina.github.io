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
