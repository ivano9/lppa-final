'use strict'

var buildFooter = function() {
  var footer = document.querySelector('.footer')
  var html = ''
  
  html += '<button id="btn-contact" class="button">Contact Us</button>'
  html += '<div class="modal-contact enclose">'
  html += '<div class="modal-content-contact">'
  html += '<p class="tied-game">Contact Us</p>'
  html += '<hr>'
  html += '<p id="contact-message-error"></p>'
  html += '<form id="form-contact" class="contact-form" action="">'
  html += '<div class="form-elements">'
  html += '<input class="contact-input" type="text" placeholder="Name" autocomplete="off">'
  html += '<input class="contact-input" type="email" placeholder="Email" autocomplete="off">'
  html += '</div>'
  html += '<textarea id="comment" class="form-elements contact-input" placeholder="Message..." name="comment"' +
     ' cols="30"' +
     ' rows="5"></textarea>'
  html += '<div id="btns" class="form-elements">'
  html += '<button id="btn-contact-submit" class="btn" type="submit">Send</button>'
  html += '<button id="btn-close-contactus" class="btn" type="button">Close</button>'
  html += '</div>'
  html += '</form>'
  html += '</div>'
  html += '</div>'
  
  footer.innerHTML = html
}

var showModalContact = function() {
  document.querySelector('.modal-contact').style.display = 'block'
}

var sendMessage = function(e) {
  e.preventDefault()
  
  var inputs = document.querySelectorAll('.contact-input'),
      errors = ''
  
  for (var i = 0; i < inputs.length; i++) {
    switch (inputs[i].type) {
      case 'email': errors += (!isValidEmail(inputs[i].value)) ? ' The email is not vaild.' : ''
        break
      case 'text': errors += (!isValidName(inputs[i].value) || !validInput(inputs[i].value)) ? ' The name must have 3 or more characters and must be alphanumeric.' : ''
        break
      case 'textarea': errors += (!isValidContactMessage(inputs[i].value)) ? ' The message must have 5 or more characters.' : ''
        break
    }
  }

  if (errors.length > 0) return showMessageError('contact-message-error', errors)
  else return window.open('mailto:connect4Game@email.com')
}

var closeContactModal = function () {
  document.querySelector('#contact-message-error').textContent = ''
  document.querySelector('.modal-contact').style.display = 'none'
  var inputs = document.querySelectorAll('.contact-input')
  for (var k = 0; k < inputs.length; k++) inputs[k].value = ''
}

var contactUs = function() {
  buildFooter()
  var btnContact = document.querySelector('#btn-contact'),
      btnSubmit = document.querySelector('#form-contact'),
      btnClose = document.querySelector('#btn-close-contactus')
  
  btnContact.onclick = showModalContact
  btnSubmit.onsubmit = sendMessage
  btnClose.onclick = closeContactModal
}