var View = require('../../view.js')
var Mouse = require('events/mouse.js')


function add(view) {
    View.add(view, 'WebGL', function(element, model) {
        var reference = element.reference
        var style = reference.style

        style.display = 'inline-block'
        style.width        = model.width
        style.height       = model.height

        if(model.backgroundColor)
            style.backgroundColor = model.backgroundColor

        if(model.boxShadow)
            style.boxShadow = model.boxShadow

        if(model.zIndex)
            style.zIndex = model.zIndex

        if(model.margin)
            style.margin = model.margin

        var canvas = document.createElement('canvas')
        //var style = canvas.style

        canvas.width = reference.clientWidth
        canvas.height = reference.clientHeight

        reference.appendChild(canvas)

        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

        gl.viewportWidth = canvas.width
        gl.viewportHeight = canvas.height

        gl.clearColor(0.0, 0.0, 0.0, 1.0)


        setInterval(function() {
            //gl.clear(gl.BUFFER_BIT)
            model.draw(gl)
        }, 10)
    })
}

module.exports = {
    add: add
}