window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var main = (function () {

    // Module vars
    var canvas, ctx, item, shapes = ['circle', 'rect', 'hex'], time = 0;

    // Flower constructor
    var Shape = function (o) {
        this.cx = o.cx;
        this.cy = o.cy;
        this.currentShape = o.currentShape;
        this.hiding = false;

        this.draw = function () {
            if (this.currentShape === 'circle') {
                circle(x, y , this.radius / 2, 'hsla(321, 95%, 60%, .1)', 'hsla(321, 95%, 75%, .2)');
            }
            else if (this.currentShape === 'rect') {

            }
            else if (this.currentShape === 'hex') {

            }
        };

        this.update = function () {
            if (this.hiding) {
                // Hide and if hidden --> this.hiding = false
            }
            else {

            }
        };
    };

    // Circle utility
    var circle = function (centerX, centerY, radius, fillStyle, strokeStyle) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    };

    // Hexagon utility
    var hex = function () {

    };

    // Draw
    var draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        item.draw();
    };

    var update = function () {
        if (time >= 1500) {
            time = 0;
            item.currentShape = 'rect'; // next
            item.hiding = true;
        }

        item.update();
    };

    // Main loop
    var loop = function _loop () {
        window.requestAnimationFrame(_loop);
        draw();
    };

    // Initialisation
    var init = function () {

        canvas = document.getElementById('world');
        ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        item = new Shape({
            'cx': window.innerWidth / 2,
            'cy': window.innerHeight / 2,
            'currentShape': 'circle'
        });

        // Event handlers
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, false);

        loop();
    };

    return {
        'init': init
    }

})();

window.onload = main.init;