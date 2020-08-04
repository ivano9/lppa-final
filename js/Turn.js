'use strict'

var Turn = function() {
  
  function Turn(player) {
    this._player = player
    this._time = 0
  }
  
  var proto = Turn.prototype
  
  proto.getTime = function getTime() {
    return this._time
  }
  
  proto.getPlayer = function getPlayer() {
    return this._player
  }
  
  proto.setTime = function setTime(time) {
    this._time = time
  }
  
  return Turn
}()