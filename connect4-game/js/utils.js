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
  document.getElementById(id).style.color = '#ac0a0a'
  document.getElementById(id).innerText = text
}

var isValidEmail = function(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

var isValidName = function(name) {
  var re = /^[a-z0-9]+$/i
  return re.test(name)
}

var isValidContactMessage = function(message) {
  return message.length > 5
}