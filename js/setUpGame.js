'use strict'

var modal = null
var radio2 = null
var radio3 = null
var COLUMNS = 7
var ROWS = 6
var board = []

var createBoard = function() {
  for (var i = 0; i < COLUMNS; i++) {
    board[i] = new Array(ROWS)
  }
}

var setUpGame = function(e) {
  e.preventDefault()
  
  if (radio3.checked) {
    COLUMNS = 10
    ROWS = 9
    
    var nameP1 = document.getElementById('p1').value
    var nameP2 = document.getElementById('p2').value
    var nameP3 = document.getElementById('p3').value
    
    if (validInput(nameP1) && validInput(nameP2) && validInput(nameP3)) {
      var player1 = new Player(nameP1, 'red')
      var player2 = new Player(nameP2, 'yellow')
      var player2 = new Player(nameP3, 'brown')
    } else {
      //TODO error message function messageError()
    }
  } else {
    var nameP1 = document.getElementById('p1').value
    var nameP2 = document.getElementById('p2').value
  
    if (validInput(nameP1) && validInput(nameP2)) {
      //TODO
    }
  }
  
  createBoard()
  startGame()
  modal.style.display = 'none'
}

var showInput3Players = function() {
  var numberPlayers = document.getElementById('players-to-play')
  var numberPlayersClass = document.getElementsByClassName('in-player')
  
  if (numberPlayersClass.length < 3) {
    numberPlayers.innerHTML += '<label id="l3" class="label" for="p3">Name of player 3:</label>' +
       '<input id="p3" class="in-player" type="text" required>'
    numberPlayers.style.display = 'block'
  }
}

var showInput2Players = function() {
  var numberPlayers = document.getElementById('players-to-play')
  var numberPlayersClass = document.getElementsByClassName('in-player')
  
  if (numberPlayersClass.length > 2) {
    removeElement('l3')
    removeElement('p3')
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
