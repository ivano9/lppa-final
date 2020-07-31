'use strict'

var Player = function() {

  function Player(name, color, orde) {
    this._name = name
    this._color = color
    this._order = order
  }
  
  var proto = Player.prototype
  
  proto.getName = function getName() {
    return this._name
  }
  
  proto.getColor = function getColor() {
    return this._color
  }
  
  proto.getOrder = function getOrder() {
    return this._order
  }
  
  return Player
}()