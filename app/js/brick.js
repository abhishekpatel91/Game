var config = require('./config');

function Brick(xPos, yPos, fillStyle) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.fillStyle = fillStyle ? fillStyle : '#000';
}

// Public Methods
Brick.prototype.draw = function(canvasCtx) {
    canvasCtx.beginPath();
    canvasCtx.fillStyle = this.fillStyle;
    canvasCtx.fillRect(this.xPos, this.yPos, config.brick.width, config.brick.height);
    canvasCtx.closePath();
}

module.exports = Brick;