'use strict'
// var colorPicker = new iro.ColorPicker('#picker')
// function onColorChange(color) {
//   console.log(color.hexString)
// }
// colorPicker.on('color:change', onColorChange)

var boardHTML = null
var columnsHTML = null
var colorCount
var currentTurn = null
var turnP1 = null
var turnP2 = null
var turnP3 = null
var INLINETOWIN = 4

var displayTurn = function(turn) {
  var displayTurn = document.getElementById('player-turn')
  return displayTurn.innerHTML = turn.getPlayer().getName().toUpperCase() + ' player\'s turn'
}

var toggleTurn = function() {
  if (player.three === null) currentTurn = (currentTurn.getPlayer().getName() === turnP2.getPlayer().getName()) ? turnP1 : turnP2
  else {
    switch (currentTurn.getPlayer().getOrder()) {
      case 1: currentTurn = turnP2
        break
      case 2: currentTurn = turnP3
        break
      case 3: currentTurn = turnP1
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

var numberOfPlayers = function() {
  if (player.three === null) {
    turnP1 = new Turn(player.one)
    turnP2 = new Turn(player.two)
  
    currentTurn = Math.random() > .5 ? turnP1 : turnP2
  } else {
    turnP1 = new Turn(player.one)
    turnP2 = new Turn(player.two)
    turnP3 = new Turn(player.three)
    
    currentTurn = (Math.random() >= 0 && Math.random() < .33) ? turnP1 :
                  (Math.random() >= .33 && Math.random() < .66) ? turnP2 : turnP3
  }
}

var startGame = function() {
  boardHTML = document.getElementById('board')
  numberOfPlayers()
  displayTurn(currentTurn)
  render()
}