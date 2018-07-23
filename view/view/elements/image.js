var View = require('../view.js')

function add(view) {
    View.add(view, 'image', function(element, model) {
        var reference = element.reference
        var image = document.createElement('img')
        reference.appendChild(image)
        reference = image

        var style = reference.style

        style.display      = 'inline-block'
        style.fontSize     = '0'
        style.width        = model.width
        style.height       = model.height
        //style.overflow     = 'auto'
        //style.marginTop    = '-4px'
        //style.paddingTop   = '4px'
        //style.marginBottom = '-4px'
        style.position = 'relative'

        if(model.boxShadow)
            style.boxShadow = model.boxShadow

        if(model.zIndex)
            style.zIndex = model.zIndex

        if(model.margin)
            style.margin = model.margin

        if(model.padding)
            style.padding = model.padding

        reference.src = model.src

        console.log(reference.style)
    })
}

module.exports = {
    add: add
}