var config = require('./config');

function Platform(xPos, yPos, fillStyle) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.fillStyle = fillStyle ? fillStyle : '#000';
    this.deltaX = 7;
}

// Public Methods
Platform.prototype.draw = function(canvasCtx) {
    canvasCtx.beginPath();
    canvasCtx.fillStyle = this.fillStyle;
    canvasCtx.fillRect(this.xPos, this.yPos, config.platform.width, config.platform.height);
    canvasCtx.closePath();
}

Platform.prototype.getXPosition = function() {
    return this.xPos;
}

Platform.prototype.getSpeed = function() {
    return this.deltaX;
}

Platform.prototype.moveRight = function(canvasCtx) {
    this.xPos = this.xPos + this.deltaX;
    this.draw(canvasCtx);
}

Platform.prototype.moveLeft = function(canvasCtx) {
    this.xPos = this.xPos - this.deltaX;
    this.draw(canvasCtx);
}

module.exports = Platform;