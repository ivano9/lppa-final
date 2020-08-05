'use strict'
var stopTimer = false

var displayTimer = function(minutes, seconds) {
  var timer = document.getElementById('timer'),
      html = ''

  html += '<label id="min">' + minutes + '</label>'
  html += ':'
  html += '<label id="sec">' + seconds + '</label>'

  timer.innerHTML = html
  startTimer(minutes, seconds)
}

var pad = function (val) {
  var valString = val + ""
  return (valString.length < 2) ? "0" + valString : valString
}

var startTimer = function(min, secs) {
  var minutesLabel = document.getElementById("min"),
      secondsLabel = document.getElementById("sec"),
      totalSeconds = secs
  
  var setTime = function () {
    if (stopTimer) clearInterval(countUpTimer)

    ++totalSeconds
    secondsLabel.innerHTML = pad(totalSeconds % 60)
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60) + +min.substring(min.length - 1, min.length))
    
    currentTurn.setSec(pad(totalSeconds % 60))
    currentTurn.setMin(pad(parseInt(totalSeconds / 60)))
  }
  
  var countUpTimer = setInterval(setTime, 1000)
}
