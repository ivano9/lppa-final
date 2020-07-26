'use strict'

var Player = function() {

  function Player(name, color) {
    this._name = name
    this._color = color
  }
  
  var proto = Player.prototype
  
  proto.getName = function getName() {
    return this._name
  }
  
  proto.getColor = function getColor() {
    return this._color
  }
  
  return Player
}()