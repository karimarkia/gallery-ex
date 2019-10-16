const BOMB = '💣'
const FLAG = '⚑'
const SMILE = '🙂'
const SAD = '😔'
const WIN = '😎'

var second = 0,minute = 0
var timer = document.querySelector('.displayTime');
var isStart = false;
var elTime= document.querySelector('.bestTime span')
var elBoard = document.querySelector('.board');
var elMode = document.querySelector('.mode')
var gEndGameCell;
var life = 3;
var secondsCount=0
var LOCAL_KEY = 'MineSweeper'
var gCurrentLevel;
var gSafeClickCell;

// The Data Model
var gBoard;
var gLevel = [{
        level: 'beginner',
        SIZE: 4,
        MINES: 2,
    },
    {
        level: 'medium',
        SIZE: 8,
        MINES: 12,
    },
    {
        level: 'expert',
        SIZE: 12,
        MINES: 30,
    },
];

function init(size) {
    gCurrentLevel = Object.assign({}, gLevel.find(function (lvl) {
        return lvl.SIZE === size
    }))
    gBoard = buildBoard(gCurrentLevel.SIZE);
    elMode.innerText = SMILE
    renderBoard()
}

function buildBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            var content = {
                minesAroundCount: 0,
                isShown: false,
                isMarked: false,
                isMine: false
            };
            board[i][j] = content
        }
    }
    return board;
}
function renderBoard() {
    var board = gBoard
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cellData = board[i][j];
            var isEndGameCell = checkEndGameCell(i,j)
            var isSafeClickCell = checkSafeClickedCell(i,j)
            var strData = `class="${cellData.isShown? 'shown' : ''} ${isEndGameCell? 'end-game-cell' : ''} ${isSafeClickCell?  'hinted':''}"`;
            strHTML += ` <td ${strData} onclick="cellClicked(${i}, ${j})" oncontextmenu="cellMarked(${i}, ${j})"> `;
            if(cellData.isMarked) strHTML += FLAG
            else if(cellData.isShown){
                if (cellData.isMine) strHTML += BOMB
                else if (cellData.minesAroundCount > 0) strHTML += cellData.minesAroundCount
            } 
            strHTML += '</td>';
        }
        strHTML += '</tr>'
    }
    elBoard.innerHTML = strHTML;
}

function insertMines(croods) {
    for (var z = 0; z < gCurrentLevel.MINES; z++) {
        var crood = getRandomCrood(croods)
        gBoard[crood.i][crood.j].isMine = true
    }
}

function getRandomCrood(croods) {
    var size = gCurrentLevel.SIZE
    var i = getRandomInt(0, size-1)
    var j = getRandomInt(0, size-1)
    if(i === croods.i && j === croods.j) return getRandomCrood(croods)
    else if(gBoard[i][j].isMine) return getRandomCrood(croods)
    else return {i, j}
}

function insertNegborsCount(croods) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (i === croods.i && j === croods.j) {
                gBoard[i][j].isMine = false
                gBoard[i][j].isShown = true
            } else {
                gBoard[i][j].minesAroundCount = countNeighbors(i, j)
            }
        }
    }
}


function countNeighbors(cellI, cellJ) {
    var mat = gBoard
    //The strData return a string , so here i convert it to number (int)
    var cellI = Number(cellI)
    var cellJ = Number(cellJ)
    var neighborsCount = mat[cellI][cellJ].minesAroundCount;
    //I check the neighbors manual because i hade alot of bugs with the short function 
    var nebOpt = [{
            i: cellI - 1,
            j: cellJ - 1,
        },
        {
            i: cellI,
            j: cellJ - 1,
        },
        {
            i: cellI + 1,
            j: cellJ - 1,
        },
        {
            i: cellI + 1,
            j: cellJ,
        },
        {
            i: cellI + 1,
            j: cellJ + 1,
        },
        {
            i: cellI,
            j: cellJ + 1,
        },
        {
            i: cellI - 1,
            j: cellJ + 1,
        },
        {
            i: cellI - 1,
            j: cellJ
        },
    ]
    for (var z = 0; z < nebOpt.length; z++) {
        var opt = nebOpt[z];
        var i = opt.i
        var j = opt.j
        if (i < 0 || i >= mat.length) continue;
        if (j < 0 || j >= mat[0].length) continue;
        if (i === cellI && j === cellJ) continue;
        var cellData = mat[i][j]
        if (cellData.isMine) {
            neighborsCount++
        };
    }
    return neighborsCount
}

