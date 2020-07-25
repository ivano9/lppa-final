// var colorPicker = new iro.ColorPicker('#picker')
// function onColorChange(color) {
//   console.log(color.hexString)
// }
// colorPicker.on('color:change', onColorChange)

var boardHTML = null
var columnsHTML = null
var colorCount
var turn = ''
var INLINETOWIN = 4

var displayTurn = function(turn) {
  var displayTurn = document.getElementById('player-turn')
  return displayTurn.innerHTML = turn.toUpperCase() + ' player\'s turn'
}

var toggleTurn = function() {
  turn = (turn === 'yellow') ? 'red' : 'yellow'
  displayTurn(turn)
}

var gameOver = function(turnColor) {
  var won = document.getElementById("player-turn")
  var style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet.insertRule('#board {pointer-events: none}');
  won.innerHTML = 'Player ' + turnColor.toUpperCase() + ' WON!'
}

var columnsCheck = function(col) {
  colorCount = 0
  
  for (var i = 0; i < board[col].length; i++) {
    if (board[col][i] === turn) {
      colorCount++
      if (colorCount === INLINETOWIN) throw gameOver(turn)
    } else colorCount = 0
  }
}

var rowsCheck = function(row) {
  colorCount = 0
  
  for (var i = 0; i < columnsHTML.length; i++) {
    if (board[i][row] === turn) {
      colorCount++
      if (colorCount === INLINETOWIN) throw gameOver(turn)
    } else colorCount = 0
  }
}

var descDiagCheck = function(col, row) {
  colorCount = 0
  
  for (var i = col, j = row; i >= 0 && i < columnsHTML.length && j >= 0 && j < board[col].length; i++, j--){
    if (board[i][j] === turn) {
      colorCount++
      if (colorCount === INLINETOWIN) throw gameOver(turn)
    } else break
  }
  
  for (;col >= 0 && row < board[col].length; col--, row++) {
    if (board[col][row] === turn) {
      colorCount++
      if (colorCount === INLINETOWIN + 1) throw gameOver(turn)
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
    if (board[i][j] === turn) {
      colorCount++
      if (colorCount === INLINETOWIN) throw gameOver(turn)
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
      board[columnId][i] = turn
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

var startGame = function() {
  boardHTML = document.getElementById('board')
  turn = Math.random() > 0.5 ? 'yellow' : 'red'
  displayTurn(turn)
  render()
}