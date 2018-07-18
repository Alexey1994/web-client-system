function begin() {
    var view = this
    view.node = view.node.childs[view.node.childIndex]
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

    return currentNode
}

function _if(expression, body) {
    var view = this
    var currentNode = updateNode(view.node, 'if')

    if(expression) {
        currentNode.reference.style.display = 'block'

        var node = view.node
        view.node = currentNode
        body(view)
        view.node = node
    }
    else {
        currentNode.reference.style.display = 'none'
    }

    return view
}

function _else() {

}

function create(container) {
    var rootNode = {
        reference:  null,
        parent:     null,
        childs:     [],
        childIndex: 0
    }

    var containerNode = {
        reference:  container,
        parent:     rootNode,
        childs:     [],
        childIndex: 0
    }

    rootNode.childs.push(containerNode)

    return {
        node:  rootNode,

        begin: begin,
        end:   end,
        if:    _if,
        else:  _else
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