'use strict'

var modal = null,
    radio2 = null,
    radio3 = null,
    COLUMNS = 7,
    ROWS = 6,
    board = [],
    players = [],
    colors = ['FF0000', '00FF00', '0000FF']

var createBoard = function() {
  for (var i = 0; i < COLUMNS; i++)
    board[i] = new Array(ROWS)
}

var clearBoard = function() {
  var btn = document.getElementById('btn-clean-board')
  btn.onclick = function() {
    for (var i = 0; i < board.length; i++)
      for (var j = 0; j < board[0].length; j++)
        board[i][j] = null
    
    moves = 0
    boardHTML.style.pointerEvents = 'all'
    render()
  }
}

var restartGame = function() {
  var btn = document.getElementById('btn-restart-game')
  btn.onclick = function() {
    location.reload()
  }
}

var setUpGame = function(e) {
  e.preventDefault()
  var order = 0
  
  if (radio3.checked) {
    COLUMNS = 10
    ROWS = 9
  }
  
  var inputPlayers = document.querySelectorAll('input.in-player')
  
  for (var i = 0; i < inputPlayers.length; i++)
    if (!validInput(inputPlayers[i].value) || !isAWordWOWitheSpaces(inputPlayers[i].value))
      return showMessageError('message-e', 'The name must not contain any numbers or white spaces and must be at' +
         ' least 3 characters.')

  for (var i = 0; i < inputPlayers.length; i++)
    players.push(new Player(inputPlayers[i].value, colors[i], ++order))
  
  document.getElementById('cr-btn').style.display = 'block'
  
  createBoard()
  startGame()
  clearBoard()
  restartGame()
  contactUs()
  modal.style.display = 'none'
}

var btnEventHandler = function() {
  var html = ''
  
  // TODO modal for where show palet of colors
  // var colorPicker = new iro.ColorPicker('#picker')
  // function onColorChange(color) {
  //   console.log(color.hexString)
  // }
  // colorPicker.on('color:change', onColorChange)
}

var bindButtonsColorsHandlers = function() {
  var btnsColors = document.querySelectorAll('.btn')
  for (var i = 0; i < btnsColors.length; i++)
    btnsColors[i].onclick = btnEventHandler
}

var showInput3Players = function() {
  var numberPlayers = document.getElementById('players-to-play'),
      numberOfInputs = document.querySelectorAll('input.in-player'),
      html = ''
  
  if (numberOfInputs.length < 3) {
    html += '<div id="l-p-3" class="label-input">'
    html += '<label id="l3" class="label" for="p3">Name of player 3: </label>'
    html += '<input id="p3" class="in-player" type="text" required>'
    html += '<button class="btn" type="button" required>Pick color</button> </div>'
    numberPlayers.innerHTML += html
    numberPlayers.style.display = 'block'
  }
}

var showInput2Players = function() {
  var numberPlayers = document.getElementById('players-to-play'),
      numberOfInputs = document.querySelectorAll('input.in-player')
  
  for (var i = 0; i < numberOfInputs.length; i++)
    numberOfInputs[i].value = ''
  
  if (numberOfInputs.length > 2) removeElement('l-p-3')
  
  numberPlayers.style.display = 'block'
}

var modalExec = function() {
  modal = document.getElementById('i-modal')
  modal.style.display = 'block'
  radio2 = document.getElementById('n2')
  radio3 = document.getElementById('n3')
  radio2.onclick = showInput2Players
  radio3.onclick = showInput3Players
  var form = document.getElementById('form')
  form.onsubmit = setUpGame
}
