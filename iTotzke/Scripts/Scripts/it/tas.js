// David says: do not even think about looking at this code 
//             (nor at the accompanying html)
window.onLoad = function () { init(); };
var c;      // size of cxc generator
var g;      // generator HTML canvas element
var gc;     // g's graphics context
var gsize;  // size of g in pixels
var gs;     // size of one of g's cell in pixels

var n;      // size of fractal canvas
var f;      // fractal HTML canvas elements
var fc;     // f's graphics context
var fsize;  // size of f in pixels
var fs;     // size of one of f's cell in pixels
var drawGrid = true;
var windows = true;
init();

function init() {
    // generator
    c = 4;
    gsize = 150;
    gs = Math.floor(gsize / c);
    g = document.getElementById("generator");
    gc = g.getContext("2d");
    g.height = gsize;
    g.width = gsize;
    createGrid();
    paintGenerator();
    // fractal
    n = 65;
    fsize = 555;
    fs = fsize / n;
    f = document.getElementById("fractal");
    fc = f.getContext("2d");
    f.height = fsize;
    f.width = fsize;
    redrawFractal();
};
function redrawFractal(ninput, fsizeinput) {
    if (ninput !== undefined)
        n = Math.floor(ninput);
    if (fsizeinput !== undefined)
        fsize = fsizeinput;
    fs = fsize / n;
    f = document.getElementById("fractal");
    fc = f.getContext("2d");
    f.height = fsize;
    f.width = fsize;
    createEmptyFractalGrid();
    generateFractal();
    paintFractal();
    //if (windows)
    //	drawWindows();
};
function createGrid(old) {
    g.grid = new Array(c);
    for (var i = 0; i < c; i++)
        g.grid[i] = new Array(c);
    for (var row = 0; row < c; row++)
        for (var col = 0; col < c; col++)
            g.grid[row][col] = 0;
    if (old !== undefined) {
        var oldC = old.length;
        if (oldC < c) { // c increased
            for (var row = 0; row < oldC; row++)
                for (var col = 0; col < oldC; col++)
                    g.grid[row][col] = old[row][col];
        }
        else { // c decreased
            for (var row = 0; row < c; row++)
                for (var col = 0; col < c; col++)
                    g.grid[row][col] = old[row][col];
        }
    }
    paintGenerator();
};
function paintGenerator() {
    // erase canvas
    gc.fillStyle = "#bcb";
    gc.fillRect(0, 0, gsize, gsize);
    for (var row = 0; row < c; row++)
        for (var col = 0; col < c; col++)
            if (g.grid[row][c - 1 - col] === 0) {
                gc.fillStyle = "#000";
                gc.fillRect(gs * row, gs * col, gs, gs);
                gc.fillStyle = "#fff";
                gc.fillRect(gs * row + 1, gs * col + 1, gs - 2, gs - 2);
            } else {
                gc.fillStyle = "#000";
                gc.fillRect(gs * row, gs * col, gs, gs);
                gc.fillStyle = "#f00";
                gc.fillRect(gs * row + 1, gs * col + 1, gs - 2, gs - 2);
            }
};

function increaseC() {
    c++;;
    createGrid(g.grid);
    gs = Math.floor(gsize / c);
    paintGenerator();
};

