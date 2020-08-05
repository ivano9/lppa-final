'use strict'

var modal = null,
    radio2 = null,
    radio3 = null,
    COLUMNS = 7,
    ROWS = 6,
    board = [],
    players = [],
    colors = ['b3d4fc', 'edf055', 'ab22f1']

var createBoard = function() {
  for (var i = 0; i < COLUMNS; i++) {
    board[i] = new Array(ROWS)
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
    if (!validInput(inputPlayers[i].value)) return showMessageError('message-e', 'The name must have 3 character or more')

  for (var i = 0; i < inputPlayers.length; i++)
    players.push(new Player(inputPlayers[i].value, colors[i], ++order))
  
  createBoard()
  startGame()
  modal.style.display = 'none'
}

var showInput3Players = function() {
  var numberPlayers = document.getElementById('players-to-play'),
      numberOfInputs = document.querySelectorAll('input.in-player'),
      html = ''
  
  if (numberOfInputs.length < 3) {
    html += '<div id="l-p-3" class="label-input">'
    html += '<label id="l3" class="label" for="p3">Name of player 3: </label>'
    html += '<input id="p3" class="in-player" type="text" required> </div>'
    numberPlayers.innerHTML += html
    numberPlayers.style.display = 'block'
  }
}

var showInput2Players = function() {
  var numberPlayers = document.getElementById('players-to-play'),
      numberOfInputs = document.querySelectorAll('input.in-player')
  
  for (var i = 0; i < numberOfInputs.length; i++)
    numberOfInputs[i].value = ''
  
  if (numberOfInputs.length > 2) {
    removeElement('l-p-3')
  }
  
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
