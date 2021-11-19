var scale = 32;

function adderPath(anchor) {
    var aPath = new Path({strokeWidth: 2, strokeColor: 'black'});
    aPath.moveTo((anchor + [0.6, 0])*scale);
    aPath.lineBy(new Point(0, -0.8)*scale);

    var bPath = new Path({strokeWidth: 2, strokeColor: 'black'});
    bPath.moveTo((anchor + [1.4, 0])*scale);
    bPath.lineBy(new Point(0, -0.8)*scale);

    var cPath = new Path({strokeWidth: 2, strokeColor: 'black'});
    cPath.moveTo((anchor + [2, 0.8])*scale);
    cPath.lineBy(new Point(0.8, 0)*scale);

    var out1Path = new Path({strokeWidth: 2, strokeColor: 'black'});
    out1Path.moveTo((anchor + [0, 0.8])*scale);
    out1Path.lineBy(new Point(-0.8, 0)*scale);

    var out0Path = new Path({strokeWidth: 2, strokeColor: 'black'});
    out0Path.moveTo((anchor + [1, 1.6])*scale);
    out0Path.lineBy(new Point(0, 0.8)*scale);

    var rect = new Path.Rectangle(anchor*scale, 2*scale, 1.6*scale);
    rect.strokeColor = 'black';
    rect.strokeWidth = 2;

    new PointText({
        point: (anchor + [0.6, 0.4])*scale,
        justification: 'center',
        fontSize: 10,
        content: 'A'
    });
    new PointText({
        point: (anchor + [1.4, 0.4])*scale,
        justification: 'center',
        fontSize: 10,
        content: 'B'
    });
    new PointText({
        point: (anchor + [1.7, 0.9])*scale,
        justification: 'center',
        fontSize: 10,
        content: 'C'
    });
    new PointText({
        point: (anchor + [0.5, 0.9])*scale,
        justification: 'center',
        fontSize: 10,
        content: 'Out₁'
    });
    new PointText({
        point: (anchor + [1, 1.4])*scale,
        justification: 'center',
        fontSize: 10,
        content: 'Out₀'
    });

    return {
        a: aPath,
        b: bPath,
        c: cPath,
        out0: out0Path,
        out1: out1Path
    };
}
function drawLabels(anchor) {
    new PointText({
        point: (anchor + [2.6, 2])*scale,
        justification: 'center',
        fontSize: 20,
        content: 'A₁'
    });
    new PointText({
        point: (anchor + [3.4, 2])*scale,
        justification: 'center',
        fontSize: 20,
        content: 'B₁'
    });
    new PointText({
        point: (anchor + [6.1, 2])*scale,
        justification: 'center',
        fontSize: 20,
        content: 'A₀'
    });
    new PointText({
        point: (anchor + [6.9, 2])*scale,
        justification: 'center',
        fontSize: 20,
        content: 'B₀'
    });
    new PointText({
        point: (anchor + [3.25, 9])*scale,
        justification: 'center',
        fontSize: 20,
        content: 'Out₂'
    });
    new PointText({
        point: (anchor + [5, 9])*scale,
        justification: 'center',
        fontSize: 20,
        content: 'Out₁'
    });
    new PointText({
        point: (anchor + [6.75, 9])*scale,
        justification: 'center',
        fontSize: 20,
        content: 'Out₀'
    });

    var gnd = new CompoundPath();
    gnd.strokeColor = 'black';
    gnd.strokeWidth = 2;

    gnd.moveTo((anchor + [8.3, 3.8])*scale);
    gnd.lineBy(new Point(0, 1)*scale);
    gnd.moveBy(new Point(-0.4, 0)*scale);
    gnd.lineBy(new Point(0.8, 0)*scale);
    gnd.moveBy(new Point(-0.1, 0.15)*scale);
    gnd.lineBy(new Point(-0.6, 0)*scale);
    gnd.moveBy(new Point(0.1, 0.15)*scale);
    gnd.lineBy(new Point(0.4, 0)*scale);
}

var anchor = new Point(-0.5, -1);

var out2Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var out1Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});
var out0Path = new CompoundPath({strokeWidth: 2, strokeColor: 'black'});

var add1 = adderPath(anchor + [2, 3]);
var add0 = adderPath(anchor + [5.5, 3]);
out2Path.addChild(add1.out1);
out2Path.moveTo(add1.out1.position + new Point(-0.4, 0)*scale);
out2Path.lineBy(new Point(0, 3)*scale);
out2Path.lineBy(new Point(2, 0)*scale);
out2Path.lineBy(new Point(0, 1)*scale);
out2Path.addChild(new Path.Rectangle(add1.out1.position + new Point(1.6 - 1/4, 4)*scale, scale/2));

out1Path.addChild(add1.out0);
out1Path.moveTo(add1.out0.position + new Point(0, 0.4)*scale);
out1Path.lineBy(new Point(0, 0.5)*scale);
out1Path.lineBy(new Point(2, 0)*scale);
out1Path.lineBy(new Point(0, 1.9)*scale);
out1Path.addChild(new Path.Rectangle(add1.out0.position + new Point(2 - 1/4, 2.8)*scale, scale/2));

out0Path.addChild(add0.out0);
out0Path.moveTo(add0.out0.position + new Point(0, 0.4)*scale);
out0Path.lineBy(new Point(0, 2.4)*scale);
out0Path.addChild(new Path.Rectangle(add0.out0.position + new Point(-1/4, 2.8)*scale, scale/2));

drawLabels(anchor);

window.globals.updateAdder2 = function() {
    var a1 = window.globals.adder2A1;
    var a0 = window.globals.adder2A0;
    var b1 = window.globals.adder2B1;
    var b0 = window.globals.adder2B0;

    var c0 = a0 && b0;
    var out0 = a0 ^ b0;
    var out1 = a1 ^ b1 ^ c0;
    var out2 = a1 && b1 || b1 && c0 || c0 && a1;
    window.globals.adder2Out0 = out0;
    window.globals.adder2Out1 = out1;
    window.globals.adder2Out2 = out2;

    add0.a.strokeColor = a0 ? 'red' : 'black';
    add0.b.strokeColor = b0 ? 'red' : 'black';
    add0.out1.strokeColor = c0 ? 'red' : 'black';
    out0Path.strokeColor = out0 ? 'red' : 'black';

    add1.a.strokeColor = a1 ? 'red' : 'black';
    add1.b.strokeColor = b1 ? 'red' : 'black';
    add1.c.strokeColor = c0 ? 'red' : 'black';
    out1Path.strokeColor = out1 ? 'red' : 'black';
    out2Path.strokeColor = out2 ? 'red' : 'black';
}
