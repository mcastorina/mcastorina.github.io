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
