var View = require('../view.js')

function add(view) {
    View.add(view, 'label', function(element, text) {
        var reference = element.reference
        var style = reference.style

        style.display    = 'inline-block'
        style.fontSize   = '12px'
        style.userSelect = 'none'

        reference.innerHTML = text
    })
}

module.exports = {
    add: add
}