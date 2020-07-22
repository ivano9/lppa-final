var modal = null
var setUpGame = function (e) {
    e.preventDefault()
    modal.style.display = 'none'
}

var modalExec = function () {
    modal = document.getElementById('iModal')
    modal.style.display = 'block'

    var form = document.getElementById('form')
    form.onsubmit = setUpGame
}
