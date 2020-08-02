'use strict'

var validInput = function(value) {
  return value.length > 2
}

var removeElement = function(elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId)
  element.parentNode.removeChild(element)
}

var showMessageError = function(id, text) {
  document.getElementById(id).innerText = text
}