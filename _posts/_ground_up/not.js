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
function notPPath(anchor) {
    return gatePath(anchor + [2.2, 2]);
}
function notNPath(anchor) {
    return gatePath(anchor + [2.2, 5]);
}
function notOutPath(anchor) {
    var path = new CompoundPath();
    path.strokeColor = 'black';
    path.strokeWidth = 2;

    path.moveTo((anchor + [2.2, 2.75])*scale);
    path.lineTo((anchor + [2.2, 3])*scale);
    path.lineTo((anchor + [3, 3])*scale);
    path.lineBy(new Point(0, 2)*scale);
    path.lineTo((anchor + [2.2, 5])*scale);
    path.lineTo((anchor + [2.2, 5.25])*scale);

    path.moveTo((anchor + [3, 4])*scale);
    path.lineBy(new Point(1, 0)*scale);

    return path;
}
function inputAPath(anchor) {
    var path = new CompoundPath();
    path.strokeColor = 'black';
    path.strokeWidth = 2;

    path.addChild(pChannelPath(anchor + [1, 2.5], 'LR'));
    path.addChild(nChannelPath(anchor + [1, 5.5], 'LR'));

    path.moveTo((anchor + [1, 2.5])*scale);
    path.lineBy(new Point(0, 3)*scale);
    path.moveTo((anchor + [0, 4])*scale);
    path.lineBy(new Point(1, 0)*scale);

    return path;
}

function drawVdd(anchor) {
    var path = new CompoundPath();
    path.strokeColor = 'red';
    path.strokeWidth = 2;

    var triangle = new Path.RegularPolygon((anchor + [3, 1])*scale, 3, scale/2.5);
    path.addChild(triangle);

    path.moveTo((anchor + [3, 1 + 1/5])*scale);
    path.lineTo((anchor + [3, 2])*scale);
    path.lineTo((anchor + [2.2, 2])*scale);
    path.lineTo((anchor + [2.2, 2.25])*scale);
}
function drawGnd(anchor) {
    var path = new CompoundPath();
    path.strokeColor = 'black';
    path.strokeWidth = 2;

    path.moveTo((anchor + [2.2, 5.75])*scale);
    path.lineTo((anchor + [2.2, 6])*scale);
    path.lineTo((anchor + [3, 6])*scale);
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
        point: (anchor + [-0.5, 4.25])*scale,
        justification: 'center',
        fontSize: 20,
        content: 'A'
    });
    new PointText({
        point: (anchor + [5, 4.25])*scale,
        justification: 'center',
        fontSize: 20,
        content: 'Out'
    });
    new PointText({
        point: (anchor + [4.1, 1.1])*scale,
        justification: 'center',
        fontSize: 20,
        content: 'Vdd'
    });
    new PointText({
        point: (anchor + [4.2, 7.4])*scale,
        justification: 'center',
        fontSize: 20,
        content: 'Gnd'
    });
}

var anchor  = new Point(1, -0.25);
var notP    = notPPath(anchor);
var notN    = notNPath(anchor);
var notOut  = notOutPath(anchor);
var inputA  = inputAPath(anchor);
drawVdd(anchor);
drawGnd(anchor);
drawLabels(anchor);

window.globals.updateNot = function() {
    var a = window.globals.notA;
    notP.strokeColor = !a ? 'red' : 'white';
    notN.strokeColor = a ? 'black' : 'white';
    notOut.strokeColor = !a ? 'red' : 'black';
    inputA.strokeColor = a ? 'red' : 'black';
}
