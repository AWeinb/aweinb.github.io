/* Author: AxP

*/

// ######
var objs = [];
var numObj = window.innerWidth / 20;
var highlightArea = 300;
var canvas = document.getElementById('bgCanvas');
//######

/*
 * JQuery onLoad function:
 * - if js is active the mainpage is another than without.
 */
$(window).ready(function() {
    document.getElementById('link').href = "main.html";
    document.getElementById('linkFooter').href = "main.html";

    drawCanvas();

});
/*
 * Mousemove eventlistener:
 * - gets the mouseposition and colors a rectangle if it is in radius.
 */
$("#main").mousemove(function(event) {
    var ex = event.pageX;
    var ey = event.pageY;

    for(var i = 0; i < objs.length; i++) {
        var d = distance(objs[i].midX, objs[i].midY, ex, ey);

        if(d < highlightArea + objs[i].size) {
            objs[i].highlight();
        } else {
            objs[i].lowlight();
        }
    }
});
/*
 * function distance
 * - returns the distance between two points.
 */
function distance(point1X, point1Y, point2X, point2Y) {
    var xs = 0;
    var ys = 0;
    xs = point2X - point1X;
    xs = xs * xs;
    ys = point2Y - point1Y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
}

/*
 * function drawCanvas:
 * - draws a specified number of rectangles.
 */
function drawCanvas() {
    if(canvas.getContext) {
        var context = canvas.getContext('2d');
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        for(var i = 0; i < numObj; i++) {
            objs[i] = new RectObj(context);
        }
    }
}

/**
 * Rectangle Object.
 *
 * @param ctx 2D context
 * @param r red value
 * @param g green value
 * @param b blue value
 */
