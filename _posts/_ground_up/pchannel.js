var path = new CompoundPath();
path.strokeColor = 'black';
path.strokeWidth = 2;
var anchor = new Point(70, 10);

path.moveTo(anchor);
path.lineBy([ 0, 24 ]);
path.lineBy([ -30, 0 ]);
path.lineBy([ 0, 48 ]);
path.lineBy([ 30, 0 ]);
path.lineBy([ 0, 24 ]);

path.moveTo(anchor + [-35, 24]);
path.lineBy([0, 48]);

var gateLength = 18;
path.moveTo(anchor + [-41 - gateLength, 48]);
path.lineBy([gateLength, 0]);

var dot = new Path.Circle(anchor + [ -38, 48 ], 3);
dot.strokeColor = 'black';
dot.strokeWidth = 2;

var drain = new PointText({
    point: anchor + [15, 10],
    justification: 'center',
    fontSize: 20,
    content: 'S'
});
var source = new PointText({
    point: anchor + [15, 95],
    justification: 'center',
    fontSize: 20,
    content: 'D'
});

var symbol = new Symbol(new Path.Circle({
    center: [0, 0],
    radius: 2,
    fillColor: 'red'
}));
var dots = new Array();
for (var i = 0; i < 10; i++) {
    dots.push(symbol.place(anchor));
}

function onFrame(event) {
    var runOffset = window.globals.pChannel ? 0 : (event.count * 2);
    var p = path.children[0];
    for (var i = 0; i < dots.length; i++) {
        var dotOffset = 100 * i / dots.length;
        var offset = (runOffset + dotOffset) % 101;
        dots[i].position = p.getPointAt(p.length * offset / 100);
    }
}