function expandShown(cellI, cellJ) {
    var mat = gBoard
    var cellI = Number(cellI)
    var cellJ = Number(cellJ)
    var nebOpt = [{
            i: cellI - 1,
            j: cellJ - 1,
        },
        {
            i: cellI,
            j: cellJ - 1,
        },
        {
            i: cellI + 1,
            j: cellJ - 1,
        },
        {
            i: cellI + 1,
            j: cellJ,
        },
        {
            i: cellI + 1,
            j: cellJ + 1,
        },
        {
            i: cellI,
            j: cellJ + 1,
        },
        {
            i: cellI - 1,
            j: cellJ + 1,
        },
        {
            i: cellI - 1,
            j: cellJ
        },
    ]

    for (var z = 0; z < nebOpt.length; z++) {
        var opt = nebOpt[z];
        var i = opt.i
        var j = opt.j
        if (i < 0 || i >= mat.length) continue;
        if (j < 0 || j >= mat[0].length) continue;
        if (i === cellI && j === cellJ) continue;
        var cellData=gBoard[i][j]

        if(cellData.minesAroundCount === 0 && !cellData.isMine && !cellData.isMarked && !cellData.isShown ) {
            gBoard[i][j].isShown = true
            //recursive function to show the empty cells
            expandShown(i,j)
        }
        else if(!cellData.isMine) gBoard[i][j].isShown = true
    }
}

function safeClick() {
    var croods = getRandomeCellSafeClick()
    if(!croods) return
    gSafeClickCell = croods
    setTimeout(() => {
        gSafeClickCell = null;
        renderBoard()
    },2000)
    renderBoard()
}

function getRandomeCellSafeClick() {
    var size = gCurrentLevel.SIZE
    var mines = gCurrentLevel.MINES
    var i = getRandomInt(0, size-1)
    var j = getRandomInt(0, size-1)
    var shownCount = countShown()
    if((size * size) === (shownCount + mines)){
        return false
    }
    if(gBoard[i][j].isMine || gBoard[i][j].isShown) return getRandomeCellSafeClick()
    else return {i, j}


}

function countShown(){
    var count = 0
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            const cellData = gBoard[i][j];
            if(cellData.isShown) count++
        }
    }
    return count
}

function countMarked(){
    var count = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cellData = gBoard[i][j];
            if(cellData.isMarked) count++
        }
    }
    return count
}

function cellClicked(i, j) {
    var cellData = gBoard[i][j]
    if(cellData.isMarked) return;
    gBoard[i][j].isShown = true

    if (!isStart) {
        startTimer();
        isStart = true;
        insertMines({ i, j })
        insertNegborsCount({ i, j })
    }
    if (cellData.isMine) {
        life--
        alert('You hit a mine , u have '+ life + ' life ')
     if(life === 0 ){
        gEndGameCell= { i, j }
        showAllCells()
        checkGameOver()
        secondsCount=second
        }
    }
    bestTime()
    expandShown(i,j)
    checkGameWin()
    renderBoard()
}



function showAllCells() {
    for (var i = 0; i < gBoard.length; i++) {
       for (var j= 0; j < gBoard[0].length; j++) {
           gBoard[i][j].isShown = true
           gBoard[i][j].isMarked = false
       }
    }
}


function checkGameOver() {
    clearInterval(interval);
    isStart = false;
    elMode.innerHTML = SAD
}

function cellMarked(i, j) {
    var countFlag = countMarked()
    if(countFlag == gCurrentLevel.MINES && !gBoard[i][j].isMarked) return 
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked 
    checkGameWin()
    renderBoard()
}


function checkEndGameCell(i,j){
    if(!gEndGameCell) return false
    if(i === gEndGameCell.i && j === gEndGameCell.j) return true
    return false
}

function checkSafeClickedCell(i,j){
    if(!gSafeClickCell) return false
    if(i === gSafeClickCell.i && j === gSafeClickCell.j) return true
    return false
}

function checkGameWin() {
    var flags = countMarked()
    var shown = countShown()
    var size = gCurrentLevel.SIZE
    var isGameWon =  size * size === flags + shown
    if(isGameWon) winGame()
}
function winGame() {
    elMode.innerHTML =WIN
    clearInterval(interval);
}

function resetBtn() {
    elMode.innerText = SMILE
    isStart = false;
    life=3
    second = 0,minute = 0;
    clearInterval(interval);
    timer.innerHTML = minute + ' Mins ' + second + ' Secs';
    gBoard = buildBoard(gCurrentLevel.SIZE);
    renderBoard()
}


function bestTime() {
    localStorage.setItem(LOCAL_KEY,String(secondsCount));
    if(second > secondsCount) { localStorage.setItem(LOCAL_KEY,String(second));}
    elTime.innerHTML=secondsCount
}
