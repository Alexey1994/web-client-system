var View = require('../view.js')

function add(view) {
    View.add(view, 'text_input', function(element, model) {
        var reference = element.reference

        var input = document.createElement('input')
        input.setAttribute('type', 'text')

        reference.appendChild(input)
        reference = input

        var style = reference.style

        if(model.oninput)
            reference.onclick = model.oninput

        style.display      = 'inline-block'
        style.width        = '100%'
/*
        style.display      = 'inline-block'
        style.fontSize     = '0'
        style.width        = model.width
        style.height       = model.height
        style.overflow     = 'auto'
        style.marginTop    = '-4px'
        style.paddingTop   = '4px'
        style.marginBottom = '-4px'

        if(model.backgroundColor)
            style.backgroundColor = model.backgroundColor*/
    })
}

module.exports = {
    add: add
}