'use strict';

import styles from '../less/main.less';

var Arena = require('./arena');

var canvas = document.getElementById('arena');
var container = document.getElementById('container');

canvas.setAttribute('width', container.offsetWidth);
canvas.setAttribute('height', container.offsetHeight);

var ctx = canvas.getContext('2d');
var arena = new Arena(ctx);

arena.startGame();