function RectObj(ctx) {
    var self = this;

    var ctx = ctx;
    var red1;
    var green1;
    var blue1;
    var red2;
    var green2;
    var blue2;
    var alpha = 1;

    var random = parseInt(Math.random() * 100);
    var random2 = parseInt(Math.random() * 100);

    this.size = getRandomSize();
    this.x = getRandomX(this.size);
    this.y = getRandomY(this.size);

    this.midX = this.x + (this.size / 2);
    this.midY = this.y + (this.size / 2);

    var radius = 10;

    var enabled = false;

    draw(10, true, true);

    /**
     * function getRandomX:
     * - returns a random X-Coordinate
     *
     */
    function getRandomX(size) {
        var ret;

        if(ctx != null || ctx != undefined) {
            ret = parseInt((Math.random() + 1) * ctx.canvas.width) % ctx.canvas.width;

            if(ret >= (ctx.canvas.width - size)) {
                ret -= size;
            }

        } else {
            ret = 0;
        }

        return ret;
    };

    /**
     * function getRandomY:
     * - returns a random Y-Coordinate
     *
     */

    function getRandomY(size) {
        var ret;

        if(ctx != null || ctx != undefined) {
            ret = parseInt((Math.random() + 1) * ctx.canvas.height) % ctx.canvas.height;

            if(ret >= (ctx.canvas.height - size)) {
                ret -= size;
            }

        } else {
            ret = 0;
        }

        return ret;
    };

    /**
     * function getRandomSize:
     * - returns a random size
     *
     */
    function getRandomSize() {
        var ret;
        var random = parseInt(Math.random() * 100);

        if(random < 10) {
            ret = 7;

        } else if(random < 20) {
            ret = 12;

        } else if(random < 30) {
            ret = 19;

        } else if(random < 40) {
            ret = 25;

        } else if(random < 50) {
            ret = 30;

        } else if(random < 60) {
            ret = 35;

        } else if(random < 70) {
            ret = 38;

        } else if(random < 80) {
            ret = 44;

        } else if(random < 90) {
            ret = 50;

        } else if(random < 100) {
            ret = 58;

        }

        return ret;
    };

    /**
     * function draw:
     * - draws a Rectangle with rounded corners.
     *
     * @param radius number corner radius
     * @param fill boolean background
     * @param stroke boolean border
     */
    function draw(radius, fill, stroke) {
        if( typeof stroke == "undefined") {
            stroke = true;
        }

        helpDraw();

        if(stroke) {
            ctx.stroke();
        }

        if(fill) {
            var grd = ctx.createRadialGradient(self.x + random, self.y + random2, 0, self.x + self.size / 2, self.y + self.size / 2, 300);
            red1 = parseInt(6 * Math.random());
            green1 = parseInt(4 * Math.random());
            blue1 = parseInt(2 * Math.random());
            grd.addColorStop(0, "rgba(" + red1 + "," + green1 + "," + blue1 + "," + alpha + ")");
            red2 = parseInt(5 * Math.random());
            green2 = parseInt(3 * Math.random());
            blue2 = parseInt(4 * Math.random());
            grd.addColorStop(1, "rgba(" + red2 + "," + green2 + "," + blue2 + "," + alpha + ")");
            ctx.fillStyle = grd;
            ctx.fill();
        }
        enabled = true;
    }

    /**
     * function helpDraw:
     * - keeps the mainpart of the draw method.
     */
    function helpDraw() {
        ctx.beginPath();
        ctx.moveTo(self.x + radius, self.y);
        ctx.lineTo(self.x + self.size - radius, self.y);
        ctx.quadraticCurveTo(self.x + self.size, self.y, self.x + self.size, self.y + radius);
        ctx.lineTo(self.x + self.size, self.y + self.size - radius);
        ctx.quadraticCurveTo(self.x + self.size, self.y + self.size, self.x + self.size - radius, self.y + self.size);
        ctx.lineTo(self.x + radius, self.y + self.size);
        ctx.quadraticCurveTo(self.x, self.y + self.size, self.x, self.y + self.size - radius);
        ctx.lineTo(self.x, self.y + radius);
        ctx.quadraticCurveTo(self.x, self.y, self.x + radius, self.y);
        ctx.closePath();
    }

    /*
     * function highlight:
     * - makes the rect brighter.
     */
    this.highlight = function() {
        if(enabled) {
            helpDraw();

            if(red1 < 160 || green1 < 50 || blue1 < 200) {
                red1 += parseInt(22 * Math.random());
                green1 += parseInt(5 * Math.random());
                blue1 += parseInt(9 * Math.random());
            }

            if(red2 < 155 || green2 < 15 || blue2 < 185) {
                red2 += parseInt(18 * Math.random());
                green2 += parseInt(4 * Math.random());
                blue2 += parseInt(9 * Math.random());
            }

            if(red1 > 255)
                red1 = 255;
            if(green1 > 255)
                green1 = 255;
            if(blue1 > 255)
                blue1 = 255;

            if(red2 > 255)
                red2 = 255;
            if(green2 > 255)
                green2 = 255;
            if(blue2 > 255)
                blue2 = 255;

            var grd = ctx.createRadialGradient(self.x + random, self.y + random2, 0, self.x + self.size / 2, self.y + self.size / 2, 300);
            grd.addColorStop(0, "rgba(" + red1 + "," + green1 + "," + blue1 + "," + alpha + ")");
            grd.addColorStop(1, "rgba(" + red2 + "," + green2 + "," + blue2 + "," + alpha + ")");
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.stroke();
        }
    }
    /*
     * function lowlight:
     * - makes the rect duller.
     */
    this.lowlight = function() {
        if(enabled) {
            helpDraw();

            if(red1 > 5 || blue1 > 10) {
                red1 -= parseInt(10 * Math.random());
                green1 -= parseInt(10 * Math.random());
                blue1 -= parseInt(10 * Math.random());
            }
            if(red2 > 5 || blue2 > 10) {
                red2 -= parseInt(10 * Math.random());
                green2 -= parseInt(10 * Math.random());
                blue2 -= parseInt(10 * Math.random());
            }
            if(red1 < 0)
                red1 = 0;
            if(green1 < 0)
                green1 = 0;
            if(blue1 < 0)
                blue1 = 0;

            if(red2 < 0)
                red2 = 0;
            if(green2 < 0)
                green2 = 0;
            if(blue2 < 0)
                blue2 = 0;

            var grd = ctx.createRadialGradient(self.x + random, self.y + random2, 0, self.x + self.size / 2, self.y + self.size / 2, 300);
            grd.addColorStop(0, "rgba(" + red1 + "," + green1 + "," + blue1 + "," + alpha + ")");
            grd.addColorStop(1, "rgba(" + red2 + "," + green2 + "," + blue2 + "," + alpha + ")");
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.stroke();
        }
    }
}