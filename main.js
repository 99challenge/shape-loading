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
    var canvas, ctx, item, time = 0;

    // Flower constructor
    var Shape = function (o) {
        this.cx = o.cx;
        this.cy = o.cy;
        this.size = o.size;
        this.originalSize = o.size;
        this.currentShape = o.currentShape;
        this.hiding = false;
        this.showing = false;

        this.draw = function () {
            ctx.fillStyle = 'hsla(321, 95%, 60%, .1)';
            ctx.strokeStyle = 'hsla(321, 95%, 75%, .2)';

            if (this.currentShape === 0) {
                circle(this.cx, this.cy , this.size / 2, 'hsla(321, 95%, 60%, .1)', 'hsla(321, 95%, 75%, .2)');
            }
            else if (this.currentShape === 1) {
                ctx.fillRect(this.cx - this.size / 2, this.cy - this.size / 2, this.size, this.size);
                ctx.strokeRect(this.cx - this.size / 2, this.cy - this.size / 2, this.size, this.size);
            }
            else if (this.currentShape === 2) {
                hex(6, this.size / 2, this.cx, this.cy);
            }
        };

        this.update = function () {
            if (this.hiding) {
                if (this.size <= 0) {
                    this.currentShape = (this.currentShape + 1) % 3; //'rect';
                    this.hiding = false;
                    this.showing = true;
                    return;
                }

                // Hide and if hidden --> this.hiding = false
                this.size -= 5;
            }
            else if (this.showing) {
                if (this.size >= this.originalSize) {
                    this.showing = false;
                    return;
                }

                this.size += 5;
            }
            else {
                time++;
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
    var hex = function (numberOfSides, size, centerX, centerY) {
        ctx.beginPath();
        ctx.moveTo (centerX +  size * Math.cos(0), centerY +  size *  Math.sin(0));

        for (var i = 1; i <= numberOfSides;i += 1) {
            ctx.lineTo (centerX + size * Math.cos(i * 2 * Math.PI / numberOfSides), centerY + size * Math.sin(i * 2 * Math.PI / numberOfSides));
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

    // Draw
    var draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        item.draw();
        ctx.fillStyle = '#dadada';
        ctx.font = '16px sans-serif';
        ctx.fillText('Please wait while we process your request...', window.innerWidth / 2 - 140, window.innerHeight / 2 + 100);
    };

    var update = function () {
        if (time >= 100) {
            time = 0;
            item.hiding = true;
        }

        item.update();
    };

    // Main loop
    var loop = function _loop () {
        window.requestAnimationFrame(_loop);
        draw();
        update();
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
            'size': 100,
            'currentShape': 0
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