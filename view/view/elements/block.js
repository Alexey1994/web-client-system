var View = require('../view.js')

function add(view) {
    View.add(view, 'block', function(element, model) {
        var reference = element.reference
        var style = reference.style

        style.display      = 'inline-block'
        style.fontSize     = '0'
        style.width        = model.width
        style.height       = model.height
        style.position     = 'relative'

        if(model.backgroundColor)
            style.backgroundColor = model.backgroundColor

        if(model.boxShadow)
            style.boxShadow = model.boxShadow

        if(model.zIndex)
            style.zIndex = model.zIndex

        if(model.margin)
            style.margin = model.margin

        if(model.padding)
            style.padding = model.padding

        if(model.borderRadius)
            style.borderRadius = model.borderRadius
    })
}

module.exports = {
    add: add
}