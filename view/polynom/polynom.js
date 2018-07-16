function create() {
    return {
        data: []
    }
}

function addTail(polynom, tail) {
    polynom.data.push(tail)
}

function copy(polynom) {
    return {
        isNegate: polynom.isNegate,
        data: polynom.data
            .map(function(tail) {
                return tail
            })
    }
}

function normalize(polynom) {
    for(var i = polynom.data.length; i && !polynom.data[i - 1]; --i)
        polynom.data.splice(i - 1, 1)
}

function add(polynom1, polynom2, add) {
    for(var i = 0; i < polynom1.data.length && i < polynom2.data.length; ++i)
        polynom1.data[i] = add(polynom1.data[i], polynom2.data[i])

    if(i < polynom1.data.length) {
        for(; i < polynom1.data.length; ++i)
            polynom1.data[i] = polynom1.data[i]
    }
    else {
        for(; i < polynom2.data.length; ++i)
            addTail(polynom1, polynom2.data[i])
    }
}

module.exports = {
    create:  create,
    addTail: addTail,
    copy:    copy,
    add:     add
}