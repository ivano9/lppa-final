'use strict'

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

var addLSButtons = function() {
  var slButtons = document.getElementById('sl-btn')
  slButtons.style.display = 'block'
  saveGameEvent()
  loadGameEvent()
}

var saveGame = function() {
    var currentGame = {
      board: board,
      players: [
        {
          name: turnP1.getPlayer().getName(),
          color: turnP1.getPlayer().getColor(),
          order: turnP1.getPlayer().getOrder(),
          time: turnP1.getTime(),
          turnCount: turnP1.getTurnCount()
        },
        {
          name: turnP2.getPlayer().getName(),
          color: turnP2.getPlayer().getColor(),
          order: turnP2.getPlayer().getOrder(),
          time: turnP2.getTime(),
          turnCount: turnP2.getTurnCount()
        },
        {
          name: turnP3.getPlayer().getName(),
          color: turnP3.getPlayer().getColor(),
          order: turnP3.getPlayer().getOrder(),
          time: turnP3.getTime(),
          turnCount: turnP3.getTurnCount()
        }
      ],
      cTurn: currentTurn.getPlayer().getName(),
      dateNow: new Date().toLocaleString("en-GB")
    }
  
    localStorage.setObj('saveTurn - ' + 1 , currentGame)
}

var loadGame = function() {
  board = localStorage.getObj('saveTurn - 1').board
  var lsKey = localStorage.getItem('saveTurn - 1')
  var pName =  lsKey.players[0].name
  var pColor = lsKey.players[0].color
  var pOrder = lsKey.players[0].order
  var pTime = lsKey.players[0].time
  var pTurnCount = lsKey.players[0].turnCount
  
  player.one = new Player(localStorage.getItem('saveTurn - 1').players, 'red', ++order)
  player.two = new Player(nameP2, 'yellow', ++order)
  player.three = new Player(nameP3, 'blue', ++order)
  
  
  console.log(currentTurn)
  displayTurn(currentTurn)
  render()
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