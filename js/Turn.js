'use strict'

var Turn = function() {
  
  function Turn(player) {
    this._player = player
    this._time = 0
    this._turnCount = 0
  }
  
  var proto = Turn.prototype
  
  proto.getTime = function getTime() {
    return this._time
  }
  
  proto.getPlayer = function getPlayer() {
    return this._player
  }
  
  proto.getTurnCount = function getTurnCount() {
    return this._turnCount
  }
  
  proto.setTime = function setTime(time) {
    this._time = time
  }
  
  proto.setTurnCount = function setTurnCount() {
    this._turnCount++
  }
  
  return Turn
}()