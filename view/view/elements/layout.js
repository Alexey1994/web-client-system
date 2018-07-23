var View = require('../view.js')

function add(view) {
    View.add(view, 'layout', function(element, model) {
        var reference = element.reference
        var style = reference.style

        style.display      = 'inline-block'
        style.fontSize     = '0'
        style.width        = model.width
        style.height       = model.height
        style.overflow     = 'auto'
        style.marginTop    = '-4px'
        //style.paddingTop   = '4px'
        //style.marginBottom = '-4px'
        style.position = 'relative'

        if(model.backgroundColor)
            style.backgroundColor = model.backgroundColor

        if(model.boxShadow)
            style.boxShadow = model.boxShadow

        if(model.zIndex)
            style.zIndex = model.zIndex
    })
}

module.exports = {
    add: add
}