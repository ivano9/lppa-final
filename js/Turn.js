'use strict'

var Turn = function() {
  
  function Turn(player) {
    this._player = player
    this._min = '00'
    this._sec = '00'
  }
  
  var proto = Turn.prototype
  
  proto.getMin = function getMin() {
    return this._min
  }
  
  proto.getSec = function getSec() {
    return this._sec
  }
  
  proto.getPlayer = function getPlayer() {
    return this._player
  }
  
  proto.setMin = function setMin(min) {
    this._min = min
  }
  
  proto.setSec = function setSec(sec) {
    this._sec = sec
  }
  
  return Turn
}()