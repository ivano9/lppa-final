'use strict'
// var colorPicker = new iro.ColorPicker('#picker')
// function onColorChange(color) {
//   console.log(color.hexString)
// }
// colorPicker.on('color:change', onColorChange)

var boardHTML = null
var columnsHTML = null
var currentTurn = null
var colorCount
var playerTurn = [
   null,
   null,
   null
]
var INLINETOWIN = 4

var displayTurn = function(cTurn) {
  var displayTurn = document.getElementById('player-turn')
  return displayTurn.innerHTML = cTurn.getPlayer().getName().toUpperCase() + ' player\'s turn'
}

var toggleTurn = function() {
  if (players.length === 2) currentTurn = (currentTurn.getPlayer().getName() === playerTurn[1].getPlayer().getName()) ? playerTurn[0] : playerTurn[1]
  else {
    switch (currentTurn.getPlayer().getOrder()) {
      case 1: currentTurn = playerTurn[1]
        break
      case 2: currentTurn = playerTurn[2]
        break
      case 3: currentTurn = playerTurn[0]
        break
      default: console.log('Someting was wrong with turns...')
    }
  }
  displayTurn(currentTurn)
}

var gameOver = function(turn) {
  var won = document.getElementById("player-turn")
  var style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet.insertRule('#board {pointer-events: none}');
  won.innerHTML = 'Player ' + turn.getPlayer().getName().toUpperCase() + ' WON!'
}

var columnsCheck = function(col) {
  colorCount = 0
  
  for (var i = 0; i < board[col].length; i++) {
    if (board[col][i] === currentTurn.getPlayer().getColor()) {
      colorCount++
      if (colorCount === INLINETOWIN) throw gameOver(currentTurn)
    } else colorCount = 0
  }
}

var rowsCheck = function(row) {
  colorCount = 0
  
  for (var i = 0; i < columnsHTML.length; i++) {
    if (board[i][row] === currentTurn.getPlayer().getColor()) {
      colorCount++
      if (colorCount === INLINETOWIN) throw gameOver(currentTurn)
    } else colorCount = 0
  }
}

var descDiagCheck = function(col, row) {
  colorCount = 0
  
  for (var i = col, j = row; i >= 0 && i < columnsHTML.length && j >= 0 && j < board[col].length; i++, j--){
    if (board[i][j] === currentTurn.getPlayer().getColor()) {
      colorCount++
      if (colorCount === INLINETOWIN) throw gameOver(currentTurn)
    } else break
  }
  
  for (;col >= 0 && row < board[col].length; col--, row++) {
    if (board[col][row] === currentTurn.getPlayer().getColor()) {
      colorCount++
      if (colorCount === INLINETOWIN + 1) throw gameOver(currentTurn)
    } else return
  }
  
}

var ascDiagCheck = function(col, row) {
  colorCount = 0
  
  for (
     var i = (col - row < 0) ? 0 : col - row, j = (row - col < 0) ? 0 : row - col;
     i >= 0 && i < columnsHTML.length && j >= 0 && j < board[col].length;
     i++, j++
  ) {
    if (board[i][j] === currentTurn.getPlayer().getColor()) {
      colorCount++
      if (colorCount === INLINETOWIN) throw gameOver(currentTurn)
    } else colorCount = 0
  }
  
  // if (colorCount < INLINETOWIN) colorCount = 0
}

var CheckWin = function(col, row) {
  // Columns Check
  columnsCheck(col)
  
  // Rows Check
  rowsCheck(row)
  
  // Descending Diagonal Check
  descDiagCheck(col, row)
  
  // Ascending Diagonal Check
  ascDiagCheck(col, row)
}

var columnEventHandler = function(evt) {
  var columnId = +evt.target.id.substr(1, 1)
  for (var i = 0; i < board[columnId].length; i++) {
    if (!board[columnId][i]) {
      board[columnId][i] = currentTurn.getPlayer().getColor()
      render()
      CheckWin(columnId,i)
      toggleTurn()
      break
    }
  }
}

var bindColumnHandlers = function() {
  columnsHTML = document.getElementsByClassName('column')
  for (var i = 0; i < columnsHTML.length; i++) {
    columnsHTML[i].onclick = columnEventHandler
  }
}

var render = function() {
  var html = ''
  for (var i = 0; i < board.length; i++) {
    html += '<div id="c' + i + '" class="column">'
    for (var j = board[i].length - 1; j >= 0; j--) {
      html += '<div id="s' + i + j + '" class="spot'
      if (board[i][j]) html += ' ' + board[i][j]
      html += '"></div>'
    }
    html += '</div>'
  }
  boardHTML.innerHTML = html
  bindColumnHandlers()
}

var startPlayerTurn = function() {
  for (var i = 0; players[i]; i++)
    playerTurn[i] = new Turn(players[i])
  
  if (players.length === 2) currentTurn = Math.random() > .5 ? playerTurn[0] : playerTurn[1]
  else currentTurn = (Math.random() >= 0 && Math.random() < .333333333) ? playerTurn[0] :
                  (Math.random() >= .333333333 && Math.random() < .666666666) ? playerTurn[1] : playerTurn[2]
}

var startGame = function() {
  boardHTML = document.getElementById('board')
  startPlayerTurn()
  displayTurn(currentTurn)
  checkLSSupport()
  render()
}