function decreaseC() {
    c = Math.max(2, c - 1);
    createGrid(g.grid);
    gs = Math.floor(gsize / c);
    paintGenerator();
};
function larger() {
    gsize = Math.min(gsize * 1.5, 290);
    gs = Math.floor(gsize / c);
    g.height = gsize;
    g.width = gsize;
    paintGenerator();
};
function smaller() {
    gsize *= 0.75;
    gs = Math.floor(gsize / c);
    g.height = gsize;
    g.width = gsize;
    paintGenerator();
};
function genClick(e) {
    var x;
    var y;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
             document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
             document.documentElement.scrollTop;
    }
    x -= g.offsetLeft;
    y -= g.offsetTop;
    //var p = getPosition(event);
    var col = Math.floor((y ) / gs);
    var row = Math.floor((x ) / gs);
    //alert(col + "," + row + " " + x + " " + y);
    g.grid[row][c-col-1] = 1 - g.grid[row][c-col-1];
    paintGenerator();
};
function getPosition(event) {
    var x, y;
    if (event.x !== undefined && event.y !== undefined) {
        x = event.x;
        y = event.y;
    }
    else // for Firefox
    {
        x = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }

    x -= event.target.offsetLeft;
    y -= event.target.offsetTop;
    return { "x": x, "y": gsize - y };
};
function copyArray(src, r1, c1, h, w, dest, r2, c2, color) {
    for (var i = 0; i < h; i++)
        for (var j = 0; j < w; j++)
            if (r2 + i < dest.length && c2 + j < dest[0].length)
                if (src[r1 + i][c1 + j] !== 0)
                    dest[r2 + i][c2 + j] = color;
};
function generateFractal() {
    for (var row = 0; row < n; row++)
        for (var col = 0; col < n; col++)
            f.grid[row][col] = 0;
    var color = 1;
    // stage 1
    copyArray(g.grid, 0, 0, c, c, f.grid, 0, 0, color);
    // stages 2, 3, ...
    var w = c;
    while (w < f.grid.length) {
        color++;
        for (var grow = 0; grow < c; grow++)
            for (var gcol = 0; gcol < c; gcol++) {
                if ((g.grid[grow][gcol] == 1) &&
                            ((grow > 0) || (gcol > 0)))
                    copyArray(f.grid, 0, 0, w, w,
                          f.grid, w * grow, w * gcol, color);
            }
        w = c * w;
    }
    paintFractal();
};
function paintFractal() {
    // erase canvas
    fc.fillStyle = "#cec";
    fc.fillRect(0, 0, fsize, fsize);
    // draw fractal
    for (var row = 0; row < n; row++)
        for (var col = 0; col < n; col++)
            if (f.grid[row][n - 1 - col] > 0) {
                fc.fillStyle = getColor(f.grid[row][n - 1 - col]);
                fc.fillRect(fs * row, fs * col, fs, fs);
            }
    // draw the cxc squares
    if (drawGrid)
        for (var row = 0; row < n; row += c)
            for (var col = 0; col < n; col += c) {
                fc.strokeStyle = "#000"
                fc.strokeRect(fs * row, fs * (n - c - col), c * fs, c * fs);
            }
};
function createEmptyFractalGrid() {
    f.grid = new Array(n);
    for (var i = 0; i < n; i++)
        f.grid[i] = new Array(n);
    for (var row = 0; row < n; row++)
        for (var col = 0; col < n; col++)
            f.grid[row][col] = 0;
};
function increaseN() {
    redrawFractal(Math.max(n + 1, 1.5 * n));
};
function decreaseN() {
    redrawFractal(Math.max(c, 0.5 * n));
};
function increaseSize() {
    redrawFractal(n, fsize * 1.5);
};
function decreaseSize() {
    redrawFractal(n, fsize * .50);
};
function getColor(num) {
    switch (num) {
        case 1: return "#000";
        case 2: return "#090";
        case 3: return "#00f";
        case 4: return "#f0f";
        case 5: return "#000";
        case 6: return "#f80";
        case 7: return "#088A85";
        case 8: return "#ff4";
        default: return "#888";
    }
};
function changeGridView() {
    drawGrid = !drawGrid;
    redrawFractal(n, fsize);
};
function changeWindows() {
    windows = !windows;
    redrawFractal(n, fsize);
};
function drawWindows() {
    var color = ["#f00", "#000", "#00f", "#0ff"];
    var pattern = [[10, 0], [10, 5], [10, 0, ], [10, 5]];
    var hp = findHorizontalPier();
    if (hp !== null) {
        var unit = c;
        var transp = 0.2;
        for (var scale = 1; scale < 5; scale++) {
            var windowNumber = 0;
            var adjX = 0;
            while (windowNumber < scale) {
                drawWindow(unit, hp.x + adjX, hp.y,
                       1, 1, 3 * windowNumber,
                       color[windowNumber],
                       "rgba(255, 255, 0, " + transp + ")",
                       pattern[windowNumber]);
                adjX += c / unit;
                windowNumber++;
            }
            unit *= c;
        }
    }
};
//  unit = granularity of the coordinate system (c, c^2, c^3, etc)
// (x,y) = coordinates of top-left corner in units
//  w,h  = width,height of window
//  adj  = vertical adjustment of window position in pixels
//  pattern = [ dash length, space length] (both in pixels)
function drawWindow(unit, x, y, w, h, adjY, lineColor, fillColor, pattern) {
    fc.fillStyle = fillColor;
    fc.fillRect(unit * fs * x, fs * (n - unit * (y + 1)) + adjY, unit * fs * w, unit * fs * h);
    drawDashedRectangle(unit * fs * x, fs * (n - unit * (y + 1)) + adjY, unit * fs * w, unit * fs * h,
			lineColor, 3, pattern);
};
function findHorizontalPier() {
    for (var y = 1; y < c; y++)
        if ((f.grid[c - 1][y] === 1) && (f.grid[0][y] === 0) &&
                (f.grid[c - 1][y - 1] === 0) &&
            (y === c - 1 || f.grid[c - 1][y + 1] === 0))
            return { x: (c - 1), y: y };
    return null;
};
function drawDashedRectangle(x, y, w, h, color, lineWidth, pattern) {
    fc.beginPath();
    fc.strokeStyle = color;
    fc.lineWidth = lineWidth;
    fc.dashedLineTo(x, y, x, y + h, pattern);
    fc.dashedLineTo(x, y + h, x + w, y + h, pattern);
    fc.dashedLineTo(x + w, y + h, x + w, y, pattern);
    fc.dashedLineTo(x + w, y, x, y, pattern);
    fc.stroke();
};
// next function from:  
//  http://davidowens.wordpress.com/2010/09/07/html-5-canvas-and-dashed-lines/
CanvasRenderingContext2D.prototype.dashedLineTo = function (fromX, fromY, toX, toY, pattern) {
    // Our growth rate for our line can be one of the following:
    //   (+,+), (+,-), (-,+), (-,-)
    // Because of this, our algorithm needs to understand if the x-coord and
    // y-coord should be getting smaller or larger and properly cap the values
    // based on (x,y).
    var lt = function (a, b) { return a <= b; };
    var gt = function (a, b) { return a >= b; };
    var capmin = function (a, b) { return Math.min(a, b); };
    var capmax = function (a, b) { return Math.max(a, b); };

    var checkX = { thereYet: gt, cap: capmin };
    var checkY = { thereYet: gt, cap: capmin };

    if (fromY - toY > 0) {
        checkY.thereYet = lt;
        checkY.cap = capmax;
    }
    if (fromX - toX > 0) {
        checkX.thereYet = lt;
        checkX.cap = capmax;
    }

    this.moveTo(fromX, fromY);
    var offsetX = fromX;
    var offsetY = fromY;
    var idx = 0, dash = true;
    while (!(checkX.thereYet(offsetX, toX) && checkY.thereYet(offsetY, toY))) {
        var ang = Math.atan2(toY - fromY, toX - fromX);
        var len = pattern[idx];

        offsetX = checkX.cap(toX, offsetX + (Math.cos(ang) * len));
        offsetY = checkY.cap(toY, offsetY + (Math.sin(ang) * len));

        if (dash) this.lineTo(offsetX, offsetY);
        else this.moveTo(offsetX, offsetY);

        idx = (idx + 1) % pattern.length;
        dash = !dash;
    }
};

