/*var tree = {
    data: undefined,
    children: [
        {
            data: undefined,
            children: []
        },

        {
            data: undefined,
            children: []
        }
    ]
}*/

function createNode(data){
    return {
        data: data,
        children: []
    }
}

function addNode(rootNode, node){
    rootNode.children.push(node)
}

function drawTree(rootNode, getNodeWidth, getNodeHeight, drawNode){
    var nodeLayout = {
        x: 0,
        y: 0
    }

    function getTWidth(rootNode){
        var rootNodeWidth = getNodeWidth(rootNode)
        var childrenNodesWidth = 0

        for(var i in rootNode.children)
            childrenNodesWidth += getTWidth(rootNode.children[i])

        return Math.max(childrenNodesWidth, rootNodeWidth)
    }

    //console.log(getTWidth(rootNode))
    var y = 0
    //var x = 0
    var levels = []
    var levelIndex = 0

    function drawPath(x1, y1, x2, y2){
        var svg = document.querySelector('svg')

        function updatePath(path, x1, y1, x2, y2){
            path.setAttributeNS(null, 'd', 'M' + x1 + ' ' + y1 + ',' + x2 + ' ' + y2)
            path.setAttributeNS(null, 'stroke', '#aaf')
            path.setAttributeNS(null, 'stroke-width', '1px')
            path.setAttributeNS(null, 'fill', '#000')
        }

        function createPath(svg){
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            
            path.setAttributeNS(null, 'stroke', '#000')
            path.setAttributeNS(null, 'stroke-width', '1px')
            path.setAttributeNS(null, 'fill', '#000')

            path.onclick = function(event){
                alert()
            }

            svg.appendChild(path)

            return path
        }

        var path = createPath(svg)
        updatePath(path, x1, y1, x2, y2)
    }

    function drawNode(rootNode, parentElement){
        if(!levels[levelIndex])
            levels[levelIndex] = 0

        var rootNodeWidth = getTWidth(rootNode)
        //var rootNodeHeight = getNodeHeight(rootNode)
        var text = document.createElement('text')
        text.innerHTML = rootNode.data
        text.style.position = 'absolute'
        text.style.left = levels[levelIndex] + getTWidth(rootNode) / 2 + 'px'
        text.style.top = y + 'px'
        document.body.appendChild(text)

        if(parentElement){
            console.log(parentElement)
            drawPath(parentElement.offsetLeft + parentElement.offsetWidth / 2, parentElement.offsetTop + 10, text.offsetLeft + text.offsetWidth / 2, text.offsetTop - 10)
        }

        levels[levelIndex] += getTWidth(rootNode)

        ++levelIndex
        y += 40
        var x = 0

        for(var i in rootNode.children){
            var currentNode = rootNode.children[i]
            //x += getTWidth(currentNode)
            drawNode(rootNode.children[i], text)
            //nodeLayout.x += 
        }

        --levelIndex
        y -= 40
        //x = 0

        for(var i = levelIndex + 1; i < levels.length; ++i){
            if(levels[levelIndex] > levels[i])
                levels[i] = levels[levelIndex]
        }
    }

    drawNode(rootNode)
}

var rootNode = createNode('Дом')

    var node1 = createNode('Крыша')
    addNode(rootNode, node1)

        var node1_1 = createNode('Топор')
        addNode(node1, node1_1)

        var node1_2 = createNode('Топор')
        addNode(node1, node1_2)

            var node1_2_1 = createNode('Топорasd')
            addNode(node1_2, node1_2_1)

        var node1_3 = createNode('Топор')
        addNode(node1, node1_3)

    var node2 = createNode('Стены')
    addNode(rootNode, node2)

        var node2_1 = createNode('Стеныahgj')
        addNode(node2, node2_1)

    var node3 = createNode('Фундамент')
    addNode(rootNode, node3)


var testNode = document.createElement('text')
testNode.style.podition = 'absolute'
testNode.style.opacity = 0
document.body.appendChild(testNode)

//console.log(rootNode)
drawTree(
    rootNode,
    
    function(node){
        testNode.innerHTML = node.data
        return testNode.offsetWidth
    },

    function(node){
        testNode.innerHTML = node.data
        return testNode.offsetHeight
    },
    
    function(node){

    }
)