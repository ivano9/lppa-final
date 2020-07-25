'use strict'

var Player = function() {
  var _name, _color
  
  function Player(name, color) {
    _name = name
    _color = color
  }
  
  var proto = Player.prototype
  
  proto.getName = function getName() {
    return _name
  }
  
  proto.getColor = function getColor() {
    return _color
  }
  
  return Player
}()