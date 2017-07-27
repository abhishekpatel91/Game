var config = require('./config');
var Brick = require('./brick');
var Ball = require('./ball');
var Platform = require('./platform');

function Arena(canvasCtx) {
    this.canvasCtx = canvasCtx;
    this.rows = 6;
    this.cols = this.initCols();
    this.wall = this.initWall();
    this.movePlatformR = false;
    this.movePlatformL = false;
    this.ball = new Ball(1100, 400, '#FF4500');
    this.platform = new Platform(
        (this.canvasCtx.canvas.width - config.platform.width)/ 2 ,
        this.canvasCtx.canvas.height - config.platform.height - config.platform.gutterSpace,
        '#0080ff'
    );    
    this.initDOMEvents();
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

Arena.prototype.drawBricks = function(futureX, futureY) {
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

Arena.prototype.drawBall = function() {
    this.ball.move(this.canvasCtx);
}

Arena.prototype.collision = function() {
    var ballPos = this.ball.getPosition();
    var ballSpeed = this.ball.getSpeed();
    var futureX = ballPos.x + ballSpeed.deltaX;
    var futureY = ballPos.y + ballSpeed.deltaY;
    this.wallCollision(futureX, futureY);
    this.platformCollision(futureX, futureY);
    this.brickCollision(futureX, futureY);
}

Arena.prototype.wallCollision = function(futureX, futureY) {
    if (futureX < config.ball.radius || futureX > this.canvasCtx.canvas.width) {
        this.ball.reverseX();
    }
    if (futureY < config.ball.radius || futureY > this.canvasCtx.canvas.height) {
        this.ball.reverseY();
    }
}

Arena.prototype.platformCollision = function(futureX, futureY) {
    if (futureX + config.ball.radius > this.platform.getXPosition() && (futureX - config.ball.radius < this.platform.getXPosition() + config.platform.width) && (futureY + config.ball.radius > this.canvasCtx.canvas.height - config.platform.height - config.platform.gutterSpace)) {
        this.ball.reverseY();
    }
}

Arena.prototype.brickCollision = function(futureX, futureY) {
    var flag = false;
    for (var row = 0; row < this.rows; row++) {
        for (var col = 0; col < this.cols; col++) {
            var leftCollision = (futureX + config.ball.radius) >= (config.brick.gutterSpace + (col * (config.brick.gutterSpace + config.brick.width)));
            var RightCollision = (futureX - config.ball.radius) <= (config.brick.gutterSpace + config.brick.width + (col * (config.brick.gutterSpace + config.brick.width)));
            var topCollsion = (futureY + config.ball.radius) >= (config.brick.gutterSpace + (row * (config.brick.gutterSpace + config.brick.height)));
            var bottomCollsion = (futureY - config.ball.radius) <= (config.brick.gutterSpace + config.brick.height + (row * (config.brick.gutterSpace + config.brick.height)));
            if (this.wall[row][col] && leftCollision && RightCollision && topCollsion && bottomCollsion) {
                this.wall[row][col] = false;
                flag = true;
                break;
            }
        }
        if (flag) {
            break;
        }
    }
    if (flag) {
        this.ball.reverseY();
    }
}

Arena.prototype.movePlatform = function() {
    var platformPos = this.platform.getXPosition();
    var platformSpeed = this.platform.getSpeed();
    if (this.movePlatformR && ((platformPos + platformSpeed + config.platform.width) < (this.canvasCtx.canvas.width))) {
        this.platform.moveRight(this.canvasCtx);
    } else if (this.movePlatformL && ((platformPos - platformSpeed) > 0)) {
        this.platform.moveLeft(this.canvasCtx);
    } else {
        this.platform.draw(this.canvasCtx);
    }
}

Arena.prototype.runGame = function() {
    this.collision();
    this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
    this.drawBricks();
    this.movePlatform();
    this.drawBall();
}

Arena.prototype.startGame = function() {
    setInterval(this.runGame.bind(this), 5);
}

Arena.prototype.initDOMEvents = function() {

    document.addEventListener('keydown', (function(event) {
        switch (event.keyCode) {
            case 37:
                this.movePlatformL = true;
                break;
            case 39:
                this.movePlatformR = true;
                break;
            default:
                return;
        }
    }).bind(this));

    document.addEventListener('keyup', (function(event) {
        this.movePlatformR = false;
        this.movePlatformL = false;
    }).bind(this));
}

module.exports = Arena;