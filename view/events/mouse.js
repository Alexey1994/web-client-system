var values = {
    x:         0,
    y:         0,
    leftKey:   false,
    middleKey: false,
    rightKey:  false
}

var xListeners = []

function addXChangeListener(listener) {
    listener(values.x)
    xListeners.push(listener)
}

var yListeners = []

function addYChangeListener(listener) {
    listener(values.y)
    yListeners.push(listener)
}

document.body.onmousemove = function(event) {
    var newX = event.clientX

    for(var i in xListeners)
        xListeners[i](newX, values.x)

    values.x = newX

    var newY = event.clientY

    for(var i in yListeners)
        yListeners[i](newY, values.y)

    values.y = newY
}

var leftKeyListeners = []

function addLeftKeyChangeListener(listener) {
    listener(values.leftKey)
    leftKeyListeners.push(listener)
}

var middleKeyListeners = []

function addMiddleKeyChangeListener(listener) {
    listener(values.middleKey)
    middleKeyListeners.push(listener)
}

var rightKeyListeners = []

function addRightKeyChangeListener(listener) {
    listener(values.rightKey)
    rightKeyListeners.push(listener)
}

function getKeyType(event) {
    //1 - left
    //2 - middle
    //3 - right

    if(typeof event.which !== 'undefined') {
        return event.which
    }
    else if(typeof event.button !== 'undefined') {
        switch(event.button) {
            case 1: return 1
            case 2: return 3
            case 3: return 2
        }
    }
    else {
        console.error('undefined mouse button')
    }
}

document.body.onmousedown = function(event) {
    var keyType = getKeyType(event)

    switch(keyType) {
        case 1:
            values.leftKey = true

            for(var i in leftKeyListeners)
                leftKeyListeners[i](values.leftKey)
        break

        case 2:
            values.middleKey = true

            for(var i in middleKeyListeners)
                middleKeyListeners[i](values.middleKey)
        break

        case 3:
            values.rightKey = true

            for(var i in rightKeyListeners)
                rightKeyListeners[i](values.rightKey)
        break
    }
}

document.body.onmouseup = function(event) {
    var keyType = getKeyType(event)

    switch(keyType) {
        case 1:
            values.leftKey = false

            for(var i in leftKeyListeners)
                leftKeyListeners[i](values.leftKey)
        break

        case 2:
            values.middleKey = false

            for(var i in middleKeyListeners)
                middleKeyListeners[i](values.middleKey)
        break

        case 3:
            values.rightKey = false

            for(var i in rightKeyListeners)
                rightKeyListeners[i](values.rightKey)
        break
    }
}

document.oncontextmenu = function(event) {
    event.cancelBubble = true
    return false
}

module.exports = {
    /*x:         x,
    y:         y,
    leftKey:   leftKey,
    middleKey: middleKey,
    rightKey:  rightKey,*/
    values: values,

    addXChangeListener:         addXChangeListener,
    addYChangeListener:         addYChangeListener,
    addLeftKeyChangeListener:   addLeftKeyChangeListener,
    addMiddleKeyChangeListener: addMiddleKeyChangeListener,
    addRightKeyChangeListener:  addRightKeyChangeListener
}