function begin() {
    var view = this
    view.node = view.node.childs[view.node.childIndex - 1]

    if(view.node)
        view.node.childIndex = 0

    return view
}

function end() {
    var view = this
    view.node = view.node.parent
    return view
}

function createNode(parent, name) {
    var newNode = {
        reference: document.createElement(name),
        parent: parent,
        childs: [],
        childIndex: 0
    }

    parent.childs.push(newNode)
    parent.reference.appendChild(newNode.reference)

    return newNode
}

function updateNode(node, name) {
    var currentNode = node.childs[node.childIndex]

    if(!currentNode)
        currentNode = createNode(node, name)

    ++node.childIndex

    currentNode.childIndex = 0
    currentNode.ifState = false

    return currentNode
}

function _if(expression, ifBody) {
    var view = this
    var currentNode = updateNode(view.node, 'if')

    if(expression) {
        currentNode.reference.style.display = 'block'

        var node = view.node
        view.node = currentNode
        ifBody(view)
        view.node = node
        view.node.ifState = true
    }
    else {
        currentNode.reference.style.display = 'none'
        view.node.ifState = false
    }

    return view
}

function elseIf(expression, elseIfBody) {
    var view = this
    var currentNode = updateNode(view.node, 'else_if')

    if(expression && !view.node.ifState) {
        currentNode.reference.style.display = 'block'

        var node = view.node
        view.node = currentNode
        elseIfBody(view)
        view.node = node
        view.node.ifState = true
    }
    else {
        currentNode.reference.style.display = 'none'
        view.node.ifState = false
    }

    return view
}

function _else(elseBody) {
    var view = this
    var currentNode = updateNode(view.node, 'else')

    if(!view.node.ifState) {
        currentNode.reference.style.display = 'block'

        var node = view.node
        view.node = currentNode
        elseBody(view)
        view.node = node
    }
    else {
        currentNode.reference.style.display = 'none'
    }

    return view
}

function forEach(items, forEachBody) {
    var view = this

    var currentNode = updateNode(view.node, 'for_each')
    var node = view.node
    view.node = currentNode

    items
        .forEach(function(item, index) {
            forEachBody(view, item, index)
        })

    view.node = node

    return view
}

function create(container) {
    var rootNode = {
        reference:  null,
        parent:     null,
        childs:     [],
        childIndex: 1
    }

    var containerNode = {
        reference:  container,
        parent:     rootNode,
        childs:     [],
        childIndex: 0
    }

    rootNode.childs.push(containerNode)

    return {
        node:    rootNode,

        begin:    begin,
        end:      end,
        if:       _if,
        else_if:  elseIf,
        else:     _else,

        for_each: forEach
    }
}

function add(view, elementName, drawElement) {
    view[elementName] = function(model) {
        var currentNode = updateNode(view.node, elementName)
        drawElement(currentNode, model)

        return view
    }
}

module.exports = {
    create: create,
    add:    add
}