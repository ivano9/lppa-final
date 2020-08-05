'use strict'

var mSavedGames = null

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

var storageAvailable = function(type) {
  try {
    var storage = window[type],
        x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  }
  catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
  }
}

var clearBoard = function() {
  var btn = document.getElementById('btn-clean-board')
  btn.onclick = function() {
    for (var i = 0; i < board.length; i++){
      for (var j = 0; j < board[0].length; j++) {
        board[i][j] = null
      }
    }
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

var addLSButtons = function() {
  var buttonsLS = document.getElementById('sl-btn'),
      buttonsCR = document.getElementById('cr-btn')
  
  buttonsLS.style.display = 'block'
  buttonsCR.style.display = 'block'
  
  saveGameEvent()
  loadGameEvent()
  clearBoard()
  restartGame()
}

var setAvailableKey = function() {
  var keys = Object.keys(localStorage),
      labelKey = 'saveTurn #', ids = []
  
  if (keys.length === 0) return labelKey + 0
  
  for (var k = 0; k < keys.length; k++)
    ids.push(+keys[k].match(/\d+/)[0])
  
  return labelKey + (Math.max(...ids) + 1)
}

var saveGame = function() {
  var currentGame = {
    board: board,
    moves: moves,
    players: [],
    cTurn: currentTurn.getPlayer().getName(),
    dateNow: new Date().toLocaleString("en-GB")
  }
  
  for (var i = 0; i < playerTurn.length; i++){
    currentGame.players.push({
        name: playerTurn[i].getPlayer().getName(),
        color: playerTurn[i].getPlayer().getColor(),
        order: playerTurn[i].getPlayer().getOrder(),
        min: playerTurn[i].getMin(),
        sec: playerTurn[i].getSec()
      }
    )
  }
  
  localStorage.setObj(setAvailableKey(), currentGame)
}

var loadingPoint = function(linkId) {
  var LSKey = localStorage.getObj(linkId)
  COLUMNS = LSKey.board.length
  ROWS = LSKey.board[0].length
  board = LSKey.board
  moves = LSKey.moves
  players = []
  playerTurn = []
  for (var i = 0; i < LSKey.players.length; i++) {
    players.push(new Player(LSKey.players[i].name, LSKey.players[i].color, LSKey.players[i].order))
    playerTurn.push(new Turn(players[i]))
    playerTurn[i].setMin(LSKey.players.min)
    playerTurn[i].setSec(LSKey.players.sec)
  }
  
  for (var i = 0; i < playerTurn.length; i++)
    if (LSKey.cTurn === playerTurn[i].getPlayer().getName()) currentTurn = playerTurn[i]
  
  mSavedGames.style.display = 'none'
  
  displayTurn(currentTurn)
  render()
}

var linkEventHandler = function(evt) {
  loadingPoint(evt.target.id)
}

var mouseOverLinkHandler = function() {
  var links = document.getElementsByClassName('link-storage')
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = linkEventHandler
  }
}

var showModalSavedGame = function() {
  var LSKeys = Object.keys(localStorage),
      html = ''
  
  mSavedGames = document.getElementById('modal-games')
  
  html += '<div id="modal-list" class="modal-content-ls">'
  html += '<p>Saved game points</p>'
  html += '<hr>'
  html += '<div class="list-sg">'
  for (var i = 0; i < LSKeys.length; i++) {
    html += '<a id="' + LSKeys[i] + '" class="link-storage" href="#">' + LSKeys[i] + ' - ' + localStorage.getObj(LSKeys[i]).dateNow + '</a>'
  }
  html += '</div>'
  html += '<button id="btn-close" class="btn" type="button">Close</button>'
  html += '</div>'
  mSavedGames.innerHTML = html
  mSavedGames.style.display = 'block'
  
  var btnClose = document.getElementById('btn-close')
  btnClose.onclick = function() {
    mSavedGames.style.display = 'none'
  }
}

var loadGame = function() {
  showModalSavedGame()
  mouseOverLinkHandler()
}

var saveGameEvent = function() {
  var sGameBtn = document.getElementById('btn-save')
  sGameBtn.onclick = saveGame
}

var loadGameEvent = function() {
  var lGameBtn = document.getElementById('btn-load')
  lGameBtn.onclick = loadGame
}

var checkLSSupport = function() {
  if (storageAvailable('localStorage')) addLSButtons()
  else console.log('Your browser does not support Local Storage')
}