var View = require('view/view.js')
var Label = require('view/elements/label.js')
var Layout = require('view/elements/layout.js')
var TextInput = require('view/elements/text input.js')
var Block = require('view/elements/block.js')
var Image = require('view/elements/image.js')

function create() {
    var view = View.create(document.body)

    Label.add(view)
    Layout.add(view)
    TextInput.add(view)
    Block.add(view)
    Image.add(view)

    return view
}

function redraw(view, elements) {
    view
        .begin()
            .layout({
                width: '100%',
                height: '50px',
                zIndex: 1,
                backgroundColor: 'rgb(28, 66, 125)',
                boxShadow: '1px 1px 7px 0px #000'
            })
            .begin()
                //.label('Приложения')
            .end()

            .layout({
                width: '100%',
                height: 'calc(100% - 50px)'
            })
            .begin()
                .block({
                    width: 'calc(100%)',
                    height: 'calc(100%)',
                    padding: '7.5px 0 0 7.5px',
                    backgroundColor: 'rgb(201, 209, 222)',
                    boxShadow: '1px 1px 7px 0px #aaa'
                })
                .begin()
                    .layout({
                        width: '100%',
                        height: '100%',
                    })
                    .begin()
                    .for_each(
                        elements,

                        function(view, element) {
                            view
                                .block({
                                    width: '150px',
                                    height: '200px',
                                    margin: '7.5px 20px 20px 7.5px',
                                    padding: '15px',
                                    backgroundColor: '#fff',
                                    boxShadow: '1px 1px 0px 0px rgb(23, 16, 82)'
                                })
                                .begin()
                                    .image({
                                        src: element.image,
                                        width: '150px',
                                        height: '150px'
                                    })
                                    .block({
                                        width: '100%',
                                        height: 'auto',
                                        margin: '10px 0 0 0'
                                    })
                                    .begin()
                                        .label(element.name)
                                    .end()
                                .end()
                        }
                    )
                    .end()
                .end()
            .end()
        .end()
}

module.exports = {
    create: create,
    redraw: redraw
}