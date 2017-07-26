var config = require('./config');

function Ball(xPos, yPos, fillStyle) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.fillStyle = fillStyle ? fillStyle : '#000';
    this.deltaX = -2;
    this.deltaY = 2;
}

// Public Methods
Ball.prototype.draw = function(canvasCtx) {
    canvasCtx.beginPath();
    canvasCtx.fillStyle = this.fillStyle;
    canvasCtx.arc(this.xPos, this.yPos, config.ball.radius, 0, Math.PI * 2);
    canvasCtx.fill();
    canvasCtx.closePath();
}

Ball.prototype.reverseX = function() {
    this.deltaX = -this.deltaX;
}

Ball.prototype.reverseY = function() {
    this.deltaY = -this.deltaY;
}

Ball.prototype.getPosition = function() {
    return {
        x: this.xPos,
        y: this.yPos
    };
}

Ball.prototype.getSpeed = function() {
    return {
        deltaX: this.deltaX,
        deltaY: this.deltaY
    };
}

Ball.prototype.move = function(canvasCtx) {
    this.xPos = this.xPos + this.deltaX;
    this.yPos = this.yPos + this.deltaY;
    this.draw(canvasCtx);
}

module.exports = Ball;