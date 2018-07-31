var x = 0
var y = 0
var leftKey = false


var xListeners = []

function addXChangeListener(listener) {
    listener(x)
    xListeners.push(listener)
}

var yListeners = []

function addYChangeListener(listener) {
    listener(y)
    yListeners.push(listener)
}

document.body.onmousemove = function(event) {
    var newX = event.clientX

    for(var i in xListeners)
        xListeners[i](newX, x)

    x = newX

    var newY = event.clientY

    for(var i in yListeners)
        yListeners[i](newY, y)

    y = newY
}

var leftKeyListeners = []

function addLeftKeyChangeListener(listener) {
    listener(leftKey)
    leftKeyListeners.push(listener)
}

document.body.onmousedown = function() {
    leftKey = true

    for(var i in leftKeyListeners)
        leftKeyListeners[i](leftKey)
}

document.body.onmouseup = function() {
    leftKey = false

    for(var i in leftKeyListeners)
        leftKeyListeners[i](leftKey)
}

module.exports = {
    x:       x,
    y:       y,
    leftKey: leftKey,

    addXChangeListener:       addXChangeListener,
    addYChangeListener:       addYChangeListener,
    addLeftKeyChangeListener: addLeftKeyChangeListener
}