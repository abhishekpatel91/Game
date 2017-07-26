var config = require('./config');
var Brick = require('./brick');
var Ball = require('./ball');
var Platform = require('./platform');

function Arena(canvasCtx) {
    this.canvasCtx = canvasCtx;
    this.rows = 5;
    this.cols = this.initCols();
    this.wall = this.initWall();
    this.ball = new Ball(100, 100, 'green');
    this.platform = new Platform(
        (this.canvasCtx.canvas.width - config.platform.width)/ 2 ,
        this.canvasCtx.canvas.height - config.platform.height - config.platform.gutterSpace,
        '#0080ff'
    );
}

// Public Methods
Arena.prototype.initCols = function() {
    return Math.floor(this.canvasCtx.canvas.width / (config.brick.width + config.brick.gutterSpace))
}

Arena.prototype.initWall = function() {
    var arr = [];
    for (var row = 0; row < this.rows; row++) {
        arr[row] = [];
        for (var col = 0; col < this.cols; col++) {
            arr[row][col] = true ;
        }
    }
    return arr;
}

Arena.prototype.drawBricks = function() {
    for (var row = 0; row < this.rows; row++) {
        for (var col = 0; col < this.cols; col++) {
            if (this.wall[row][col]) {
                var brick = new Brick(
                    config.brick.gutterSpace + (col * (config.brick.gutterSpace + config.brick.width)),
                    config.brick.gutterSpace + (row * (config.brick.gutterSpace + config.brick.height)),
                    '#fafafa'
                );
                brick.draw(this.canvasCtx);
            }            
        }
    }
}

Arena.prototype.drawPlatform = function() {
    this.platform.draw(this.canvasCtx);
}

Arena.prototype.drawBall = function() {
    this.ball.move(this.canvasCtx);
}

Arena.prototype.ballCollision = function() {
    var ballPos = this.ball.getPosition();
    var ballSpeed = this.ball.getSpeed();
    var futureX = ballPos.x + ballSpeed.deltaX;
    var futureY = ballPos.y + ballSpeed.deltaY;
    if (futureX < config.ball.radius || futureX > this.canvasCtx.canvas.width) {
        this.ball.reverseX();
    }
    if (futureY < config.ball.radius || futureY > this.canvasCtx.canvas.height) {
        this.ball.reverseY();
    }
}

Arena.prototype.runGame = function() {
    this.ballCollision();
    this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
    this.drawBricks();
    this.drawPlatform();
    this.drawBall();
}

Arena.prototype.startGame = function() {
    // this.drawPlatform();
    // this.drawBall();
    setInterval(this.runGame.bind(this), 10);
}

module.exports = Arena;