'use strict';
var WALL = '*';
var FOOD = '.';
var EMPTY = ' ';
var POWER = '🍕';
var CHERRY = '🍒'

var count = 0
var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

var resetBtn = document.querySelector('.reset')
var gmOver = document.querySelector('.over span')
var gmWin = document.querySelector('.win span')

var time = setInterval(() => {
  rndCherry()
}, 15000);


function init() {
  gBoard = buildBoard();
  resetBtn.style.display = 'none';
  gmOver.style.display = 'none';
  gmWin.style.display = 'none';
  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  gGame.isOn = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
      if (i === 1 && j === 1 || i === 8 && j === 1 || i === 1 && j === 8 || i === 8 && j === 8) {
        board[i][j] = POWER;
      }
    }
  }
  return board;
}

// Update both the model and the dom for the score
function updateScore(value) {
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
  if (gGame.score === 60) {
    gGame.isOn = false;
    gmWin.style.display = 'block';
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    clearInterval(time)
  }
}

function gameOver() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  clearInterval(time)
  resetBtn.style.display = 'block';
  gmOver.style.display = 'block';
}

function resetBtn() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  gGame = {
    score: 0,
    isOn: false
  };
}

function rndCherry() {
  var i = getRandomInt(1, 7)
  var j = getRandomInt(1, 7)
  if (gBoard[i][j] === EMPTY) {
    gBoard[i][j] = CHERRY
    renderCell({
      i,
      j
    }, CHERRY)
  }
}